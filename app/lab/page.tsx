import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Lab Story - ID8Labs',
  description: "Our philosophy: invent categories, don't improve them. Building tools for the AI era.",
}

export default function LabPage() {
  return (
    <div className="container py-24">
      <article className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-id8-orange mb-12 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to home
        </Link>

        {/* Header */}
        <header className="mb-16">
          <h1 className="mb-6">The Lab Story</h1>
        </header>

        {/* Our Philosophy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              We don't improve existing tools. We ask why they exist in the first place,
              then build something completely different.
            </p>
            <p className="text-2xl font-bold text-id8-orange">
              Invent categories, don't improve them.
            </p>
          </div>
        </section>

        {/* How We Build */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">How We Build</h2>
          <div className="space-y-8 text-lg leading-relaxed">
            <div>
              <h3 className="text-xl font-bold text-id8-orange mb-3">We only ship what we use.</h3>
              <p>
                Every product at ID8Labs is battle-tested in real production before release.
                Not beta-tested. Actually used. In the field. Under deadline pressure.
                If it doesn't solve our own problems, it doesn't ship.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-id8-orange mb-3">We design for non-linear reality.</h3>
              <p>
                Life doesn't follow a straight line. Creative work doesn't follow a straight line.
                So why do our tools force linear thinking? ID8Labs products are built around how
                humans actually work—messy, iterative, jumping between ideas.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-id8-orange mb-3">We treat AI as a creative partner.</h3>
              <p>
                A collaborator that helps you think, not think for you. AI gives shape to half-formed
                ideas—turning rough sparks into structures you can work with. You focus on the
                high-level creative work: strategy, vision, decisions. AI handles the low-level
                legwork that normally drains your bandwidth. This isn't about doing less work.
                It's about keeping your energy where it belongs.
              </p>
            </div>
          </div>
        </section>

        {/* Category Creation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Category Creation</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              We're not building better versions of existing tools.
            </p>
            <p>
              ID8Composer isn't a better outliner—it's Final Cut Pro for story composition.<br />
              Lexicon isn't a better glossary—it's Wikipedia meets Neo4j for your narrative universe.<br />
              Clear isn't a better audio tool—it's AI separation for raw clips in the edit.
            </p>
            <p>
              Each product creates a category that didn't exist before.
            </p>
          </div>
        </section>

        {/* Vision Statement */}
        <section className="mb-16 py-12 border-t border-b border-[var(--border)] rounded-subtle">
          <blockquote className="text-2xl md:text-3xl font-bold text-center italic">
            "We're building tools for the AI era that don't exist yet."
          </blockquote>
          <p className="text-center text-[var(--text-secondary)] mt-6 text-lg">
            We're not in a rush. We're building things that last.
          </p>
        </section>

        {/* Cross-link to Origin Story */}
        <section className="pt-12 border-t border-[var(--border)]">
          <Link
            href="/origin"
            className="inline-flex items-center gap-2 text-lg text-id8-orange hover:opacity-70 transition-opacity"
          >
            Read Eddie's Origin Story
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <p className="text-[var(--text-secondary)] mt-3">
            Learn about the founder's 20-year journey in production and the problems that sparked these tools.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="pt-12 mt-12 border-t border-[var(--border)]">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <div className="space-y-4 text-lg">
            <p className="text-[var(--text-secondary)]">
              Questions? Feedback? Want to collaborate?
            </p>
            <p>
              Email us at{' '}
              <a
                href="mailto:eb@id8composer.app"
                className="border-b-2 border-id8-orange text-id8-orange hover:opacity-70 transition-opacity"
              >
                eb@id8composer.app
              </a>
            </p>
          </div>
        </section>
      </article>
    </div>
  )
}
