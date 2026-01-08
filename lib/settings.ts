/**
 * Settings Data Layer
 * Query functions for fetching and managing workflow settings
 */

import { createClient as createServerClient } from '@/lib/supabase/server'

export interface Setting {
  id: string
  slug: string
  name: string
  description: string
  category: string
  model?: string
  max_tokens?: number
  temperature?: number
  use_case: string
  settings_json: Record<string, any>
  tags: string[]
  install_count: number
  verified: boolean
  status: string
  created_at: string
  updated_at: string
}

/**
 * Get all published settings
 */
export async function getAllSettings(): Promise<Setting[]> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      console.error('[getAllSettings] Supabase client failed')
      return []
    }

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('status', 'published')
      .order('install_count', { ascending: false })

    if (error) {
      console.error('[getAllSettings] Error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[getAllSettings] Unexpected error:', error)
    return []
  }
}

/**
 * Get setting by slug
 */
export async function getSetting(slug: string): Promise<Setting | null> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return null
    }

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      console.error('[getSetting] Error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('[getSetting] Unexpected error:', error)
    return null
  }
}

/**
 * Get settings by category
 */
export async function getSettingsByCategory(category: string): Promise<Setting[]> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('install_count', { ascending: false })

    if (error) {
      console.error('[getSettingsByCategory] Error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[getSettingsByCategory] Unexpected error:', error)
    return []
  }
}

/**
 * Get setting categories with counts
 */
export async function getSettingCategories(): Promise<Record<string, number>> {
  try {
    const settings = await getAllSettings()
    const categories: Record<string, number> = {}

    settings.forEach((setting) => {
      categories[setting.category] = (categories[setting.category] || 0) + 1
    })

    return categories
  } catch (error) {
    console.error('[getSettingCategories] Error:', error)
    return {}
  }
}


