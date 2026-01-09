// ID8 Newsletter - "The Innovation Brief"
// Monthly newsletter template system
// Supports tiered content for free vs academy members

export interface NewsletterSection {
  title: string
  content: string
  academyOnly?: boolean
}

export interface NewsletterIssue {
  issueNumber: number
  date: string
  subject: string
  subjectVariants?: string[]
  bigIdea: {
    title: string
    content: string
  }
  framework: {
    name: string
    description: string
    steps?: string[]
  }
  caseStudy: {
    title: string
    problem: string
    solution: string
    result: string
  }
  miloTip?: {
    title: string
    prompt: string
    explanation: string
  }
  graduateEdge?: {
    title: string
    content: string
    downloadLink?: string
  }
  closingNote: string
}

// Shared styles
const HEADER_HTML = `
    <!-- Header -->
    <tr>
      <td style="padding: 30px 30px 20px; text-align: left;">
        <span style="color: #FF6B35; font-weight: bold; font-size: 20px;">id8</span><span style="color: #0A0A0A; font-weight: bold; font-size: 20px;">Labs</span>
        <span style="color: #737373; font-size: 14px; margin-left: 10px;">The Innovation Brief</span>
      </td>
    </tr>
`

const FOOTER_HTML = `
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
          <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #A3A3A3;">Unsubscribe</a>
        </p>
      </td>
    </tr>
`

const EMAIL_WRAPPER_START = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
`

const EMAIL_WRAPPER_END = `
  </table>
