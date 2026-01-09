'use client'

import Link from 'next/link'
import { m } from '@/components/motion'
import { type WritingItem, type WritingCategory } from '@/lib/writing'
import { useState } from 'react'
import { NewsletterSubscribe } from '@/components/newsletter'

interface WritingListProps {
  items: WritingItem[]
}

/**
 * Format a date string - handles both ISO dates and human-readable dates like "January 2025"
 */
function formatDate(dateStr: string): string {
  // Try parsing as a standard date
  const parsed = new Date(dateStr + 'T00:00:00')

  // Check if it's a valid date
  if (!isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // If not parseable (like "January 2025"), return as-is
  return dateStr
}

export function WritingList({ items }: WritingListProps) {
  const [filter, setFilter] = useState<'all' | WritingCategory>('all')

  const filteredItems = filter === 'all'
    ? items
    : items.filter(item => item.category === filter)

  const categoryLabels: Record<WritingCategory, string> = {
    essay: 'Essay',
    research: 'Research',
    release: 'Release Note',
    newsletter: 'Newsletter'
  }

  return (
    <>
      {/* Hero Section */}
      <section className="section-spacing border-b border-[var(--border)]">
        <div className="container">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="mb-6">Writing</h1>
            <p className="text-xl text-[var(--text-secondary)]">
              Essays, research, release notes, and the signal:noise newsletter.
            </p>
          </m.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-[var(--border)] py-6">
        <div className="container">
          <div className="flex gap-6 text-sm overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`pb-2 transition-all whitespace-nowrap ${
                filter === 'all'
                  ? 'border-b-2 border-id8-orange font-medium text-id8-orange'
                  : 'text-[var(--text-secondary)] hover:text-id8-orange'
              }`}
            >
              All Writing
            </button>
            <button
              onClick={() => setFilter('newsletter')}
              className={`pb-2 transition-all whitespace-nowrap ${
                filter === 'newsletter'
                  ? 'border-b-2 border-id8-orange font-medium text-id8-orange'
                  : 'text-[var(--text-secondary)] hover:text-id8-orange'
              }`}
            >
              Newsletter
            </button>
            <button
              onClick={() => setFilter('essay')}
              className={`pb-2 transition-all whitespace-nowrap ${
                filter === 'essay'
                  ? 'border-b-2 border-id8-orange font-medium text-id8-orange'
                  : 'text-[var(--text-secondary)] hover:text-id8-orange'
              }`}
            >
              Essays
            </button>
            <button
              onClick={() => setFilter('research')}
              className={`pb-2 transition-all whitespace-nowrap ${
                filter === 'research'
                  ? 'border-b-2 border-id8-orange font-medium text-id8-orange'
                  : 'text-[var(--text-secondary)] hover:text-id8-orange'
              }`}
            >
              Research
            </button>
            <button
              onClick={() => setFilter('release')}
              className={`pb-2 transition-all whitespace-nowrap ${
                filter === 'release'
                  ? 'border-b-2 border-id8-orange font-medium text-id8-orange'
                  : 'text-[var(--text-secondary)] hover:text-id8-orange'
              }`}
            >
              Releases
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section Header - only shows when Newsletter tab is active */}
      {filter === 'newsletter' && (
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--id8-orange)]/5 via-transparent to-[var(--id8-orange)]/5" />

          {/* Animated line */}
          <m.div
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--id8-orange)] to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          <div className="container py-12 relative">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              {/* Logo/Title */}
              <div className="flex items-center gap-4 mb-4">
                <m.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                  className="w-12 h-12 rounded-xl bg-[var(--id8-orange)] flex items-center justify-center"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </m.div>
                <div>
                  <h2
                    className="text-3xl tracking-wide text-[var(--text-primary)]"
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                    signal:noise
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] tracking-wider uppercase">
                    The ID8Labs Newsletter
                  </p>
                </div>
              </div>

              {/* Description with animated underline */}
              <p className="text-[var(--text-secondary)] mb-6 text-lg">
                Cutting through the noise to deliver what matters.
                Frameworks, case studies, and actionable insights on AI and building the future.
              </p>

              {/* Stats bar with pulse animation */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <m.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-[var(--id8-orange)]"
                  />
                  <span className="text-[var(--text-secondary)]">Monthly delivery</span>
                </div>
                <span className="text-[var(--border)]">|</span>
                <span className="text-[var(--text-secondary)]">{filteredItems.length} issue{filteredItems.length !== 1 ? 's' : ''} published</span>
                <span className="text-[var(--border)]">|</span>
                <span className="text-[var(--text-secondary)]">1,000+ subscribers</span>
              </div>
            </m.div>
          </div>

          {/* Bottom animated line */}
          <m.div
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--id8-orange)]/50 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </section>
      )}

      {/* Writing List */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl space-y-12">
            {filteredItems.map((item, index) => {
              const isNewsletter = item.category === 'newsletter'

              return (
                <m.article
                  key={item.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b border-[var(--border)] pb-12 last:border-0"
                >
                  <Link href={isNewsletter ? `/${item.slug}` : `/essays/${item.slug}`} className="group block">
                    <div className="mb-3 flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                      {isNewsletter ? (
                        <span className="text-[var(--id8-orange)] font-medium">
                          Issue #{item.issueNumber}
                        </span>
                      ) : (
                        <span className="uppercase tracking-wide">
                          {categoryLabels[item.category]}
                        </span>
                      )}
                      <span>·</span>
                      <time dateTime={item.date} suppressHydrationWarning>
                        {formatDate(item.date)}
                      </time>
                      <span>·</span>
                      <span>{item.readTime}</span>
                    </div>

                    <h2 className="mb-3 group-hover:opacity-70 transition-opacity">
                      {item.title}
                    </h2>

                    {item.subtitle && (
                      <p className="text-lg text-[var(--text-secondary)] italic mb-4">
                        {item.subtitle}
                      </p>
                    )}

                    <p className="text-[var(--text-secondary)] mb-4">
                      {item.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-sm group-hover:translate-x-1 transition-transform">
                      Read {isNewsletter ? 'issue' : 'more'}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </Link>
                </m.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Subscribe CTA */}
      <section className="section-spacing bg-[var(--bg-secondary)] border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              Get signal:noise delivered
            </h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Weekly insights on AI, automation, and building the future. Join 1,000+ builders.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterSubscribe
                variant="inline"
                source="writing-page"
                title=""
                description=""
                buttonText="Subscribe to Newsletter"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
