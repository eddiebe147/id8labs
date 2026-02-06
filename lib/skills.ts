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

const HAS_SUPABASE =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const FALLBACK_DATE = '2026-02-05T00:00:00.000Z'

const FALLBACK_CATEGORIES: SkillCategory[] = [
  {
    id: 'code',
    name: 'Code',
    description: 'Engineering and development workflows',
    emoji: '💻',
    display_order: 1,
    created_at: FALLBACK_DATE,
  },
  {
    id: 'research',
    name: 'Research',
    description: 'Research, synthesis, and briefs',
    emoji: '🔍',
    display_order: 2,
    created_at: FALLBACK_DATE,
  },
]

const FALLBACK_SKILLS: Skill[] = [
  {
    id: 'skill-supabase-expert',
    slug: 'supabase-expert',
    name: 'Supabase Expert',
    description: 'Design schemas, queries, and policies for Supabase-backed apps.',
    category_id: 'code',
    complexity: 'complex',
    version: '1.0.0',
    author: 'id8Labs',
    license: 'MIT',
    triggers: ['supabase', 'postgres', 'schema design'],
    commands: ['db-review', 'schema-check'],
    tags: ['database', 'supabase'],
    content: null,
    readme: null,
    repo_url: null,
    repo_path: null,
    quality_score: 92,
    quality_tier: 'gold',
    validated: true,
    install_count: 1240,
    view_count: 3280,
    review_count: 18,
    avg_rating: 4.8,
    status: 'published',
    featured: true,
    verified: true,
    created_at: FALLBACK_DATE,
    updated_at: FALLBACK_DATE,
    published_at: FALLBACK_DATE,
    category: FALLBACK_CATEGORIES[0],
  },
  {
    id: 'skill-research-brief',
    slug: 'research-brief',
    name: 'Research Brief',
    description: 'Summarize sources into a crisp executive brief.',
    category_id: 'research',
    complexity: 'simple',
    version: '1.0.0',
    author: 'id8Labs',
    license: 'MIT',
    triggers: ['research brief', 'exec summary'],
    commands: ['brief'],
    tags: ['research', 'agent'],
    content: null,
    readme: null,
    repo_url: null,
    repo_path: null,
    quality_score: 78,
    quality_tier: 'silver',
    validated: true,
    install_count: 680,
    view_count: 1520,
    review_count: 6,
    avg_rating: 4.4,
    status: 'published',
    featured: false,
    verified: false,
    created_at: FALLBACK_DATE,
    updated_at: FALLBACK_DATE,
    published_at: FALLBACK_DATE,
    category: FALLBACK_CATEGORIES[1],
  },
]

const FALLBACK_COLLECTIONS: SkillCollection[] = [
  {
    id: 'kit-shipping',
    slug: 'shipping-starter-kit',
    name: 'Shipping Starter Kit',
    description: 'A curated bundle to ship features faster.',
    emoji: '📦',
    author: 'id8Labs',
    is_official: true,
    is_public: true,
    skill_count: 2,
    created_at: FALLBACK_DATE,
    updated_at: FALLBACK_DATE,
    content_type: 'skill_bundle',
    skills: FALLBACK_SKILLS,
  },
]

const getFallbackSkills = (): Skill[] => {
  return FALLBACK_SKILLS.map((skill) => ({
    ...skill,
    category: skill.category || FALLBACK_CATEGORIES.find((cat) => cat.id === skill.category_id),
  }))
}

