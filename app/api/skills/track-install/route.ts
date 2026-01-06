import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { skillId, method, platform } = body

    if (!skillId) {
      return NextResponse.json({ error: 'skillId is required' }, { status: 400 })
    }

    const supabase = await createClient()

    await supabase.rpc('track_skill_install', {
      p_skill_id: skillId,
      p_method: method || 'copy',
      p_platform: platform || null,
      p_session_id: null,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Track install error:', error)
    // Still return success - don't break the user experience for analytics
    return NextResponse.json({ success: true })
  }
}
