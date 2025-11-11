'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import BrandName from './BrandName'

export default function Mission() {
  return (
    <section className="section-spacing border-t border-[var(--border)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-12">Why <BrandName /> Exists</h2>

          <div className="space-y-6 text-lg md:text-xl leading-relaxed mb-12">
            <p>
              We don't improve tools. We <span className="text-id8-orange font-medium">invent new categories</span>.
            </p>

            <p>
              Every product we build starts with a <span className="text-id8-orange">real problem</span> from 20 years in production.
              We build tools that treat <span className="text-id8-orange">AI as a creative partner</span>, not a replacement.
            </p>

            <p className="text-[var(--text-secondary)]">
              Products get personality. The lab stays focused.
            </p>
          </div>

          <Link
            href="/origin"
            className="inline-flex items-center gap-2 text-lg border-b-2 border-id8-orange text-id8-orange hover-id8-orange transition-all pb-1"
          >
            Read the full story
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
