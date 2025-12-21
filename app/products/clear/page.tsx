import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Clearance - ID8Labs',
  description: 'Protect creators from copyright strikes by removing background music from footage. Save re-shoot costs, avoid takedowns, keep your content monetized.',
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
            <h1>Clearance</h1>
            <span className="text-sm px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full">
              Early exploration
            </span>
          </div>
          <p className="text-2xl text-[var(--text-secondary)] mb-8">
            Protect your content from copyright strikes
          </p>
        </header>

        {/* Description */}
        <section className="mb-16 space-y-6 text-lg leading-relaxed">
          <p>
            <strong className="text-id8-orange">Built to save creators and producers from copyright strikes.</strong>
          </p>
          <p>
            Remove background music from your footage before it gets flagged. Keep your content monetized, avoid
            takedowns, and skip expensive re-shoots.
          </p>
          <p>
            You've got great footage but there's copyrighted music in the background. Maybe someone walked past
            a store playing music. Maybe your subject had their TV on. Maybe you're in a location with ambient
            music you didn't notice until post.
          </p>
          <p>
            Clearance strips the music while preserving your dialogue and natural ambience. No more worrying
            about copyright claims destroying your content's revenue or getting your video taken down.
          </p>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Planned Features</h2>
          <ul className="space-y-6 text-lg">
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Copyright strike prevention</strong> — Remove copyrighted music before platforms
                flag your content
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Preserve dialogue</strong> — Strip music while keeping voices and natural
                ambience intact
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Save re-shoot costs</strong> — Rescue footage that would otherwise require
                expensive re-shoots
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Batch processing</strong> — Process entire projects at once
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">●</span>
              <div>
                <strong>Keep revenue flowing</strong> — Maintain monetization on content that would
                otherwise be demonetized or blocked
              </div>
            </li>
          </ul>
        </section>

        {/* Status */}
        <section className="pt-12 border-t border-[var(--border)]">
          <div className="space-y-4">
            <p className="text-lg text-[var(--text-secondary)]">
              <strong>Status:</strong> Early exploration
            </p>
            <a
              href="#clearance"
              className="inline-flex items-center gap-2 text-lg px-8 py-4 border-2 border-purple-400 text-purple-400 rounded-soft cursor-not-allowed opacity-50"
            >
              In development
            </a>
          </div>
        </section>
      </article>
    </div>
  )
}
