import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Lab Story - ID8Labs',
  description: '20 years in production. Building tools that treat AI as a creative partner.',
}

export default function LabPage() {
  return (
    <div className="container py-24">
      <article className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-12 transition-colors"
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
          <p className="text-xl text-[var(--text-secondary)]">
            20 years in production. One simple philosophy: invent categories, don't improve them.
          </p>
        </header>

        {/* Origins */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Origins</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              ID8Labs was born from two decades in the trenches of television production.
              Documentaries, reality shows, narrative series—if it aired, we built the workflow behind it.
              Not as theorists. As practitioners who needed tools that didn't exist.
            </p>
            <p>
              Every tool we built solved a real problem we faced daily.
              Story development tools that couldn't handle the messy, non-linear reality of creative work.
              Glossaries that lived in spreadsheets instead of integrating with production pipelines.
              Audio cleanup that required expensive post-production when a simple AI model could do it on set.
            </p>
            <p>
              We didn't set out to start a lab. We set out to stop being frustrated.
              The lab came later, when we realized these weren't just our problems.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-16 py-12 border-t border-b border-[var(--border)]">
          <blockquote className="text-2xl md:text-3xl font-bold text-center italic">
            "Life is non-linear. Your tools should be too."
          </blockquote>
        </section>

        {/* Approach */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              We don't improve existing tools. We ask why they exist in the first place,
              then build something completely different.
            </p>
            <p>
              <strong>Category creation over iteration.</strong> ID8Composer isn't a better outlining tool—it's
              a timeline-based story development platform that treats narrative like the non-linear
              beast it actually is. Lexicon isn't a better glossary—it's a production-integrated
              terminology system that lives where your team works.
            </p>
            <p>
              <strong>Battle-tested, not theoretical.</strong> Every product is used in real production
              environments before it's released. If we wouldn't use it ourselves, we don't ship it.
            </p>
            <p>
              <strong>AI as partner, not replacement.</strong> We build tools that treat AI as a creative
              collaborator. Not to replace human creativity, but to amplify it. The AI handles the grunt work.
              You do the thinking.
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">The Products</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-3">
                ID8Composer <span className="text-sm font-normal text-[var(--text-secondary)]">● Active</span>
              </h3>
              <p className="text-lg text-[var(--text-secondary)] mb-3">
                Timeline-based AI story development platform. Built for writers, directors, and producers
                who think visually and work non-linearly.
              </p>
              <a
                href="https://id8composer.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                Visit ID8Composer
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3">
                Lexicon <span className="text-sm font-normal text-[var(--text-secondary)]">◐ Coming Soon</span>
              </h3>
              <p className="text-lg text-[var(--text-secondary)]">
                Universal glossary management for production teams. Terminology that lives
                where you work, not in a separate spreadsheet.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3">
                Clear <span className="text-sm font-normal text-[var(--text-secondary)]">◐ Coming Soon</span>
              </h3>
              <p className="text-lg text-[var(--text-secondary)]">
                Remove background music from video clips. AI-powered audio separation
                for production environments.
              </p>
            </div>
          </div>
        </section>

        {/* What's Next */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">What's Next</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              We're building tools for the AI era that don't exist yet.
              Things we need in our own production work. Problems we're tired of solving manually.
            </p>
            <p>
              Lexicon and Clear are in active development.
              There's a fourth product we're not ready to talk about yet.
              It's ambitious. It's different. It solves a problem every creative team has
              but doesn't know how to articulate.
            </p>
            <p className="text-[var(--text-secondary)]">
              We're not in a rush. We're building things that last.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="pt-12 border-t border-[var(--border)]">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <div className="space-y-4 text-lg">
            <p className="text-[var(--text-secondary)]">
              Questions? Feedback? Want to collaborate?
            </p>
            <p>
              Email us at{' '}
              <a
                href="mailto:hello@id8labs.com"
                className="border-b-2 border-[var(--text-primary)] hover:opacity-70 transition-opacity"
              >
                hello@id8labs.com
              </a>
            </p>
          </div>
        </section>
      </article>
    </div>
  )
}
