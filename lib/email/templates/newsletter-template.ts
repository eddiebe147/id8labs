// ID8 Newsletter - "Signal:Noise"
// Essay-format newsletter system
// Supports both essay format and legacy structured format

export interface NewsletterSection {
  title: string
  content: string
  academyOnly?: boolean
}

// Legacy structured format (Issues 1-2)
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

// Essay format (Issue 3+)
export interface NewsletterEssay {
  issueNumber: number
  date: string
  subject: string
  subjectVariants?: string[]
  title: string
  subtitle?: string
  heroImage?: string // URL to hero image
  heroAlt?: string   // Alt text for hero image
  author: string
  authorBio?: string
  // Markdown content - will be converted to HTML
  content: string
}

// Union type for all newsletter content
export type NewsletterContent = NewsletterIssue | NewsletterEssay

// Type guard to check if content is an essay
export function isEssay(content: NewsletterContent): content is NewsletterEssay {
  return 'content' in content && !('bigIdea' in content)
}

// Shared styles
const HEADER_HTML = `
    <!-- Header -->
    <tr>
      <td style="padding: 30px 30px 20px; text-align: left;">
        <span style="color: #FF6B35; font-weight: bold; font-size: 20px;">id8</span><span style="color: #0A0A0A; font-weight: bold; font-size: 20px;">Labs</span>
        <span style="color: #737373; font-size: 14px; margin-left: 10px;">Signal:Noise</span>
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

/**
 * Converts markdown-style content to email-safe HTML
 */
function markdownToEmailHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^## (.+)$/gm, '<h2 style="margin: 30px 0 15px; color: #0A0A0A; font-size: 18px; font-weight: bold;">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="margin: 25px 0 12px; color: #0A0A0A; font-size: 16px; font-weight: bold;">$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Horizontal rules
    .replace(/^-----+$/gm, '<hr style="border: none; border-top: 1px solid #E5E5E5; margin: 30px 0;">')
    // Line breaks to paragraphs
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => {
      // Don't wrap if already HTML
      if (p.startsWith('<h') || p.startsWith('<hr') || p.startsWith('<ul') || p.startsWith('<ol')) {
        return p
      }
      return `<p style="margin: 0 0 15px; color: #0A0A0A; font-size: 15px; line-height: 1.7;">${p.replace(/\n/g, '<br>')}</p>`
    })
    .join('\n')
}

/**
 * Generates newsletter HTML for essay-format content
 */
export function generateEssayHtml(essay: NewsletterEssay): string {
  const contentHtml = markdownToEmailHtml(essay.content)

  return `${EMAIL_WRAPPER_START}
${HEADER_HTML}
    <!-- Issue Header -->
    <tr>
      <td style="padding: 10px 30px 10px;">
        <p style="margin: 0; color: #737373; font-size: 13px;">
          Issue #${essay.issueNumber} | ${essay.date}
        </p>
      </td>
    </tr>

    <!-- Title -->
    <tr>
      <td style="padding: 0 30px 10px;">
        <h1 style="margin: 0; color: #0A0A0A; font-size: 24px; font-weight: bold; line-height: 1.3;">
          ${essay.title}
        </h1>
        ${essay.subtitle ? `<p style="margin: 10px 0 0; color: #737373; font-size: 15px; font-style: italic;">${essay.subtitle}</p>` : ''}
      </td>
    </tr>

    <!-- Author -->
    <tr>
      <td style="padding: 0 30px 20px;">
        <p style="margin: 0; color: #737373; font-size: 13px;">
          by ${essay.author}
        </p>
      </td>
    </tr>

    ${essay.heroImage ? `
    <!-- Hero Image -->
    <tr>
      <td style="padding: 0 30px 30px;">
        <img src="${essay.heroImage}" alt="${essay.heroAlt || essay.title}" style="width: 100%; height: auto; border-radius: 8px; display: block;" />
      </td>
    </tr>
    ` : ''}

    <!-- Divider -->
    <tr>
      <td style="padding: 0 30px;">
        <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 0 0 30px;">
      </td>
    </tr>

    <!-- Essay Content -->
    <tr>
      <td style="padding: 0 30px 30px;">
        ${contentHtml}
      </td>
    </tr>

    <!-- Author Bio -->
    ${essay.authorBio ? `
    <tr>
      <td style="padding: 0 30px 40px;">
        <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 0 0 20px;">
        <p style="margin: 0; color: #737373; font-size: 13px; font-style: italic;">
          ${essay.authorBio}
        </p>
      </td>
    </tr>
    ` : ''}

