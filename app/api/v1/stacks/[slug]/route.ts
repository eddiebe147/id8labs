import { NextRequest, NextResponse } from 'next/server'
import { getCollectionBySlug } from '@/lib/skills'

/**
 * GET /api/v1/stacks/:slug
 * Fetch pre-built stack details for CLI installation
 * 
 * Stacks are collections of skills, agents, commands, and settings
 * that work together for specific use cases
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json(
        { error: 'Stack slug is required' },
        { status: 400 }
      )
    }

    // Fetch collection (which represents a stack)
    const collection = await getCollectionBySlug(slug)

    if (!collection) {
      return NextResponse.json(
        { error: 'Stack not found' },
        { status: 404 }
      )
    }

    // Format items by type
    const items: {
      skills: string[]
      agents: string[]
      commands: string[]
      settings: string[]
    } = {
      skills: [],
      agents: [],
      commands: [],
      settings: []
    }

    // Categorize skills into skills vs agents
    if (collection.skills && Array.isArray(collection.skills)) {
      collection.skills.forEach(skill => {
        if (skill.tags && skill.tags.includes('agent')) {
          items.agents.push(skill.slug)
        } else {
          items.skills.push(skill.slug)
        }
      })
    }

    // Commands and settings will be added in Phase 1.2 and 1.3

    // Return stack data formatted for CLI
    return NextResponse.json({
      id: collection.id,
      slug: collection.slug,
      name: collection.name,
      description: collection.description,
      category: 'stack',
      emoji: collection.emoji,
      author: collection.author || 'ID8Labs',
      is_official: collection.is_official || false,
      items,
      total_items: items.skills.length + items.agents.length + items.commands.length + items.settings.length,
      created_at: collection.created_at,
      updated_at: collection.updated_at
    })
  } catch (error) {
    console.error('[API v1/stacks/:slug] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