</body>
</html>
`

/**
 * Generates newsletter HTML for a given issue and audience tier
 * @param issue - The newsletter issue content
 * @param isAcademyMember - Whether recipient is an Academy member (shows exclusive content)
 */
export function generateNewsletterHtml(issue: NewsletterIssue, isAcademyMember: boolean): string {
  const academyBadge = isAcademyMember
    ? `<span style="display: inline-block; padding: 2px 8px; background-color: #FF6B35; color: #ffffff; font-size: 11px; font-weight: 600; border-radius: 4px; margin-left: 5px;">ACADEMY</span>`
    : ''

  // Academy-only section styling
  const academySection = (title: string, content: string) => {
    if (!isAcademyMember) return ''
    return `
        <tr>
          <td style="padding: 0 30px 30px;">
            <div style="padding: 20px; background-color: #FFF5F0; border-radius: 8px; border: 1px solid #FFE5D9;">
              <p style="margin: 0 0 10px; color: #FF6B35; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                ACADEMY EXCLUSIVE
              </p>
              <h3 style="margin: 0 0 15px; color: #0A0A0A; font-size: 16px; font-weight: bold;">
                ${title}
              </h3>
              ${content}
            </div>
          </td>
        </tr>
    `
  }

  // MILO Tip section (Academy only)
  const miloTipHtml = issue.miloTip
    ? academySection(
        `MILO Tip: ${issue.miloTip.title}`,
        `
              <p style="margin: 0 0 15px; color: #0A0A0A; font-size: 14px; line-height: 1.6;">
                ${issue.miloTip.explanation}
              </p>
              <div style="padding: 15px; background-color: #ffffff; border-radius: 6px; font-family: monospace; font-size: 13px; color: #0A0A0A; line-height: 1.5;">
                "${issue.miloTip.prompt}"
              </div>
              <a href="https://id8labs.app/milo?utm_source=newsletter&utm_medium=email&utm_campaign=issue-${issue.issueNumber}" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #FF6B35; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 6px;">
                Try in MILO →
              </a>
        `
      )
    : ''

  // Graduate's Edge section (Academy only)
  const graduateEdgeHtml = issue.graduateEdge
    ? academySection(
        `Graduate's Edge: ${issue.graduateEdge.title}`,
        `
              <p style="margin: 0 0 15px; color: #0A0A0A; font-size: 14px; line-height: 1.6;">
                ${issue.graduateEdge.content}
              </p>
              ${
                issue.graduateEdge.downloadLink
                  ? `<a href="${issue.graduateEdge.downloadLink}?utm_source=newsletter&utm_medium=email&utm_campaign=issue-${issue.issueNumber}" style="display: inline-block; padding: 10px 20px; background-color: #FF6B35; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 6px;">
                  Download →
                </a>`
                  : ''
              }
        `
      )
    : ''

  // CTA for non-academy members
  const upgradeCta = !isAcademyMember
    ? `
        <tr>
          <td style="padding: 0 30px 30px;">
            <div style="padding: 20px; background-color: #F9F9F9; border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 10px; color: #0A0A0A; font-size: 15px; font-weight: bold;">
                Want the full newsletter?
              </p>
              <p style="margin: 0 0 15px; color: #737373; font-size: 14px; line-height: 1.6;">
                Academy members get exclusive MILO tips, templates, and advanced resources.
              </p>
              <a href="https://id8labs.app/academy?utm_source=newsletter&utm_medium=email&utm_campaign=issue-${issue.issueNumber}&utm_content=upgrade" style="display: inline-block; padding: 12px 24px; background-color: #FF6B35; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px;">
                Join the Academy — $99
              </a>
            </div>
          </td>
        </tr>
    `
    : ''

  // Framework steps if provided
  const frameworkSteps = issue.framework.steps
    ? `<ol style="margin: 15px 0; padding-left: 20px; color: #0A0A0A; font-size: 14px; line-height: 1.8;">
        ${issue.framework.steps.map((step) => `<li>${step}</li>`).join('')}
      </ol>`
    : ''

  return `${EMAIL_WRAPPER_START}
${HEADER_HTML}
    <!-- Issue Header -->
    <tr>
      <td style="padding: 10px 30px 20px;">
        <p style="margin: 0; color: #737373; font-size: 13px;">
          Issue #${issue.issueNumber} • ${issue.date}${academyBadge}
        </p>
      </td>
    </tr>

    <!-- The Big Idea -->
    <tr>
      <td style="padding: 0 30px 30px;">
        <h2 style="margin: 0 0 5px; color: #FF6B35; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
          THE BIG IDEA
        </h2>
        <h3 style="margin: 0 0 15px; color: #0A0A0A; font-size: 20px; font-weight: bold;">
          ${issue.bigIdea.title}
        </h3>
        <p style="margin: 0; color: #0A0A0A; font-size: 15px; line-height: 1.7;">
          ${issue.bigIdea.content}
        </p>
      </td>
    </tr>

    <!-- Divider -->
    <tr>
      <td style="padding: 0 30px;">
        <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 0 0 30px;">
      </td>
    </tr>

    <!-- Framework of the Month -->
    <tr>
      <td style="padding: 0 30px 30px;">
        <h2 style="margin: 0 0 5px; color: #FF6B35; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
          FRAMEWORK
        </h2>
        <h3 style="margin: 0 0 15px; color: #0A0A0A; font-size: 18px; font-weight: bold;">
          ${issue.framework.name}
        </h3>
        <p style="margin: 0 0 15px; color: #0A0A0A; font-size: 15px; line-height: 1.7;">
          ${issue.framework.description}
        </p>
        ${frameworkSteps}
      </td>
    </tr>

    <!-- Divider -->
    <tr>
      <td style="padding: 0 30px;">
        <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 0 0 30px;">
      </td>
    </tr>

    <!-- Case Study -->
    <tr>
      <td style="padding: 0 30px 30px;">
        <h2 style="margin: 0 0 5px; color: #FF6B35; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
          CASE STUDY
        </h2>
        <h3 style="margin: 0 0 15px; color: #0A0A0A; font-size: 18px; font-weight: bold;">
          ${issue.caseStudy.title}
        </h3>
        <p style="margin: 0 0 10px; color: #0A0A0A; font-size: 15px; line-height: 1.7;">
          <strong>The problem:</strong> ${issue.caseStudy.problem}
        </p>
        <p style="margin: 0 0 10px; color: #0A0A0A; font-size: 15px; line-height: 1.7;">
          <strong>What worked:</strong> ${issue.caseStudy.solution}
        </p>
        <p style="margin: 0; color: #FF6B35; font-size: 15px; line-height: 1.7; font-weight: 600;">
          <strong>Result:</strong> ${issue.caseStudy.result}
        </p>
      </td>
    </tr>

    <!-- Divider -->
    <tr>
      <td style="padding: 0 30px;">
        <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 0 0 30px;">
      </td>
    </tr>

${miloTipHtml}
${graduateEdgeHtml}
${upgradeCta}

    <!-- Closing -->
    <tr>
      <td style="padding: 0 30px 40px;">
        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 15px; line-height: 1.7;">
          ${issue.closingNote}
        </p>
        <p style="margin: 0; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
          See you next month,<br>
          Eddie
        </p>
      </td>
    </tr>

${FOOTER_HTML}
${EMAIL_WRAPPER_END}`
}

