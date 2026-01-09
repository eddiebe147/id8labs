/**
 * Plugins Data Layer
 * Query functions for fetching and managing Claude Code plugins
 */

import { createClient as createServerClient } from '@/lib/supabase/server'
import type { Plugin, PluginCategory, PluginFilters } from './plugin-types'

/**
 * Get all published plugins with optional filters
 */
export async function getAllPlugins(filters?: PluginFilters): Promise<Plugin[]> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      console.error('[getAllPlugins] Supabase client failed')
      return []
    }

    let query = supabase
      .from('plugins')
      .select('*')
      .eq('status', 'published')

    if (filters?.category) {
      query = query.eq('category', filters.category)
    }
    if (filters?.official !== undefined) {
      query = query.eq('official', filters.official)
    }
    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }
    if (filters?.verified !== undefined) {
      query = query.eq('verified', filters.verified)
    }

    const { data, error } = await query.order('install_count', { ascending: false })

    if (error) {
      console.error('[getAllPlugins] Error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[getAllPlugins] Unexpected error:', error)
    return []
  }
}

/**
 * Get plugin by slug
 */
export async function getPlugin(slug: string): Promise<Plugin | null> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return null
    }

    const { data, error } = await supabase
      .from('plugins')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      console.error('[getPlugin] Error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('[getPlugin] Unexpected error:', error)
    return null
  }
}

/**
 * Get plugins by category
 */
export async function getPluginsByCategory(category: PluginCategory): Promise<Plugin[]> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('plugins')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('install_count', { ascending: false })

    if (error) {
      console.error('[getPluginsByCategory] Error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[getPluginsByCategory] Unexpected error:', error)
    return []
  }
}

/**
 * Get featured plugins (for homepage hero section)
 */
export async function getFeaturedPlugins(limit: number = 4): Promise<Plugin[]> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('plugins')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('install_count', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('[getFeaturedPlugins] Error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[getFeaturedPlugins] Unexpected error:', error)
    return []
  }
}

/**
 * Get official Anthropic plugins
 */
export async function getOfficialPlugins(): Promise<Plugin[]> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('plugins')
      .select('*')
      .eq('status', 'published')
      .eq('official', true)
      .order('install_count', { ascending: false })

    if (error) {
      console.error('[getOfficialPlugins] Error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[getOfficialPlugins] Unexpected error:', error)
    return []
  }
}

/**
 * Get community plugins (non-official)
 */
export async function getCommunityPlugins(): Promise<Plugin[]> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('plugins')
      .select('*')
      .eq('status', 'published')
      .eq('official', false)
      .order('install_count', { ascending: false })

    if (error) {
      console.error('[getCommunityPlugins] Error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[getCommunityPlugins] Unexpected error:', error)
    return []
  }
}

/**
 * Get plugin categories with counts
 */
export async function getPluginCategories(): Promise<Record<string, number>> {
  try {
    const plugins = await getAllPlugins()
    const categories: Record<string, number> = {}

    plugins.forEach((plugin) => {
      categories[plugin.category] = (categories[plugin.category] || 0) + 1
    })

    return categories
  } catch (error) {
    console.error('[getPluginCategories] Error:', error)
    return {}
  }
}

/**
 * Search plugins using full-text search
 */
export async function searchPlugins(query: string, limit: number = 20): Promise<Plugin[]> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return []
    }

    // Use the search_plugins function we created
    const { data, error } = await supabase.rpc('search_plugins', {
      query_text: query,
      limit_count: limit,
    })

    if (error) {
      console.error('[searchPlugins] Error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[searchPlugins] Unexpected error:', error)
    return []
  }
}

/**
 * Track plugin install (increment counter)
 */
export async function trackPluginInstall(pluginId: string): Promise<void> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return
    }

    await supabase.rpc('track_plugin_install', {
      p_plugin_id: pluginId,
    })
  } catch (error) {
    console.error('[trackPluginInstall] Error:', error)
  }
}

/**
 * Track plugin view (increment counter)
 */
export async function trackPluginView(pluginId: string): Promise<void> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return
    }

    await supabase.rpc('track_plugin_view', {
      p_plugin_id: pluginId,
    })
  } catch (error) {
    console.error('[trackPluginView] Error:', error)
  }
}

/**
 * Get total plugin count
 */
export async function getPluginCount(): Promise<number> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return 0
    }

    const { count, error } = await supabase
      .from('plugins')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published')

    if (error) {
      console.error('[getPluginCount] Error:', error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error('[getPluginCount] Unexpected error:', error)
    return 0
  }
}

/**
 * Get plugins by author organization
 */
export async function getPluginsByOrg(org: string): Promise<Plugin[]> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('plugins')
      .select('*')
      .eq('author_org', org)
      .eq('status', 'published')
      .order('install_count', { ascending: false })

    if (error) {
      console.error('[getPluginsByOrg] Error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[getPluginsByOrg] Unexpected error:', error)
    return []
  }
}
