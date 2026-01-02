'use client'

import { m } from '@/components/motion'

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
const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const XIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

const TerminalIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
)

const LightbulbIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2z" />
  </svg>
)

const RocketIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
  </svg>
)

// Data
const superpowers = [
  {
    title: 'File System Access',
    description: 'Web Claude only sees what you paste. Claude Code sees your entire computer.',
    example: '"Organize my Downloads folder" • "Find all invoices from 2024"',
  },
  {
    title: 'Long-Running Sessions',
    description: 'Web Claude forgets when you close the tab. Claude Code remembers across sessions.',
    example: 'Complex projects • Workflows that build on previous work',
  },
  {
    title: 'Tool Installation',
    description: 'Web Claude is sandboxed. Claude Code installs external tools: web search, databases, APIs.',
    example: 'Perplexity search • Browser automation • Database connections',
  },
]

const misconceptions = [
  { wrong: "It's for developers", right: "It's for anyone with files to process" },
  { wrong: "You need to write code", right: "You describe what you want in English" },
  { wrong: "It's just a better chatbot", right: "It's an agent that does the work" },
]

const quickStart = [
  { step: '1', command: 'curl -fsSL https://claude.ai/install.sh | bash', description: 'Install' },
  { step: '2', command: 'claude', description: 'Start' },
  { step: '3', command: 'cd ~/Downloads', description: 'Navigate' },
  { step: '4', command: '"Organize this folder by file type"', description: 'Delegate' },
]

const delegationExamples = [
  {
    category: 'File Organization',
    prompt: '"Go through my Downloads folder. Move PDFs to Documents/PDFs, images to Pictures, and delete anything older than 6 months that I haven\'t opened."',
  },
  {
    category: 'Research',
    prompt: '"Search the web for the top 5 competitors to [Company]. For each one, find their pricing, key features, and target market. Save a comparison table to Research/Competitors.md"',
  },
  {
    category: 'Writing',
    prompt: '"Here are my voice memo transcripts from this week. Find the 3 strongest ideas for blog posts. For each, write a one-paragraph outline. Save to Writing/Ideas/[Date].md"',
  },
]

