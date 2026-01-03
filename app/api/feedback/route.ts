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

interface FeedbackPayload {
  courseId: string
  courseName: string
  helpful: boolean
  email?: string
  wantsFollowUp: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackPayload = await request.json()
    const { courseId, courseName, helpful, email, wantsFollowUp } = body

    // Validate required fields
    if (!courseId || !courseName || typeof helpful !== 'boolean') {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        )
      }
    }

    // Log feedback for now (in production, store in database)
    console.log('Course Feedback:', {
      courseId,
      courseName,
      helpful,
      email: email || 'not provided',
      wantsFollowUp,
      timestamp: new Date().toISOString(),
    })

    // If user provided email and wants follow-up, send email and add to audience
    if (email && wantsFollowUp) {
      try {
        // Add to Resend audience
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

      // Send follow-up email
      const { data, error } = await getResend().emails.send({
        from: 'ID8Labs <hello@id8labs.app>',
        to: email,
        subject: helpful
          ? "Thanks for completing AI Conversation Fundamentals!"
          : "Thanks for your feedback — we want to improve",
        html: generateFeedbackFollowUpEmail(helpful, courseName),
      })

      if (error) {
        console.error('Resend error:', error)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      feedback: helpful ? 'helpful' : 'not-helpful',
      followUpScheduled: wantsFollowUp && !!email,
    })
  } catch (error) {
    console.error('Feedback error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateFeedbackFollowUpEmail(helpful: boolean, courseName: string): string {
  if (helpful) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>What's Next After ${courseName}</title>
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
          You've got the fundamentals down.
        </h2>

        <p style="margin: 0 0 20px; color: #737373; font-size: 16px; line-height: 1.6;">
          Now it's time to put them into practice. Here are your recommended next steps:
        </p>

        <!-- Next Step 1 -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FFF5F0; border-radius: 12px; margin-bottom: 15px; border: 2px solid #FF6B35;">
          <tr>
            <td style="padding: 20px;">
              <p style="margin: 0 0 5px; color: #FF6B35; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                RECOMMENDED
              </p>
              <h3 style="margin: 0 0 8px; color: #0A0A0A; font-size: 18px; font-weight: 700;">
                Try Module 0: Your First Delegation
              </h3>
              <p style="margin: 0 0 15px; color: #737373; font-size: 14px; line-height: 1.5;">
                Experience what it's like to delegate real work to Claude Code. Clean up your Downloads folder in 10 minutes.
              </p>
              <a href="https://id8labs.app/courses/claude-for-knowledge-workers/module-0" style="display: inline-block; padding: 10px 20px; background-color: #FF6B35; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px;">
                Start Module 0 (Free) →
              </a>
            </td>
          </tr>
        </table>

        <!-- Next Step 2 -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; border-radius: 12px; margin-bottom: 15px;">
          <tr>
            <td style="padding: 20px;">
              <h3 style="margin: 0 0 8px; color: #0A0A0A; font-size: 18px; font-weight: 700;">
                Get the Full Course — $99
              </h3>
              <p style="margin: 0 0 15px; color: #737373; font-size: 14px; line-height: 1.5;">
                5 modules of hands-on practice with file management, research, writing, and building your personal operations system.
              </p>
              <a href="https://id8labs.app/courses/claude-for-knowledge-workers" style="color: #FF6B35; font-size: 14px; font-weight: 600; text-decoration: none;">
                View Full Course →
              </a>
            </td>
          </tr>
        </table>

        <!-- Community -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; border-radius: 12px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 20px;">
              <h3 style="margin: 0 0 8px; color: #0A0A0A; font-size: 18px; font-weight: 700;">
                Join the Community
              </h3>
              <p style="margin: 0 0 15px; color: #737373; font-size: 14px; line-height: 1.5;">
                Connect with other knowledge workers learning to delegate to AI.
              </p>
              <a href="https://discord.gg/id8labs" style="color: #5865F2; font-size: 14px; font-weight: 600; text-decoration: none;">
                Join Discord →
              </a>
            </td>
          </tr>
        </table>

        <p style="margin: 0; color: #737373; font-size: 14px; line-height: 1.6;">
          Questions? Just reply to this email.
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
  } else {
    // "Could be better" follow-up
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We'd love your feedback</title>
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
          Thanks for your honesty.
        </h2>

        <p style="margin: 0 0 20px; color: #737373; font-size: 16px; line-height: 1.6;">
          We noticed you felt the ${courseName} course could be better. We take that seriously.
        </p>

        <p style="margin: 0 0 20px; color: #737373; font-size: 16px; line-height: 1.6;">
          Could you spare 2 minutes to tell us what would have made it more useful? Your feedback directly shapes what we build next.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; border-radius: 12px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 20px;">
              <p style="margin: 0 0 10px; color: #0A0A0A; font-size: 14px; font-weight: 600;">
                A few questions (reply to this email):
              </p>
              <ul style="margin: 0; padding-left: 20px; color: #737373; font-size: 14px; line-height: 1.8;">
                <li>What were you hoping to learn that wasn't covered?</li>
                <li>Was there anything confusing or unclear?</li>
                <li>What would you change about the course?</li>
              </ul>
            </td>
          </tr>
        </table>

        <p style="margin: 0; color: #737373; font-size: 14px; line-height: 1.6;">
          Thanks for helping us improve.
        </p>

        <p style="margin: 20px 0 0; color: #0A0A0A; font-size: 14px;">
          — Eddie @ ID8Labs
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
}
