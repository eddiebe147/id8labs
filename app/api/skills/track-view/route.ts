import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { skillId, sessionId, referrer } = body

    if (!skillId) {
      return NextResponse.json({ error: 'skillId is required' }, { status: 400 })
    }

    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    await supabase.rpc('track_skill_view', {
      p_skill_id: skillId,
      p_session_id: sessionId || null,
      p_referrer: referrer || null,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Track view error:', error)
    // Still return success - don't break the user experience for analytics
    return NextResponse.json({ success: true })
  }
}
