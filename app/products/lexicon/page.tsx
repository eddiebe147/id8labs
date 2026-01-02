import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Lexicon - ID8Labs',
  description: 'Wikipedia for your story universe. Graph-powered search for characters, relationships, and plot threads. Coming soon.',
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
            <span className="text-sm px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full">
              Technical architecture complete
            </span>
          </div>
          <p className="text-2xl text-[var(--text-secondary)] mb-8">
            The GitHub for narrative universes
          </p>
        </header>

        {/* Description */}
        <section className="mb-16 space-y-6 text-lg leading-relaxed">
          <p>
            Replace your Excel story bibles with a living, searchable knowledge graph.
          </p>
          <p>
            When you're 100 episodes deep, you need more than scattered documents. You need a system that 
            understands relationships, tracks timelines, and remembers every detail across years of content.
          </p>
          <p>
            <strong className="text-id8-orange">Lexicon is the GitHub for narrative universes.</strong> Version control 
            for your story world. Maintain continuity across years of content. Every connection instantly searchable.
          </p>
          <p>
            Like all ID8Labs products, Lexicon is being battle-tested in real production
            environments before launch. We're using it ourselves. When it's ready for you, you'll
            know.
          </p>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">What Lexicon Does</h2>
          <ul className="space-y-6 text-lg">
            <li className="flex gap-4">
              <span className="text-2xl text-id8-orange">●</span>
              <div>
                <strong>Semantic search</strong> — Ask questions in plain English. "Find all betrayals
                involving family members" or "When did Marcus learn the truth?"
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl text-id8-orange">●</span>
              <div>
                <strong>Relationship graphs</strong> — See how every character connects. Track alliances,
                conflicts, family trees, and power dynamics across your entire narrative.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl text-id8-orange">●</span>
              <div>
                <strong>Timeline intelligence</strong> — Query across years of story. Find continuity
                conflicts before they become script problems.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl text-id8-orange">●</span>
              <div>
                <strong>Pattern recognition</strong> — Identify thematic threads, recurring motifs, and
                narrative patterns across 100+ episodes.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl text-id8-orange">●</span>
              <div>
                <strong>AI-powered queries</strong> — Ask your story universe questions and get answers
                grounded in your actual canon.
              </div>
            </li>
          </ul>
        </section>

        {/* Use Case */}
        <section className="mb-16 p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
          <h3 className="text-2xl font-bold mb-4 text-id8-orange">Built for Long-Running Narratives</h3>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Lexicon is designed for shows, book series, and franchises where the universe grows faster
            than any individual can track. When you need to know every time a character mentioned their
            past, or map the political alliances across three seasons, or verify that your new plot
            doesn't contradict episode 47—Lexicon has the answer in seconds.
          </p>
        </section>

        {/* Status */}
        <section className="pt-12 border-t border-[var(--border)]">
          <div className="space-y-4">
            <p className="text-lg text-[var(--text-secondary)]">
              <strong>Status:</strong> Technical architecture complete, Q1 2026 MVP
            </p>
            <a
              href="#lexicon"
              className="inline-flex items-center gap-2 text-lg px-8 py-4 border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-[var(--bg-primary)] transition-all duration-200 rounded-soft"
            >
              Coming Q1 2026
            </a>
          </div>
        </section>
      </article>
    </div>
  )
}
