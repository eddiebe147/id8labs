import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'X-Place - ID8Labs',
  description: 'Collaborative pixel canvas for the X ecosystem. r/place meets Twitter—a 500x500 shared canvas where thousands create pixel art together.',
}

const features = [
  {
    name: '500x500 Canvas',
    description: 'Shared by all users, updated in real-time',
  },
  {
    name: '16 Color Palette',
    description: 'Classic r/place colors for pixel art purity',
  },
  {
    name: 'Cooldown Timer',
    description: 'Place a pixel, then wait—forces collaboration over domination',
  },
  {
    name: 'X OAuth Login',
    description: 'Sign in with your X account, avatar and username pulled automatically',
  },
  {
    name: 'Spectator Mode',
    description: 'Accounts under 30 days old can watch but not place (anti-bot)',
  },
  {
    name: 'Real-time Updates',
    description: 'See every pixel appear instantly via WebSocket',
  },
]

const techStack = [
  { layer: 'Frontend', tech: 'Next.js 14, React, Tailwind, Zustand' },
  { layer: 'Real-time', tech: 'Custom WebSocket server (ws library)' },
  { layer: 'Database', tech: 'Redis (Upstash) for canvas state + sessions' },
  { layer: 'Auth', tech: 'Supabase with X (Twitter) OAuth 1.0a' },
]

const buildStatus = [
  { component: 'Canvas Renderer', status: 'done', note: '500x500 with pan/zoom' },
  { component: 'Color Palette', status: 'done', note: '16-color r/place palette' },
  { component: 'WebSocket Server', status: 'done', note: 'Real-time pixel updates' },
  { component: 'Redis Integration', status: 'done', note: 'Canvas state persistence' },
  { component: 'X OAuth Login', status: 'done', note: 'Twitter auth via Supabase' },
  { component: 'Session Management', status: 'done', note: 'Redis-backed, 24h TTL' },
  { component: 'Spectator Mode', status: 'done', note: 'New accounts watch-only' },
  { component: 'r/place UI', status: 'done', note: 'Bottom toolbar, minimal chrome' },
]

export default function XPlacePage() {
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
            <h1>X-Place</h1>
            <span className="text-sm px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full">
              Exploration
            </span>
          </div>
          <p className="text-2xl text-[var(--text-secondary)] mb-4">
            Collaborative Pixel Canvas for the X Ecosystem
          </p>
          <p className="text-xl text-[var(--text-tertiary)]">
            r/place meets Twitter.
          </p>
        </header>

        {/* Concept */}
        <section className="mb-16 space-y-6 text-lg leading-relaxed">
          <p>
            Remember r/place? Reddit's social experiment where millions of users collaborated (and
            fought) to create pixel art on a shared canvas. One pixel at a time. Cooldowns that
            forced you to work together or get overwhelmed.
          </p>
          <p>
            X-Place is that concept rebuilt for the X/Twitter ecosystem. Same mechanics—500x500
            canvas, 16 colors, cooldown timers—but tied to X accounts instead of Reddit.
          </p>
          <p>
            The twist: your X identity travels with you. Potential for factions based on who you
            follow. Verified accounts could get perks. The social graph becomes the game.
          </p>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Core Mechanics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft"
              >
                <h3 className="font-bold mb-1">{feature.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-16 p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
          <h3 className="text-2xl font-bold mb-6">Architecture</h3>
          <div className="font-mono text-sm overflow-x-auto mb-6">
            <pre className="text-[var(--text-secondary)]">{`┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Next.js Web   │────▶│  WebSocket Server │────▶│  Redis (Upstash)│
│   (Frontend)    │◀────│   (Real-time)     │◀────│  (Canvas State) │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        │                                                │
        ▼                                                ▼
┌─────────────────┐                              ┌─────────────────┐
│ Supabase Auth   │                              │ Pub/Sub Channel │
│ (X OAuth)       │                              │ (Scaling)       │
└─────────────────┘                              └─────────────────┘`}</pre>
          </div>
          <div className="space-y-2">
            {techStack.map((item) => (
              <div key={item.layer} className="flex gap-4">
                <span className="font-bold w-24 text-[var(--text-secondary)]">{item.layer}:</span>
                <span>{item.tech}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Build Status */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Build Status</h2>
          <div className="space-y-2">
            {buildStatus.map((item) => (
              <div
                key={item.component}
                className="flex items-center gap-4 p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft"
              >
                <span className="text-green-400">✓</span>
                <span className="font-medium flex-grow">{item.component}</span>
                <span className="text-sm text-[var(--text-secondary)]">{item.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section className="mb-16 p-8 bg-purple-500/5 border-2 border-purple-500/20 rounded-soft">
          <h3 className="text-2xl font-bold mb-4 text-purple-400">The Vision</h3>
          <p className="text-[var(--text-secondary)] mb-4">
            X-Place could become a viral social experiment like the original r/place, but native to
            the X ecosystem. Imagine:
          </p>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            <li>• Trending on X as communities coordinate pixel art</li>
            <li>• Factions based on who you follow</li>
            <li>• Verified accounts get special colors or faster cooldowns</li>
            <li>• Live streams of the canvas embedded in X posts</li>
            <li>• Timelapse videos that go viral</li>
          </ul>
        </section>

        {/* What's Next */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">What's Next</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-[var(--border)] rounded-soft">
              <span className="text-xs uppercase tracking-wide text-[var(--id8-orange)]">High Priority</span>
              <p className="font-medium mt-1">Production Deploy</p>
              <p className="text-sm text-[var(--text-secondary)]">Vercel + Railway</p>
            </div>
            <div className="p-4 border border-[var(--border)] rounded-soft">
              <span className="text-xs uppercase tracking-wide text-[var(--id8-orange)]">High Priority</span>
              <p className="font-medium mt-1">Canvas Persistence</p>
              <p className="text-sm text-[var(--text-secondary)]">Save/load from Redis properly</p>
            </div>
            <div className="p-4 border border-[var(--border)] rounded-soft">
              <span className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">Medium</span>
              <p className="font-medium mt-1">Pixel History</p>
              <p className="text-sm text-[var(--text-secondary)]">See who placed each pixel</p>
            </div>
            <div className="p-4 border border-[var(--border)] rounded-soft">
              <span className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">Medium</span>
              <p className="font-medium mt-1">Timelapse</p>
              <p className="text-sm text-[var(--text-secondary)]">Watch the canvas evolve</p>
            </div>
          </div>
        </section>

        {/* Status */}
        <section className="pt-12 border-t border-[var(--border)]">
          <div className="space-y-4">
            <p className="text-lg text-[var(--text-secondary)]">
              <strong>Status:</strong> Exploration — core mechanics built, preparing for public test
            </p>
            <p className="text-lg text-[var(--text-secondary)]">
              <strong>Built with:</strong> Next.js, WebSockets, Redis, Supabase
            </p>
          </div>
        </section>
      </article>
    </div>
  )
}
