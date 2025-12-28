'use client'

import Link from 'next/link'
import { motion, useInView } from '@/components/motion'
import { useRef, useState, useEffect } from 'react'

// Section data for navigation
const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'skills', title: 'The 8 Skills' },
  { id: 'decay', title: 'Decay Mechanics' },
  { id: 'gates', title: 'Stage Gates' },
  { id: 'today', title: 'Daily Operations' },
  { id: 'flow', title: 'Pipeline Flow' },
  { id: 'philosophy', title: 'Philosophy' },
  { id: 'stats', title: 'By the Numbers' },
]

const skills = [
  {
    name: 'Tracker',
    purpose: 'Pipeline Heartbeat',
    description: 'Tracks all projects through lifecycle states, enforces quality gates, calculates decay, generates dashboards',
  },
  {
    name: 'Scout',
    purpose: 'Market Validation',
    description: 'TAM/SAM/SOM analysis, competitive teardowns, community signal mining. Delivers BUILD/PIVOT/KILL verdicts',
  },
  {
    name: 'Architect',
    purpose: 'Technical Design',
    description: 'System architecture, stack selection, database patterns, API design. Outputs build roadmaps in phases',
  },
  {
    name: 'Launch',
    purpose: 'Go-to-Market',
    description: 'Positioning, pricing, messaging, launch sequencing. Platform playbooks for Product Hunt, HN, Reddit',
  },
  {
    name: 'Growth',
    purpose: 'Scale Engine',
    description: 'Growth loops, analytics frameworks, acquisition channels, retention optimization, A/B testing',
  },
  {
    name: 'Ops',
    purpose: 'Operations Systems',
    description: 'SOP creation, delegation frameworks, customer success, team building. If twice, document. If ten times, automate',
  },
  {
    name: 'Exit',
    purpose: 'Exit Preparation',
    description: 'Valuation methods, due diligence prep, data room checklists, term sheet analysis',
  },
  {
    name: 'Today',
    purpose: 'Daily Operations',
    description: '14 productivity methods with context-aware suggestions. Manages tasks across projects, TV production, and life',
  },
]

const lifecycleStates = [
  { state: 'CAPTURED', decay: '14 days', description: 'Raw idea logged' },
  { state: 'VALIDATING', decay: '7 days', description: 'Scout running research' },
  { state: 'VALIDATED', decay: '14 days', description: 'Ready for architecture' },
  { state: 'ARCHITECTING', decay: '14 days', description: 'Technical design' },
  { state: 'BUILDING', decay: '90 days', description: 'Active development' },
  { state: 'LAUNCHING', decay: '30 days', description: 'Go-to-market' },
  { state: 'GROWING', decay: '180 days', description: 'Scale and optimize' },
  { state: 'OPERATING', decay: '365 days', description: 'Generating revenue' },
  { state: 'EXITING', decay: '180 days', description: 'Exit in progress' },
  { state: 'EXITED', decay: '∞', description: 'Successfully sold' },
]

const methods = [
  'Eisenhower Matrix',
  'GTD',
  'Pomodoro',
  'Eat the Frog',
  'Time Blocking',
  'Ivy Lee',
  '1-3-5 Rule',
  'Must-Should-Could',
  'Energy Mapping',
  'Weekly Themes',
  'Personal Kanban',
  'Two-Minute Rule',
  'Batching',
  'Hybrid Recipes',
]

// Fade-in animation component
function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Sticky section header component
function StickySection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-32">
      <div className="sticky top-20 z-10 mb-6 -mx-4 px-4 py-4 backdrop-blur-md bg-[var(--bg-primary)]/80 rounded-subtle">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <FadeInSection>
        <div>{children}</div>
      </FadeInSection>
    </section>
  )
}

