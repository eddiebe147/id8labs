'use client'

import { m } from '@/components/motion'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Icons
const DownloadIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

// Icons for challenges
const RocketIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

const ShareIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
)

const DeepDiveIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 12h20M12 2a10 10 0 0 1 10 10M12 2a10 10 0 0 0-10 10" />
  </svg>
)

// Action Plan Data
const actionPlans: Record<string, {
  level: string
  score: string
  tagline: string
  color: string
  colorLight: string
  insight: string
  insightExamples?: { wrong: string; right: string }
  firstChallenge: {
    time: string
    task: string
    sharePrompt: string
  }
  deeperChallenge: {
    time: string
    task: string
    outcome: string
    sharePrompt: string
  }
  weeks: { title: string; tasks: string[] }[]
  readyChecklist: string[]
  ctaTitle: string
  ctaDescription: string
  ctaLink: string
  ctaLinkText: string
  freeResource?: { title: string; url: string }
}> = {
  explorer: {
    level: 'Explorer',
    score: '5-8',
    tagline: "You're starting fresh. That's an advantage - no bad habits to unlearn.",
    color: '#3B82F6',
    colorLight: 'rgba(59, 130, 246, 0.1)',
    insight: "Claude Code isn't a chatbot - it's a junior developer who reads everything before typing.",
    insightExamples: {
      wrong: '"How do I parse JSON in Node.js?"',
      right: '"Parse data.json and extract all email addresses into a CSV"'
    },
    firstChallenge: {
      time: '5 min',
      task: 'Open any project folder. Ask Claude: "Find all TODO comments in this project and create a markdown checklist I can work through." Watch it navigate, search, and format without you touching the keyboard.',
      sharePrompt: 'Just had Claude scan my entire codebase for TODOs in 30 seconds. Found 23 I forgot about. #id8labs #ClaudeCode'
    },
    deeperChallenge: {
      time: '30 min',
      task: 'Build a "Morning Standup" script. Ask Claude: "Create a shell script that shows me: git changes from yesterday, any new TODO comments, and failed tests. Save it to scripts/standup.sh"',
      outcome: 'A reusable script you\'ll actually run every morning. This is building WITH Claude, not just asking questions.',
      sharePrompt: 'Built my own standup automation with Claude. No copy-pasting. Just "do this" and it did. Here\'s what I learned: #id8labs #BuildInPublic'
    },
    weeks: [
      {
        title: 'Setup',
        tasks: [
          'Install Claude Code: npm install -g @anthropic-ai/claude-code',
          'Create ~/.claude/CLAUDE.md with your preferences',
          'Test: Ask Claude to rename a batch of files'
        ]
      },
      {
        title: 'First Hook',
        tasks: [
          'Clone the ID8Labs Hooks Starter Kit from GitHub',
          'Start with auto-approve-safe hook',
          'Approves read operations, prompts for destructive ones'
        ]
      },
      {
        title: 'First MCP Server',
        tasks: [
          'Install filesystem MCP: npm install -g @modelcontextprotocol/server-filesystem',
          'Install git MCP: npm install -g @modelcontextprotocol/server-git',
          'Claude can now navigate your project and manage version control'
        ]
      },
      {
        title: 'Build Something Real',
        tasks: [
          'Pick a project you\'ll actually use',
          'CLI tool, file organizer, or simple API',
          'Use Claude for the entire build. Commit with git. Ship it.'
        ]
      }
    ],
    readyChecklist: [
      'Claude runs commands without permission prompts',
      'You have a working CLAUDE.md with your preferences',
      "You've shipped one complete project with Claude",
      'You think in "tasks" not "questions"'
    ],
    ctaTitle: 'Hit a Wall?',
    ctaDescription: 'Most Explorers get stuck on context setup - Claude keeps forgetting your preferences.',
    ctaLink: 'https://discord.gg/id8labs',
    ctaLinkText: 'Join #explorer-help on Discord',
    freeResource: {
      title: 'ID8Labs Hooks Starter Kit',
      url: 'https://github.com/eddiebelaval/id8labs-starter'
    }
  },
  adopter: {
    level: 'Adopter',
    score: '9-13',
    tagline: "You use AI daily, but it's still ask-answer-copy-paste. Time to delegate.",
    color: '#F59E0B',
    colorLight: 'rgba(245, 158, 11, 0.1)',
    insight: 'The shift from assistance to delegation is the shift from "help me with X" to "do X and show me the result."',
    firstChallenge: {
      time: '10 min',
      task: 'Find a pattern you repeat in Claude conversations (like "use TypeScript" or "add error handling"). Create a CLAUDE.md file in your project with that rule. Test it by starting a fresh conversation - does Claude follow it without being told?',
      sharePrompt: 'Finally codified my coding preferences in CLAUDE.md. No more repeating myself. This is how context should work. #id8labs #ClaudeCode'
    },
    deeperChallenge: {
      time: '1 hour',
      task: 'Build a "Code Review Agent" workflow: Create a CLAUDE.md that defines how you want PRs reviewed - what to check, what to ignore, your team\'s patterns. Then ask Claude to review your last 3 commits using those rules.',
      outcome: 'A reusable code review system that knows your standards. Your context file becomes institutional knowledge.',
      sharePrompt: 'Turned my code review checklist into a Claude workflow. Same standards, every time, without me nagging. Here\'s the CLAUDE.md: #id8labs #BuildInPublic'
    },
    weeks: [
      {
        title: 'Fix Context Rot',
        tasks: [
          'Create project-specific CLAUDE.md files',
          'Include: Stack, Key Files, Patterns',
          'Test: Start fresh conversation - does Claude follow your patterns?'
        ]
      },
      {
        title: 'Install MCPs That Matter',
        tasks: [
          '3-4 servers max: Filesystem, Git, Database, Brave Search',
          'Test each with a real task',
          '"Find all TODO comments" or "Show commits from last week"'
        ]
      },
      {
        title: 'The PEV Pattern',
        tasks: [
          'Plan: Before changes, Claude tells you what and why',
          'Execute: Make the changes',
          'Verify: Run tests, check for type errors, confirm it worked'
        ]
      },
      {
        title: 'Basic Governance',
        tasks: [
          'Create AGENT_LOG.md in your project',
          'Track: What you asked, tools used, outcome, time saved',
          'Review weekly. Double down on what works.'
        ]
      }
    ],
    readyChecklist: [
      'Context files are comprehensive and maintained',
      'You delegate entire workflows, not individual tasks',
      'PEV is automatic in your workflow',
      'You can show concrete time savings'
    ],
    ctaTitle: 'Hit a Wall?',
    ctaDescription: 'Most Adopters struggle with context rot (outdated CLAUDE.md) or over-trusting without verification.',
    ctaLink: 'https://cal.com/id8labs/adopter-audit',
    ctaLinkText: 'Book a Workflow Audit ($500)',
    freeResource: {
      title: 'Agentic Architecture Patterns',
      url: 'https://id8labs.app/resources/agentic-patterns'
    }
  },
  practitioner: {
    level: 'Practitioner',
    score: '14-17',
    tagline: "You're ahead of 90% of developers. Now make it reliable, secure, and repeatable.",
    color: '#10B981',
    colorLight: 'rgba(16, 185, 129, 0.1)',
    insight: "Multi-agent isn't about more agents - it's about specialized agents with clear handoffs.",
    firstChallenge: {
      time: '15 min',
      task: 'Create two agent profiles in separate CLAUDE.md files: a "Builder" (optimizes for speed, accepts reasonable risk) and an "Auditor" (paranoid, checks everything, assumes code is wrong). Run the same task with each. Notice how the same prompt produces different results.',
      sharePrompt: 'Split my Claude workflow into Builder + Auditor profiles. Same prompt, wildly different outputs. This is how you get speed AND safety. #id8labs #AgenticAI'
    },
    deeperChallenge: {
      time: '2 hours',
      task: 'Build a "Security Gate" hook that runs before any git commit. It should: scan for API keys/secrets, check for console.log statements, verify no TODO comments in critical files. Use the ID8Labs Hooks Starter as a base. Open source it.',
      outcome: 'A production-ready security hook others can use. Your first contribution to the agentic ecosystem.',
      sharePrompt: 'Just open-sourced my pre-commit security hook for Claude Code. Catches secrets, debug logs, and unfinished TODOs. Link in thread. #id8labs #OpenSource'
    },
    weeks: [
      {
        title: 'Define Agent Roles',
        tasks: [
          'Create agent-roles.md with: Agent, Purpose, MCPs, Restrictions',
          'Builder (feature dev), Security (audits), Operations (deploys), Docs',
          'Each agent gets its own CLAUDE.md profile'
        ]
      },
      {
        title: 'Security Hardening',
        tasks: [
          'Audit every MCP: least-privilege, path restrictions, rate limiting',
          'Add "Never Auto-Approve" rules: rm -rf, sudo, production changes',
          'Test by trying to break your own rules'
        ]
      },
      {
        title: 'Monitoring & Observability',
        tasks: [
          'Track weekly: Tasks completed vs failed, tokens/cost, time saved',
          'Set alerts: policy violations, repeated failures, cost spikes',
          'Know what your agents are actually doing'
        ]
      },
      {
        title: 'Team Patterns',
        tasks: [
          'Document workflows as playbooks',
          'Example: Builder creates branch → Security audits → Docs updates → Operations deploys',
          'Create setup script: new team members running in <30 minutes'
        ]
      }
    ],
    readyChecklist: [
      'Multiple specialized agents working in coordination',
      'Security hardening in production',
      'Monitoring and cost tracking active',
      'Team-wide adoption with documented patterns'
    ],
    ctaTitle: 'Hit a Wall?',
    ctaDescription: 'Most Practitioners struggle with over-engineering orchestration or ignoring cost at scale.',
    ctaLink: 'https://cal.com/id8labs/practitioner-consult',
    ctaLinkText: 'Book Architecture Consultation ($5k)',
    freeResource: {
      title: 'MCP Security Checklist',
      url: 'https://id8labs.app/resources/MCP_Security_Checklist.md'
    }
  },
  pioneer: {
    level: 'Pioneer',
    score: '18-20',
    tagline: "You're not reading this for instructions. You're reading it to see if I know what I'm talking about.",
    color: '#FF6B35',
    colorLight: 'rgba(255, 107, 53, 0.1)',
    insight: "The bottleneck isn't technology - it's shared knowledge.",
    firstChallenge: {
      time: '30 min',
      task: 'Write down one pattern you\'ve discovered that isn\'t documented anywhere. Could be an orchestration trick, a cost optimization, a security pattern. 500 words. Post it publicly.',
      sharePrompt: 'Documenting an agentic pattern I discovered that I haven\'t seen written up anywhere. Thread: #id8labs #AgenticAI'
    },
    deeperChallenge: {
      time: '1 week',
      task: 'Build and open-source something the ecosystem needs: an MCP server for a service that doesn\'t have one, a hook pattern that solves a common problem, or a monitoring solution for agent costs. Ship it, document it, share it.',
      outcome: 'A genuine contribution to the agentic ecosystem. At Pioneer level, the best way to learn is to build what doesn\'t exist yet.',
      sharePrompt: 'Just shipped [tool name] - an open-source [description]. Built because I needed it and couldn\'t find it. Hope it helps others. #id8labs #OpenSource'
    },
    weeks: [
      {
        title: 'Identify Your Bottleneck',
        tasks: [
          'What\'s actually slowing you down?',
          'Observability? Cost? Trust? Scale? Security?',
          'Pick one. Focus there.'
        ]
      },
      {
        title: 'Study Adjacent Industries',
        tasks: [
          'GitOps, Service Meshes, OPA/Kyverno, Kubecost',
          'These solved similar problems for infrastructure',
          'Steal patterns. Adapt for agents.'
        ]
      },
      {
        title: 'Build in Public',
        tasks: [
          'Case studies, architecture diagrams, open-source MCPs',
          'The ecosystem is tiny - you can shape it',
          'Attract your peer group'
        ]
      },
      {
        title: 'Find Your People',
        tasks: [
          'ID8Labs Pioneer channel, Anthropic Enterprise Forum',
          'MCP Working Group',
          'At this level, you need sparring partners, not tutorials'
        ]
      }
    ],
    readyChecklist: [
      'You\'re defining production patterns others will follow',
      'Your agents run without you watching',
      'You\'ve open-sourced something the ecosystem needed',
      'Other Pioneers know your name'
    ],
    ctaTitle: "Let's Talk",
    ctaDescription: "At this level, you're not looking for tutorials. You're looking for a sparring partner.",
    ctaLink: 'https://cal.com/id8labs/pioneer-chat',
    ctaLinkText: 'Book a Strategy Session',
    freeResource: undefined
  }
}