// ============================================
// ISSUE #2: Late January 2025
// ============================================
export const NEWSLETTER_ISSUE_2: NewsletterIssue = {
  issueNumber: 2,
  date: 'Late January 2025',
  subject: 'The AI Toolbelt: Who Does What (And Why It Matters)',
  subjectVariants: [
    'Stop using ChatGPT for everything',
    'Your AI toolkit is incomplete',
  ],
  bigIdea: {
    title: 'You\'re leaving massive potential on the table by defaulting to ChatGPT for everything.',
    content: `It's not that ChatGPT is bad. It's that using one tool for every job is like a cinematographer showing up to set with only a 50mm lens. Sure, you can make it work. But you're fighting the tool instead of letting it serve the shot.

The AI landscape has matured. Different models have developed genuine specializations—not just marketing differentiation, but real differences in how they think, what they're good at, and where they fall short.

Understanding this isn't about chasing trends. It's about building a toolkit that actually serves your work.`,
  },
  framework: {
    name: 'The AI Toolbelt',
    description: 'Pick your pack. Build familiarity with 3-4 tools that cover your actual workflow. Use them consistently enough to develop real intuition for when to reach for which one. The goal isn\'t tool maximalism—it\'s tool literacy.',
    steps: [
      '<strong>Claude</strong> — Your thinking partner. Extended analysis, creative writing, complex multi-step instructions, coding. Anything where you need the model to actually <em>think</em> rather than pattern-match.',
      '<strong>Gemini</strong> — Deep research and visual generation. Deep Research mode synthesizes across sources. Veo handles video generation. Strong Google ecosystem integration.',
      '<strong>Grok</strong> — Daily pulse and conversational research. Real-time access to X for current events, trending conversations, understanding what\'s happening <em>right now</em>.',
      '<strong>Midjourney</strong> — Visual creation with aesthetic sensibility. Still the leader when you care about output looking <em>good</em>, not just accurate.',
      '<strong>ChatGPT</strong> — The generalist with the widest plugin ecosystem. Fine for quick queries and third-party integrations. Usually not first choice for serious work.',
    ],
  },
  caseStudy: {
    title: 'Field Notes: Real-World Tool Selection',
    problem:
      'This cycle I was deep in production work while pushing ID8Composer toward v1.1 release. Needed research, writing, and daily awareness without context-switching overhead.',
    solution:
      'Claude handles 80% of my knowledge work—story development, document analysis, strategic thinking, this newsletter. Grok became my morning ritual for staying current without doom-scrolling. Gemini\'s Deep Research mode saved me hours on a competitive analysis.',
    result: 'The tools are good enough now that the bottleneck isn\'t capability—it\'s knowing which tool to reach for.',
  },
  miloTip: {
    title: 'The Tool Selection Prompt',
    prompt:
      'I need to [task]. Here are my options: Claude for deep thinking, Gemini for research, Grok for current events, Midjourney for visuals. Which tool and why? Be specific about the tradeoffs.',
    explanation:
      'Use this when you\'re unsure which AI to reach for. Let one AI help you pick the right AI for the job.',
  },
  graduateEdge: {
    title: 'Noise Filter: What to Ignore This Week',
    content:
      'Skip the constant release cycle ship fatigue—the people doing great work aren\'t chasing every update. Codex hype: if you\'re doing serious coding, Claude/Gemini is proving more capable in practice. The Ralph Wiggum Protocol is powerful but will eat your tokens—use sparingly for mechanical tasks with clear completion criteria.',
  },
  closingNote: 'That\'s Issue #2. You don\'t need to master every tool. But you do need to understand what each one is actually good at—and stop forcing your primary tool to do jobs it wasn\'t built for.',
}

// ============================================
// ISSUE #1: January 2025
// ============================================
export const NEWSLETTER_ISSUE_1: NewsletterIssue = {
  issueNumber: 1,
  date: 'January 2025',
  subject: 'The one question that kills most ideas (and what to ask instead)',
  subjectVariants: [
    'The Innovation Brief #1 is here',
    'A better question for your next idea',
  ],
  bigIdea: {
    title: '"Is this a good idea?"',
    content: `This is the question that kills most innovation before it starts.

It's the wrong question. Here's why:

"Good" is subjective. It invites opinion. It triggers debate. And debate is where momentum goes to die.

The better question: <strong>"What would have to be true for this to work?"</strong>

This shifts the conversation from judgment to discovery. Instead of defending an idea, you're mapping its conditions.

Try it in your next meeting. Watch what happens.`,
  },
  framework: {
    name: 'The Assumption Stack',
    description:
      'Before you build anything, list your assumptions in order of risk. Validate Level 1 before touching Level 2. Most failed products skip straight to Level 3.',
    steps: [
      '<strong>Level 1: Market assumptions</strong> — "People have this problem"',
      '<strong>Level 2: Solution assumptions</strong> — "This approach solves it"',
      '<strong>Level 3: Business assumptions</strong> — "They\'ll pay for it"',
    ],
  },
  caseStudy: {
    title: 'The $40K Mistake We Didn\'t Make',
    problem:
      'Last quarter, we almost built a feature nobody asked for. The assumption: "Users want AI-generated reports."',
    solution:
      'We ran 5 customer calls before writing a single line of code. The reality: They wanted fewer reports, not more.',
    result: 'Cost: $0 and 3 hours. Savings: ~$40K in dev time.',
  },
  miloTip: {
    title: 'The Pre-Mortem Prompt',
    prompt:
      'Run a pre-mortem on [your project]. List the top 5 reasons this could fail and what early warning signs to watch for.',
    explanation:
      'This surfaces blind spots you didn\'t know you had. Use it before starting any significant project.',
  },
  graduateEdge: {
    title: 'The Validation Sprint Template',
    content:
      'This month\'s download: Our internal 5-day validation sprint template. It\'s the exact process we use before greenlighting any new feature.',
    downloadLink: 'https://id8labs.app/academy/resources/validation-sprint',
  },
  closingNote: 'That\'s Issue #1. The Assumption Stack alone has saved us countless hours of wasted work. Try it on your next idea.',
}
