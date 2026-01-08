import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'

/**
 * GET /api/v1/agents/:slug
 * Fetch agent details with full content for CLI installation
 * 
 * Note: Agents can be stored either in:
 * 1. skills table with tags containing 'agent'
 * 2. separate agents table (if created in future)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json(
        { error: 'Agent slug is required' },
        { status: 400 }
      )
    }

    const supabase = await createServerClient()

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    // First try to find in skills table with 'agent' tag
    const { data: skill, error } = await supabase
      .from('skills')
      .select('*, category:skill_categories(*)')
      .eq('slug', slug)
      .eq('status', 'published')
      .contains('tags', ['agent'])
      .single()

    if (error || !skill) {
      // If not found, try checking if it exists without the agent tag
      // (for backwards compatibility)
      const { data: fallback } = await supabase
        .from('skills')
        .select('*, category:skill_categories(*)')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      if (!fallback) {
        return NextResponse.json(
          { error: 'Agent not found' },
          { status: 404 }
        )
      }

      // Use fallback data
      const agent = fallback
      let content = agent.content

      if (!content) {
        // Fetch content from GitHub repository
        const repoBase = process.env.GITHUB_AGENTS_REPO || process.env.GITHUB_SKILLS_REPO || 'https://raw.githubusercontent.com/eddiebe147/claude-settings/main'
        const contentUrl = `${repoBase}/agents/${slug}.md`

        try {
          const response = await fetch(contentUrl)
          if (response.ok) {
            content = await response.text()
          }
        } catch (fetchError) {
          console.error(`Failed to fetch agent content from repository: ${fetchError}`)
        }
      }

      return NextResponse.json({
        id: agent.id,
        slug: agent.slug,
        name: agent.name,
        description: agent.description,
        category: agent.category_id || 'agents',
        tags: agent.tags || ['agent'],
        triggers: agent.triggers || [],
        version: agent.version || '1.0.0',
        verified: agent.verified,
        featured: agent.featured,
        author: agent.author || 'ID8Labs',
        license: agent.license || 'MIT',
        repository: agent.repository || 'https://github.com/eddiebe147/claude-settings',
        repository_path: agent.repository_path || `agents/${slug}.md`,
        downloads: agent.install_count || 0,
        rating: agent.avg_rating || 0,
        quality_score: agent.quality_score || 75,
        content: content || '',
        type: 'agent'
      })
    }

    // Found agent in skills table
    let content = skill.content

    if (!content) {
      // Fetch content from GitHub repository
      const repoBase = process.env.GITHUB_AGENTS_REPO || 'https://raw.githubusercontent.com/eddiebe147/claude-settings/main'
      const contentUrl = `${repoBase}/agents/${slug}.md`

      try {
        const response = await fetch(contentUrl)
        if (response.ok) {
          content = await response.text()
        }
      } catch (fetchError) {
        console.error(`Failed to fetch agent content from repository: ${fetchError}`)
      }
    }

    // Return agent data formatted for CLI
    return NextResponse.json({
      id: skill.id,
      slug: skill.slug,
      name: skill.name,
      description: skill.description,
      category: skill.category_id || 'agents',
      tags: skill.tags || ['agent'],
      triggers: skill.triggers || [],
      version: skill.version || '1.0.0',
      verified: skill.verified,
      featured: skill.featured,
      author: skill.author || 'ID8Labs',
      license: skill.license || 'MIT',
      repository: skill.repository || 'https://github.com/eddiebe147/claude-settings',
      repository_path: skill.repository_path || `agents/${slug}.md`,
      downloads: skill.install_count || 0,
      rating: skill.avg_rating || 0,
      quality_score: skill.quality_score || 75,
      content: content || '',
      type: 'agent'
    })
  } catch (error) {
    console.error('[API v1/agents/:slug] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
