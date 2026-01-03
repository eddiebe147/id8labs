import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend lazily to avoid build-time errors
let resend: Resend | null = null

function getResend(): Resend {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured')
    }
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

// Sources that trigger the AI Fundamentals nurture sequence
const AI_FUNDAMENTALS_SOURCES = [
  'ai-conversation-fundamentals-landing',
  'ai-conversation-fundamentals-module-6',
]

// Trigger email sequence for qualifying sources
async function triggerEmailSequence(email: string, source: string): Promise<void> {
  // Only trigger for AI Fundamentals sources
  if (!AI_FUNDAMENTALS_SOURCES.includes(source)) {
    return
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://id8labs.app'
    const response = await fetch(`${baseUrl}/api/email-sequences/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        sequenceId: 'ai-fundamentals-nurture',
        source,
      }),
    })

    if (!response.ok) {
      console.error('Failed to trigger email sequence:', await response.text())
    }
  } catch (error) {
    // Log but don't fail the subscription
    console.error('Error triggering email sequence:', error)
  }
}

interface SubscribePayload {
  email: string
  source: string
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscribePayload = await request.json()
    const { email, source } = body

    // Validate required fields
    if (!email || !source) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Add to Resend audience
    try {
      await getResend().contacts.create({
        email,
        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID || '',
      })
    } catch (contactError: any) {
      // If contact already exists, that's fine
      if (!contactError?.message?.includes('already exists')) {
        console.log('Could not add to audience:', contactError)
      }
    }

    // Send confirmation email
    const { data, error } = await getResend().emails.send({
      from: 'ID8Labs <hello@id8labs.tech>',
      to: email,
      subject: "You're subscribed to Claude Code updates",
      html: generateSubscribeEmail(email, source),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      )
    }

    // Trigger email nurture sequence if applicable (non-blocking)
    triggerEmailSequence(email, source)

    return NextResponse.json({
      success: true,
      messageId: data?.id,
      source,
    })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateSubscribeEmail(email: string, source: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're Subscribed</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
      <td style="padding: 40px 30px; text-align: center; background-color: #0A0A0A;">
        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
          <span style="color: #FF6B35;">id8</span>Labs
        </h1>
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="margin: 0 0 20px; color: #0A0A0A; font-size: 24px;">
          You're subscribed!
        </h2>

        <p style="margin: 0 0 20px; color: #737373; font-size: 16px; line-height: 1.6;">
          Thanks for subscribing to updates about <strong>Claude Code for Knowledge Workers</strong>. You'll be the first to hear about new modules, tips, and resources.
        </p>

        <p style="margin: 0 0 30px; color: #737373; font-size: 16px; line-height: 1.6;">
          In the meantime, make sure you've checked out Module 0 - it's completely free:
        </p>

        <!-- Module 0 Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FFF5F0; border-radius: 12px; margin-bottom: 30px; border: 2px solid #FF6B35;">
          <tr>
            <td style="padding: 25px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: top; padding-right: 15px;">
                    <div style="width: 50px; height: 50px; background-color: #FF6B35; border-radius: 10px; text-align: center; line-height: 50px;">
                      <span style="font-size: 24px; color: #ffffff;">0</span>
                    </div>
                  </td>
                  <td>
                    <p style="margin: 0 0 5px; color: #FF6B35; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      FREE MODULE
                    </p>
                    <h3 style="margin: 0 0 8px; color: #0A0A0A; font-size: 20px; font-weight: 700;">
                      The Mental Model Shift
                    </h3>
                    <p style="margin: 0 0 15px; color: #737373; font-size: 14px; line-height: 1.5;">
                      15 minutes to understand what Claude Code actually is and complete your first real delegation.
                    </p>
                    <a href="https://id8labs.app/courses/claude-for-knowledge-workers/module-0" style="display: inline-block; padding: 12px 24px; background-color: #FF6B35; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px;">
                      Start Module 0
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <p style="margin: 0; color: #737373; font-size: 14px; line-height: 1.6;">
          We'll send you occasional updates about new content. No spam, ever.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 30px; background-color: #f5f5f5; text-align: center;">
        <p style="margin: 0 0 10px; color: #737373; font-size: 14px;">
          ID8Labs - Professional Tools for the AI Era
        </p>
        <p style="margin: 0; color: #A3A3A3; font-size: 12px;">
          Miami, FL | <a href="https://id8labs.app" style="color: #A3A3A3;">id8labs.app</a>
        </p>
        <p style="margin: 15px 0 0; color: #A3A3A3; font-size: 11px;">
          <a href="{{{unsubscribe}}}" style="color: #A3A3A3;">Unsubscribe</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`
}