// What's Coming section for Pioneer
const futureOpportunities = [
  { trend: 'Agent Marketplaces', opportunity: 'Package and sell specialized agents' },
  { trend: 'Agent Mesh Architectures', opportunity: 'Build the orchestration layer' },
  { trend: 'Agent-Native IDEs', opportunity: 'Build tooling for agent-first workflows' },
  { trend: 'Regulatory Clarity', opportunity: 'Be the compliant option before rules exist' },
  { trend: 'Cost Optimization Tools', opportunity: 'Build Kubecost for agents' },
]

export default function ActionPlanPage({ params }: { params: { level: string } }) {
  const { level } = params
  const plan = actionPlans[level.toLowerCase()]

  if (!plan) {
    notFound()
  }

  const isPioneer = level.toLowerCase() === 'pioneer'

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-zone-text">
        <div className="container">
          <m.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl"
          >
            <m.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <span
                className="text-sm font-mono uppercase tracking-widest px-3 py-1 rounded-md"
                style={{ backgroundColor: plan.colorLight, color: plan.color }}
              >
                {plan.level} Level
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                Score: {plan.score}
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-bold tracking-tight mb-6"
            >
              {plan.level} Action Plan
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] max-w-2xl mb-8 leading-relaxed"
            >
              {plan.tagline}
            </m.p>

            <m.div variants={fadeUp} className="flex gap-4 flex-wrap">
              <a
                href={`/resources/action-plans/${level.toLowerCase()}.pdf`}
                className="btn btn-primary hover-lift group inline-flex items-center gap-2"
                download
              >
                <DownloadIcon />
                Download PDF
              </a>
              <Link
                href="#roadmap"
                className="btn btn-secondary hover-lift"
              >
                View Roadmap
              </Link>
            </m.div>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* The One Thing Section */}
      <section className="section-spacing border-b border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-6">
              The One Thing to Understand
            </p>
            <blockquote
              className="text-2xl md:text-3xl font-bold leading-snug mb-8 relative"
              style={{ color: plan.color }}
            >
              <span className="absolute -left-4 -top-2 text-6xl opacity-20">"</span>
              {plan.insight}
              <span className="absolute -right-4 bottom-0 text-6xl opacity-20">"</span>
            </blockquote>

            {plan.insightExamples && (
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-sm font-mono text-red-400 mb-2">Don't do this</p>
                  <p className="text-[var(--text-secondary)]">{plan.insightExamples.wrong}</p>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-sm font-mono text-green-400 mb-2">Do this</p>
                  <p className="text-[var(--text-secondary)]">{plan.insightExamples.right}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Your First Challenge */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-3xl mx-auto"
          >
            <m.div variants={fadeUp} className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: plan.colorLight }}>
                <span style={{ color: plan.color }}><RocketIcon /></span>
                <span className="text-sm font-mono" style={{ color: plan.color }}>{plan.firstChallenge.time}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Your First Challenge
              </h2>
            </m.div>

            <m.div variants={fadeUp} className="card border-2" style={{ borderColor: plan.colorLight }}>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                {plan.firstChallenge.task}
              </p>

              <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
                <div className="flex items-start gap-3">
                  <span style={{ color: plan.color }} className="mt-1 flex-shrink-0"><ShareIcon /></span>
                  <div>
                    <p className="text-sm font-mono text-[var(--text-tertiary)] mb-2">Share your win:</p>
                    <p className="text-sm text-[var(--text-secondary)] italic">"{plan.firstChallenge.sharePrompt}"</p>
                  </div>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* 30-Day Roadmap */}
      <section id="roadmap" className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest mb-4" style={{ color: plan.color }}>
              Your 30-Day Focus
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Week by Week Roadmap
            </h2>
          </div>

          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {plan.weeks.map((week, index) => (
              <m.div
                key={index}
                variants={fadeUp}
                className="card"
              >
                <div
                  className="text-xs font-mono uppercase tracking-widest mb-3"
                  style={{ color: plan.color }}
                >
                  Week {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-4">{week.title}</h3>
                <ul className="space-y-3">
                  {week.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <span style={{ color: plan.color }} className="mt-0.5 flex-shrink-0">
                        <CheckIcon />
                      </span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Want to Go Deeper? */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-3xl mx-auto"
          >
            <m.div variants={fadeUp} className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: plan.colorLight }}>
                <span style={{ color: plan.color }}><DeepDiveIcon /></span>
                <span className="text-sm font-mono" style={{ color: plan.color }}>{plan.deeperChallenge.time}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Want to Go Deeper?
              </h2>
            </m.div>

            <m.div variants={fadeUp} className="card">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">The Challenge</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {plan.deeperChallenge.task}
                </p>
              </div>

              <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: plan.colorLight }}>
                <h4 className="text-sm font-mono mb-2" style={{ color: plan.color }}>What You'll Build</h4>
                <p className="text-[var(--text-primary)]">
                  {plan.deeperChallenge.outcome}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
                <div className="flex items-start gap-3">
                  <span style={{ color: plan.color }} className="mt-1 flex-shrink-0"><ShareIcon /></span>
                  <div>
                    <p className="text-sm font-mono text-[var(--text-tertiary)] mb-2">Share your work:</p>
                    <p className="text-sm text-[var(--text-secondary)] italic">"{plan.deeperChallenge.sharePrompt}"</p>
                  </div>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Pioneer-only: What's Coming */}
      {isPioneer && (
        <section className="section-spacing border-t border-[var(--border)]">
          <div className="container">
            <div className="text-center mb-12">
              <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                2025-2026 Trends
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                What's Coming
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="overflow-hidden rounded-lg border border-[var(--border)]">
                <table className="w-full">
                  <thead className="bg-[var(--bg-secondary)]">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-mono uppercase tracking-wider text-[var(--text-tertiary)]">Trend</th>
                      <th className="px-6 py-4 text-left text-sm font-mono uppercase tracking-wider text-[var(--text-tertiary)]">Opportunity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {futureOpportunities.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 font-semibold">{item.trend}</td>
                        <td className="px-6 py-4 text-[var(--text-secondary)]">{item.opportunity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Ready Checklist */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-sm font-mono uppercase tracking-widest mb-4" style={{ color: plan.color }}>
                Level Up Checklist
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                You're Ready for {plan.level === 'Pioneer' ? 'Enterprise' : 'Next'} Level When...
              </h2>
            </div>

            <m.ul
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-4"
            >
              {plan.readyChecklist.map((item, index) => (
                <m.li
                  key={index}
                  variants={fadeUp}
                  className="flex items-center gap-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)]"
                >
                  <div
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: plan.color }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: plan.color }} />
                  </div>
                  <span className="text-[var(--text-secondary)]">{item}</span>
                </m.li>
              ))}
            </m.ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing-lg bg-[var(--bg-secondary)] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-[radial-gradient(circle,var(--id8-orange-light)_0%,transparent_70%)] opacity-30 pointer-events-none" />

        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {plan.ctaTitle}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8">
              {plan.ctaDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {plan.freeResource && (
                <a
                  href={plan.freeResource.url}
                  className="btn btn-secondary hover-lift"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Free: {plan.freeResource.title}
                </a>
              )}
              <a
                href={plan.ctaLink}
                className="btn btn-primary hover-lift group inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {plan.ctaLinkText}
                <ArrowRightIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-8 border-t border-[var(--border)]">
        <div className="container">
          <p className="text-center text-sm text-[var(--text-tertiary)]">
            Built by{' '}
            <Link href="/" className="text-id8-orange hover:underline">
              ID8Labs
            </Link>
            {' '}— Tools for Builders
          </p>
        </div>
      </section>
    </div>
  )
}
