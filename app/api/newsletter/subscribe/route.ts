import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with service role for server-side operations
const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

// POST - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json()

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const supabase = getSupabase()

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json({
          success: true,
          message: 'Already subscribed',
          isNewSubscriber: false,
        })
      }

      // Resubscribe if previously unsubscribed
      const { error: updateError } = await supabase
        .from('newsletter_subscribers')
        .update({
          status: 'active',
          unsubscribed_at: null,
        })
        .eq('id', existing.id)

      if (updateError) {
        console.error('Error resubscribing:', updateError)
        return NextResponse.json(
          { error: 'Failed to resubscribe' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Welcome back! You\'ve been resubscribed.',
        isNewSubscriber: false,
      })
    }

    // New subscriber
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase(),
        source: source || 'website',
        status: 'active',
        is_academy_member: false,
      })

    if (insertError) {
      console.error('Error subscribing:', insertError)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to The Innovation Brief!',
      isNewSubscriber: true,
    })

  } catch (error) {
    console.error('Error in newsletter subscribe:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Unsubscribe from newsletter
export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const supabase = getSupabase()

    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('email', email.toLowerCase())

    if (updateError) {
      console.error('Error unsubscribing:', updateError)
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed',
    })

  } catch (error) {
    console.error('Error in newsletter unsubscribe:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET - Check subscription status
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email')

  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter is required' },
      { status: 400 }
    )
  }

  try {
    const supabase = getSupabase()

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('status, is_academy_member, subscribed_at')
      .eq('email', email.toLowerCase())
      .single()

    if (error || !data) {
      return NextResponse.json({
        isSubscribed: false,
        isAcademyMember: false,
      })
    }

    return NextResponse.json({
      isSubscribed: data.status === 'active',
      isAcademyMember: data.is_academy_member,
      subscribedAt: data.subscribed_at,
    })

  } catch (error) {
    console.error('Error checking subscription:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
