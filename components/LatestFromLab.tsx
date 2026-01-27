'use client'

import Link from 'next/link'
import { m } from '@/components/motion'
import { type WritingItem } from '@/lib/writing'
import { ArrowRight, Newspaper } from 'lucide-react'

const categoryBadgeClass: Record<WritingItem['category'], string> = {
  essay: 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] border-[var(--id8-orange)]/20',
  research: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  release: 'bg-green-500/10 text-green-400 border-green-500/20',
  newsletter: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function FeaturedArticle({ item }: { item: WritingItem }) {
  return (
    <Link href={`/writing/${item.slug}`} className="block group">
      <m.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -3 }}
        className="card group cursor-pointer"
      >
        {/* Category Badge */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${categoryBadgeClass[item.category]}`}
          >
            {item.category === 'newsletter' && item.issueNumber && (
              <span>Issue #{item.issueNumber}</span>
            )}
            {item.category !== 'newsletter' && (
              <span className="capitalize">{item.category}</span>
            )}
          </span>
          <span className="text-sm text-[var(--text-tertiary)]">
            {formatDate(item.date)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-[var(--id8-orange)] transition-colors">
          {item.title}
        </h3>

        {/* Subtitle if exists */}
        {item.subtitle && (
          <p className="text-lg text-[var(--text-secondary)] mb-3">
            {item.subtitle}
          </p>
        )}

        {/* Excerpt */}
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
          {item.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <span className="text-sm text-[var(--text-tertiary)]">
            {item.readTime}
          </span>
          <div className="flex items-center gap-2 text-[var(--id8-orange)] font-semibold text-sm group-hover:gap-3 transition-all">
            Read article
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </m.article>
    </Link>
  )
}

function RecentArticleItem({ item, index }: { item: WritingItem; index: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/writing/${item.slug}`}
        className="flex items-start gap-4 py-4 px-3 -mx-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors group"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full border ${categoryBadgeClass[item.category]}`}
            >
              {item.category === 'newsletter' ? `#${item.issueNumber}` : item.category}
            </span>
            <span className="text-xs text-[var(--text-tertiary)]">
              {formatDate(item.date)}
            </span>
          </div>
          <h4 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--id8-orange)] transition-colors line-clamp-1">
            {item.title}
          </h4>
          <p className="text-sm text-[var(--text-tertiary)] line-clamp-1 mt-0.5">
            {item.excerpt}
          </p>
        </div>
        <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--id8-orange)] transition-colors flex-shrink-0 mt-1" />
      </Link>
    </m.div>
  )
}

function NewsletterCTA() {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="mt-6 p-4 rounded-lg border border-purple-500/20 bg-purple-500/5"
    >
      <div className="flex items-start gap-3">
        <Newspaper className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-[var(--text-primary)] mb-1">
            Signal:Noise Newsletter
          </h4>
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            Thoughts on AI, building, and working through problems in public.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 text-sm text-purple-400 font-semibold hover:gap-3 transition-all"
          >
            Subscribe
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </m.div>
  )
}

interface LatestFromLabProps {
  items: WritingItem[]
}

export default function LatestFromLab({ items }: LatestFromLabProps) {
  const featured = items[0]
  const recent = items.slice(1, 4)

  if (!featured) {
    return null
  }

  return (
    <section id="latest" className="section-spacing bg-zone-text scroll-mt-20">
      <div className="container">
        {/* Two Column Layout - Sticky Header + Content */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          {/* Left - Sticky Section Header */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Latest from
              <br />
              <span className="text-gradient-orange">the Lab</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--id8-orange)] to-transparent mb-6" />
            <p className="text-xl text-[var(--text-secondary)]">
              Essays, research, and updates. Working through problems in public.
            </p>
          </m.div>

          {/* Right - Content */}
          <div className="space-y-8">
            {/* Featured Article */}
            <FeaturedArticle item={featured} />

            {/* Recent Articles */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-secondary)] mb-2">
                Recent Writing
              </h3>
              <div className="divide-y divide-[var(--border)]">
                {recent.map((item, index) => (
                  <RecentArticleItem key={item.slug} item={item} index={index} />
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <NewsletterCTA />

            {/* View All Link */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-4"
            >
              <Link
                href="/writing"
                className="inline-flex items-center gap-2 text-[var(--id8-orange)] font-semibold hover:gap-3 transition-all"
              >
                View all writing
                <ArrowRight className="w-5 h-5" />
              </Link>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  )
}
