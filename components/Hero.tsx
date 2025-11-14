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
          src="/hero-laptop-v3.jpg"
          alt="Person working on a laptop in a dark room"
          fill
          className="object-cover object-[50%_30%]"
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
        {/* Additional darkening overlay for mobile to avoid bright spots */}
        <div className="absolute inset-0 pointer-events-none bg-black/20 md:bg-transparent" />
      </div>

      {/* Top Section - Logo (lifted higher) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="container relative z-10 pt-16 md:pt-32"
      >
        <h1 className="text-center">
          <BrandName />
        </h1>
      </motion.div>

      {/* Bottom Section - Content positioned lower */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className="container relative z-10 pb-16 md:pb-32"
      >
        <div className="mx-auto max-w-3xl rounded-[24px] border border-white/15 bg-white/5 backdrop-blur-md px-6 py-10 text-center shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] space-y-12">
          {/* Headline moved down */}
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
            Life is non-linear.
            <br />
            Your tools should be too.
          </h2>

          {/* Copy moved to where buttons were */}
          <div className="space-y-3">
            <p className="text-base md:text-lg max-w-2xl mx-auto text-white/95 drop-shadow-[0_8px_20px_rgba(0,0,0,0.55)]">
              A workshop for <span className="text-id8-orange">building ideation tools</span>.
            </p>

            <p className="text-base md:text-lg max-w-2xl mx-auto text-white/95 drop-shadow-[0_8px_20px_rgba(0,0,0,0.55)]">
              From decades of in-field experience, we now make tools to <span className="text-id8-orange font-medium">bridge legacy filmmaking and the new possibilities of today</span>.
            </p>
          </div>

          {/* Button moved further down, Launch ID8Composer removed */}
          <div className="flex justify-center pt-3 md:pt-5">
            <a
              href="/lab"
              className="inline-flex items-center justify-center gap-2 text-sm md:text-base px-6 py-3 border-2 border-id8-orange text-id8-orange hover:bg-id8-orange hover:text-[var(--bg-primary)] transition-all duration-200 rounded-soft font-medium"
            >
              Read the Lab Story
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