export default function Module0PrintPage() {
  return (
    <div className="min-h-screen print:min-h-0">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-zone-text print:min-h-0 print:py-12">
        <div className="container">
          <m.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl"
          >
            <m.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <span className="text-sm font-mono uppercase tracking-widest px-3 py-1 rounded-md bg-id8-orange/10 text-id8-orange">
                Module 0
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                Free • 15 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-bold tracking-tight mb-6"
            >
              The Mental Model Shift
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed"
            >
              From Chatbot to Operating System: Install Claude Code and complete your first real delegation in 15 minutes.
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent print:hidden" />
      </section>

      {/* The Name Problem */}
      <section className="section-spacing border-b border-[var(--border)] print:py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                The Problem
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                "Claude Code" Is a Terrible Name
              </h2>
            </div>

            <p className="text-center text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              When you hear "Code" you think developers, programming, not for me. Here's what it actually is:
            </p>

            <div className="space-y-3">
              {misconceptions.map((item, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 px-4 py-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                    <span className="text-red-400 flex-shrink-0">
                      <XIcon />
                    </span>
                    <span className="text-[var(--text-secondary)] line-through decoration-red-400/50">
                      {item.wrong}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                    <span className="text-green-400 flex-shrink-0">
                      <CheckIcon />
                    </span>
                    <span className="text-[var(--text-primary)]">
                      {item.right}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-lg bg-id8-orange/5 border border-id8-orange/20 text-center">
              <p className="text-lg font-medium">
                Think of it as: <span className="text-id8-orange">Claude Local</span> or{' '}
                <span className="text-id8-orange">Claude Agent</span> or{' '}
                <span className="text-id8-orange">Claude with File Access</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Superpowers */}
      <section className="section-spacing bg-[var(--bg-secondary)] print:py-8 print:bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              What You Get
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              The 3 Superpowers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {superpowers.map((power, index) => (
              <div key={index} className="card">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-id8-orange font-mono font-bold text-lg">{index + 1}</span>
                  <h3 className="text-lg font-bold">{power.title}</h3>
                </div>
                <p className="text-[var(--text-secondary)] text-sm mb-4">
                  {power.description}
                </p>
                <p className="text-xs font-mono text-[var(--text-tertiary)] p-2 bg-[var(--bg-secondary)] rounded">
                  {power.example}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Mental Model Shift */}
      <section className="section-spacing border-b border-[var(--border)] print:py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-id8-orange/10 mb-4">
                <span className="text-id8-orange"><LightbulbIcon /></span>
                <span className="text-sm font-mono text-id8-orange">The Key Insight</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                The Shift From Assistance to Delegation
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-3">Old Way (Assistance)</p>
                <p className="text-[var(--text-secondary)] italic">"Help me write interview questions"</p>
                <p className="text-sm text-[var(--text-tertiary)] mt-3">
                  → Claude gives suggestions. You copy. You edit. You format. You save.
                </p>
              </div>
              <div className="p-5 bg-id8-orange/5 rounded-lg border-2 border-id8-orange/30">
                <p className="text-xs font-mono uppercase tracking-wider text-id8-orange mb-3">New Way (Delegation)</p>
                <p className="text-[var(--text-primary)] italic">"Generate 15 interview questions based on this guest's bio. Save to /Prep/[Name].md"</p>
                <p className="text-sm text-id8-orange mt-3">
                  → Claude does all of it. You review the output.
                </p>
              </div>
            </div>

            <p className="text-center text-xl font-medium">
              One gives you <span className="text-[var(--text-tertiary)]">suggestions</span>.
              The other gives you <span className="text-id8-orange">deliverables</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="section-spacing bg-[var(--bg-secondary)] print:py-8 print:bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-id8-orange"><TerminalIcon /></span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Quick Start</h2>
            </div>

            <div className="space-y-4">
              {quickStart.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-id8-orange/10 border border-id8-orange/30 flex items-center justify-center text-id8-orange font-mono text-sm flex-shrink-0">
                    {item.step}
                  </span>
                  <div className="flex-1">
                    <code className="block px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg font-mono text-sm text-[var(--text-primary)]">
                      {item.command}
                    </code>
                    <p className="text-sm text-[var(--text-tertiary)] mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Your First Delegation */}
      <section className="section-spacing border-b border-[var(--border)] print:py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-id8-orange/10 mb-4">
                <span className="text-id8-orange"><RocketIcon /></span>
                <span className="text-sm font-mono text-id8-orange">5 min challenge</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Your First Delegation
              </h2>
            </div>

            <div className="card border-2 border-id8-orange/30">
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                Navigate to your Downloads folder (or any messy folder). Tell Claude:
              </p>
              <div className="p-4 bg-[var(--bg-secondary)] rounded-lg font-mono text-sm mb-6">
                "Show me what's in this folder. Group files by type. Tell me which ones are duplicates. Create a summary of what's taking up the most space."
              </div>
              <p className="text-[var(--text-secondary)]">
                Watch it scan, analyze, and report back. <strong>You didn't write any code.</strong> You just asked for what you wanted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delegation Examples */}
      <section className="section-spacing bg-[var(--bg-secondary)] print:py-8 print:bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Example Delegations
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                The Delegation Formula
              </h2>
            </div>

            <div className="space-y-4">
              {delegationExamples.map((example, index) => (
                <div key={index} className="card">
                  <p className="text-xs font-mono uppercase tracking-widest text-id8-orange mb-2">
                    {example.category}
                  </p>
                  <p className="text-[var(--text-secondary)] text-sm italic">
                    {example.prompt}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)]">
              <h4 className="font-semibold mb-2">The Pattern:</h4>
              <ol className="list-decimal list-inside space-y-1 text-[var(--text-secondary)] text-sm">
                <li>Give context (what files, what folder, what you're trying to do)</li>
                <li>State the outcome you want (not the steps to get there)</li>
                <li>Specify where to save the result</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next */}
      <section className="section-spacing border-b border-[var(--border)] print:py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              What's Next
            </h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Module 0 is your proof of concept. The full course covers:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-left">
              {[
                'Your First Delegation',
                'Working With Your Files',
                "The Writer's Workflow",
                'Research & Analysis',
                'Personal Operations',
                'Power User Patterns',
              ].map((module, index) => (
                <div key={index} className="p-3 bg-[var(--bg-secondary)] rounded-lg">
                  <span className="text-id8-orange font-mono text-sm">{index + 1}.</span>{' '}
                  <span className="text-sm">{module}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-8 print:py-4">
        <div className="container">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">
              Stop asking. <span className="text-id8-orange">Start delegating.</span>
            </p>
            <p className="text-sm text-[var(--text-tertiary)]">
              id8labs.app/courses/claude-for-knowledge-workers
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
