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
        {/* Gradient fade on edges - blend image into background */}
        <div className="absolute inset-0 pointer-events-none"
             style={{
               background: `linear-gradient(to bottom,
                 #1C1C1E 0%,
                 rgba(28, 28, 30, 0.6) 15%,
                 rgba(28, 28, 30, 0) 30%,
                 rgba(28, 28, 30, 0) 70%,
                 rgba(28, 28, 30, 0.6) 85%,
                 #1C1C1E 100%)`
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
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--text-primary)]">
          Life is non-linear.
          <br />
          Your tools should be too.
        </h2>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-4 text-[var(--text-secondary)]">
          Eddie Belaval's workshop for <span className="text-id8-orange">building ideation tools</span>.
        </p>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-[var(--text-secondary)]">
          20 years in TV/film production. Now building <span className="text-id8-orange font-medium">professional tools for the AI era</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://id8composer.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-lg px-8 py-4 bg-id8-orange text-[var(--bg-primary)] hover:opacity-90 transition-all duration-200 rounded-soft font-medium"
          >
            Launch ID8Composer
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a
            href="/lab"
            className="inline-flex items-center justify-center gap-2 text-lg px-8 py-4 border-2 border-id8-orange text-id8-orange hover:bg-id8-orange hover:text-[var(--bg-primary)] transition-all duration-200 rounded-soft font-medium"
          >
            Read the Lab Story
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