// Side navigation component
function SideNavigation({ activeSection }: { activeSection: string }) {
  return (
    <nav className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-20">
      <ul className="space-y-4">
        {sections.map((section) => {
          const isActive = activeSection === section.id
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="group flex items-center gap-3 text-sm transition-all"
                aria-label={`Jump to ${section.title}`}
              >
                <div
                  className={`h-2 rounded-full transition-all ${
                    isActive
                      ? 'w-12 bg-id8-orange'
                      : 'w-8 bg-[var(--border)] group-hover:w-10 group-hover:bg-[var(--text-secondary)]'
                  }`}
                />
                <span
                  className={`transition-all ${
                    isActive
                      ? 'text-id8-orange font-medium opacity-100'
                      : 'text-[var(--text-secondary)] opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {section.title}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default function PipelineContent() {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id)
            }
          })
        },
        {
          rootMargin: '-20% 0px -60% 0px',
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <div className="container py-24 relative">
      <SideNavigation activeSection={activeSection} />

      <article className="max-w-4xl mx-auto">
        {/* Back Link */}
        <FadeInSection>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-12 transition-colors rounded-gentle"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to products
          </Link>
        </FadeInSection>

        {/* Header */}
        <header className="mb-16">
          <FadeInSection>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <h1>Pipeline</h1>
              <span className="text-sm px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full">
                Internal Tooling
              </span>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <p className="text-2xl text-[var(--text-secondary)] mb-4">
              Complete Idea-to-Exit Lifecycle Management
            </p>
            <p className="text-xl text-[var(--text-tertiary)]">
              Structure creates momentum. Every stage has a clear exit.
            </p>
          </FadeInSection>
        </header>

        {/* Problem Statement */}
        <StickySection id="overview" title="Overview">
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              I kept starting projects that never shipped. Great ideas would decay into guilt.
              Some projects moved too fast and launched half-baked. Others got stuck in endless
              "research" that was really just procrastination.
            </p>
            <p>
              The problem wasn't motivation. It was systems.
            </p>
            <p>
              So I built the operating system for building products. Not project management
              software—a thinking framework implemented as AI agents that know what questions
              to ask at each stage, what gates to enforce, and when to push back.
            </p>
          </div>
        </StickySection>

        {/* The 8 Skills */}
        <StickySection id="skills" title="The 8 Skills">
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="flex items-start gap-4 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft"
              >
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] rounded-full font-bold text-sm">
                  {index + 1}
                </span>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg">{skill.name}</h3>
                    <span className="text-sm text-[var(--text-tertiary)]">— {skill.purpose}</span>
                  </div>
                  <p className="text-[var(--text-secondary)]">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </StickySection>

        {/* Decay Mechanics */}
        <StickySection id="decay" title="Decay Mechanics">
          <div className="p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
            <p className="text-[var(--text-secondary)] mb-6">
              Ideas that don't move forward decay. Each lifecycle state has a decay window. At 50%,
              you get a warning. At 100%, the project freezes to ICE status. This isn't punishment—it's
              forcing functions. If a project keeps decaying, maybe it shouldn't exist.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {lifecycleStates.slice(0, 5).map((item) => (
                <div key={item.state} className="text-center p-3 bg-[var(--bg-primary)] rounded-soft">
                  <p className="font-mono text-sm font-bold text-[var(--id8-orange)]">{item.state}</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-1">{item.decay}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3">
              {lifecycleStates.slice(5).map((item) => (
                <div key={item.state} className="text-center p-3 bg-[var(--bg-primary)] rounded-soft">
                  <p className="font-mono text-sm font-bold text-[var(--id8-orange)]">{item.state}</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-1">{item.decay}</p>
                </div>
              ))}
            </div>
          </div>
        </StickySection>

        {/* Stage Gates */}
        <StickySection id="gates" title="Stage Gates">
          <div className="space-y-6">
            <p className="text-lg text-[var(--text-secondary)]">
              You can't skip ahead. Each transition has requirements that must be met:
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex gap-3">
                <span className="text-[var(--id8-orange)]">•</span>
                <span><strong>CAPTURED → VALIDATING:</strong> Scout must be invoked with clear problem statement</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--id8-orange)]">•</span>
                <span><strong>VALIDATING → VALIDATED:</strong> Scout must return BUILD verdict (not PIVOT or KILL)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--id8-orange)]">•</span>
                <span><strong>VALIDATED → ARCHITECTING:</strong> Architect must be invoked with validation report</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--id8-orange)]">•</span>
                <span><strong>ARCHITECTING → BUILDING:</strong> Architecture doc and build roadmap must exist</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--id8-orange)]">•</span>
                <span><strong>BUILDING → LAUNCHING:</strong> Product must be deployed and functional</span>
              </li>
            </ul>
          </div>
        </StickySection>

        {/* Today */}
        <StickySection id="today" title="Daily Operations: 14 Productivity Methods">
          <div className="space-y-6">
            <p className="text-lg text-[var(--text-secondary)]">
              Today manages tasks across three domains—projects, TV production, and life admin.
              It suggests the right productivity method based on your current context: energy level,
              task volume, and resistance patterns.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {methods.map((method) => (
                <div
                  key={method}
                  className="p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft text-center text-sm"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </StickySection>

        {/* Pipeline Flow Diagram */}
        <StickySection id="flow" title="The Pipeline Flow">
          <div className="p-8 bg-[var(--id8-orange)]/5 border-2 border-[var(--id8-orange)]/20 rounded-soft">
            <div className="font-mono text-sm space-y-2 text-center">
              <p>IDEA</p>
              <p className="text-[var(--text-tertiary)]">↓</p>
              <p><span className="text-[var(--id8-orange)]">Scout</span> → BUILD / PIVOT / KILL</p>
              <p className="text-[var(--text-tertiary)]">↓</p>
              <p><span className="text-[var(--id8-orange)]">Architect</span> → Technical Design</p>
              <p className="text-[var(--text-tertiary)]">↓</p>
              <p>[BUILD] → 11-Stage Code Pipeline</p>
              <p className="text-[var(--text-tertiary)]">↓</p>
              <p><span className="text-[var(--id8-orange)]">Launch</span> → Live Product</p>
              <p className="text-[var(--text-tertiary)]">↓</p>
              <p><span className="text-[var(--id8-orange)]">Growth</span> → Stable Metrics</p>
              <p className="text-[var(--text-tertiary)]">↓</p>
              <p><span className="text-[var(--id8-orange)]">Ops</span> → Systematized Business</p>
              <p className="text-[var(--text-tertiary)]">↓</p>
              <p><span className="text-[var(--id8-orange)]">Exit</span> → Successful Exit</p>
            </div>
            <p className="text-center text-sm text-[var(--text-tertiary)] mt-6">
              Tracker monitors all • Today manages daily execution
            </p>
          </div>
        </StickySection>

        {/* Philosophy */}
        <StickySection id="philosophy" title="Philosophy">
          <div className="space-y-4 text-lg text-[var(--text-secondary)]">
            <p>
              <strong>Decay mechanics:</strong> Ideas that don't move forward decay and freeze.
              This is a feature, not a bug.
            </p>
            <p>
              <strong>Stage gates:</strong> Quality checkpoints prevent premature advancement.
              You can't launch what isn't built.
            </p>
            <p>
              <strong>Calibration:</strong> All estimates assume AI-augmented solo builder,
              not enterprise dev teams with 10 meetings per feature.
            </p>
            <p>
              <strong>Review rituals:</strong> Daily pulse (2 min), weekly review (15 min),
              monthly strategy (30 min). Sustainable discipline.
            </p>
            <p>
              <strong>Skill chaining:</strong> Outputs from one phase feed naturally into the next.
              Scout's validation report becomes Architect's requirements.
            </p>
          </div>
        </StickySection>

        {/* Stats */}
        <StickySection id="stats" title="By the Numbers">
          <div className="p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold text-[var(--id8-orange)]">8</p>
                <p className="text-[var(--text-secondary)]">AI Skills</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[var(--id8-orange)]">14</p>
                <p className="text-[var(--text-secondary)]">Productivity Methods</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[var(--id8-orange)]">10</p>
                <p className="text-[var(--text-secondary)]">Lifecycle States</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[var(--id8-orange)]">83</p>
                <p className="text-[var(--text-secondary)]">Framework Files</p>
              </div>
            </div>
          </div>
        </StickySection>

        {/* Status */}
        <FadeInSection>
          <section className="pt-12 border-t border-[var(--border)]">
            <div className="space-y-4">
              <p className="text-lg text-[var(--text-secondary)]">
                <strong>Status:</strong> Internal tooling at ID8Labs. Dogfooding on every product we build.
              </p>
              <p className="text-lg text-[var(--text-secondary)]">
                <strong>Built with:</strong> Claude Code skills, Memory MCP, Perplexity MCP, Firecrawl MCP,
                Supabase MCP, GitHub MCP
              </p>
              <p className="text-lg text-[var(--text-secondary)]">
                <strong>Subagents:</strong> market-intelligence-analyst, backend-architect, database-architect,
                operations-manager, strategic-think-tank
              </p>
              <p className="text-sm text-[var(--text-tertiary)] mt-6">
                The goal: Make building repeatable, teachable, and finishable.
              </p>
            </div>
          </section>
        </FadeInSection>
      </article>
    </div>
  )
}
