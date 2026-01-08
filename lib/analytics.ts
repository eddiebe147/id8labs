/**
 * Analytics and Metrics Functions
 * Functions for tracking and retrieving analytics data
 */

import { createClient as createServerClient } from '@/lib/supabase/server'
import type { Skill } from './skill-types'

export interface AnalyticsSummary {
  totalSkills: number
  totalInstalls: number
  totalViews: number
  avgRating: number
}

/**
 * Get overall analytics summary
 */
export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return {
        totalSkills: 0,
        totalInstalls: 0,
        totalViews: 0,
        avgRating: 0,
      }
    }

    // Get aggregated stats
    const { data, error } = await supabase
      .from('skills')
      .select('install_count, view_count, avg_rating')
      .eq('status', 'published')

    if (error || !data) {
      console.error('[getAnalyticsSummary] Error:', error)
      return {
        totalSkills: 0,
        totalInstalls: 0,
        totalViews: 0,
        avgRating: 0,
      }
    }

    const totalSkills = data.length
    const totalInstalls = data.reduce((sum, skill) => sum + (skill.install_count || 0), 0)
    const totalViews = data.reduce((sum, skill) => sum + (skill.view_count || 0), 0)
    const ratingsSum = data.reduce((sum, skill) => sum + (skill.avg_rating || 0), 0)
    const avgRating = totalSkills > 0 ? ratingsSum / totalSkills : 0

    return {
      totalSkills,
      totalInstalls,
      totalViews,
      avgRating,
    }
  } catch (error) {
    console.error('[getAnalyticsSummary] Unexpected error:', error)
    return {
      totalSkills: 0,
      totalInstalls: 0,
      totalViews: 0,
      avgRating: 0,
    }
  }
}

/**
 * Get most popular skills by install count
 */
export async function getPopularSkills(limit: number = 10): Promise<Skill[]> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('skills')
      .select('*, category:skill_categories(*)')
      .eq('status', 'published')
      .order('install_count', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('[getPopularSkills] Error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[getPopularSkills] Unexpected error:', error)
    return []
  }
}

/**
 * Get trending skills (high install rate relative to views)
 */
export async function getTrendingSkills(limit: number = 10): Promise<Skill[]> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return []
    }

    // Get skills with good install-to-view ratio
    const { data, error } = await supabase
      .from('skills')
      .select('*, category:skill_categories(*)')
      .eq('status', 'published')
      .gt('view_count', 10) // Minimum views to be considered
      .gt('install_count', 5) // Minimum installs
      .order('install_count', { ascending: false })
      .limit(limit * 2) // Get more to calculate ratio

    if (error || !data) {
      console.error('[getTrendingSkills] Error:', error)
      return []
    }

    // Calculate install rate and sort by it
    const skillsWithRate = data.map((skill) => ({
      ...skill,
      installRate: (skill.install_count / skill.view_count) * 100,
    }))

    // Sort by install rate and return top N
    const trending = skillsWithRate
      .sort((a, b) => b.installRate - a.installRate)
      .slice(0, limit)

    return trending
  } catch (error) {
    console.error('[getTrendingSkills] Unexpected error:', error)
    return []
  }
}

/**
 * Get recently added skills
 */
export async function getRecentSkills(limit: number = 10): Promise<Skill[]> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('skills')
      .select('*, category:skill_categories(*)')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('[getRecentSkills] Error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[getRecentSkills] Unexpected error:', error)
    return []
  }
}

/**
 * Get top rated skills
 */
export async function getTopRatedSkills(limit: number = 10): Promise<Skill[]> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('skills')
      .select('*, category:skill_categories(*)')
      .eq('status', 'published')
      .gt('review_count', 0) // Only skills with reviews
      .order('avg_rating', { ascending: false })
      .order('review_count', { ascending: false }) // Tie-breaker
      .limit(limit)

    if (error) {
      console.error('[getTopRatedSkills] Error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[getTopRatedSkills] Unexpected error:', error)
    return []
  }
}

/**
 * Track skill view
 */
export async function trackSkillView(skillId: string): Promise<void> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return
    }

    // Increment view count
    await supabase.rpc('increment_view_count', { skill_id: skillId })
  } catch (error) {
    console.error('[trackSkillView] Error:', error)
  }
}

/**
 * Track skill install
 */
export async function trackSkillInstall(skillId: string): Promise<void> {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return
    }

    // Increment install count
    await supabase.rpc('increment_install_count', { skill_id: skillId })
  } catch (error) {
    console.error('[trackSkillInstall] Error:', error)
  }
}
