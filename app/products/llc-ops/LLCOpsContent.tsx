'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// Section data for navigation
const sections = [
  { id: 'intro', title: 'Overview' },
  { id: 'agents', title: 'The 9-Agent System' },
  { id: 'architecture', title: 'The Architecture' },
  { id: 'comparison', title: 'Traditional vs. Agent-Based' },
  { id: 'who-for', title: 'Who This Is For' },
  { id: 'what-you-get', title: 'What You Get' },
  { id: 'cta', title: 'Need a Custom Agent System?' },
]

// Agent data
const agents = [
  {
    name: 'Sentinel',
    role: 'Compliance Radar',
    description: 'Tracks every deadline 90 days out, flags urgency levels, tells you exactly what to do',
  },
  {
    name: 'Ledger',
    role: 'Accounting Strategist',
    description: 'Categorizes expenses for maximum deductions, thinks like a tax manager',
  },
  {
    name: 'Filer',
    role: 'Procedures Expert',
    description: 'Walks through every filing step-by-step with exact URLs, costs, and what to expect',
  },
  {
    name: 'Advisor',
    role: 'Legal/Tax Counsel',
    description: 'Answers LLC questions with confidence levels and clear "when to call a CPA" guidance',
  },
  {
    name: 'Strategist',
    role: 'Tax Optimizer',
    description: 'S-Corp analysis, QBI deductions, retirement accounts, R&D credits—the advanced stuff',
  },
  {
    name: 'Guardian',
    role: 'Risk & Protection',
    description: 'Insurance adequacy, contract risks, asset protection, audit exposure',
  },
  {
    name: 'Comptroller',
    role: 'Financial Officer',
    description: 'Cash flow, reserves, banking optimization, capital allocation',
  },
  {
    name: 'Monitor',
    role: 'Regulatory Tracker',
    description: 'Watches for law changes, new requirements, state-specific updates',
  },
  {
    name: 'Mentor',
    role: 'Teaching Partner',
    description: 'Builds your proficiency over time with a 4-level learning track',
  },
]

// Comparison data
const comparisons = [
  {
    traditional: 'CPA on retainer: $2-5k/year',
    llcOps: 'Custom agents: One-time build',
  },
  {
    traditional: 'Wait for appointments',
    llcOps: 'Instant, 24/7',
  },
  {
    traditional: "They don't know your business",
    llcOps: 'Knows entity details, patterns, history',
  },
  {
    traditional: 'Reactive (you ask)',
    llcOps: 'Proactive (surfaces issues)',
  },
  {
    traditional: 'Generic advice',
    llcOps: 'Specific calculations with your numbers',
  },
]

