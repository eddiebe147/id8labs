'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import BrandName from './BrandName'

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-between min-h-[calc(100vh-5rem)] overflow-hidden">
      {/* Background Image with Edge Fade */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-image.png"
          alt="Mycelium network - interconnected systems"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient fade on edges - stronger fade to protect readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)] pointer-events-none"
             style={{
               background: `linear-gradient(to bottom,
                 var(--bg-primary) 0%,
                 rgba(var(--bg-primary-rgb), 0.3) 10%,
                 transparent 25%,
                 transparent 75%,
                 rgba(var(--bg-primary-rgb), 0.3) 90%,
                 var(--bg-primary) 100%)`
             }}
        />
      </div>

      {/* Top Section - Title (much higher on tight screens) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="container relative z-10 pt-8 md:pt-56"
      >
        <h1 className="text-center">
          <BrandName />
        </h1>
      </motion.div>

      {/* Bottom Section - Content (much lower to keep center clear) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className="container relative z-10 pb-8 md:pb-40 text-center"
      >
        <p className="text-2xl md:text-3xl mb-8 text-[var(--text-secondary)]">
          Professional Tools for <span className="text-id8-orange">Today's Creators</span>
        </p>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-[var(--text-secondary)]">
          We don't improve tools. We <span className="text-id8-orange font-medium">invent new categories</span>.
          Every product starts with a real problem from 20 years in TV/film production.
        </p>

        <Link
          href="/lab"
          className="inline-flex items-center gap-2 text-lg px-8 py-4 border-2 border-id8-orange text-id8-orange hover:bg-id8-orange hover:text-[var(--bg-primary)] transition-all duration-200 rounded-soft"
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
