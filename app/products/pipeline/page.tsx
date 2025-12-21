import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ID8Pipeline - ID8Labs',
  description: 'Complete idea-to-exit lifecycle management for solo builders. 8 interconnected AI agents handle validation, architecture, launch, growth, ops, and exit prep with decay mechanics and stage gates.',
}

const skills = [
  {
    name: 'ID8Tracker',
    purpose: 'Pipeline Heartbeat',
    description: 'Tracks all projects through lifecycle states, enforces quality gates, calculates decay, generates dashboards',
  },
  {
    name: 'ID8Scout',
    purpose: 'Market Validation',
    description: 'TAM/SAM/SOM analysis, competitive teardowns, community signal mining. Delivers BUILD/PIVOT/KILL verdicts',
  },
  {
    name: 'ID8Architect',
    purpose: 'Technical Design',
    description: 'System architecture, stack selection, database patterns, API design. Outputs build roadmaps in phases',
  },
  {
    name: 'ID8Launch',
    purpose: 'Go-to-Market',
    description: 'Positioning, pricing, messaging, launch sequencing. Platform playbooks for Product Hunt, HN, Reddit',
  },
  {
    name: 'ID8Growth',
    purpose: 'Scale Engine',
    description: 'Growth loops, analytics frameworks, acquisition channels, retention optimization, A/B testing',
  },
  {
    name: 'ID8Ops',
    purpose: 'Operations Systems',
    description: 'SOP creation, delegation frameworks, customer success, team building. If twice, document. If ten times, automate',
  },
  {
    name: 'ID8Exit',
    purpose: 'Exit Preparation',
    description: 'Valuation methods, due diligence prep, data room checklists, term sheet analysis',
  },
  {
    name: 'ID8Today',
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

export default function PipelinePage() {
  return (
    <div className="container py-24">
      <article className="max-w-4xl mx-auto">
        {/* Back Link */}
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

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <h1>ID8Pipeline</h1>
            <span className="text-sm px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full">
              Internal Tooling
            </span>
          </div>
          <p className="text-2xl text-[var(--text-secondary)] mb-4">
            Complete Idea-to-Exit Lifecycle Management
          </p>
          <p className="text-xl text-[var(--text-tertiary)]">
            Structure creates momentum. Every stage has a clear exit.
          </p>
        </header>

        {/* Problem Statement */}
        <section className="mb-16 space-y-6 text-lg leading-relaxed">
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
        </section>

        {/* The 8 Skills */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">The 8 Skills</h2>
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
        </section>

        {/* Decay Mechanics */}
        <section className="mb-16 p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
          <h3 className="text-2xl font-bold mb-4">Decay Mechanics</h3>
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
        </section>

        {/* Stage Gates */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Stage Gates</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-6">
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
        </section>

        {/* ID8Today */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Daily Operations: 14 Productivity Methods</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-6">
            ID8Today manages tasks across three domains—ID8 projects, TV production, and life admin.
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
        </section>

        {/* Pipeline Flow Diagram */}
        <section className="mb-16 p-8 bg-[var(--id8-orange)]/5 border-2 border-[var(--id8-orange)]/20 rounded-soft">
          <h3 className="text-2xl font-bold mb-6 text-[var(--id8-orange)]">The Pipeline Flow</h3>
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
        </section>

        {/* Philosophy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Philosophy</h2>
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
        </section>

        {/* Stats */}
        <section className="mb-16 p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
          <h3 className="text-2xl font-bold mb-6">By the Numbers</h3>
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
        </section>

        {/* Status */}
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
      </article>
    </div>
  )
}
