/**
 * Plugin Marketplace Types
 * Types for Claude Code plugins from official and community sources
 */

export interface Plugin {
  id: string
  slug: string
  name: string
  description: string
  category: PluginCategory

  // Plugin-specific
  install_command: string
  slash_command: string | null
  github_repo: string | null

  // Authorship
  author: string
  author_org: string | null
  original_author: string | null

  // Discovery
  tags: string[]
  use_cases: string[] | null

  // Quality badges
  verified: boolean
  featured: boolean
  official: boolean

  // Metadata
  license: string
  version: string

  // Stats
  install_count: number
  view_count: number

  // Status
  status: 'draft' | 'published' | 'archived'

  // Timestamps
  created_at: string
  updated_at: string
}

/**
 * Plugin categories with emoji mappings
 */
export const PLUGIN_CATEGORIES = [
  'code-quality',
  'automation',
  'development',
  'productivity',
  'output-style',
  'lsp',
  'integration',
  'framework',
  'testing',
] as const

export type PluginCategory = (typeof PLUGIN_CATEGORIES)[number]

/**
 * Category emoji mappings for UI display
 */
export const PLUGIN_CATEGORY_EMOJI: Record<PluginCategory, string> = {
  'code-quality': '\u2728', // Sparkles
  automation: '\ud83d\udd04', // Arrows counterclockwise
  development: '\ud83d\udcbb', // Laptop
  productivity: '\u26a1', // High voltage
  'output-style': '\ud83d\udcdd', // Memo
  lsp: '\ud83d\udd27', // Wrench
  integration: '\ud83d\udd17', // Link
  framework: '\ud83d\udce6', // Package
  testing: '\ud83e\uddea', // Test tube
}

/**
 * Category display names
 */
export const PLUGIN_CATEGORY_NAMES: Record<PluginCategory, string> = {
  'code-quality': 'Code Quality',
  automation: 'Automation',
  development: 'Development',
  productivity: 'Productivity',
  'output-style': 'Output Style',
  lsp: 'Language Servers',
  integration: 'Integrations',
  framework: 'Frameworks',
  testing: 'Testing',
}

/**
 * Filters for plugin queries
 */
export interface PluginFilters {
  category?: PluginCategory
  official?: boolean
  featured?: boolean
  verified?: boolean
  search?: string
}
