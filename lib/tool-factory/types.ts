// Tool Factory - Unified Types
// Supports generation of Skills, Commands, Agents, and MCP Servers

// ============================================
// Tool Types
// ============================================

export type ToolType = 'skill' | 'command' | 'agent' | 'mcp'

export const TOOL_TYPES: ToolType[] = ['skill', 'command', 'agent', 'mcp']

export const TOOL_TYPE_LABELS: Record<ToolType, string> = {
  skill: 'Skill',
  command: 'Command',
  agent: 'Agent',
  mcp: 'MCP Server',
}

export const TOOL_TYPE_DESCRIPTIONS: Record<ToolType, string> = {
  skill: 'Reusable prompts and workflows for Claude Code',
  command: 'Shell commands and aliases for your terminal',
  agent: 'Autonomous agents with personas and capabilities',
  mcp: 'Model Context Protocol servers for tool integration',
}

// ============================================
// Skill Types (existing, enhanced)
// ============================================

export const SKILL_CATEGORIES = [
  'writing',
  'business',
  'code',
  'research',
  'design',
  'project',
  'communication',
  'document-creation',
  'personal',
  'domain',
  'meta',
] as const

export type SkillCategory = (typeof SKILL_CATEGORIES)[number]

export const COMPLEXITY_LEVELS = ['simple', 'complex', 'multi-agent'] as const
export type ComplexityLevel = (typeof COMPLEXITY_LEVELS)[number]

export interface GeneratedSkill {
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
  content: string
  rawContent: string
}

// ============================================
// Command Types
// ============================================

export const COMMAND_CATEGORIES = [
  'git',
  'testing',
  'deployment',
  'setup',
  'quality',
] as const

export type CommandCategory = (typeof COMMAND_CATEGORIES)[number]

export interface CommandVariant {
  name: string
  command: string
  description: string
}

export interface GeneratedCommand {
  name: string
  slug: string
  description: string
  category: CommandCategory
  command: string
  prerequisites: string[]
  tags: string[]
  variants: CommandVariant[]
  notes?: string
  content: string
  rawContent: string
}

// ============================================
// Agent Types
// ============================================

export const AGENT_CATEGORIES = [
  'orchestration',
  'quality',
  'research',
  'automation',
  'domain',
] as const

export type AgentCategory = (typeof AGENT_CATEGORIES)[number]

export interface AgentCoordination {
  reports_to: string | null
  collaborates_with: string[]
}

export interface GeneratedAgent {
  name: string
  slug: string
  description: string
  category: AgentCategory
  complexity: ComplexityLevel
  persona: string
  capabilities: string[]
  triggers: string[]
  tools_required: string[]
  coordination: AgentCoordination
  tags: string[]
  content: string
  rawContent: string
}

// ============================================
// MCP Server Types
// ============================================

export const MCP_CATEGORIES = [
  'integration',
  'data',
  'automation',
  'ai',
  'infrastructure',
] as const

export type MCPCategory = (typeof MCP_CATEGORIES)[number]

export const MCP_TRANSPORTS = ['stdio', 'http'] as const
export type MCPTransport = (typeof MCP_TRANSPORTS)[number]

export const MCP_LANGUAGES = ['typescript', 'python'] as const
export type MCPLanguage = (typeof MCP_LANGUAGES)[number]

export interface MCPToolParameter {
  name: string
  type: 'string' | 'number' | 'boolean' | 'object' | 'array'
  description?: string
  required?: boolean
}

export interface MCPTool {
  name: string
  description: string
  parameters: MCPToolParameter[]
}

export interface MCPResource {
  name: string
  description: string
}

export interface MCPPromptArgument {
  name: string
  description: string
  required: boolean
}

export interface MCPPrompt {
  name: string
  description: string
  arguments: MCPPromptArgument[]
}

export interface MCPEnvVar {
  name: string
  description: string
  required: boolean
}

