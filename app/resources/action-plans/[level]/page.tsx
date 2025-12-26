'use client'

import { motion } from 'framer-motion'
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

// Action Plan Data
const actionPlans: Record<string, {
  level: string
  score: string
  tagline: string
  color: string
  colorLight: string
  insight: string
  insightExamples?: { wrong: string; right: string }
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
      url: 'https://github.com/eddiebe147/id8labs-starter'
    }
  },
  adopter: {
    level: 'Adopter',
    score: '9-13',
    tagline: "You use AI daily, but it's still ask-answer-copy-paste. Time to delegate.",
    color: '#F59E0B',
    colorLight: 'rgba(245, 158, 11, 0.1)',
    insight: 'The shift from assistance to delegation is the shift from "help me with X" to "do X and show me the result."',
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
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <span
                className="text-sm font-mono uppercase tracking-widest px-3 py-1 rounded-md"
                style={{ backgroundColor: plan.colorLight, color: plan.color }}
              >
                {plan.level} Level
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                Score: {plan.score}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-bold tracking-tight mb-6"
            >
              {plan.level} Action Plan
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] max-w-2xl mb-8 leading-relaxed"
            >
              {plan.tagline}
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-4 flex-wrap">
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
            </motion.div>
          </motion.div>
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

      {/* 30-Day Roadmap */}
      <section id="roadmap" className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest mb-4" style={{ color: plan.color }}>
              Your 30-Day Focus
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Week by Week Roadmap
            </h2>
          </div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {plan.weeks.map((week, index) => (
              <motion.div
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
              </motion.div>
            ))}
          </motion.div>
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

            <motion.ul
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-4"
            >
              {plan.readyChecklist.map((item, index) => (
                <motion.li
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
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing-lg bg-[var(--bg-secondary)] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--id8-orange-light)_0%,transparent_70%)] opacity-30 pointer-events-none" />

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
