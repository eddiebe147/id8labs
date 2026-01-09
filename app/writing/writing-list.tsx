'use client'

import Link from 'next/link'
import { m } from '@/components/motion'
import { type WritingItem, type WritingCategory } from '@/lib/writing'
import { useState } from 'react'
import { NewsletterSubscribe } from '@/components/newsletter'

interface WritingListProps {
  items: WritingItem[]
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
                  className={`pb-12 last:border-0 ${
                    isNewsletter 
                      ? 'border-2 border-[var(--id8-orange)]/20 rounded-xl p-6 bg-gradient-to-br from-[var(--id8-orange)]/5 to-transparent hover:border-[var(--id8-orange)]/40 transition-colors' 
                      : 'border-b border-[var(--border)]'
                  }`}
                >
                  <Link href={isNewsletter ? `/${item.slug}` : `/essays/${item.slug}`} className="group block">
                    {isNewsletter && (
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--id8-orange)] text-white rounded-full text-xs font-bold tracking-wider">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                          </svg>
                          signal:noise
                        </div>
                        <span className="px-2 py-1 bg-[var(--bg-secondary)] border border-[var(--border)] rounded text-xs font-mono text-[var(--id8-orange)]">
                          Issue #{item.issueNumber}
                        </span>
                      </div>
                    )}

                    <div className="mb-3 flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                      {!isNewsletter && (
                        <>
                          <span className="uppercase tracking-wide">
                            {categoryLabels[item.category]}
                          </span>
                          <span>·</span>
                        </>
                      )}
                      <time dateTime={item.date} suppressHydrationWarning>
                        {new Date(item.date + 'T00:00:00').toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </time>
                      <span>·</span>
                      <span>{item.readTime}</span>
                    </div>

                    <h2 className={`mb-3 group-hover:opacity-70 transition-opacity ${
                      isNewsletter ? 'text-2xl' : ''
                    }`}>
                      {item.title}
                    </h2>

                    {item.subtitle && (
                      <p className={`text-lg mb-4 ${
                        isNewsletter 
                          ? 'text-[var(--text-primary)] font-medium' 
                          : 'text-[var(--text-secondary)] italic'
                      }`}>
                        {item.subtitle}
                      </p>
                    )}

                    <p className="text-[var(--text-secondary)] mb-4">
                      {item.excerpt}
                    </p>

                    <div className={`flex items-center gap-2 text-sm group-hover:translate-x-1 transition-transform ${
                      isNewsletter ? 'text-[var(--id8-orange)] font-medium' : ''
                    }`}>
                      Read {isNewsletter ? 'newsletter' : 'more'}
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