${FOOTER_HTML}
${EMAIL_WRAPPER_END}`
}

// ============================================
// ISSUE #3: January 2026 - Essay Format
// ============================================
export const NEWSLETTER_ESSAY_3: NewsletterEssay = {
  issueNumber: 3,
  date: 'January 2026',
  subject: 'What StarCraft Taught Me About Multi-Agent Workflows',
  subjectVariants: [
    'The muscle memory you already have',
    'RTS skills transfer directly',
  ],
  title: 'What StarCraft Taught Me About Multi-Agent Workflows',
  heroImage: 'https://id8labs.app/images/newsletter/starcraft-claude-code.png',
  heroAlt: 'Claude Code meets StarCraft II - Paradigms of Digital Conflict',
  author: 'Eddie Belaval',
  authorBio: 'Eddie Belaval builds AI-powered creative tools at ID8Labs. He mains Zerg - zergling swarms, specifically. Some patterns run deep.',
  content: `I noticed it last week at 2am.

My left hand was positioned exactly where it's been for fifteen years of StarCraft - thumb on Command, fingers resting on 1 through 4. Except I wasn't warping in Zealots or microing Marines. I was cycling through four Claude Code terminal sessions, each agent working a different part of the same build.

Command-1. Check the frontend agent's progress.
Command-2. Backend agent needs a decision.
Command-3. Testing agent found something.
Command-4. Documentation agent is waiting on context.

Same keystrokes. Same rapid assessment. Same mental model. Same planning loop running underneath it all.

**The muscle memory isn't a coincidence - it's vertical integration.**

-----

## Control Groups Are Just Agent Management

In StarCraft, you bind units to control groups because you can't watch everything at once. You learn to trust that your group-3 units are doing what you told them while you focus on group-1.

Multi-agent workflows work identically. You spin up specialized agents, give them clear objectives, and cycle through to check progress and provide direction. The cognitive load is the same. The switching cost is the same. The skill is knowing *when* to check each group and *what* to look for when you do.

Fifteen years of RTS trained me to:

- Hold multiple parallel processes in working memory
- Make fast assessments with incomplete information
- Know when to micro-manage vs. trust the macro
- Recognize when something's going wrong by *feel* before I see the evidence

-----

## Macro vs. Micro Translates Directly

StarCraft players talk about "macro" (economy, production, expansion) versus "micro" (individual unit control in battles).

In multi-agent work, macro is project architecture, context management, which agents need what information, sequencing. Micro is diving into a specific agent's output, refining a prompt, debugging a particular interaction.

The players who win aren't the ones with the best micro. They're the ones who never let their macro slip while they're microing.

Same principle. If you're so deep in one agent's output that you forget to feed context to the others, your build falls apart. The economy has to keep running.

-----

## The Planning Loop You Already Know

Here's the rhythm that StarCraft burns into your nervous system:

**Scout → Plan → Execute → Verify → Adjust**

You send a probe into their base. You read what they're building. You decide your response. You execute the build. You check if it's working. You re-scout. You adjust. Loop.

Thousands of games. Thousands of repetitions. The loop becomes automatic.

Now watch what happens in a multi-agent workflow:

**Assess → Plan → Execute → Verify → Adjust**

You check the current state across your agents. You decide what needs to happen next and in what order. You dispatch the work. You cycle through outputs and check against intention. You course correct. Loop.

It's the same loop. The one military strategists call OODA (Observe, Orient, Decide, Act). The one competitive players internalize without ever naming it.

StarCraft didn't teach me this loop intellectually. It *installed* it through repetition until it became the default way I process parallel workstreams. That installation is paying dividends now.

