import { NextRequest, NextResponse } from 'next/server'
import { getSkillBySlug } from '@/lib/skills'
import { createClient as createServerClient } from '@/lib/supabase/server'

/**
 * GET /api/v1/skills/:slug
 * Fetch skill details with full content for CLI installation
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json(
        { error: 'Skill slug is required' },
        { status: 400 }
      )
    }

    // Fetch skill from database
    const skill = await getSkillBySlug(slug)

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      )
    }

    // If skill doesn't have content loaded, fetch it from repository
    let content = skill.content

    if (!content) {
      // Fetch content from GitHub repository
      const repoBase = process.env.GITHUB_SKILLS_REPO || 'https://raw.githubusercontent.com/id8labs/claude-code-skills/main'
      const contentUrl = `${repoBase}/skills/${slug}/SKILL.md`

      try {
        const response = await fetch(contentUrl)
        if (response.ok) {
          content = await response.text()
        }
      } catch (error) {
        console.error(`Failed to fetch content from repository: ${error}`)
      }
    }

    // Return skill data formatted for CLI
    return NextResponse.json({
      id: skill.id,
      slug: skill.slug,
      name: skill.name,
      description: skill.description,
      category: skill.category_id,
      tags: skill.tags || [],
      triggers: skill.triggers || [],
      version: skill.version || '1.0.0',
      verified: skill.verified,
      featured: skill.featured,
      author: skill.author || 'ID8Labs',
      license: skill.license || 'MIT',
      repository: skill.repository || 'https://github.com/id8labs/claude-code-skills',
      repository_path: skill.repository_path,
      downloads: skill.install_count || 0,
      rating: skill.avg_rating || 0,
      quality_score: skill.quality_score || 75,
      content: content || '',
      type: 'skill'
    })
  } catch (error) {
    console.error('[API v1/skills/:slug] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
