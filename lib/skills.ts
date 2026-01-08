/**
 * Skills Marketplace Data Layer
 * Query functions for fetching, searching, and tracking skills
 * 
 * SERVER-SIDE ONLY: Use lib/skill-client.ts for client-side operations
 */

import { createClient as createServerClient } from '@/lib/supabase/server'

// =============================================================================
// TYPES - Re-export from skill-types.ts for consistency
// =============================================================================

export type {
  SkillCategory,
  Skill,
  SkillReview,
  SkillCollection,
  SkillStack,
  InstallMethod,
} from './skill-types'

import type { Skill, SkillCategory, SkillReview, SkillCollection } from './skill-types'

// Additional types specific to this module
export interface UserSkillStack {
  id: string
  user_id: string
  name: string
  description: string | null
  share_id: string | null
  is_public: boolean
  created_at: string
  updated_at: string
  // Joined data
  skills?: Skill[]
}

export interface SkillFilters {
  category?: string
  complexity?: 'simple' | 'complex' | 'multi-agent'
  verified?: boolean
  featured?: boolean
  qualityTier?: 'bronze' | 'silver' | 'gold' | 'platinum'
  minRating?: number
  sortBy?: 'newest' | 'popular' | 'rating' | 'installs'
  itemType?: 'skills' | 'agents' | 'all' // Filter by skills vs agents
  limit?: number
  offset?: number
}

export interface TrendingSkill {
  skill_id: string
  skill_slug: string
  skill_name: string
  view_count: number
}

// =============================================================================
// SERVER-SIDE FUNCTIONS (for RSC and API routes)
// =============================================================================

/**
 * Get all published skills with optional filtering
 */
export async function getAllSkills(filters: SkillFilters = {}): Promise<Skill[]> {
  try {
    const supabase = await createServerClient()

    if (!supabase) {
      console.error('[getAllSkills] Supabase client failed to initialize')
      return []
    }

    let query = supabase
      .from('skills')
      .select('*, category:skill_categories(*)')
      .eq('status', 'published')

  // Apply filters
  if (filters.category) {
    query = query.eq('category_id', filters.category)
  }
  if (filters.complexity) {
    query = query.eq('complexity', filters.complexity)
  }
  if (filters.verified !== undefined) {
    query = query.eq('verified', filters.verified)
  }
  if (filters.featured !== undefined) {
    query = query.eq('featured', filters.featured)
  }
  if (filters.qualityTier) {
    query = query.eq('quality_tier', filters.qualityTier)
  }
  if (filters.minRating) {
    query = query.gte('avg_rating', filters.minRating)
  }
  // Filter by item type (skills vs agents)
  if (filters.itemType === 'agents') {
    query = query.contains('tags', ['agent'])
  } else if (filters.itemType === 'skills') {
    query = query.not('tags', 'cs', '{agent}') // not contains 'agent'
  }

  // Apply sorting
  switch (filters.sortBy) {
    case 'newest':
      query = query.order('published_at', { ascending: false, nullsFirst: false })
      break
    case 'popular':
      query = query.order('view_count', { ascending: false })
      break
    case 'rating':
      query = query.order('avg_rating', { ascending: false })
      break
    case 'installs':
      query = query.order('install_count', { ascending: false })
      break
    default:
      query = query.order('featured', { ascending: false })
        .order('install_count', { ascending: false })
  }

  // Apply pagination with default limit to prevent timeout
  const limit = filters.limit || 100 // Default limit to prevent loading all skills
  query = query.limit(limit)
  
  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + limit - 1)
  }

    const { data, error } = await query

    if (error) {
      console.error('[getAllSkills] Error fetching skills:', {
        message: error.message,
        code: error.code,
        filters
      })
      return []
    }

    return data as Skill[]
  } catch (err) {
    console.error('[getAllSkills] Unexpected exception:', {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
      filters
    })
    return []
  }
}

/**
 * Get a single skill by slug
 */
export async function getSkillBySlug(slug: string): Promise<Skill | null> {
  try {
    if (!slug || typeof slug !== 'string') {
      console.error('[getSkillBySlug] Invalid slug provided:', slug)
      return null
    }

    const supabase = await createServerClient()

    if (!supabase) {
      console.error('[getSkillBySlug] Supabase client failed to initialize')
      return null
    }

    const { data, error } = await supabase
      .from('skills')
      .select('*, category:skill_categories(*)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) {
      // PGRST116 = no rows returned (not found) - expected for invalid slugs
      if (error.code === 'PGRST116') {
        console.warn('[getSkillBySlug] Skill not found:', slug)
      } else {
        console.error('[getSkillBySlug] Supabase error:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          slug
        })
      }
      return null
    }

    if (!data) {
      console.warn('[getSkillBySlug] No data returned for slug:', slug)
      return null
    }

    return data as Skill
  } catch (err) {
    console.error('[getSkillBySlug] Unexpected exception:', {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
      slug
    })
    return null
  }
}

/**
 * Get all skill categories
 */
export async function getAllCategories(): Promise<SkillCategory[]> {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from('skill_categories')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    return data as SkillCategory[]
  } catch (error) {
    console.error('Failed to get categories:', error)
    return []
  }
}

/**
 * Get skills by category
 */
export async function getSkillsByCategory(categoryId: string): Promise<Skill[]> {
  return getAllSkills({ category: categoryId })
}

/**
 * Search skills using full-text search
 */
export async function searchSkills(query: string, limit: number = 20): Promise<Skill[]> {
  try {
    const supabase = await createServerClient()

    // Use the search_skills database function
    const { data, error } = await supabase
      .rpc('search_skills', { query_text: query, limit_count: limit })

    if (error) {
      console.error('Error searching skills:', error)
      return []
    }

    return data as Skill[]
  } catch (error) {
    console.error('Failed to search skills:', error)
    return []
  }
}