// Use case data
const useCases = [
  {
    title: 'Solo Founders',
    description: 'Run your LLC without hiring a back office. Get expert guidance on compliance, taxes, and strategy.',
  },
  {
    title: 'Creative Professionals',
    description: 'Freelancers and contractors who need business operations handled so they can focus on their craft.',
  },
  {
    title: 'Side Businesses',
    description: 'Full-time job plus LLC? Agents handle the complexity so you don\'t have to.',
  },
  {
    title: 'Multi-Entity Structures',
    description: 'Holding companies, multiple LLCs, complex structures—agents scale with you.',
  },
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
        <div className="space-y-6">{children}</div>
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
                      ? 'w-12 bg-[var(--id8-orange)]'
                      : 'w-8 bg-[var(--border)] group-hover:w-10 group-hover:bg-[var(--text-secondary)]'
                  }`}
                />
                <span
                  className={`transition-all ${
                    isActive
                      ? 'text-[var(--id8-orange)] font-medium opacity-100'
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

export default function LLCOpsContent() {
  const [activeSection, setActiveSection] = useState('intro')

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
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-12 transition-colors"
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
              <h1>LLC Ops</h1>
              <span className="text-sm px-3 py-1 bg-green-500/10 text-green-400 rounded-full">
                Custom Agent Framework
              </span>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <p className="text-2xl text-[var(--text-secondary)] mb-4">
              Expert AI Agent Systems for Business Operations
            </p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="text-xl text-[var(--text-tertiary)]">
              Replace a $50k back office with specialized AI agents.
            </p>
          </FadeInSection>
        </header>

        {/* Problem Statement */}
        <StickySection id="intro" title="Overview">
          <div className="text-lg leading-relaxed space-y-6">
            <p>
              Running an LLC without overhead means no CFO to watch cash flow, no CPA on retainer for
              every question, no compliance team tracking deadlines, no mentor explaining how this all works.
            </p>
            <p>
              You're wearing all the hats while also building the business.
            </p>
            <p>
              We built a 9-agent AI operations team that provides PhD-level guidance across tax strategy,
              compliance, asset protection, and financial management. Then we realized: this framework
              works for any business domain.
            </p>
          </div>
        </StickySection>

        {/* The 9 Agents */}
        <StickySection id="agents" title="The 9-Agent System">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {agents.map((agent, index) => (
              <FadeInSection key={agent.name} delay={index * 0.05}>
                <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg">{agent.name}</h3>
                  </div>
                  <p className="text-sm text-[var(--id8-orange)] mb-2">{agent.role}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{agent.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </StickySection>

        {/* Architecture */}
        <StickySection id="architecture" title="The Architecture">
          <div className="p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
            <p className="text-[var(--text-secondary)] mb-4">
              Each agent is a Claude Code skill—globally available, contextually aware, and integrated
              with your actual operational data through Notion MCP.
            </p>
            <div className="font-mono text-sm bg-[var(--bg-tertiary)] p-4 rounded-soft overflow-x-auto">
              <pre>{`~/.claude/skills/llc-ops/
├── SKILL.md (25KB)      # Agent definitions, dispatch rules
├── CLAUDE.md (9KB)      # Entity info, operating principles
└── references/          # Deep knowledge base
    ├── compliance.md
    ├── tax-strategy.md
    ├── asset-protection.md
    └── ... (8 reference docs)`}</pre>
            </div>
            <p className="text-[var(--text-secondary)] mt-4">
              Total: ~128KB of structured expert knowledge per domain.
            </p>
          </div>
        </StickySection>

        {/* Comparison */}
        <StickySection id="comparison" title="Traditional vs. Agent-Based">
          <div className="space-y-3">
            {comparisons.map((item, index) => (
              <FadeInSection key={index} delay={index * 0.05}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-soft">
                    <p className="text-[var(--text-secondary)] line-through decoration-red-400">
                      {item.traditional}
                    </p>
                  </div>
                  <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-soft">
                    <p className="text-[var(--text-primary)]">
                      {item.llcOps}
                    </p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </StickySection>

        {/* Use Cases */}
        <StickySection id="who-for" title="Who This Is For">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <FadeInSection key={useCase.title} delay={index * 0.1}>
                <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
                  <h3 className="font-bold text-xl mb-3">{useCase.title}</h3>
                  <p className="text-[var(--text-secondary)]">{useCase.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </StickySection>

        {/* Results */}
        <StickySection id="what-you-get" title="What You Get">
          <div className="p-8 bg-[var(--id8-orange)]/5 border-2 border-[var(--id8-orange)]/20 rounded-soft">
            <ul className="space-y-3 text-lg">
              <li className="flex gap-3">
                <span className="text-[var(--id8-orange)]">✓</span>
                <span>Custom agent system built for your specific business and state</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--id8-orange)]">✓</span>
                <span>Deep reference library covering your domain</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--id8-orange)]">✓</span>
                <span>Notion integration for live operational data</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--id8-orange)]">✓</span>
                <span>Proactive deadline tracking and compliance monitoring</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--id8-orange)]">✓</span>
                <span>Teaching system that builds your proficiency over time</span>
              </li>
            </ul>
          </div>
        </StickySection>

        {/* CTA */}
        <StickySection id="cta" title="Need a Custom Agent System?">
          <div className="p-12 bg-gradient-to-br from-[var(--id8-orange)]/10 to-[var(--id8-orange)]/5 border-2 border-[var(--id8-orange)]/30 rounded-soft text-center">
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              We built LLC Ops for ourselves. The framework works for any domain—real estate operations,
              creative production, trading research, project management. If you're wearing too many hats,
              let's build the agents that take some off.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://x.com/eddiebe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--id8-orange)] text-white font-bold rounded-soft hover:bg-[var(--id8-orange)]/90 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Talk to Eddie on X
              </a>
              <a
                href="mailto:eddie@id8labs.app?subject=Custom%20Agent%20System%20Inquiry"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[var(--id8-orange)] text-[var(--id8-orange)] font-bold rounded-soft hover:bg-[var(--id8-orange)]/10 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
                Email Us
              </a>
            </div>
          </div>
        </StickySection>

        {/* Read More */}
        <FadeInSection>
          <section className="pt-12 border-t border-[var(--border)]">
            <div className="space-y-4">
              <p className="text-lg text-[var(--text-secondary)]">
                <strong>Status:</strong> Framework in production at ID8Labs
              </p>
              <p className="text-lg text-[var(--text-secondary)]">
                <strong>Built with:</strong> Claude Code Skills, Notion MCP, 128KB knowledge base
              </p>
              <div className="pt-4">
                <Link
                  href="/essays/building-llc-ops"
                  className="inline-flex items-center gap-2 text-lg text-[var(--id8-orange)] hover:underline"
                >
                  Read the full case study
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </FadeInSection>
      </article>
    </div>
  )
}
