'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { getAllEssays, type Essay } from '@/lib/essays'
import { useState } from 'react'

export default function EssaysPage() {
  const allEssays = getAllEssays()
  const [filter, setFilter] = useState<'all' | Essay['category']>('all')

  const filteredEssays = filter === 'all'
    ? allEssays
    : allEssays.filter(essay => essay.category === filter)

  const categoryLabels: Record<Essay['category'], string> = {
    essay: 'Essay',
    research: 'Research',
    release: 'Release Note'
  }

  return (
    <>
      {/* Hero Section */}
      <section className="section-spacing border-b border-[var(--border)]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="mb-6">Research & Essays</h1>
            <p className="text-xl text-[var(--text-secondary)]">
              Long-form writing on product development, AI, and building category-defining tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-[var(--border)] py-6">
        <div className="container">
          <div className="flex gap-6 text-sm">
            <button
              onClick={() => setFilter('all')}
              className={`pb-2 transition-all ${
                filter === 'all'
                  ? 'border-b-2 border-id8-orange font-medium text-id8-orange'
                  : 'text-[var(--text-secondary)] hover:text-id8-orange'
              }`}
            >
              All Writing
            </button>
            <button
              onClick={() => setFilter('essay')}
              className={`pb-2 transition-all ${
                filter === 'essay'
                  ? 'border-b-2 border-id8-orange font-medium text-id8-orange'
                  : 'text-[var(--text-secondary)] hover:text-id8-orange'
              }`}
            >
              Essays
            </button>
            <button
              onClick={() => setFilter('research')}
              className={`pb-2 transition-all ${
                filter === 'research'
                  ? 'border-b-2 border-id8-orange font-medium text-id8-orange'
                  : 'text-[var(--text-secondary)] hover:text-id8-orange'
              }`}
            >
              Research
            </button>
            <button
              onClick={() => setFilter('release')}
              className={`pb-2 transition-all ${
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

      {/* Essays List */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl space-y-12">
            {filteredEssays.map((essay, index) => (
              <motion.article
                key={essay.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-[var(--border)] pb-12 last:border-0"
              >
                <Link href={`/essays/${essay.slug}`} className="group block">
                  <div className="mb-3 flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <span className="uppercase tracking-wide">
                      {categoryLabels[essay.category]}
                    </span>
                    <span>·</span>
                    <time dateTime={essay.date} suppressHydrationWarning>
                      {new Date(essay.date + 'T00:00:00').toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                    <span>·</span>
                    <span>{essay.readTime}</span>
                  </div>

                  <h2 className="mb-3 group-hover:opacity-70 transition-opacity">
                    {essay.title}
                  </h2>

                  {essay.subtitle && (
                    <p className="text-lg text-[var(--text-secondary)] mb-4 italic">
                      {essay.subtitle}
                    </p>
                  )}

                  <p className="text-[var(--text-secondary)] mb-4">
                    {essay.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-sm group-hover:translate-x-1 transition-transform">
                    Read more
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
