import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { AI_FUNDAMENTALS_SEQUENCE } from '@/lib/email/templates/ai-fundamentals-sequence'
import { ACADEMY_ONBOARDING_SEQUENCE } from '@/lib/email/templates/academy-onboarding-sequence'

// Initialize Supabase client with service role for server-side operations
const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

// Sequence configuration type
interface SequenceConfig {
  id: string
  name: string
  totalSteps: number
  schedule: Record<number, number> // step -> delay hours
}

// Available sequences
const SEQUENCES: Record<string, SequenceConfig> = {
  'ai-fundamentals-nurture': AI_FUNDAMENTALS_SEQUENCE,
  'academy-onboarding': ACADEMY_ONBOARDING_SEQUENCE,
}

export async function POST(request: NextRequest) {
  try {
    const { email, sequenceId, source } = await request.json()

    // Validate required fields
    if (!email || !sequenceId) {
      return NextResponse.json(
        { error: 'Email and sequenceId are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if sequence exists
    const sequence = SEQUENCES[sequenceId]
    if (!sequence) {
      return NextResponse.json(
        { error: `Unknown sequence: ${sequenceId}` },
        { status: 400 }
      )
    }

    const supabase = getSupabase()

    // Check if user already has an active sequence of this type
    const { data: existingSequence } = await supabase
      .from('email_sequences')
      .select('id, status, current_step')
      .eq('email', email.toLowerCase())
      .eq('sequence_id', sequenceId)
      .eq('status', 'active')
      .single()

    if (existingSequence) {
      // Already in sequence - return success but don't duplicate
      return NextResponse.json({
        success: true,
        message: 'Already enrolled in sequence',
        sequenceRecordId: existingSequence.id,
        currentStep: existingSequence.current_step,
      })
    }

    // Calculate when to send the first email
    // First email: uses schedule[1] for step 1
    const now = new Date()
    const firstEmailDelayHours = sequence.schedule[1] || 0 // Step 1 delay (usually 0 = immediate)
    const nextSendAt = new Date(now.getTime() + firstEmailDelayHours * 60 * 60 * 1000)

    // Create new sequence record
    const { data: newSequence, error: insertError } = await supabase
      .from('email_sequences')
      .insert({
        email: email.toLowerCase(),
        sequence_id: sequenceId,
        current_step: 1,
        status: 'active',
        source: source || null,
        started_at: now.toISOString(),
        next_send_at: nextSendAt.toISOString(),
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error creating sequence record:', insertError)
      return NextResponse.json(
        { error: 'Failed to start email sequence' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Email sequence started',
      sequenceRecordId: newSequence.id,
      nextSendAt: nextSendAt.toISOString(),
    })

  } catch (error) {
    console.error('Error in sequence trigger:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to check sequence status
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email')
  const sequenceId = searchParams.get('sequenceId')

  if (!email) {
    return NextResponse.json(
      { error: 'Email is required' },
      { status: 400 }
    )
  }

  try {
    const supabase = getSupabase()

    let query = supabase
      .from('email_sequences')
      .select('*')
      .eq('email', email.toLowerCase())

    if (sequenceId) {
      query = query.eq('sequence_id', sequenceId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching sequences:', error)
      return NextResponse.json(
        { error: 'Failed to fetch sequences' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      sequences: data || [],
    })

  } catch (error) {
    console.error('Error in sequence status check:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
