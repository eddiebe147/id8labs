import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ID8Foundry - ID8Labs',
  description: 'The system that builds systems. A self-improving development framework that captures patterns, decisions, and failures across projects.',
}

// Pipeline files structure
const foundryFiles = [
  { name: 'SYSTEM.md', description: 'Sr Dev operating instructions, decision frameworks' },
  { name: 'CONTEXT.md', description: 'Who you are, how you work, current priorities' },
  { name: 'HANDOFF.md', description: 'Session continuity — where we left off' },
  { name: 'STACK.md', description: 'Default technology choices (Next.js, Supabase, Vercel)' },
  { name: 'LEARNINGS.md', description: 'Captured insights from every project' },
]

// Framework files
const frameworks = [
  { name: 'DECISIONS.md', description: 'How to make technical decisions with tradeoffs' },
  { name: 'SCOPING.md', description: 'Ruthless scoping discipline — cut to ship' },
  { name: 'FAILURE_PATTERNS.md', description: 'What breaks and why — so you never fail the same way twice' },
]

// Pattern files
const patterns = [
  { name: 'ARCHITECTURE.md', description: 'Reusable structural patterns' },
  { name: 'COMPONENTS.md', description: 'Code patterns that work' },
  { name: 'ANTI_PATTERNS.md', description: 'What to avoid' },
]

export default function FoundryPage() {
  return (
    <div className="container py-24">
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
      <header className="max-w-4xl mb-16">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <h1>ID8Foundry</h1>
          <span className="text-sm px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full">
            Internal Framework
          </span>
        </div>
        <p className="text-2xl text-[var(--text-secondary)] mb-4">
          The system that builds systems.
        </p>
        <p className="text-xl text-[var(--text-tertiary)]">
          A self-improving development framework that captures patterns, decisions, and failures across projects.
          Every build makes the next one faster.
        </p>
      </header>

      {/* Philosophy */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">The Philosophy</h2>
        <div className="p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
          <blockquote className="text-xl italic text-[var(--text-secondary)] mb-6">
            "Like mycelium — the visible output (shipped code) is just the fruiting body.
            The real intelligence is the network underneath."
          </blockquote>
          <div className="space-y-4 text-lg">
            <p>Every project that passes through the Foundry:</p>
            <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)]">
              <li>Benefits from patterns learned in previous projects</li>
              <li>Contributes new patterns back to the system</li>
              <li>Compounds your ability to ship faster and cleaner</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ID8Pipeline vs ID8Foundry */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-[var(--id8-orange)]">ID8Pipeline</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              The 11-stage build process. Concept Lock → Ship → Listen & Iterate.
            </p>
            <p className="text-sm text-[var(--text-tertiary)]">
              Defines <strong>what stages</strong> a project goes through.
            </p>
          </div>
          <div className="p-6 bg-[var(--bg-secondary)] border border-purple-500/30 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-purple-400">ID8Foundry</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              The accumulated knowledge. Patterns, decisions, failures, learnings.
            </p>
            <p className="text-sm text-[var(--text-tertiary)]">
              Provides <strong>the knowledge</strong> accumulated from all projects.
            </p>
          </div>
        </div>
      </section>

      {/* File Structure */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">The Structure</h2>
        <div className="font-mono text-sm bg-[var(--bg-secondary)] p-6 rounded-lg border border-[var(--border)] mb-8 overflow-x-auto">
          <pre className="text-[var(--text-secondary)]">{`~/.claude/pipeline/
├── SYSTEM.md           # Operating instructions
├── CONTEXT.md          # Who you are, current priorities
├── HANDOFF.md          # Session continuity
├── STACK.md            # Default tech choices
├── frameworks/
│   ├── DECISIONS.md    # Decision framework
│   ├── SCOPING.md      # Scoping discipline
│   └── FAILURE_PATTERNS.md
├── patterns/
│   ├── ARCHITECTURE.md
│   ├── COMPONENTS.md
│   └── ANTI_PATTERNS.md
├── projects/
│   ├── _TEMPLATE.md
│   └── [project].md    # Active project files
└── logs/
    └── LEARNINGS.md    # Captured insights`}</pre>
        </div>

        {/* Core Files */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Core Files</h3>
            <div className="grid gap-3">
              {foundryFiles.map((file) => (
                <div key={file.name} className="flex items-center gap-4 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <span className="font-mono text-purple-400">{file.name}</span>
                  <span className="text-[var(--text-secondary)]">{file.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Frameworks</h3>
            <div className="grid gap-3">
              {frameworks.map((file) => (
                <div key={file.name} className="flex items-center gap-4 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <span className="font-mono text-[var(--id8-orange)]">{file.name}</span>
                  <span className="text-[var(--text-secondary)]">{file.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Patterns</h3>
            <div className="grid gap-3">
              {patterns.map((file) => (
                <div key={file.name} className="flex items-center gap-4 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <span className="font-mono text-green-400">{file.name}</span>
                  <span className="text-[var(--text-secondary)]">{file.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Session Protocol */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Session Startup</h2>
        <div className="p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
          <p className="text-lg text-[var(--text-secondary)] mb-6">
            Every session, before diving into work:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-lg">
            <li>Read <span className="font-mono text-purple-400">HANDOFF.md</span> — Where we left off</li>
            <li>Check active project file — Current phase, blockers, decisions</li>
            <li>Ask: <em>"What's the highest-leverage thing we can do today?"</em></li>
          </ol>
        </div>
      </section>

      {/* Commands */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Commands</h2>
        <div className="grid gap-4">
          {[
            { cmd: 'pipeline status', desc: 'Report current project, phase, and next checkpoint' },
            { cmd: 'new project [name]', desc: 'Create fresh project file from template' },
            { cmd: 'sync project [name]', desc: 'Import existing repo into Foundry' },
            { cmd: 'log learning', desc: 'Add entry to LEARNINGS.md' },
            { cmd: 'extract pattern', desc: 'Move learning → pattern file' },
            { cmd: 'update handoff', desc: 'Update session state' },
          ].map((item) => (
            <div key={item.cmd} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
              <span className="font-mono text-[var(--id8-orange)] shrink-0">{item.cmd}</span>
              <span className="text-[var(--text-secondary)]">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="pt-12 border-t border-[var(--border)]">
        <div className="space-y-4">
          <p className="text-lg text-[var(--text-secondary)]">
            <strong>Status:</strong> In production at ID8Labs
          </p>
          <p className="text-lg text-[var(--text-secondary)]">
            <strong>Location:</strong> <span className="font-mono">~/.claude/pipeline/</span>
          </p>
          <p className="text-lg text-[var(--text-secondary)]">
            <strong>Integrated with:</strong> Claude Code, ID8Pipeline stages
          </p>
        </div>
      </section>
    </div>
  )
}
