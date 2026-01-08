import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'

/**
 * POST /api/v1/track-download
 * Track installation/download of skills, agents, commands, or settings via CLI
 * 
 * Body:
 * - itemType: 'skill' | 'agent' | 'command' | 'setting'
 * - itemId: UUID of the item
 * - installedVia: 'cli' | 'web' | 'api'
 * - version: version of the CLI or item
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { itemType, itemId, installedVia = 'cli', version } = body

    if (!itemType || !itemId) {
      return NextResponse.json(
        { error: 'itemType and itemId are required' },
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

    // For Phase 1, we'll track downloads in the skills table install_count
    // In Phase 1.5, we'll create a dedicated download_events table for more detailed tracking

    if (itemType === 'skill' || itemType === 'agent') {
      // Increment install count in skills table
      const { error } = await supabase.rpc('track_skill_install', {
        p_skill_id: itemId,
        p_method: installedVia === 'cli' ? 'npm' : 'copy',
        p_platform: 'cli',
        p_session_id: null
      })

      if (error) {
        console.error('[track-download] Error tracking install:', error)
        // Don't fail the request if analytics fails
        return NextResponse.json({ 
          success: true,
          message: 'Item downloaded (analytics tracking failed)',
          tracked: false
        })
      }

      return NextResponse.json({ 
        success: true,
        message: 'Download tracked successfully',
        tracked: true
      })
    }

    // For commands and settings (Phase 1.2+), we'll add tracking later
    return NextResponse.json({ 
      success: true,
      message: 'Download recorded (detailed tracking coming in Phase 1.5)',
      tracked: false
    })

  } catch (error) {
    console.error('[API v1/track-download] Error:', error)
    
    // Don't fail the download if analytics fails
    return NextResponse.json(
      { 
        success: true,
        message: 'Item downloaded (analytics error)',
        tracked: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 200 } // Return 200 so CLI doesn't fail
    )
  }
}
