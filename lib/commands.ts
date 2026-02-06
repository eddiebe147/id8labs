/**
 * Commands Data Layer
 * Query functions for fetching and managing workflow commands
 */

import { createClient as createServerClient } from '@/lib/supabase/server'

const HAS_SUPABASE =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const FALLBACK_DATE = '2026-02-05T00:00:00.000Z'

const FALLBACK_COMMANDS: Command[] = [
  {
    id: 'cmd-git-smart-commit',
    slug: 'git-smart-commit',
    name: 'Git Smart Commit',
    description: 'Generate clear, structured commit messages from your staged diff.',
    category: 'git',
    command: 'git commit -m "feat: summarize changes"',
    prerequisites: ['git'],
    tags: ['git', 'workflow', 'commit'],
    install_count: 1240,
    verified: true,
    status: 'published',
    created_at: FALLBACK_DATE,
    updated_at: FALLBACK_DATE,
  },
  {
    id: 'cmd-focus-tests',
    slug: 'focus-tests',
    name: 'Focus Test Run',
    description: 'Run only tests related to the files you changed.',
    category: 'testing',
    command: 'npm test -- --watch',
    prerequisites: ['node'],
    tags: ['testing', 'speed'],
    install_count: 860,
    verified: false,
    status: 'published',
    created_at: FALLBACK_DATE,
    updated_at: FALLBACK_DATE,
  },
]

export interface Command {
  id: string
  slug: string
  name: string
  description: string
  category: string
  command: string
  prerequisites: string[]
  tags: string[]
  install_count: number
  verified: boolean
  status: string
  created_at: string
  updated_at: string
}

/**
 * Get all published commands
 */
export async function getAllCommands(): Promise<Command[]> {
  if (!HAS_SUPABASE) {
    return FALLBACK_COMMANDS
  }
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      console.error('[getAllCommands] Supabase client failed')
      return FALLBACK_COMMANDS
    }

    const { data, error } = await supabase
      .from('commands')
      .select('*')
      .eq('status', 'published')
      .order('install_count', { ascending: false })

    if (error) {
      console.error('[getAllCommands] Error:', error)
      return FALLBACK_COMMANDS
    }

    return data || []
  } catch (error) {
    console.error('[getAllCommands] Unexpected error:', error)
    return FALLBACK_COMMANDS
  }
}

/**
 * Get command by slug
 */
export async function getCommand(slug: string): Promise<Command | null> {
  if (!HAS_SUPABASE) {
    return FALLBACK_COMMANDS.find((command) => command.slug === slug) || null
  }
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return FALLBACK_COMMANDS.find((command) => command.slug === slug) || null
    }

    const { data, error } = await supabase
      .from('commands')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      console.error('[getCommand] Error:', error)
      return FALLBACK_COMMANDS.find((command) => command.slug === slug) || null
    }

    return data
  } catch (error) {
    console.error('[getCommand] Unexpected error:', error)
    return FALLBACK_COMMANDS.find((command) => command.slug === slug) || null
  }
}

/**
 * Get commands by category
 */
export async function getCommandsByCategory(category: string): Promise<Command[]> {
  if (!HAS_SUPABASE) {
    return FALLBACK_COMMANDS.filter((command) => command.category === category)
  }
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return FALLBACK_COMMANDS.filter((command) => command.category === category)
    }

    const { data, error } = await supabase
      .from('commands')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('install_count', { ascending: false })

    if (error) {
      console.error('[getCommandsByCategory] Error:', error)
      return FALLBACK_COMMANDS.filter((command) => command.category === category)
    }

    return data || []
  } catch (error) {
    console.error('[getCommandsByCategory] Unexpected error:', error)
    return FALLBACK_COMMANDS.filter((command) => command.category === category)
  }
}

/**
 * Get command categories with counts
 */
export async function getCommandCategories(): Promise<Record<string, number>> {
  try {
    const commands = await getAllCommands()
    const categories: Record<string, number> = {}

    commands.forEach((cmd) => {
      categories[cmd.category] = (categories[cmd.category] || 0) + 1
    })

    return categories
  } catch (error) {
    console.error('[getCommandCategories] Error:', error)
    return {}
  }
}
