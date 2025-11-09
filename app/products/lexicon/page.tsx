import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Lexicon - ID8Labs',
  description: 'Universal glossary management for production teams. Coming soon.',
}

export default function LexiconPage() {
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
            <h1>Lexicon</h1>
            <span className="text-sm uppercase tracking-wide text-[var(--text-secondary)]">
              ◐ Coming Soon
            </span>
          </div>
          <p className="text-2xl text-[var(--text-secondary)] mb-8">
            Universal glossary management for production teams
          </p>
        </header>

        {/* Description */}
        <section className="mb-16 space-y-6 text-lg leading-relaxed">
          <p>
            Stop managing terminology in spreadsheets. Lexicon integrates with your production
            pipeline, making glossaries a living part of your workflow instead of a separate
            document nobody updates.
          </p>
          <p>
            Built for teams working across multiple platforms and languages, Lexicon ensures
            consistent terminology across scripts, production documents, subtitles, and marketing
            materials.
          </p>
          <p>
            Like all ID8Labs products, Lexicon is being battle-tested in real production
            environments before launch. We're using it ourselves. When it's ready for you, you'll
            know.
          </p>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Planned Features</h2>
          <ul className="space-y-6 text-lg">
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Pipeline integration</strong> — Works where your team works, not in a
                separate system
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Multi-language support</strong> — Manage translations and regional
                variations
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Version control</strong> — Track terminology changes across production
                phases
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Team collaboration</strong> — Everyone works from the same source of truth
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Export anywhere</strong> — Generate formatted glossaries for any platform
              </div>
            </li>
          </ul>
        </section>

        {/* Status */}
        <section className="pt-12 border-t border-[var(--border)]">
          <p className="text-lg text-[var(--text-secondary)]">
            Lexicon is currently in active development.
            <br />
            Want to be notified when it launches?{' '}
            <a
              href="mailto:hello@id8labs.com?subject=Lexicon%20Launch%20Notification"
              className="border-b-2 border-[var(--text-primary)] hover:opacity-70 transition-opacity"
            >
              Email us
            </a>
          </p>
        </section>
      </article>
    </div>
  )
}
