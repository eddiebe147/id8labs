import { NextRequest, NextResponse } from 'next/server'
import { searchSkills, getAllSkills, getTrendingSkills } from '@/lib/skills'

/**
 * GET /api/v1/search
 * Search the StackShack marketplace
 * 
 * Query parameters:
 * - q: search query string
 * - category: filter by category
 * - type: filter by type (skill, agent, command, setting)
 * - limit: number of results to return (default: 20)
 * - offset: pagination offset (default: 0)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const category = searchParams.get('category')
    const type = searchParams.get('type')
    const limitParam = searchParams.get('limit')
    const offsetParam = searchParams.get('offset')

    const limit = limitParam ? parseInt(limitParam, 10) : 20
    const offset = offsetParam ? parseInt(offsetParam, 10) : 0

    let results: any[] = []

    if (!query) {
      // No query provided - return trending items
      const trending = await getTrendingSkills(7, limit)
      
      // Get full skill details for trending items
      const trendingSkills = await Promise.all(
        trending.map(async (item) => {
          const skills = await getAllSkills({ 
            limit: 1,
            offset: 0
          })
          return skills.find(s => s.id === item.skill_id)
        })
      )

      results = trendingSkills.filter(Boolean)
    } else {
      // Search with query
      results = await searchSkills(query, limit)
    }

    // Apply filters
    if (category && results.length > 0) {
      results = results.filter(skill => skill.category_id === category)
    }

    if (type && results.length > 0) {
      switch (type) {
        case 'agent':
          results = results.filter(skill => 
            skill.tags && Array.isArray(skill.tags) && skill.tags.includes('agent')
          )
          break
        case 'skill':
          results = results.filter(skill => 
            !skill.tags || !Array.isArray(skill.tags) || !skill.tags.includes('agent')
          )
          break
        case 'command':
        case 'setting':
          // These will be added in Phase 1.2 and 1.3
          results = []
          break
      }
    }

    // Apply pagination
    const paginatedResults = results.slice(offset, offset + limit)

    // Format results for CLI
    const formattedResults = paginatedResults.map(skill => ({
      id: skill.id,
      slug: skill.slug,
      name: skill.name,
      description: skill.description,
      category: skill.category_id,
      tags: skill.tags || [],
      triggers: skill.triggers || [],
      version: skill.version || '1.0.0',
      verified: skill.verified || false,
      featured: skill.featured || false,
      author: skill.author || 'ID8Labs',
      downloads: skill.install_count || 0,
      rating: skill.avg_rating || 0,
      type: skill.tags && skill.tags.includes('agent') ? 'agent' : 'skill'
    }))

    return NextResponse.json({
      results: formattedResults,
      total: results.length,
      limit,
      offset,
      query: query || null
    })
  } catch (error) {
    console.error('[API v1/search] Error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}
