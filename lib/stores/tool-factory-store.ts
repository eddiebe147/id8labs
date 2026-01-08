'use client'

import { create } from 'zustand'
import type {
  ToolType,
  GeneratorState,
  GeneratedSkill,
  GeneratedCommand,
  GeneratedAgent,
  GeneratedMCP,
  GeneratedTool,
  VerificationResult,
  SkillCategory,
  ComplexityLevel,
  CommandCategory,
  AgentCategory,
  MCPCategory,
  MCPTransport,
  MCPLanguage,
} from '@/lib/tool-factory/types'

// ============================================
// Store State Interface
// ============================================

export interface ToolFactoryState {
  // Current tool type
  toolType: ToolType

  // Input (common)
  description: string

  // Skill-specific hints
  skillCategoryHint: SkillCategory | null
  complexityHint: ComplexityLevel | null

  // Command-specific hints
  commandCategoryHint: CommandCategory | null

  // Agent-specific hints
  agentCategoryHint: AgentCategory | null
  personaHint: string | null

  // MCP-specific hints
  mcpCategoryHint: MCPCategory | null
  transportHint: MCPTransport | null
  languageHint: MCPLanguage | null

  // Generation state
  state: GeneratorState
  streamedContent: string
  error: string | null

  // Verification
  verification: VerificationResult | null
  isVerifying: boolean

  // Results (type-specific)
  generatedSkill: GeneratedSkill | null
  generatedCommand: GeneratedCommand | null
  generatedAgent: GeneratedAgent | null
  generatedMCP: GeneratedMCP | null

  // Save state
  savedToolId: string | null

  // Actions - Tool Type
  setToolType: (type: ToolType) => void

  // Actions - Input
  setDescription: (description: string) => void

  // Actions - Skill hints
  setSkillCategoryHint: (category: SkillCategory | null) => void
  setComplexityHint: (complexity: ComplexityLevel | null) => void

  // Actions - Command hints
  setCommandCategoryHint: (category: CommandCategory | null) => void

  // Actions - Agent hints
  setAgentCategoryHint: (category: AgentCategory | null) => void
  setPersonaHint: (persona: string | null) => void

  // Actions - MCP hints
  setMCPCategoryHint: (category: MCPCategory | null) => void
  setTransportHint: (transport: MCPTransport | null) => void
  setLanguageHint: (language: MCPLanguage | null) => void

  // Actions - Generation state
  setStreamedContent: (content: string) => void
  appendStreamedContent: (chunk: string) => void
  setState: (state: GeneratorState) => void
  setError: (error: string | null) => void

  // Actions - Verification
  setVerification: (verification: VerificationResult | null) => void
  setIsVerifying: (isVerifying: boolean) => void

  // Actions - Results
  setGeneratedSkill: (skill: GeneratedSkill | null) => void
  setGeneratedCommand: (command: GeneratedCommand | null) => void
  setGeneratedAgent: (agent: GeneratedAgent | null) => void
  setGeneratedMCP: (mcp: GeneratedMCP | null) => void
  setSavedToolId: (id: string | null) => void

  // Complex actions
  updateGeneratedTool: <T extends keyof GeneratedSkill>(
    field: T,
    value: GeneratedSkill[T]
  ) => void
  reset: () => void
  resetKeepType: () => void

  // Parsing
  parseGeneratedContent: () => GeneratedTool | null

  // Getters
  getCurrentTool: () => GeneratedTool | null
}

// ============================================
// YAML Parsing Utilities
// ============================================

