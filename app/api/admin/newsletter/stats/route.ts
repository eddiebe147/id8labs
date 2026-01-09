import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

export async function GET() {
  try {
    const supabase = getSupabase()

    // Get total subscribers
    const { count: totalSubscribers } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })

    // Get active subscribers
    const { count: activeSubscribers } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    // Get recent signups (last 7 days)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const { count: recentSignups } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })
      .gte('subscribed_at', weekAgo.toISOString())

    // Get total sends
    const { count: totalSends } = await supabase
      .from('newsletter_sends')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      totalSubscribers: totalSubscribers || 0,
      activeSubscribers: activeSubscribers || 0,
      recentSignups: recentSignups || 0,
      totalSends: totalSends || 0,
    })
  } catch (error) {
    console.error('Error fetching newsletter stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
