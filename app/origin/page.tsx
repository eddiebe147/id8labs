import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Origin Story - ID8Labs',
  description: "20 years in production. One philosophy: invent categories, don't improve them.",
}

export default function OriginPage() {
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
          <h1 className="mb-6">The Story</h1>
          <p className="text-xl text-[var(--text-secondary)]">
            20 years in production. One philosophy: <span className="text-id8-orange font-medium">invent categories, don't improve them.</span>
          </p>
        </header>

        {/* Origins */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Origins</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              I've spent two decades in the trenches of television production.
              Documentaries, reality shows, narrative series—if it aired, I built the workflow behind it.
            </p>
            <p>
              Every tool I've created at ID8Labs solves a problem I faced daily.
              Story development tools that couldn't handle the messy reality of creative work.
              Glossaries trapped in spreadsheets when they needed to live in production pipelines.
              Audio cleanup requiring expensive post-production when AI could handle it on set.
            </p>
            <p>
              I didn't set out to start a lab. I set out to stop being frustrated.
            </p>
          </div>
        </section>

        {/* Philosophy Quote */}
        <section className="mb-16 py-12 border-t border-b border-[var(--border)] rounded-subtle">
          <blockquote className="text-2xl md:text-3xl font-bold text-center italic">
            "Life is non-linear. Your tools should be too."
          </blockquote>
        </section>

        {/* My Approach */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">My Approach</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              I don't improve existing tools. I ask why they exist in the first place,
              then build something completely different.
            </p>
            <p>
              <strong className="text-id8-orange">Category creation over iteration.</strong> ID8Composer isn't a better
              outlining tool—it's Final Cut Pro for story composition. A timeline-based platform that
              treats narrative like the non-linear beast it actually is.
            </p>
            <p>
              <strong className="text-id8-orange">Battle-tested, not theoretical.</strong> Every product gets used in
              real production before release. If I wouldn't use it myself, I don't ship it.
            </p>
            <p>
              <strong className="text-id8-orange">AI as partner, not replacement.</strong> These tools treat AI as a
              creative collaborator. The AI handles grunt work. You do the thinking.
            </p>
          </div>
        </section>

        {/* The Products */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">The Products</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-3">
                ID8Composer <span className="text-sm font-normal text-id8-orange">● Active</span>
              </h3>
              <p className="text-lg text-[var(--text-secondary)] mb-3">
                Final Cut Pro for AI-assisted story development. Built for creators
                who think visually and work non-linearly.
              </p>
              <a
                href="https://id8composer.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-id8-orange hover:opacity-70 transition-opacity"
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
                Wikipedia for your story universe. When you're 100 episodes deep, find any character, relationship, or plot thread instantly.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3">
                Clear <span className="text-sm font-normal text-[var(--text-secondary)]">◐ Coming Soon</span>
              </h3>
              <p className="text-lg text-[var(--text-secondary)]">
                Remove background music from video clips. AI-powered audio separation for production.
              </p>
            </div>
          </div>
        </section>

        {/* What's Next */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">What's Next</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              I'm building tools for the AI era that don't exist yet.
              Things I need in my own work. Problems I'm tired of solving manually.
            </p>
            <p>
              Lexicon and Clear are in active development. I'm not in a rush. I'm building things that last.
            </p>
          </div>
        </section>

        {/* Cross-link to Lab Story */}
        <section className="pt-12 border-t border-[var(--border)]">
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 text-lg text-id8-orange hover:opacity-70 transition-opacity"
          >
            Read the Lab Story
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <p className="text-[var(--text-secondary)] mt-3">
            Learn about our philosophy and how we build category-defining tools.
          </p>
        </section>
      </article>
    </div>
  )
}