const applySkillFilters = (skills: Skill[], filters: SkillFilters): Skill[] => {
  let filtered = [...skills]

  if (filters.category) {
    filtered = filtered.filter((skill) => skill.category_id === filters.category)
  }
  if (filters.complexity) {
    filtered = filtered.filter((skill) => skill.complexity === filters.complexity)
  }
  if (filters.verified !== undefined) {
    filtered = filtered.filter((skill) => skill.verified === filters.verified)
  }
  if (filters.featured !== undefined) {
    filtered = filtered.filter((skill) => skill.featured === filters.featured)
  }
  if (filters.qualityTier) {
    filtered = filtered.filter((skill) => skill.quality_tier === filters.qualityTier)
  }
  if (filters.minRating) {
    filtered = filtered.filter((skill) => skill.avg_rating >= filters.minRating)
  }
  if (filters.itemType === 'agents') {
    filtered = filtered.filter((skill) => skill.tags?.includes('agent'))
  } else if (filters.itemType === 'skills') {
    filtered = filtered.filter((skill) => !skill.tags?.includes('agent'))
  }

  switch (filters.sortBy) {
    case 'newest':
      filtered.sort((a, b) => (b.published_at || '').localeCompare(a.published_at || ''))
      break
    case 'popular':
      filtered.sort((a, b) => b.view_count - a.view_count)
      break
    case 'rating':
      filtered.sort((a, b) => b.avg_rating - a.avg_rating)
      break
    case 'installs':
      filtered.sort((a, b) => b.install_count - a.install_count)
      break
    default:
      filtered.sort((a, b) => Number(b.featured) - Number(a.featured))
      break
  }

  const limit = filters.limit || 100
  const offset = filters.offset || 0
  return filtered.slice(offset, offset + limit)
}

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
  if (!HAS_SUPABASE) {
    return applySkillFilters(getFallbackSkills(), filters)
  }
  try {
    const supabase = await createServerClient()

    if (!supabase) {
      console.error('[getAllSkills] Supabase client failed to initialize')
      return applySkillFilters(getFallbackSkills(), filters)
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
      return applySkillFilters(getFallbackSkills(), filters)
    }

    return data as Skill[]
  } catch (err) {
    console.error('[getAllSkills] Unexpected exception:', {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
      filters
    })
    return applySkillFilters(getFallbackSkills(), filters)
  }
}

/**
 * Get a single skill by slug
 */
export async function getSkillBySlug(slug: string): Promise<Skill | null> {
  if (!HAS_SUPABASE) {
    return getFallbackSkills().find((skill) => skill.slug === slug) || null
  }
  try {
    if (!slug || typeof slug !== 'string') {
      console.error('[getSkillBySlug] Invalid slug provided:', slug)
      return getFallbackSkills().find((skill) => skill.slug === slug) || null
    }

    const supabase = await createServerClient()

    if (!supabase) {
      console.error('[getSkillBySlug] Supabase client failed to initialize')
      return getFallbackSkills().find((skill) => skill.slug === slug) || null
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
      return getFallbackSkills().find((skill) => skill.slug === slug) || null
    }

    return data as Skill
  } catch (err) {
    console.error('[getSkillBySlug] Unexpected exception:', {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
      slug
    })
    return getFallbackSkills().find((skill) => skill.slug === slug) || null
  }
}

/**
 * Get all skill categories
 */
export async function getAllCategories(): Promise<SkillCategory[]> {
  if (!HAS_SUPABASE) {
    return FALLBACK_CATEGORIES
  }
  try {
    const supabase = await createServerClient()
    if (!supabase) return FALLBACK_CATEGORIES

    const { data, error } = await supabase
      .from('skill_categories')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
      return FALLBACK_CATEGORIES
    }

    return data as SkillCategory[]
  } catch (error) {
    console.error('Failed to get categories:', error)
    return FALLBACK_CATEGORIES
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
  if (!HAS_SUPABASE) {
    const needle = query.toLowerCase()
    return getFallbackSkills()
      .filter((skill) => {
        const haystack = [
          skill.name,
          skill.description,
          ...(skill.tags || []),
        ]
          .join(' ')
          .toLowerCase()
        return haystack.includes(needle)
      })
      .slice(0, limit)
  }
  try {
    const supabase = await createServerClient()
    if (!supabase) return getFallbackSkills().slice(0, limit)

    // Use the search_skills database function
    const { data, error } = await supabase
      .rpc('search_skills', { query_text: query, limit_count: limit })

    if (error) {
      console.error('Error searching skills:', error)
      return getFallbackSkills().slice(0, limit)
    }

    return data as Skill[]
  } catch (error) {
    console.error('Failed to search skills:', error)
    return getFallbackSkills().slice(0, limit)
  }
}