-----

## Why I Still Play Zerg

In StarCraft, your faction choice says something about how your brain wants to solve problems.

**Protoss** players build fewer, more powerful units. Each one matters. You micro carefully, position precisely, and make every investment count. Lose a key unit and you feel it.

**Terran** players fortify. They're positional, defensive, methodical. They build walls, siege up, and control space. Grind it out.

**Zerg** players swarm. You build fast, expand aggressively, and overwhelm with volume. Individual units are cheap and expendable. The power is in the collective, the pressure from all angles at once. You accept inefficiency in exchange for speed and coverage.

I've always been Zerg. Zergling floods. Overwhelm the problem. Sacrifice units freely because more are already spawning.

That's exactly how I run multi-agent workflows.

I don't spin up one carefully-crafted agent and nurse it through a task. I spawn multiple lightweight agents, point them at the problem from different angles, and let them swarm it. Some runs are inefficient. Some outputs get thrown away. Doesn't matter - the velocity and coverage more than compensate.

But here's the thing about Zerg that people misunderstand: **the swarm isn't chaos. It's coordinated.**

Fifty zerglings don't each have their own plan. They execute *one* plan in parallel. The power comes from unified intention distributed across many bodies.

That's how I work with agents. I don't spin up a bunch of autonomous agents and let them wander. I develop the plan first - clear objectives, defined scope, understood constraints. Then I swarm it with agents, all running that same plan from different angles. One plan, many executors. The agents aren't thinking strategically; I am. They're executing in parallel what would take me forever to do sequentially.

**The swarm is the amplifier. The plan is the signal.**

This isn't the "right" way. It's *my* way. And I only recognize it now because StarCraft showed me my own pattern thousands of times before I had words for it.

**What's your faction?**

If you've never played StarCraft, maybe you should. Not for the APM or the ladder rank - but because 20 hours in, you'll know something about yourself. You'll discover whether you're the type to build walls or flood the map. Whether you micro three units perfectly or spawn thirty and let them rip.

That self-knowledge transfers. Your agentic workflow style is probably already inside you, waiting for the right interface to reveal it.

-----

## The Fog of War Is Permanent Now

Here's what RTS actually prepares you for that nothing else does: **operating decisively with incomplete information.**

You never see the whole map in StarCraft. You scout, you infer, you make decisions, you adjust when you're wrong. Waiting for perfect information means you've already lost.

AI agents don't give you perfect information either. You're reading outputs, inferring state, making judgment calls about when to intervene and when to let it run. The comfort with ambiguity - that's the real transfer.

-----

## Why I'm Up at 3am Again

I genuinely thought I'd aged out of that intensity. Turns out I was wrong about what caused it.

It wasn't youth. It was **stimulation matching cognition.**

StarCraft kept me up because it demanded exactly the kind of rapid parallel processing my brain apparently craves. For years, nothing else hit that frequency. Work was too slow, too linear, too single-threaded.

Multi-agent workflows plug directly into that same circuit. The same neurons are firing. The same flow state emerges. I'm not fighting my attention - I'm riding it.

If you spent your teens and twenties in RTS games and thought those hours were "wasted," I have good news: you were training for something that didn't exist yet.

-----

## The Tactical Insight

For the builders reading this who have StarCraft hours (or any RTS hours) banked:

1. **Set up your environment for control-group switching.** Terminal tabs, tmux panes, whatever - make Command+1-4 (or your equivalent) actually *do* something useful.
2. **Think in build orders.** Which agent needs to be established before the next one can be effective? Sequencing matters.
3. **Run the loop consciously at first.** Assess → Plan → Execute → Verify → Adjust. It'll become automatic again fast.
4. **Trust your macro instincts.** If something feels off about the overall project even though each individual agent output looks fine, trust that. You've trained that sense.
5. **Don't over-micro.** The urge to constantly check every agent is the same urge that makes bad StarCraft players lose their economy. Set direction, cycle through, intervene only when needed.

You already have the skills. The interface just finally caught up.`,
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
    'Signal:Noise #1 is here',
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
