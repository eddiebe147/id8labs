'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="container text-center"
      >
        <h1 className="mb-6">ID8Labs</h1>

        <p className="text-2xl md:text-3xl mb-8 text-[var(--text-secondary)]">
          Professional Tools for the <span className="text-id8-orange">AI Era</span>
        </p>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-[var(--text-secondary)]">
          We don't improve tools. We <span className="text-id8-orange font-medium">invent new categories</span>.
          Every product starts with a real problem from 20 years in production.
        </p>

        <Link
          href="/lab"
          className="inline-flex items-center gap-2 text-lg px-8 py-4 border-2 border-id8-orange text-id8-orange hover:bg-id8-orange hover:text-[var(--bg-primary)] transition-all duration-200"
        >
          Explore the Lab
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </motion.div>
    </section>
  )
}
