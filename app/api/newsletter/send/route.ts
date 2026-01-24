import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import {
  generateNewsletterHtml,
  generateEssayHtml,
  NEWSLETTER_ISSUE_1,
  NEWSLETTER_ISSUE_2,
  NEWSLETTER_ESSAY_3,
  type NewsletterContent,
  isEssay,
} from '@/lib/email/templates/newsletter-template'

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

// Available newsletter issues (structured + essays)
const NEWSLETTER_ISSUES: Record<number, NewsletterContent> = {
  1: NEWSLETTER_ISSUE_1,
  2: NEWSLETTER_ISSUE_2,
  3: NEWSLETTER_ESSAY_3,
}

// Generate HTML based on content type
function generateHtml(content: NewsletterContent, isAcademyMember: boolean): string {
  if (isEssay(content)) {
    return generateEssayHtml(content)
  }
  return generateNewsletterHtml(content, isAcademyMember)
}

// Get subject line from content
function getSubject(content: NewsletterContent): string {
  if (isEssay(content)) {
    return content.title
  }
  return content.subject
}

// Verify admin secret for sending newsletters
function verifyAdminSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const adminSecret = process.env.ADMIN_SECRET || process.env.CRON_SECRET

  if (!adminSecret) {
    console.warn('ADMIN_SECRET not set - rejecting request')
    return false
  }

  return authHeader === `Bearer ${adminSecret}`
}

export async function POST(request: NextRequest) {
  // Verify authorization
  if (!verifyAdminSecret(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { issueNumber, audienceFilter, testEmail } = await request.json()

    // Validate issue number
    if (!issueNumber || !NEWSLETTER_ISSUES[issueNumber]) {
      return NextResponse.json(
        { error: `Invalid issue number: ${issueNumber}. Available: ${Object.keys(NEWSLETTER_ISSUES).join(', ')}` },
        { status: 400 }
      )
    }

    const issue = NEWSLETTER_ISSUES[issueNumber]
    const supabase = getSupabase()
    const resend = getResend()

    const results = {
      total: 0,
      sent: 0,
      failed: 0,
      errors: [] as string[],
    }

    // Test mode - send to single email
    if (testEmail) {
      const isAcademyMember = audienceFilter === 'academy'
      const html = generateHtml(issue, isAcademyMember)
      const subject = getSubject(issue)

      const { error: sendError } = await resend.emails.send({
        from: EMAIL_FROM,
        to: testEmail,
        subject: `[TEST] ${subject}`,
        html,
      })

      if (sendError) {
        return NextResponse.json(
          { error: `Failed to send test: ${sendError.message}` },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: `Test email sent to ${testEmail}`,
        mode: 'test',
        isAcademyVersion: isAcademyMember,
      })
    }

    // Production mode - send to all subscribers
    // Fetch subscribers based on filter
    let query = supabase
      .from('newsletter_subscribers')
      .select('email, is_academy_member')
      .eq('status', 'active')

    if (audienceFilter === 'academy') {
      query = query.eq('is_academy_member', true)
    } else if (audienceFilter === 'free') {
      query = query.eq('is_academy_member', false)
    }
    // 'all' = no additional filter

    const { data: subscribers, error: fetchError } = await query

    if (fetchError) {
      console.error('Error fetching subscribers:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch subscribers' },
        { status: 500 }
      )
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No subscribers found for this filter',
        results,
      })
    }

    results.total = subscribers.length

    // Send to each subscriber
    const subject = getSubject(issue)
    for (const subscriber of subscribers) {
      try {
        const html = generateHtml(issue, subscriber.is_academy_member)

        const { error: sendError } = await resend.emails.send({
          from: EMAIL_FROM,
          to: subscriber.email,
          subject,
          html,
        })

        if (sendError) {
          results.failed++
          results.errors.push(`${subscriber.email}: ${sendError.message}`)
          continue
        }

        results.sent++

        // Log the send
        await supabase.from('newsletter_sends').insert({
          email: subscriber.email,
          issue_number: issueNumber,
          sent_at: new Date().toISOString(),
          is_academy_version: subscriber.is_academy_member,
        })

      } catch (error) {
        results.failed++
        results.errors.push(`${subscriber.email}: ${String(error)}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Newsletter sent to ${results.sent}/${results.total} subscribers`,
      results,
    })

  } catch (error) {
    console.error('Error sending newsletter:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}

// GET endpoint to list available issues
export async function GET() {
  const issues = Object.entries(NEWSLETTER_ISSUES).map(([num, content]) => ({
    issueNumber: Number(num),
    date: content.date,
    subject: getSubject(content),
    isEssay: isEssay(content),
  }))

  return NextResponse.json({
    availableIssues: issues,
    instructions: {
      testSend: 'POST with { issueNumber: 3, testEmail: "you@example.com" }',
      productionSend: 'POST with { issueNumber: 3, audienceFilter: "all" | "academy" | "free" }',
    },
  })
}
