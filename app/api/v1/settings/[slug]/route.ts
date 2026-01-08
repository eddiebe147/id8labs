import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'

/**
 * GET /api/v1/settings/:slug
 * Fetch Claude Code configuration preset for CLI installation
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json(
        { error: 'Setting slug is required' },
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

    // Fetch setting from database
    const { data: setting, error } = await supabase
      .from('settings')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !setting) {
      return NextResponse.json(
        { error: 'Setting not found' },
        { status: 404 }
      )
    }

    // Return setting data formatted for CLI
    return NextResponse.json({
      id: setting.id,
      slug: setting.slug,
      name: setting.name,
      description: setting.description,
      category: setting.category,
      settings: setting.settings,
      tags: setting.tags || [],
      version: setting.version || '1.0.0',
      verified: setting.verified || false,
      featured: setting.featured || false,
      author: setting.author || 'ID8Labs',
      license: setting.license || 'MIT',
      downloads: setting.install_count || 0,
      type: 'setting'
    })
  } catch (error) {
    console.error('[API v1/settings/:slug] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
