import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'

/**
 * GET /api/v1/commands/:slug
 * Fetch command details for CLI installation
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json(
        { error: 'Command slug is required' },
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

    // Fetch command from database
    const { data: command, error } = await supabase
      .from('commands')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !command) {
      return NextResponse.json(
        { error: 'Command not found' },
        { status: 404 }
      )
    }

    // Return command data formatted for CLI
    return NextResponse.json({
      id: command.id,
      slug: command.slug,
      name: command.name,
      description: command.description,
      category: command.category,
      command: command.command,
      prerequisites: command.prerequisites || [],
      tags: command.tags || [],
      version: command.version || '1.0.0',
      verified: command.verified || false,
      featured: command.featured || false,
      author: command.author || 'ID8Labs',
      license: command.license || 'MIT',
      downloads: command.install_count || 0,
      type: 'command'
    })
  } catch (error) {
    console.error('[API v1/commands/:slug] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
