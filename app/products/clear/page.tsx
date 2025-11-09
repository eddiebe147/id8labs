import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Clear - ID8Labs',
  description: 'Remove background music from video clips. AI-powered audio separation. Coming soon.',
}

export default function ClearPage() {
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
            <h1>Clear</h1>
            <span className="text-sm uppercase tracking-wide text-[var(--text-secondary)]">
              ◐ Coming Soon
            </span>
          </div>
          <p className="text-2xl text-[var(--text-secondary)] mb-8">
            Remove background music from video clips
          </p>
        </header>

        {/* Description */}
        <section className="mb-16 space-y-6 text-lg leading-relaxed">
          <p>
            AI-powered audio separation for production environments. Clean up interviews, isolate
            dialogue, remove music from archival footage. What used to take expensive
            post-production now happens on set.
          </p>
          <p>
            Clear solves a problem we've faced for years: you find the perfect archival clip, but
            it has background music you can't license. Or an interview subject has music playing in
            the background. Or you need clean dialogue for ADR.
          </p>
          <p>
            Simple. Fast. Production-ready. No complex post workflows. No expensive third-party
            services. Just clean audio when you need it.
          </p>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Planned Features</h2>
          <ul className="space-y-6 text-lg">
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Music removal</strong> — Extract clean dialogue from clips with background
                music
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Dialogue isolation</strong> — Separate voice from ambient sounds and music
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Batch processing</strong> — Process multiple clips at once
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>On-set ready</strong> — No internet required, works locally
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Production formats</strong> — Supports all standard video and audio formats
              </div>
            </li>
          </ul>
        </section>

        {/* Status */}
        <section className="pt-12 border-t border-[var(--border)]">
          <p className="text-lg text-[var(--text-secondary)]">
            Clear is currently in active development.
            <br />
            Want to be notified when it launches?{' '}
            <a
              href="mailto:hello@id8labs.com?subject=Clear%20Launch%20Notification"
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
