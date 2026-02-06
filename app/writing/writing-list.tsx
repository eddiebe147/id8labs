'use client'

import Image from 'next/image'
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
 * Uses UTC parsing to avoid timezone hydration mismatches
 */
function formatDate(dateStr: string): string {
  // Handle edge case where dateStr might be undefined or null
  if (!dateStr) return 'Unknown Date'
  
  // Try parsing as ISO date first (YYYY-MM-DD format)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const parsed = new Date(dateStr + 'T00:00:00.000Z') // Force UTC to avoid timezone issues
    
    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC' // Force UTC to match server rendering
      })
    }
  }
  
  // Try parsing as a standard date (fallback)
  const parsed = new Date(dateStr + 'T00:00:00')
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
        <>
          <section className="relative overflow-hidden">
            {/* Full Header Image with Text Overlay */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden"
            >
              <Image
                src="/images/newsletter-header.jpg"
                alt="Hidden leafhopper in flower - signal:noise newsletter"
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: '50% 55%' }}
                priority
              />
              {/* Subtle gradient for text readability - just where text sits */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Text overlay - left justified */}
              <div className="absolute inset-0 flex flex-col justify-end">
                <div className="container pb-8 md:pb-12">
                  <m.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h2
                      className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-2"
                      style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900 }}
                    >
                      Signal:Noise
                    </h2>
                    <p className="text-sm md:text-base text-white/80 tracking-[0.2em] uppercase">
                      The ID8Labs Newsletter
                    </p>
                  </m.div>
                </div>
              </div>
            </m.div>
          </section>

          {/* Stats bar - outside header */}
          <div className="border-b border-[var(--border)] py-4">
            <div className="container">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <m.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-[var(--id8-orange)]"
                  />
                  <span className="text-[var(--text-secondary)]">Monthly</span>
                </div>
                <span className="text-[var(--border)]">·</span>
                <span className="text-[var(--text-secondary)]">{filteredItems.length} issue{filteredItems.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </>
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
                  <Link href={isNewsletter ? `/${item.slug}` : `/writing/${item.slug}`} className="group block">
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
