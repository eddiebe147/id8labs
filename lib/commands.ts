/**
 * Commands Data Layer
 * Query functions for fetching and managing workflow commands
 */

import { createClient as createServerClient } from '@/lib/supabase/server'

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
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      console.error('[getAllCommands] Supabase client failed')
      return []
    }

    const { data, error } = await supabase
      .from('commands')
      .select('*')
      .eq('status', 'published')
      .order('install_count', { ascending: false })

    if (error) {
      console.error('[getAllCommands] Error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[getAllCommands] Unexpected error:', error)
    return []
  }
}

/**
 * Get command by slug
 */
export async function getCommand(slug: string): Promise<Command | null> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return null
    }

    const { data, error } = await supabase
      .from('commands')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      console.error('[getCommand] Error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('[getCommand] Unexpected error:', error)
    return null
  }
}

/**
 * Get commands by category
 */
export async function getCommandsByCategory(category: string): Promise<Command[]> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('commands')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('install_count', { ascending: false })

    if (error) {
      console.error('[getCommandsByCategory] Error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[getCommandsByCategory] Unexpected error:', error)
    return []
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
