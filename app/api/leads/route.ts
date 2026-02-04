import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { isValidEmail } from '@/lib/validation'
import { checkRateLimit, getRateLimitKey, rateLimitHeaders, RATE_LIMITS } from '@/lib/rate-limit'

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

interface ReadinessLeadPayload {
  name: string
  email: string
  readinessLevel: string
  score: number
  recommendations: string[]
}

interface WaitlistLeadPayload {
  email: string
  source: string
  metadata?: Record<string, string>
}

type LeadPayload = ReadinessLeadPayload | WaitlistLeadPayload

function isReadinessLead(payload: LeadPayload): payload is ReadinessLeadPayload {
  return 'readinessLevel' in payload && 'name' in payload
}

export async function POST(request: NextRequest) {
  // Rate limit check
  const rateLimitKey = getRateLimitKey(request)
  const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.publicForm)

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: rateLimitHeaders(rateLimit, RATE_LIMITS.publicForm) }
    )
  }

  try {
    const body: LeadPayload = await request.json()

    // Handle different lead types
    if (isReadinessLead(body)) {
      return handleReadinessLead(body)
    } else {
      return handleWaitlistLead(body)
    }

  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleReadinessLead(body: ReadinessLeadPayload) {
  const { name, email, readinessLevel, score, recommendations } = body

  // Validate required fields
  if (!name || !email || !readinessLevel) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  // Email validation
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Invalid email format' },
      { status: 400 }
    )
  }

  // Send welcome email with resources
  const { data, error } = await getResend().emails.send({
    from: 'ID8Labs <hello@id8labs.tech>',
    to: email,
    subject: `Your AI Readiness Results: ${readinessLevel} Level`,
    html: generateWelcomeEmail(name, readinessLevel, score, recommendations),
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }

  // Also add to audience for future emails
  try {
    await getResend().contacts.create({
      email,
      firstName: name,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID || '',
    })
  } catch (contactError) {
    console.log('Could not add to audience:', contactError)
  }

  return NextResponse.json({
    success: true,
    messageId: data?.id,
  })
}

async function handleWaitlistLead(body: WaitlistLeadPayload) {
  const { email, source, metadata } = body

  // Validate required fields
  if (!email || !source) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  // Email validation
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Invalid email format' },
      { status: 400 }
    )
  }

  // Determine which email to send based on source
  let emailContent: { subject: string; html: string }

  if (source === 'claude-for-knowledge-workers-waitlist') {
    emailContent = generateCourseWaitlistEmail(email)
  } else {
    // Generic waitlist email
    emailContent = generateGenericWaitlistEmail(email, source)
  }

  // Send welcome email
  const { data, error } = await getResend().emails.send({
    from: 'ID8Labs <hello@id8labs.tech>',
    to: email,
    subject: emailContent.subject,
    html: emailContent.html,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }

  // Add to audience
  try {
    await getResend().contacts.create({
      email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID || '',
    })
  } catch (contactError) {
    console.log('Could not add to audience:', contactError)
  }

  return NextResponse.json({
    success: true,
    messageId: data?.id,
    source,
    metadata,
  })
}

function getActionPlanUrl(level: string): string {
  const actionPlans: Record<string, string> = {
    Explorer: 'https://id8labs.app/resources/action-plans/explorer',
    Adopter: 'https://id8labs.app/resources/action-plans/adopter',
    Practitioner: 'https://id8labs.app/resources/action-plans/practitioner',
    Pioneer: 'https://id8labs.app/resources/action-plans/pioneer',
  }
  return actionPlans[level] || actionPlans.Explorer
}

