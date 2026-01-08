'use client'

import { create } from 'zustand'
import type { SkillCategory, ComplexityLevel } from '@/lib/skill-generator-prompt'

export interface GeneratedSkill {
  // Parsed from YAML frontmatter
  name: string
  slug: string
  description: string
  category: SkillCategory
  complexity: ComplexityLevel
  version: string
  author: string
  license: string
  triggers: string[]
  tags: string[]
  // Full content
  content: string
  // Raw output (full YAML + markdown)
  rawContent: string
}

export type GeneratorState = 'idle' | 'generating' | 'preview' | 'saving' | 'success' | 'error'

export interface SkillGeneratorState {
  // Input
  description: string
  categoryHint: SkillCategory | null
  complexityHint: ComplexityLevel | null

  // Generation state
  state: GeneratorState
  streamedContent: string
  error: string | null

  // Result
  generatedSkill: GeneratedSkill | null
  savedSkillId: string | null

  // Actions
  setDescription: (description: string) => void
  setCategoryHint: (category: SkillCategory | null) => void
  setComplexityHint: (complexity: ComplexityLevel | null) => void
  setStreamedContent: (content: string) => void
  appendStreamedContent: (chunk: string) => void
  setState: (state: GeneratorState) => void
  setError: (error: string | null) => void
  setGeneratedSkill: (skill: GeneratedSkill | null) => void
  setSavedSkillId: (id: string | null) => void

  // Complex actions
  updateSkillField: <K extends keyof GeneratedSkill>(
    field: K,
    value: GeneratedSkill[K]
  ) => void
  reset: () => void

  // Parsing
  parseGeneratedContent: () => GeneratedSkill | null
}

/**
 * Parse YAML frontmatter + markdown content into GeneratedSkill
 */
function parseSkillContent(rawContent: string): GeneratedSkill | null {
  try {
    // Extract YAML frontmatter
    const frontmatterMatch = rawContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!frontmatterMatch) {
      console.error('No frontmatter found')
      return null
    }

    const yamlContent = frontmatterMatch[1]
    const markdownContent = frontmatterMatch[2]

    // Parse YAML manually (simple parser for our known structure)
    const parsed: Record<string, string | string[]> = {}
    let currentKey = ''
    let inArray = false
    const arrayValues: string[] = []

    const lines = yamlContent.split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue

      // Check for array item
      if (trimmed.startsWith('- ') && inArray) {
        const value = trimmed.slice(2).trim().replace(/^["']|["']$/g, '')
        arrayValues.push(value)
        continue
      }

      // If we were in an array, save it
      if (inArray && currentKey) {
        parsed[currentKey] = [...arrayValues]
        arrayValues.length = 0
        inArray = false
      }

      // Check for key: value
      const colonIndex = trimmed.indexOf(':')
      if (colonIndex > 0) {
        currentKey = trimmed.slice(0, colonIndex).trim()
        const value = trimmed.slice(colonIndex + 1).trim()

        if (value === '') {
          // This is an array
          inArray = true
        } else {
          // This is a scalar value
          parsed[currentKey] = value.replace(/^["']|["']$/g, '')
        }
      }
    }

    // Save final array if needed
    if (inArray && currentKey) {
      parsed[currentKey] = [...arrayValues]
    }

    // Construct GeneratedSkill
    const skill: GeneratedSkill = {
      name: (parsed.name as string) || 'Untitled Skill',
      slug: (parsed.slug as string) || 'untitled-skill',
      description: (parsed.description as string) || '',
      category: (parsed.category as SkillCategory) || 'meta',
      complexity: (parsed.complexity as ComplexityLevel) || 'simple',
      version: (parsed.version as string) || '1.0.0',
      author: (parsed.author as string) || 'AI Generated',
      license: (parsed.license as string) || 'MIT',
      triggers: Array.isArray(parsed.triggers) ? parsed.triggers : [],
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      content: markdownContent.trim(),
      rawContent: rawContent,
    }

    return skill
  } catch (error) {
    console.error('Failed to parse skill content:', error)
    return null
  }
}

const initialState = {
  description: '',
  categoryHint: null as SkillCategory | null,
  complexityHint: null as ComplexityLevel | null,
  state: 'idle' as GeneratorState,
  streamedContent: '',
  error: null as string | null,
  generatedSkill: null as GeneratedSkill | null,
  savedSkillId: null as string | null,
}

export const useSkillGeneratorStore = create<SkillGeneratorState>()((set, get) => ({
  ...initialState,

  // Simple setters
  setDescription: (description) => set({ description }),
  setCategoryHint: (categoryHint) => set({ categoryHint }),
  setComplexityHint: (complexityHint) => set({ complexityHint }),
  setStreamedContent: (streamedContent) => set({ streamedContent }),
  appendStreamedContent: (chunk) =>
    set((state) => ({ streamedContent: state.streamedContent + chunk })),
  setState: (state) => set({ state }),
  setError: (error) => set({ error }),
  setGeneratedSkill: (generatedSkill) => set({ generatedSkill }),
  setSavedSkillId: (savedSkillId) => set({ savedSkillId }),

  // Update a single field on the generated skill
  updateSkillField: (field, value) =>
    set((state) => {
      if (!state.generatedSkill) return state
      return {
        generatedSkill: {
          ...state.generatedSkill,
          [field]: value,
        },
      }
    }),

  // Reset to initial state
  reset: () => set(initialState),

  // Parse streamed content into GeneratedSkill
  parseGeneratedContent: () => {
    const { streamedContent } = get()
    if (!streamedContent) return null

    const skill = parseSkillContent(streamedContent)
    if (skill) {
      set({ generatedSkill: skill, state: 'preview' })
    }
    return skill
  },
}))
