import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ID8 Clearance - ID8Labs',
  description: 'Extract clean dialogue audio from clips with background music. Built because transcription services can\'t handle music interference.',
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
            <h1>ID8 Clearance</h1>
            <span className="text-sm px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full">
              Early exploration
            </span>
          </div>
          <p className="text-2xl text-[var(--text-secondary)] mb-8">
            Remove background music from video clips
          </p>
        </header>

        {/* Description */}
        <section className="mb-16 space-y-6 text-lg leading-relaxed">
          <p>
            <strong className="text-id8-orange">Built because transcription services can't handle music interference.</strong>
          </p>
          <p>
            Extract clean dialogue audio from clips with background music. Makes transcripts actually usable.
          </p>
          <p>
            You find the perfect archival clip, but it has background music you can't license. Or an interview 
            subject has music playing in the background. Or you need clean dialogue for transcription but the 
            service chokes on the music.
          </p>
          <p>
            ID8 Clearance removes the music, isolates the dialogue, and gives you clean audio that transcription 
            services can actually work with.
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
