import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Factory - ID8Labs',
  description: 'AI creative production pipeline. Orchestrates Midjourney, Grok, Gemini and other AI tools into a single tracked workflow. The AI handles logistics, you handle taste.',
}

const pipelineSteps = [
  {
    name: 'Research',
    description: 'Pulls brand guidelines, analyzes competitors, builds a moodboard',
  },
  {
    name: 'Brief',
    description: 'Synthesizes direction into platform-specific prompts',
  },
  {
    name: 'Generate',
    description: 'Automates browsers, runs prompts across multiple AI platforms',
  },
  {
    name: 'Iterate',
    description: 'Tracks what worked, suggests variations',
  },
  {
    name: 'Deploy',
    description: 'Packages assets with full metadata, pushes to GitHub',
  },
]

const platforms = [
  { name: 'Midjourney', strength: 'Stylized hero images' },
  { name: 'Grok', strength: 'Fast generation, surprises' },
  { name: 'Gemini', strength: 'Photorealism, product shots' },
]

export default function FactoryPage() {
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
            <h1>Factory</h1>
            <span className="text-sm px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full">
              Field Testing
            </span>
          </div>
          <p className="text-2xl text-[var(--text-secondary)] mb-4">
            AI Creative Production Pipeline
          </p>
          <p className="text-xl text-[var(--text-tertiary)]">
            The AI handles logistics. You handle taste.
          </p>
        </header>

        {/* Problem Statement */}
        <section className="mb-16 space-y-6 text-lg leading-relaxed">
          <p>
            Every campaign needs visuals, and every visual needs iterations. That means logging into
            Midjourney, writing a prompt, waiting three minutes, downloading, then doing the same in
            Grok, then Gemini, then organizing everything into folders you'll never find again.
          </p>
          <p>
            I was spending more time on logistics than creativity.
          </p>
          <p>
            So I built the orchestration layer that was missing. Not another AI image generator—the
            system that makes the existing ones usable at scale.
          </p>
        </section>

        {/* Pipeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">The Pipeline</h2>
          <div className="space-y-4">
            {pipelineSteps.map((step, index) => (
              <div
                key={step.name}
                className="flex items-start gap-4 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft"
              >
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] rounded-full font-bold">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-bold text-lg">{step.name}</h3>
                  <p className="text-[var(--text-secondary)]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Browser Automation */}
        <section className="mb-16 p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
          <h3 className="text-2xl font-bold mb-4">The Browser Automation Problem</h3>
          <p className="text-[var(--text-secondary)] mb-4">
            Most people don't realize: these AI image platforms don't have APIs. Or the APIs are
            limited, expensive, or waitlisted.
          </p>
          <p className="text-[var(--text-secondary)] mb-4">
            So Factory automates the browser. It navigates to Midjourney's web interface, finds the
            prompt box, types your prompt, waits for generation, clicks upscale, downloads with
            metadata tracking which prompt produced what.
          </p>
          <p className="text-[var(--text-secondary)]">
            The trick is using accessibility snapshots instead of CSS selectors. "Find the textbox
            labeled 'What will you imagine?'" survives UI updates. CSS selectors don't.
          </p>
        </section>

        {/* Platforms */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Platform Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft text-center"
              >
                <h3 className="font-bold text-xl mb-2">{platform.name}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{platform.strength}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Human Gates */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Human Gates</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-6">
            Not everything should be automated. Factory has explicit decision points where the AI
            stops and waits:
          </p>
          <ul className="space-y-3 text-lg">
            <li className="flex gap-3">
              <span className="text-[var(--id8-orange)]">•</span>
              <span><strong>After the brief:</strong> Does this creative direction match what you want?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--id8-orange)]">•</span>
              <span><strong>After generation:</strong> Which images should we iterate on?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--id8-orange)]">•</span>
              <span><strong>Before deploy:</strong> Ready to push to production?</span>
            </li>
          </ul>
        </section>

        {/* Results */}
        <section className="mb-16 p-8 bg-[var(--id8-orange)]/5 border-2 border-[var(--id8-orange)]/20 rounded-soft">
          <h3 className="text-2xl font-bold mb-4 text-[var(--id8-orange)]">First Real Test</h3>
          <p className="text-lg mb-4">
            Built for our DeepStack campaign. Results:
          </p>
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-[var(--id8-orange)]">5</p>
              <p className="text-[var(--text-secondary)]">Production-ready images</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--id8-orange)]">&lt;10 min</p>
              <p className="text-[var(--text-secondary)]">Human attention required</p>
            </div>
          </div>
        </section>

        {/* State Tracking */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">State Tracking</h2>
          <p className="text-lg text-[var(--text-secondary)]">
            A week later, I needed to know exactly which prompt produced the image we used. It was
            all there—prompt, platform, timestamp, generation time, file path.
          </p>
          <p className="text-lg text-[var(--text-secondary)] mt-4 font-medium">
            You will forget what made what. The system won't.
          </p>
        </section>

        {/* Status */}
        <section className="pt-12 border-t border-[var(--border)]">
          <div className="space-y-4">
            <p className="text-lg text-[var(--text-secondary)]">
              <strong>Status:</strong> Field testing at ID8Labs
            </p>
            <p className="text-lg text-[var(--text-secondary)]">
              <strong>Built with:</strong> Claude Code, Playwright MCP, Perplexity MCP, Firecrawl MCP
            </p>
            <div className="pt-4">
              <Link
                href="/essays/id8factory-missing-orchestration-layer"
                className="inline-flex items-center gap-2 text-lg text-[var(--id8-orange)] hover:underline"
              >
                Read the full essay
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </article>
    </div>
  )
}
