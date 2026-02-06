import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit, getRateLimitKey, rateLimitHeaders, RATE_LIMITS } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  // Rate limit check
  const rateLimitKey = getRateLimitKey(request)
  const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.tracking)

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: rateLimitHeaders(rateLimit, RATE_LIMITS.tracking) }
    )
  }
  try {
    const rawBody = await request.text()
    let body: { skillId?: string; sessionId?: string; referrer?: string } = {}
    if (rawBody) {
      try {
        body = JSON.parse(rawBody)
      } catch {
        // Ignore malformed payloads to avoid noisy client errors
        return NextResponse.json({ success: true })
      }
    }
    const { skillId, sessionId, referrer } = body

    if (!skillId) {
      return NextResponse.json({ error: 'skillId is required' }, { status: 400 })
    }

    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ success: true })
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