export interface GeneratedMCP {
  name: string
  slug: string
  description: string
  category: MCPCategory
  transport: MCPTransport
  language: MCPLanguage
  sdk_version: string
  tools: MCPTool[]
  resources: MCPResource[]
  prompts: MCPPrompt[]
  dependencies: string[]
  env_vars: MCPEnvVar[]
  tags: string[]
  content: string
  rawContent: string
}

// ============================================
// Union Type for All Generated Tools
// ============================================

export type GeneratedTool =
  | { type: 'skill'; data: GeneratedSkill }
  | { type: 'command'; data: GeneratedCommand }
  | { type: 'agent'; data: GeneratedAgent }
  | { type: 'mcp'; data: GeneratedMCP }

// ============================================
// Verification Types
// ============================================

export interface VerificationCheck {
  passed: boolean
  issues: string[]
}

export interface AIReviewResult {
  suggestions: string[]
  improvements: string[]
}

export interface AutoFix {
  field: string
  original: string
  fixed: string
}

export interface VerificationResult {
  passed: boolean
  score: number // 0-100
  checks: {
    format: VerificationCheck
    quality: VerificationCheck
    typeSpecific: VerificationCheck
    aiReview: AIReviewResult
  }
  autoFixes?: AutoFix[]
}

// ============================================
// Generator State Types
// ============================================

export type GeneratorState =
  | 'idle'
  | 'generating'
  | 'verifying'
  | 'preview'
  | 'saving'
  | 'success'
  | 'error'

// ============================================
// API Request/Response Types
// ============================================

export interface GenerateToolRequest {
  toolType: ToolType
  description: string
  // Skill-specific hints
  categoryHint?: string
  complexityHint?: ComplexityLevel
  // Command-specific hints
  commandCategoryHint?: CommandCategory
  // Agent-specific hints
  agentCategoryHint?: AgentCategory
  personaHint?: string
  // MCP-specific hints
  mcpCategoryHint?: MCPCategory
  transportHint?: MCPTransport
  languageHint?: MCPLanguage
}

export interface GenerateToolResponse {
  success: boolean
  tool?: GeneratedTool
  error?: string
  rateLimitRemaining?: number
}

export interface VerifyToolRequest {
  toolType: ToolType
  content: string
}

export interface VerifyToolResponse {
  success: boolean
  verification?: VerificationResult
  error?: string
}

// ============================================
// Rate Limiting
// ============================================

export const RATE_LIMITS: Record<ToolType, number> = {
  skill: 10, // 10/hour
  command: 15, // 15/hour (simpler)
  agent: 8, // 8/hour (complex)
  mcp: 5, // 5/hour (most complex)
}

// ============================================
// Category Labels for UI
// ============================================

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  writing: 'Writing',
  business: 'Business',
  code: 'Code',
  research: 'Research',
  design: 'Design',
  project: 'Project',
  communication: 'Communication',
  'document-creation': 'Document Creation',
  personal: 'Personal',
  domain: 'Domain',
  meta: 'Meta',
}

export const COMMAND_CATEGORY_LABELS: Record<CommandCategory, string> = {
  git: 'Git',
  testing: 'Testing',
  deployment: 'Deployment',
  setup: 'Setup',
  quality: 'Quality',
}

export const AGENT_CATEGORY_LABELS: Record<AgentCategory, string> = {
  orchestration: 'Orchestration',
  quality: 'Quality',
  research: 'Research',
  automation: 'Automation',
  domain: 'Domain Expert',
}

export const MCP_CATEGORY_LABELS: Record<MCPCategory, string> = {
  integration: 'Integration',
  data: 'Data',
  automation: 'Automation',
  ai: 'AI',
  infrastructure: 'Infrastructure',
}

export const COMPLEXITY_LABELS: Record<ComplexityLevel, string> = {
  simple: 'Simple',
  complex: 'Complex',
  'multi-agent': 'Multi-Agent',
}

export const COMPLEXITY_DESCRIPTIONS: Record<ComplexityLevel, string> = {
  simple: 'Single-purpose, straightforward task',
  complex: 'Multi-step workflow with decisions',
  'multi-agent': 'Requires orchestration and coordination',
}