function parseYAMLFrontmatter(rawContent: string): {
  frontmatter: Record<string, unknown>
  content: string
} | null {
  try {
    const frontmatterMatch = rawContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!frontmatterMatch) {
      console.error('No frontmatter found')
      return null
    }

    const yamlContent = frontmatterMatch[1]
    const markdownContent = frontmatterMatch[2]

    // Parse YAML manually (handles our known structure)
    const parsed: Record<string, unknown> = {}
    let currentKey = ''
    let inArray = false
    let inNestedObject = false
    let nestedKey = ''
    const arrayValues: string[] = []
    const nestedObject: Record<string, unknown> = {}

    const lines = yamlContent.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const trimmed = line.trim()
      if (!trimmed) continue

      // Calculate indentation
      const indent = line.search(/\S/)

      // Check for nested array item (tools, resources, etc.)
      if (trimmed.startsWith('- name:') && indent > 0) {
        // Start of a complex array item - skip for now (handled specially)
        continue
      }

      // Check for simple array item
      if (trimmed.startsWith('- ') && inArray && indent > 0) {
        const value = trimmed.slice(2).trim().replace(/^["']|["']$/g, '')
        arrayValues.push(value)
        continue
      }

      // If we were in an array, save it
      if (inArray && currentKey && indent === 0) {
        parsed[currentKey] = [...arrayValues]
        arrayValues.length = 0
        inArray = false
      }

      // If we were in a nested object, save it
      if (inNestedObject && currentKey && indent === 0) {
        parsed[currentKey] = { ...nestedObject }
        Object.keys(nestedObject).forEach((k) => delete nestedObject[k])
        inNestedObject = false
      }

      // Handle nested object properties
      if (inNestedObject && indent > 0) {
        const colonIndex = trimmed.indexOf(':')
        if (colonIndex > 0) {
          nestedKey = trimmed.slice(0, colonIndex).trim()
          const value = trimmed.slice(colonIndex + 1).trim()
          if (value === 'null') {
            nestedObject[nestedKey] = null
          } else if (value === '') {
            // Could be an array - check next line
            if (i + 1 < lines.length && lines[i + 1].trim().startsWith('-')) {
              const nestedArray: string[] = []
              let j = i + 1
              while (j < lines.length && lines[j].trim().startsWith('-')) {
                nestedArray.push(
                  lines[j].trim().slice(2).trim().replace(/^["']|["']$/g, '')
                )
                j++
              }
              nestedObject[nestedKey] = nestedArray
              i = j - 1
            } else {
              nestedObject[nestedKey] = []
            }
          } else {
            nestedObject[nestedKey] = value.replace(/^["']|["']$/g, '')
          }
        }
        continue
      }

      // Check for top-level key: value
      const colonIndex = trimmed.indexOf(':')
      if (colonIndex > 0 && indent === 0) {
        // Save previous array/object if needed
        if (inArray && currentKey) {
          parsed[currentKey] = [...arrayValues]
          arrayValues.length = 0
          inArray = false
        }
        if (inNestedObject && currentKey) {
          parsed[currentKey] = { ...nestedObject }
          Object.keys(nestedObject).forEach((k) => delete nestedObject[k])
          inNestedObject = false
        }

        currentKey = trimmed.slice(0, colonIndex).trim()
        const value = trimmed.slice(colonIndex + 1).trim()

        if (value === '') {
          // Check next line to determine if array or object
          const nextLine = i + 1 < lines.length ? lines[i + 1] : ''
          if (nextLine.trim().startsWith('-')) {
            inArray = true
          } else if (nextLine.search(/\S/) > 0) {
            // Indented key - it's a nested object
            inNestedObject = true
          }
        } else {
          // Scalar value
          if (value === 'null') {
            parsed[currentKey] = null
          } else if (value === 'true') {
            parsed[currentKey] = true
          } else if (value === 'false') {
            parsed[currentKey] = false
          } else if (!isNaN(Number(value)) && value !== '') {
            parsed[currentKey] = Number(value)
          } else {
            parsed[currentKey] = value.replace(/^["']|["']$/g, '')
          }
        }
      }
    }

    // Save final array/object if needed
    if (inArray && currentKey) {
      parsed[currentKey] = [...arrayValues]
    }
    if (inNestedObject && currentKey) {
      parsed[currentKey] = { ...nestedObject }
    }

    return { frontmatter: parsed, content: markdownContent.trim() }
  } catch (error) {
    console.error('Failed to parse YAML:', error)
    return null
  }
}

// ============================================
// Type-Specific Parsers
// ============================================

function parseSkillContent(rawContent: string): GeneratedSkill | null {
  const parsed = parseYAMLFrontmatter(rawContent)
  if (!parsed) return null

  const { frontmatter, content } = parsed

  return {
    name: (frontmatter.name as string) || 'Untitled Skill',
    slug: (frontmatter.slug as string) || 'untitled-skill',
    description: (frontmatter.description as string) || '',
    category: (frontmatter.category as SkillCategory) || 'meta',
    complexity: (frontmatter.complexity as ComplexityLevel) || 'simple',
    version: (frontmatter.version as string) || '1.0.0',
    author: (frontmatter.author as string) || 'AI Generated',
    license: (frontmatter.license as string) || 'MIT',
    triggers: Array.isArray(frontmatter.triggers) ? frontmatter.triggers : [],
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    content,
    rawContent,
  }
}

function parseCommandContent(rawContent: string): GeneratedCommand | null {
  const parsed = parseYAMLFrontmatter(rawContent)
  if (!parsed) return null

  const { frontmatter, content } = parsed

  return {
    name: (frontmatter.name as string) || 'Untitled Command',
    slug: (frontmatter.slug as string) || 'untitled-command',
    description: (frontmatter.description as string) || '',
    category: (frontmatter.category as CommandCategory) || 'setup',
    command: (frontmatter.command as string) || '',
    prerequisites: Array.isArray(frontmatter.prerequisites)
      ? frontmatter.prerequisites
      : [],
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    variants: [], // Would need more complex parsing for nested arrays
    notes: (frontmatter.notes as string) || undefined,
    content,
    rawContent,
  }
}

function parseAgentContent(rawContent: string): GeneratedAgent | null {
  const parsed = parseYAMLFrontmatter(rawContent)
  if (!parsed) return null

  const { frontmatter, content } = parsed
  const coordination = frontmatter.coordination as Record<string, unknown> | undefined

  return {
    name: (frontmatter.name as string) || 'Untitled Agent',
    slug: (frontmatter.slug as string) || 'untitled-agent',
    description: (frontmatter.description as string) || '',
    category: (frontmatter.category as AgentCategory) || 'automation',
    complexity: (frontmatter.complexity as ComplexityLevel) || 'simple',
    persona: (frontmatter.persona as string) || '',
    capabilities: Array.isArray(frontmatter.capabilities)
      ? frontmatter.capabilities
      : [],
    triggers: Array.isArray(frontmatter.triggers) ? frontmatter.triggers : [],
    tools_required: Array.isArray(frontmatter.tools_required)
      ? frontmatter.tools_required
      : [],
    coordination: {
      reports_to: coordination?.reports_to as string | null ?? null,
      collaborates_with: Array.isArray(coordination?.collaborates_with)
        ? coordination.collaborates_with
        : [],
    },
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : ['agent'],
    content,
    rawContent,
  }
}

function parseMCPContent(rawContent: string): GeneratedMCP | null {
  const parsed = parseYAMLFrontmatter(rawContent)
  if (!parsed) return null

  const { frontmatter, content } = parsed

  return {
    name: (frontmatter.name as string) || 'Untitled MCP',
    slug: (frontmatter.slug as string) || 'untitled-mcp',
    description: (frontmatter.description as string) || '',
    category: (frontmatter.category as MCPCategory) || 'integration',
    transport: (frontmatter.transport as MCPTransport) || 'stdio',
    language: (frontmatter.language as MCPLanguage) || 'typescript',
    sdk_version: (frontmatter.sdk_version as string) || '>=1.10.0',
    tools: [], // Complex nested structure - would need special handling
    resources: [],
    prompts: [],
    dependencies: Array.isArray(frontmatter.dependencies)
      ? frontmatter.dependencies
      : ['@modelcontextprotocol/sdk'],
    env_vars: [],
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : ['mcp'],
    content,
    rawContent,
  }
}

// ============================================
// Initial State
// ============================================

const initialState = {
  toolType: 'skill' as ToolType,
  description: '',

  // Skill hints
  skillCategoryHint: null as SkillCategory | null,
  complexityHint: null as ComplexityLevel | null,

  // Command hints
  commandCategoryHint: null as CommandCategory | null,

  // Agent hints
  agentCategoryHint: null as AgentCategory | null,
  personaHint: null as string | null,

  // MCP hints
  mcpCategoryHint: null as MCPCategory | null,
  transportHint: null as MCPTransport | null,
  languageHint: null as MCPLanguage | null,

  // State
  state: 'idle' as GeneratorState,
  streamedContent: '',
  error: null as string | null,

  // Verification
  verification: null as VerificationResult | null,
  isVerifying: false,

  // Results
  generatedSkill: null as GeneratedSkill | null,
  generatedCommand: null as GeneratedCommand | null,
  generatedAgent: null as GeneratedAgent | null,
  generatedMCP: null as GeneratedMCP | null,
  savedToolId: null as string | null,
}

// ============================================
// Store
// ============================================

export const useToolFactoryStore = create<ToolFactoryState>()((set, get) => ({
  ...initialState,

  // Tool type
  setToolType: (toolType) => set({ toolType }),

  // Input
  setDescription: (description) => set({ description }),

  // Skill hints
  setSkillCategoryHint: (skillCategoryHint) => set({ skillCategoryHint }),
  setComplexityHint: (complexityHint) => set({ complexityHint }),

  // Command hints
  setCommandCategoryHint: (commandCategoryHint) => set({ commandCategoryHint }),

  // Agent hints
  setAgentCategoryHint: (agentCategoryHint) => set({ agentCategoryHint }),
  setPersonaHint: (personaHint) => set({ personaHint }),

  // MCP hints
  setMCPCategoryHint: (mcpCategoryHint) => set({ mcpCategoryHint }),
  setTransportHint: (transportHint) => set({ transportHint }),
  setLanguageHint: (languageHint) => set({ languageHint }),

  // Generation state
  setStreamedContent: (streamedContent) => set({ streamedContent }),
  appendStreamedContent: (chunk) =>
    set((state) => ({ streamedContent: state.streamedContent + chunk })),
  setState: (state) => set({ state }),
  setError: (error) => set({ error }),

  // Verification
  setVerification: (verification) => set({ verification }),
  setIsVerifying: (isVerifying) => set({ isVerifying }),

  // Results
  setGeneratedSkill: (generatedSkill) => set({ generatedSkill }),
  setGeneratedCommand: (generatedCommand) => set({ generatedCommand }),
  setGeneratedAgent: (generatedAgent) => set({ generatedAgent }),
  setGeneratedMCP: (generatedMCP) => set({ generatedMCP }),
  setSavedToolId: (savedToolId) => set({ savedToolId }),

  // Update generated tool field (for skills - can be extended)
  updateGeneratedTool: (field, value) =>
    set((state) => {
      if (!state.generatedSkill) return state
      return {
        generatedSkill: {
          ...state.generatedSkill,
          [field]: value,
        },
      }
    }),

  // Full reset
  reset: () => set(initialState),

  // Reset but keep tool type
  resetKeepType: () => {
    const { toolType } = get()
    set({ ...initialState, toolType })
  },

  // Parse streamed content based on current tool type
  parseGeneratedContent: () => {
    const { streamedContent, toolType } = get()
    if (!streamedContent) return null

    let result: GeneratedTool | null = null

    switch (toolType) {
      case 'skill': {
        const skill = parseSkillContent(streamedContent)
        if (skill) {
          set({ generatedSkill: skill, state: 'preview' })
          result = { type: 'skill', data: skill }
        }
        break
      }
      case 'command': {
        const command = parseCommandContent(streamedContent)
        if (command) {
          set({ generatedCommand: command, state: 'preview' })
          result = { type: 'command', data: command }
        }
        break
      }
      case 'agent': {
        const agent = parseAgentContent(streamedContent)
        if (agent) {
          set({ generatedAgent: agent, state: 'preview' })
          result = { type: 'agent', data: agent }
        }
        break
      }
      case 'mcp': {
        const mcp = parseMCPContent(streamedContent)
        if (mcp) {
          set({ generatedMCP: mcp, state: 'preview' })
          result = { type: 'mcp', data: mcp }
        }
        break
      }
    }

    return result
  },

  // Get current generated tool
  getCurrentTool: () => {
    const state = get()
    switch (state.toolType) {
      case 'skill':
        return state.generatedSkill
          ? { type: 'skill' as const, data: state.generatedSkill }
          : null
      case 'command':
        return state.generatedCommand
          ? { type: 'command' as const, data: state.generatedCommand }
          : null
      case 'agent':
        return state.generatedAgent
          ? { type: 'agent' as const, data: state.generatedAgent }
          : null
      case 'mcp':
        return state.generatedMCP
          ? { type: 'mcp' as const, data: state.generatedMCP }
          : null
      default:
        return null
    }
  },
}))
