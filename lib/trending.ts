/**
 * Trending Data Layer
 * Unified trending queries across all tool types (skills, commands, settings, plugins)
 */

import { createClient as createServerClient } from '@/lib/supabase/server'

/**
 * Tool types available in the marketplace
 */
export type TrendingItemType = 'skill' | 'command' | 'setting' | 'plugin'

/**
 * Unified trending item interface
 */
export interface TrendingItem {
  id: string
  slug: string
  name: string
  description: string
  type: TrendingItemType
  category: string
  install_count: number
  view_count: number
  verified: boolean
  featured: boolean
  official?: boolean
  created_at: string
}

/**
 * Filters for trending queries
 */
export interface TrendingFilters {
  type?: TrendingItemType | 'all'
  limit?: number
  featured?: boolean
  verified?: boolean
}

/**
 * Get trending items across all types with equal weighting
 * Sorted by install_count (popularity)
 */
export async function getTrendingItems(filters: TrendingFilters = {}): Promise<TrendingItem[]> {
  const { type = 'all', limit = 20, featured, verified } = filters

  try {
    const supabase = await createServerClient()
    if (!supabase) {
      console.error('[getTrendingItems] Supabase client failed')
      return []
    }

    const items: TrendingItem[] = []

    // Fetch from each table based on type filter
    if (type === 'all' || type === 'skill') {
      const skills = await fetchSkillsTrending(supabase, { featured, verified, limit })
      items.push(...skills)
    }

    if (type === 'all' || type === 'command') {
      const commands = await fetchCommandsTrending(supabase, { featured, verified, limit })
      items.push(...commands)
    }

    if (type === 'all' || type === 'setting') {
      const settings = await fetchSettingsTrending(supabase, { featured, verified, limit })
      items.push(...settings)
    }

    if (type === 'all' || type === 'plugin') {
      const plugins = await fetchPluginsTrending(supabase, { featured, verified, limit })
      items.push(...plugins)
    }

    // Sort all items by install_count (equal weighting across types)
    items.sort((a, b) => b.install_count - a.install_count)

    // Return limited results
    return items.slice(0, limit)
  } catch (error) {
    console.error('[getTrendingItems] Error:', error)
    return []
  }
}

/**
 * Get featured items across all types (for hero section)
 */
export async function getFeaturedItems(limit: number = 6): Promise<TrendingItem[]> {
  return getTrendingItems({ featured: true, limit })
}

/**
 * Get rising stars - new items with high install rates
 * (Items created in last 30 days, sorted by install_count)
 */
export async function getRisingStars(limit: number = 10): Promise<TrendingItem[]> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return []
    }

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const cutoffDate = thirtyDaysAgo.toISOString()

    const items: TrendingItem[] = []

    // Fetch recent items from each table
    const [skills, commands, settings, plugins] = await Promise.all([
      fetchRecentSkills(supabase, cutoffDate, limit),
      fetchRecentCommands(supabase, cutoffDate, limit),
      fetchRecentSettings(supabase, cutoffDate, limit),
      fetchRecentPlugins(supabase, cutoffDate, limit),
    ])

    items.push(...skills, ...commands, ...settings, ...plugins)

    // Sort by install_count
    items.sort((a, b) => b.install_count - a.install_count)

    return items.slice(0, limit)
  } catch (error) {
    console.error('[getRisingStars] Error:', error)
    return []
  }
}

/**
 * Get leaderboard for a specific type
 */
export async function getLeaderboard(
  type: TrendingItemType,
  limit: number = 10
): Promise<TrendingItem[]> {
  return getTrendingItems({ type, limit })
}

// ===========================================
// Private helper functions
// ===========================================

interface QueryOptions {
  featured?: boolean
  verified?: boolean
  limit: number
}

async function fetchSkillsTrending(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  options: QueryOptions
): Promise<TrendingItem[]> {
  if (!supabase) return []

  let query = supabase
    .from('skills')
    .select('id, slug, name, description, category_id, install_count, view_count, verified, featured, created_at')
    .eq('status', 'published')

  if (options.featured !== undefined) {
    query = query.eq('featured', options.featured)
  }
  if (options.verified !== undefined) {
    query = query.eq('verified', options.verified)
  }

  const { data, error } = await query
    .order('install_count', { ascending: false })
    .limit(options.limit)

  if (error || !data) return []

  return data.map((skill) => ({
    id: skill.id,
    slug: skill.slug,
    name: skill.name,
    description: skill.description,
    type: 'skill' as const,
    category: skill.category_id || 'general',
    install_count: skill.install_count,
    view_count: skill.view_count,
    verified: skill.verified,
    featured: skill.featured,
    created_at: skill.created_at,
  }))
}

async function fetchCommandsTrending(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  options: QueryOptions
): Promise<TrendingItem[]> {
  if (!supabase) return []

  let query = supabase
    .from('commands')
    .select('id, slug, name, description, category, install_count, view_count, verified, featured, created_at')
    .eq('status', 'published')

  if (options.featured !== undefined) {
    query = query.eq('featured', options.featured)
  }
  if (options.verified !== undefined) {
    query = query.eq('verified', options.verified)
  }

  const { data, error } = await query
    .order('install_count', { ascending: false })
    .limit(options.limit)

  if (error || !data) return []

  return data.map((cmd) => ({
    id: cmd.id,
    slug: cmd.slug,
    name: cmd.name,
    description: cmd.description,
    type: 'command' as const,
    category: cmd.category,
    install_count: cmd.install_count,
    view_count: cmd.view_count || 0,
    verified: cmd.verified,
    featured: cmd.featured || false,
    created_at: cmd.created_at,
  }))
}