/**
 * Get trending skills (most views in last N days)
 */
export async function getTrendingSkills(daysBack: number = 7, limit: number = 10): Promise<TrendingSkill[]> {
  if (!HAS_SUPABASE) {
    return getFallbackSkills()
      .sort((a, b) => b.view_count - a.view_count)
      .slice(0, limit)
      .map((skill) => ({
        skill_id: skill.id,
        skill_slug: skill.slug,
        skill_name: skill.name,
        view_count: skill.view_count,
      }))
  }
  try {
    const supabase = await createServerClient()
    if (!supabase) return []

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
  if (!HAS_SUPABASE) {
    return officialOnly
      ? FALLBACK_COLLECTIONS.filter((collection) => collection.is_official)
      : FALLBACK_COLLECTIONS
  }
  try {
    const supabase = await createServerClient()

    // Verify Supabase client is properly initialized
    if (!supabase) {
      console.error('[getAllCollections] Supabase client failed to initialize')
      return officialOnly
        ? FALLBACK_COLLECTIONS.filter((collection) => collection.is_official)
        : FALLBACK_COLLECTIONS
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
        content_type,
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
      return officialOnly
        ? FALLBACK_COLLECTIONS.filter((collection) => collection.is_official)
        : FALLBACK_COLLECTIONS
    }

    if (!data) {
      console.warn('[getAllCollections] No data returned from query')
      return officialOnly
        ? FALLBACK_COLLECTIONS.filter((collection) => collection.is_official)
        : FALLBACK_COLLECTIONS
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
    return officialOnly
      ? FALLBACK_COLLECTIONS.filter((collection) => collection.is_official)
      : FALLBACK_COLLECTIONS
  }
}

/**
 * Get a single collection by slug
 */
export async function getCollectionBySlug(slug: string): Promise<SkillCollection | null> {
  if (!HAS_SUPABASE) {
    return FALLBACK_COLLECTIONS.find((collection) => collection.slug === slug) || null
  }
  try {
    if (!slug || typeof slug !== 'string') {
      console.error('[getCollectionBySlug] Invalid slug provided:', slug)
      return null
    }

    const supabase = await createServerClient()

    if (!supabase) {
      console.error('[getCollectionBySlug] Supabase client failed to initialize')
      return FALLBACK_COLLECTIONS.find((collection) => collection.slug === slug) || null
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
        content_type,
        install_prompt,
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
      return FALLBACK_COLLECTIONS.find((collection) => collection.slug === slug) || null
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
    return FALLBACK_COLLECTIONS.find((collection) => collection.slug === slug) || null
  }
}

/**
 * Get reviews for a skill
 */
export async function getSkillReviews(skillId: string): Promise<SkillReview[]> {
  const supabase = await createServerClient()
  if (!supabase) return []

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
  if (!HAS_SUPABASE) {
    const skills = getFallbackSkills()
    const byCategory: Record<string, number> = {}
    skills.forEach((skill) => {
      const cat = skill.category_id || 'uncategorized'
      byCategory[cat] = (byCategory[cat] || 0) + 1
    })
    return { total: skills.length, published: skills.length, byCategory }
  }
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      const skills = getFallbackSkills()
      const byCategory: Record<string, number> = {}
      skills.forEach((skill) => {
        const cat = skill.category_id || 'uncategorized'
        byCategory[cat] = (byCategory[cat] || 0) + 1
      })
      return { total: skills.length, published: skills.length, byCategory }
    }

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
    const skills = getFallbackSkills()
    const byCategory: Record<string, number> = {}
    skills.forEach((skill) => {
      const cat = skill.category_id || 'uncategorized'
      byCategory[cat] = (byCategory[cat] || 0) + 1
    })
    return { total: skills.length, published: skills.length, byCategory }
  }
}
