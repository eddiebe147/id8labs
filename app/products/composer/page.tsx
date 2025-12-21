import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Composer - ID8Labs',
  description: 'Timeline-based AI story development platform for writers, directors, and producers.',
}

export default function ComposerPage() {
  return (
    <div className="container py-24">
      <article className="max-w-3xl mx-auto">
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
          <div className="flex items-center gap-3 mb-6">
            <h1>Composer</h1>
            <span className="text-sm uppercase tracking-wide text-[var(--text-secondary)]">● Active</span>
          </div>
          <p className="text-2xl text-[var(--text-secondary)] mb-8">
            Timeline-based AI story development platform
          </p>
        </header>

        {/* Description */}
        <section className="mb-16 space-y-6 text-lg leading-relaxed">
          <p>
            Composer is a timeline-based story development platform built for writers, directors,
            and producers who think visually and work non-linearly.
          </p>
          <p>
            Unlike traditional outlining tools that force you into a linear structure, Composer
            treats story development like the messy, iterative process it actually is. Build your
            narrative on a visual timeline. Rearrange scenes. Experiment with structure. Work with
            AI as a collaborative partner, not a replacement.
          </p>
          <p>
            Born from 20 years of production experience, Composer solves the problems we faced
            daily as storytellers working in television and film.
          </p>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>
          <ul className="space-y-6 text-lg">
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Timeline-based structure</strong> — Visual story building that matches how
                creatives actually think
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>AI collaboration</strong> — Work with AI as a creative partner, not a
                replacement for human creativity
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Non-linear workflow</strong> — Rearrange, experiment, iterate without
                fighting your tools
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Production-tested</strong> — Built by professionals, for professionals
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Real-time updates</strong> — Changes propagate instantly across your
                timeline
              </div>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="pt-12 border-t border-[var(--border)]">
          <a
            href="https://id8composer.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-xl px-8 py-4 border-2 border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-200"
          >
            Visit Composer
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </section>
      </article>
    </div>
  )
}
