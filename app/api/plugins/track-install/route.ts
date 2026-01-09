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
    const body = await request.json()
    const { pluginId } = body

    if (!pluginId) {
      return NextResponse.json({ error: 'pluginId is required' }, { status: 400 })
    }

    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    await supabase.rpc('track_plugin_install', {
      p_plugin_id: pluginId,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Track plugin install error:', error)
    // Still return success - don't break the user experience for analytics
    return NextResponse.json({ success: true })
  }
}