/**
 * Get trending skills (most views in last N days)
 */
export async function getTrendingSkills(daysBack: number = 7, limit: number = 10): Promise<TrendingSkill[]> {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase
      .rpc('get_trending_skills', { days_back: daysBack, limit_count: limit })

    if (error) {
      console.error('Error fetching trending skills:', error)
      return []
    }

    return data as TrendingSkill[]
  } catch (error) {
    console.error('Failed to get trending skills:', error)
    return []
  }
}

/**
 * Get featured skills
 */
export async function getFeaturedSkills(limit: number = 6): Promise<Skill[]> {
  return getAllSkills({ featured: true, limit })
}

/**
 * Get newly published skills
 */
export async function getNewSkills(limit: number = 10): Promise<Skill[]> {
  return getAllSkills({ sortBy: 'newest', limit })
}

/**
 * Get skill collections (starter kits)
 */
export async function getAllCollections(officialOnly: boolean = false): Promise<SkillCollection[]> {
  try {
    const supabase = await createServerClient()

    // Verify Supabase client is properly initialized
    if (!supabase) {
      console.error('[getAllCollections] Supabase client failed to initialize')
      return []
    }

    // Select only necessary fields to avoid query timeout
    let query = supabase
      .from('skill_collections')
      .select(`
        id,
        slug,
        name,
        description,
        emoji,
        author,
        is_official,
        is_public,
        created_at,
        updated_at,
        skill_collection_items(
          skills(id, name, slug, description, category_id, complexity, verified, featured, avg_rating, install_count)
        )
      `)
      .eq('is_public', true)

    if (officialOnly) {
      query = query.eq('is_official', true)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('[getAllCollections] Supabase error:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        officialOnly
      })
      return []
    }

    if (!data) {
      console.warn('[getAllCollections] No data returned from query')
      return []
    }

    // Transform the nested data
    return data.map(collection => ({
      ...collection,
      skills: collection.skill_collection_items?.map((item: any) => item.skills).filter(Boolean) || [],
      skill_count: collection.skill_collection_items?.length || 0
    })) as SkillCollection[]
  } catch (err) {
    console.error('[getAllCollections] Unexpected exception:', {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
      officialOnly
    })
    return []
  }
}

/**
 * Get a single collection by slug
 */
export async function getCollectionBySlug(slug: string): Promise<SkillCollection | null> {
  try {
    if (!slug || typeof slug !== 'string') {
      console.error('[getCollectionBySlug] Invalid slug provided:', slug)
      return null
    }

    const supabase = await createServerClient()

    if (!supabase) {
      console.error('[getCollectionBySlug] Supabase client failed to initialize')
      return null
    }

    // Select only necessary fields to avoid query timeout
    const { data, error } = await supabase
      .from('skill_collections')
      .select(`
        id,
        slug,
        name,
        description,
        emoji,
        author,
        is_official,
        is_public,
        created_at,
        updated_at,
        skill_collection_items(
          display_order,
          note,
          skills(id, name, slug, description, category_id, complexity, verified, featured, avg_rating, install_count, tags, triggers, version)
        )
      `)
      .eq('slug', slug)
      .eq('is_public', true)
      .single()

    if (error) {
      // PGRST116 = no rows returned (not found) - this is expected for invalid slugs
      if (error.code === 'PGRST116') {
        console.warn('[getCollectionBySlug] Collection not found:', slug)
      } else {
        console.error('[getCollectionBySlug] Supabase error:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          slug
        })
      }
      return null
    }

    if (!data) {
      console.warn('[getCollectionBySlug] No data returned for slug:', slug)
      return null
    }

    return {
      ...data,
      skills: data.skill_collection_items
        ?.sort((a: { display_order: number | null }, b: { display_order: number | null }) => {
          const orderA = a.display_order ?? 999999
          const orderB = b.display_order ?? 999999
          return orderA - orderB
        })
        .map((item: any) => item.skills)
        .filter(Boolean) || [],
      skill_count: data.skill_collection_items?.length || 0
    } as SkillCollection
  } catch (err) {
    console.error('[getCollectionBySlug] Unexpected exception:', {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
      slug
    })
    return null
  }
}

/**
 * Get reviews for a skill
 */
export async function getSkillReviews(skillId: string): Promise<SkillReview[]> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('skill_reviews')
    .select('*')
    .eq('skill_id', skillId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reviews:', error)
    return []
  }

  return data as SkillReview[]
}

/**
 * Get total skill count by status
 */
export async function getSkillCounts(): Promise<{ total: number; published: number; byCategory: Record<string, number> }> {
  try {
    const supabase = await createServerClient()

    const [totalResult, publishedResult, categoryResult] = await Promise.all([
      supabase.from('skills').select('id', { count: 'exact', head: true }),
      supabase.from('skills').select('id', { count: 'exact', head: true }).eq('status', 'published'),
      supabase
        .from('skills')
        .select('category_id')
        .eq('status', 'published')
    ])

    const byCategory: Record<string, number> = {}
    if (categoryResult.data) {
      categoryResult.data.forEach((skill: { category_id: string | null }) => {
        const cat = skill.category_id || 'uncategorized'
        byCategory[cat] = (byCategory[cat] || 0) + 1
      })
    }

    return {
      total: totalResult.count || 0,
      published: publishedResult.count || 0,
      byCategory
    }
  } catch (error) {
    console.error('Failed to get skill counts:', error)
    return {
      total: 0,
      published: 0,
      byCategory: {}
    }
  }
}