function generateWelcomeEmail(
  name: string,
  level: string,
  score: number,
  recommendations: string[]
): string {
  const levelColors: Record<string, string> = {
    Explorer: '#3B82F6',
    Adopter: '#F59E0B',
    Practitioner: '#10B981',
    Pioneer: '#FF6B35',
  }

  const color = levelColors[level] || '#FF6B35'
  const actionPlanUrl = getActionPlanUrl(level)

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Readiness Results</title>
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
          Hi ${name},
        </h2>

        <p style="margin: 0 0 30px; color: #737373; font-size: 16px; line-height: 1.6;">
          Thanks for taking the AI Agent Readiness Assessment. Here are your personalized results and resources.
        </p>

        <!-- Results Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; border-radius: 12px; margin-bottom: 30px;">
          <tr>
            <td style="padding: 30px; text-align: center;">
              <p style="margin: 0 0 10px; color: #737373; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                Your Readiness Level
              </p>
              <h3 style="margin: 0 0 10px; color: ${color}; font-size: 36px; font-weight: bold;">
                ${level}
              </h3>
              <p style="margin: 0; color: #737373; font-size: 14px;">
                Score: ${score} / 20
              </p>
            </td>
          </tr>
        </table>

        <!-- Recommendations -->
        <h3 style="margin: 0 0 15px; color: #0A0A0A; font-size: 18px;">
          Your Personalized Recommendations:
        </h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
          ${recommendations.map(rec => `
          <tr>
            <td style="padding: 10px 0;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: top; padding-right: 10px;">
                    <span style="color: #10B981; font-size: 16px;">✓</span>
                  </td>
                  <td style="color: #737373; font-size: 15px; line-height: 1.5;">
                    ${rec}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          `).join('')}
        </table>

        <!-- Resources Section -->
        <h3 style="margin: 0 0 20px; color: #0A0A0A; font-size: 18px;">
          Your Free Resources:
        </h3>

        <!-- Resource 1: Personalized Action Plan -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ECFDF5; border-radius: 12px; margin-bottom: 15px;">
          <tr>
            <td style="padding: 20px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: top; padding-right: 15px;">
                    <div style="width: 40px; height: 40px; background-color: #D1FAE5; border-radius: 8px; text-align: center; line-height: 40px;">
                      <span style="font-size: 20px;">🎯</span>
                    </div>
                  </td>
                  <td>
                    <h4 style="margin: 0 0 5px; color: #0A0A0A; font-size: 16px; font-weight: 600;">
                      Your ${level} Action Plan
                    </h4>
                    <p style="margin: 0 0 10px; color: #737373; font-size: 14px;">
                      30-day roadmap tailored specifically to your readiness level.
                    </p>
                    <a href="${actionPlanUrl}" style="color: #10B981; font-size: 14px; font-weight: 600; text-decoration: none;">
                      View Your Action Plan →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Resource 2: MCP Checklist -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FFF5F0; border-radius: 12px; margin-bottom: 15px;">
          <tr>
            <td style="padding: 20px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: top; padding-right: 15px;">
                    <div style="width: 40px; height: 40px; background-color: #FFE8DF; border-radius: 8px; text-align: center; line-height: 40px;">
                      <span style="font-size: 20px;">📋</span>
                    </div>
                  </td>
                  <td>
                    <h4 style="margin: 0 0 5px; color: #0A0A0A; font-size: 16px; font-weight: 600;">
                      MCP Security Checklist
                    </h4>
                    <p style="margin: 0 0 10px; color: #737373; font-size: 14px;">
                      Comprehensive security guide for AI integrations.
                    </p>
                    <a href="https://id8labs.app/resources/MCP_Security_Checklist.md" style="color: #FF6B35; font-size: 14px; font-weight: 600; text-decoration: none;">
                      View Checklist →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Resource 3: Hooks Starter Kit -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F0F7FF; border-radius: 12px; margin-bottom: 30px;">
          <tr>
            <td style="padding: 20px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: top; padding-right: 15px;">
                    <div style="width: 40px; height: 40px; background-color: #DBEAFE; border-radius: 8px; text-align: center; line-height: 40px;">
                      <span style="font-size: 20px;">⚡</span>
                    </div>
                  </td>
                  <td>
                    <h4 style="margin: 0 0 5px; color: #0A0A0A; font-size: 16px; font-weight: 600;">
                      Claude Code Hooks Starter Kit
                    </h4>
                    <p style="margin: 0 0 10px; color: #737373; font-size: 14px;">
                      Production-ready hooks you can clone and customize.
                    </p>
                    <a href="https://github.com/eddiebelaval/id8labs-starter" style="color: #3B82F6; font-size: 14px; font-weight: 600; text-decoration: none;">
                      Clone from GitHub →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- CTA -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="text-align: center;">
              <p style="margin: 0 0 20px; color: #737373; font-size: 15px;">
                Ready to accelerate your AI development journey?
              </p>
              <a href="https://id8labs.app/services" style="display: inline-block; padding: 14px 28px; background-color: #FF6B35; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                Explore Training Programs
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 30px; background-color: #f5f5f5; text-align: center;">
        <p style="margin: 0 0 10px; color: #737373; font-size: 14px;">
          ID8Labs - Professional Tools for the AI Era
        </p>
        <p style="margin: 0; color: #A3A3A3; font-size: 12px;">
          Miami, FL • <a href="https://id8labs.app" style="color: #A3A3A3;">id8labs.app</a>
        </p>
        <p style="margin: 15px 0 0; color: #A3A3A3; font-size: 11px;">
          You received this email because you completed our AI Readiness Assessment.
          <br>
          <a href="{{{unsubscribe}}}" style="color: #A3A3A3;">Unsubscribe</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

function generateCourseWaitlistEmail(email: string): { subject: string; html: string } {
  return {
    subject: "You're on the waitlist: Claude Code for Knowledge Workers",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're on the Waitlist</title>
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
          You're on the list!
        </h2>

        <p style="margin: 0 0 20px; color: #737373; font-size: 16px; line-height: 1.6;">
          Thanks for joining the waitlist for <strong>Claude Code for Knowledge Workers</strong>. You'll be among the first to know when we launch.
        </p>

        <p style="margin: 0 0 30px; color: #737373; font-size: 16px; line-height: 1.6;">
          In the meantime, here's your first taste of what's coming:
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
                      15 minutes to understand what Claude Code actually is — and complete your first real delegation.
                    </p>
                    <a href="https://id8labs.app/courses/claude-for-knowledge-workers/module-0" style="display: inline-block; padding: 12px 24px; background-color: #FF6B35; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px;">
                      Start Module 0 →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- What's Coming -->
        <h3 style="margin: 0 0 15px; color: #0A0A0A; font-size: 18px;">
          What's in the full course:
        </h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
          <tr>
            <td style="padding: 8px 0;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: top; padding-right: 10px;">
                    <span style="color: #FF6B35; font-size: 14px;">1.</span>
                  </td>
                  <td style="color: #737373; font-size: 15px;">
                    <strong>Your First Delegation</strong> — Low-risk, high-value file tasks
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: top; padding-right: 10px;">
                    <span style="color: #FF6B35; font-size: 14px;">2.</span>
                  </td>
                  <td style="color: #737373; font-size: 15px;">
                    <strong>Working With Your Files</strong> — Document processing, invoices, finding things
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: top; padding-right: 10px;">
                    <span style="color: #FF6B35; font-size: 14px;">3.</span>
                  </td>
                  <td style="color: #737373; font-size: 15px;">
                    <strong>The Writer's Workflow</strong> — Voice notes to polished drafts
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: top; padding-right: 10px;">
                    <span style="color: #FF6B35; font-size: 14px;">4.</span>
                  </td>
                  <td style="color: #737373; font-size: 15px;">
                    <strong>Research & Analysis</strong> — Competitive research, synthesis, patterns
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: top; padding-right: 10px;">
                    <span style="color: #FF6B35; font-size: 14px;">5.</span>
                  </td>
                  <td style="color: #737373; font-size: 15px;">
                    <strong>Personal Operations System</strong> — CLAUDE.md, recurring workflows
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: top; padding-right: 10px;">
                    <span style="color: #FF6B35; font-size: 14px;">6.</span>
                  </td>
                  <td style="color: #737373; font-size: 15px;">
                    <strong>Power User Patterns</strong> — MCP servers, long tasks, troubleshooting
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Essay CTA -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; border-radius: 12px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 20px;">
              <p style="margin: 0 0 10px; color: #737373; font-size: 14px;">
                Want the backstory? Read how I use Claude Code to run a TV production company and an LLC:
              </p>
              <a href="https://id8labs.app/essays/claude-code-isnt-for-coders" style="color: #FF6B35; font-size: 14px; font-weight: 600; text-decoration: none;">
                Claude Code Isn't For Coders →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 30px; background-color: #f5f5f5; text-align: center;">
        <p style="margin: 0 0 10px; color: #737373; font-size: 14px;">
          ID8Labs - Professional Tools for the AI Era
        </p>
        <p style="margin: 0; color: #A3A3A3; font-size: 12px;">
          Miami, FL • <a href="https://id8labs.app" style="color: #A3A3A3;">id8labs.app</a>
        </p>
        <p style="margin: 15px 0 0; color: #A3A3A3; font-size: 11px;">
          You received this email because you joined the Claude Code for Knowledge Workers waitlist.
          <br>
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

function generateGenericWaitlistEmail(email: string, source: string): { subject: string; html: string } {
  return {
    subject: "You're on the ID8Labs waitlist",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="padding: 40px 30px; text-align: center; background-color: #0A0A0A;">
        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
          <span style="color: #FF6B35;">id8</span>Labs
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="margin: 0 0 20px; color: #0A0A0A; font-size: 24px;">
          You're on the list!
        </h2>
        <p style="margin: 0 0 20px; color: #737373; font-size: 16px; line-height: 1.6;">
          Thanks for your interest in ID8Labs. We'll keep you updated on new tools, courses, and resources.
        </p>
        <a href="https://id8labs.app" style="display: inline-block; padding: 14px 28px; background-color: #FF6B35; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 8px;">
          Explore ID8Labs
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px; background-color: #f5f5f5; text-align: center;">
        <p style="margin: 0; color: #A3A3A3; font-size: 12px;">
          Miami, FL • <a href="https://id8labs.app" style="color: #A3A3A3;">id8labs.app</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`
  }
}
