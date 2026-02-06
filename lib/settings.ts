/**
 * Settings Data Layer
 * Query functions for fetching and managing workflow settings
 */

import { createClient as createServerClient } from '@/lib/supabase/server'

const HAS_SUPABASE =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const FALLBACK_DATE = '2026-02-05T00:00:00.000Z'

const FALLBACK_SETTINGS: Setting[] = [
  {
    id: 'setting-claude-opus-max-quality',
    slug: 'claude-opus-max-quality',
    name: 'Claude Opus Max Quality',
    description: 'High-accuracy configuration for complex reasoning tasks.',
    category: 'model',
    model: 'claude-3-opus',
    max_tokens: 4096,
    temperature: 0.2,
    use_case: 'Long-form reasoning and decision support',
    settings: {
      model: 'claude-3-opus',
      max_tokens: 4096,
      temperature: 0.2,
    },
    tags: ['model', 'quality'],
    install_count: 980,
    verified: true,
    status: 'published',
    created_at: FALLBACK_DATE,
    updated_at: FALLBACK_DATE,
  },
  {
    id: 'setting-context-window-boost',
    slug: 'context-window-boost',
    name: 'Context Window Boost',
    description: 'Balanced configuration for long transcripts and large specs.',
    category: 'context',
    model: 'claude-3-sonnet',
    max_tokens: 8192,
    temperature: 0.3,
    use_case: 'Summaries and document analysis',
    settings: {
      model: 'claude-3-sonnet',
      max_tokens: 8192,
      temperature: 0.3,
    },
    tags: ['context', 'summaries'],
    install_count: 640,
    verified: false,
    status: 'published',
    created_at: FALLBACK_DATE,
    updated_at: FALLBACK_DATE,
  },
]

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
  settings: Record<string, any>
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
  if (!HAS_SUPABASE) {
    return FALLBACK_SETTINGS
  }
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      console.error('[getAllSettings] Supabase client failed')
      return FALLBACK_SETTINGS
    }

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('status', 'published')
      .order('install_count', { ascending: false })

    if (error) {
      console.error('[getAllSettings] Error:', error)
      return FALLBACK_SETTINGS
    }

    return data || []
  } catch (error) {
    console.error('[getAllSettings] Unexpected error:', error)
    return FALLBACK_SETTINGS
  }
}

/**
 * Get setting by slug
 */
export async function getSetting(slug: string): Promise<Setting | null> {
  if (!HAS_SUPABASE) {
    return FALLBACK_SETTINGS.find((setting) => setting.slug === slug) || null
  }
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return FALLBACK_SETTINGS.find((setting) => setting.slug === slug) || null
    }

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      console.error('[getSetting] Error:', error)
      return FALLBACK_SETTINGS.find((setting) => setting.slug === slug) || null
    }

    return data
  } catch (error) {
    console.error('[getSetting] Unexpected error:', error)
    return FALLBACK_SETTINGS.find((setting) => setting.slug === slug) || null
  }
}

/**
 * Get settings by category
 */
export async function getSettingsByCategory(category: string): Promise<Setting[]> {
  if (!HAS_SUPABASE) {
    return FALLBACK_SETTINGS.filter((setting) => setting.category === category)
  }
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return FALLBACK_SETTINGS.filter((setting) => setting.category === category)
    }

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('install_count', { ascending: false })

    if (error) {
      console.error('[getSettingsByCategory] Error:', error)
      return FALLBACK_SETTINGS.filter((setting) => setting.category === category)
    }

    return data || []
  } catch (error) {
    console.error('[getSettingsByCategory] Unexpected error:', error)
    return FALLBACK_SETTINGS.filter((setting) => setting.category === category)
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

