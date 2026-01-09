import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import {
  AI_FUNDAMENTALS_SEQUENCE,
  getSequenceEmail
} from '@/lib/email/templates/ai-fundamentals-sequence'
import {
  ACADEMY_ONBOARDING_SEQUENCE,
  getAcademyOnboardingEmail
} from '@/lib/email/templates/academy-onboarding-sequence'

// Email sender address
const EMAIL_FROM = 'Eddie @ ID8Labs <hello@id8labs.tech>'

// Initialize clients
const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

const getResend = () => {
  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    throw new Error('Missing RESEND_API_KEY')
  }
  return new Resend(resendApiKey)
}

// Sequence configuration type
interface SequenceConfig {
  id: string
  name: string
  totalSteps: number
  schedule: Record<number, number> // step -> delay hours
}

// Sequence configurations
const SEQUENCES: Record<string, {
  config: SequenceConfig,
  getEmail: typeof getSequenceEmail
}> = {
  'ai-fundamentals-nurture': {
    config: AI_FUNDAMENTALS_SEQUENCE,
    getEmail: getSequenceEmail,
  },
  'academy-onboarding': {
    config: ACADEMY_ONBOARDING_SEQUENCE,
    getEmail: getAcademyOnboardingEmail,
  },
}

// Verify cron secret to prevent unauthorized access
function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  // In development, allow requests without auth for testing
  // Use NODE_ENV instead of missing secret to prevent production bypass
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment) return true

  // In production, require valid CRON_SECRET
  if (!cronSecret) {
    console.error('CRON_SECRET not configured - rejecting request')
    return false
  }

  return authHeader === `Bearer ${cronSecret}`
}

export async function GET(request: NextRequest) {
  // Verify this is a legitimate cron request
  if (!verifyCronSecret(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const supabase = getSupabase()
  const resend = getResend()
  const now = new Date()

  const results = {
    processed: 0,
    sent: 0,
    completed: 0,
    errors: [] as string[],
  }

  try {
    // Fetch all sequences that need to send an email
    const { data: pendingSequences, error: fetchError } = await supabase
      .from('email_sequences')
      .select('*')
      .eq('status', 'active')
      .lte('next_send_at', now.toISOString())
      .limit(50) // Process in batches

    if (fetchError) {
      console.error('Error fetching pending sequences:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch pending sequences' },
        { status: 500 }
      )
    }

    if (!pendingSequences || pendingSequences.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No emails to send',
        results,
      })
    }

    // Process each pending sequence
    for (const sequenceRecord of pendingSequences) {
      results.processed++

      const sequenceHandler = SEQUENCES[sequenceRecord.sequence_id]
      if (!sequenceHandler) {
        results.errors.push(`Unknown sequence: ${sequenceRecord.sequence_id}`)
        continue
      }

      const { config, getEmail } = sequenceHandler
      const currentStep = sequenceRecord.current_step

      // Check if sequence is complete
      if (currentStep > config.totalSteps) {
        // Mark as completed
        await supabase
          .from('email_sequences')
          .update({
            status: 'completed',
            completed_at: now.toISOString(),
            next_send_at: null,
          })
          .eq('id', sequenceRecord.id)

        results.completed++
        continue
      }

      try {
        // Get the email template for this step
        const emailTemplate = getEmail(currentStep, sequenceRecord.email)

        if (!emailTemplate) {
          results.errors.push(`No template for step ${currentStep} in ${sequenceRecord.sequence_id}`)
          continue
        }

        // Pick a random subject line for A/B testing
        const allSubjects = [emailTemplate.subject, ...(emailTemplate.subjectVariants || [])]
        const subjectIndex = Math.floor(Math.random() * allSubjects.length)
        const subject = allSubjects[subjectIndex]

        // Send the email via Resend
        const { data: sendResult, error: sendError } = await resend.emails.send({
          from: EMAIL_FROM,
          to: sequenceRecord.email,
          subject: subject,
          html: emailTemplate.html,
        })

        if (sendError) {
          console.error(`Error sending email to ${sequenceRecord.email}:`, sendError)
          results.errors.push(`Failed to send to ${sequenceRecord.email}: ${sendError.message}`)
          continue
        }

        // Log the sent email
        await supabase.from('email_sequence_logs').insert({
          sequence_record_id: sequenceRecord.id,
          email: sequenceRecord.email,
          sequence_id: sequenceRecord.sequence_id,
          step: currentStep,
          resend_message_id: sendResult?.id || null,
          status: 'sent',
          sent_at: now.toISOString(),
        })

        // Calculate next send time
        const nextStep = currentStep + 1
        let nextSendAt: string | null = null

        if (nextStep <= config.totalSteps) {
          const delayHours = config.schedule[nextStep]
          if (delayHours !== undefined) {
            const delayMs = delayHours * 60 * 60 * 1000
            const startTime = new Date(sequenceRecord.started_at)
            nextSendAt = new Date(startTime.getTime() + delayMs).toISOString()
          }
        }

        // Update sequence record
        const updateData: Record<string, unknown> = {
          current_step: nextStep,
          next_send_at: nextSendAt,
        }

        if (nextStep > config.totalSteps) {
          updateData.status = 'completed'
          updateData.completed_at = now.toISOString()
          results.completed++
        }

        await supabase
          .from('email_sequences')
          .update(updateData)
          .eq('id', sequenceRecord.id)

        results.sent++

      } catch (emailError) {
        console.error(`Error processing sequence ${sequenceRecord.id}:`, emailError)
        results.errors.push(`Error processing ${sequenceRecord.id}: ${String(emailError)}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${results.processed} sequences`,
      results,
    })

  } catch (error) {
    console.error('Error in cron job:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}

// POST endpoint to manually trigger processing (for testing)
export async function POST(request: NextRequest) {
  // Same logic as GET, but for manual triggers
  return GET(request)
}