async function fetchSettingsTrending(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  options: QueryOptions
): Promise<TrendingItem[]> {
  if (!supabase) return []

  let query = supabase
    .from('settings')
    .select('id, slug, name, description, category, install_count, view_count, verified, featured, created_at')
    .eq('status', 'published')

  if (options.featured !== undefined) {
    query = query.eq('featured', options.featured)
  }
  if (options.verified !== undefined) {
    query = query.eq('verified', options.verified)
  }

  const { data, error } = await query
    .order('install_count', { ascending: false })
    .limit(options.limit)

  if (error || !data) return []

  return data.map((setting) => ({
    id: setting.id,
    slug: setting.slug,
    name: setting.name,
    description: setting.description,
    type: 'setting' as const,
    category: setting.category,
    install_count: setting.install_count,
    view_count: setting.view_count || 0,
    verified: setting.verified,
    featured: setting.featured || false,
    created_at: setting.created_at,
  }))
}

async function fetchPluginsTrending(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  options: QueryOptions
): Promise<TrendingItem[]> {
  if (!supabase) return []

  let query = supabase
    .from('plugins')
    .select('id, slug, name, description, category, install_count, view_count, verified, featured, official, created_at')
    .eq('status', 'published')

  if (options.featured !== undefined) {
    query = query.eq('featured', options.featured)
  }
  if (options.verified !== undefined) {
    query = query.eq('verified', options.verified)
  }

  const { data, error } = await query
    .order('install_count', { ascending: false })
    .limit(options.limit)

  if (error || !data) return []

  return data.map((plugin) => ({
    id: plugin.id,
    slug: plugin.slug,
    name: plugin.name,
    description: plugin.description,
    type: 'plugin' as const,
    category: plugin.category,
    install_count: plugin.install_count,
    view_count: plugin.view_count,
    verified: plugin.verified,
    featured: plugin.featured,
    official: plugin.official,
    created_at: plugin.created_at,
  }))
}

// Recent items fetchers for Rising Stars

async function fetchRecentSkills(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  cutoffDate: string,
  limit: number
): Promise<TrendingItem[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('skills')
    .select('id, slug, name, description, category_id, install_count, view_count, verified, featured, created_at')
    .eq('status', 'published')
    .gte('created_at', cutoffDate)
    .order('install_count', { ascending: false })
    .limit(limit)

  if (error || !data) return []

  return data.map((skill) => ({
    id: skill.id,
    slug: skill.slug,
    name: skill.name,
    description: skill.description,
    type: 'skill' as const,
    category: skill.category_id || 'general',
    install_count: skill.install_count,
    view_count: skill.view_count,
    verified: skill.verified,
    featured: skill.featured,
    created_at: skill.created_at,
  }))
}

async function fetchRecentCommands(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  cutoffDate: string,
  limit: number
): Promise<TrendingItem[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('commands')
    .select('id, slug, name, description, category, install_count, view_count, verified, featured, created_at')
    .eq('status', 'published')
    .gte('created_at', cutoffDate)
    .order('install_count', { ascending: false })
    .limit(limit)

  if (error || !data) return []

  return data.map((cmd) => ({
    id: cmd.id,
    slug: cmd.slug,
    name: cmd.name,
    description: cmd.description,
    type: 'command' as const,
    category: cmd.category,
    install_count: cmd.install_count,
    view_count: cmd.view_count || 0,
    verified: cmd.verified,
    featured: cmd.featured || false,
    created_at: cmd.created_at,
  }))
}

async function fetchRecentSettings(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  cutoffDate: string,
  limit: number
): Promise<TrendingItem[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('settings')
    .select('id, slug, name, description, category, install_count, view_count, verified, featured, created_at')
    .eq('status', 'published')
    .gte('created_at', cutoffDate)
    .order('install_count', { ascending: false })
    .limit(limit)

  if (error || !data) return []

  return data.map((setting) => ({
    id: setting.id,
    slug: setting.slug,
    name: setting.name,
    description: setting.description,
    type: 'setting' as const,
    category: setting.category,
    install_count: setting.install_count,
    view_count: setting.view_count || 0,
    verified: setting.verified,
    featured: setting.featured || false,
    created_at: setting.created_at,
  }))
}

async function fetchRecentPlugins(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  cutoffDate: string,
  limit: number
): Promise<TrendingItem[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('plugins')
    .select('id, slug, name, description, category, install_count, view_count, verified, featured, official, created_at')
    .eq('status', 'published')
    .gte('created_at', cutoffDate)
    .order('install_count', { ascending: false })
    .limit(limit)

  if (error || !data) return []

  return data.map((plugin) => ({
    id: plugin.id,
    slug: plugin.slug,
    name: plugin.name,
    description: plugin.description,
    type: 'plugin' as const,
    category: plugin.category,
    install_count: plugin.install_count,
    view_count: plugin.view_count,
    verified: plugin.verified,
    featured: plugin.featured,
    official: plugin.official,
    created_at: plugin.created_at,
  }))
}
