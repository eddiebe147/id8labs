'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-zone-text">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          {/* Main Headline - BOLD & DRAMATIC */}
          <h1 className="text-[clamp(3.5rem,10vw,7rem)] leading-[0.9] font-extrabold tracking-tight">
            <span className="block mb-2">
              <span className="text-gradient-orange">id8</span>Labs
            </span>
            <span className="block text-[clamp(2rem,5vw,3.5rem)] font-bold text-[var(--text-primary)]">
              Building tools for
            </span>
            <span className="block text-[clamp(2rem,5vw,3.5rem)] font-bold text-[var(--text-primary)]">
              non-linear thinking
            </span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto font-medium leading-relaxed"
          >
            A workshop for ideation tools that treat AI as a creative partner with functional memory.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
          >
            <a
              href="https://id8composer.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hover-lift group"
            >
              Launch ID8Composer
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="/lab"
              className="btn btn-secondary hover-lift"
            >
              Read the Lab Story
            </a>
          </motion.div>

          {/* Social Proof / Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-8 pt-12 text-sm text-[var(--text-tertiary)]"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full animate-pulse" />
              <span>ID8Composer v0.8.1 Live</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-[var(--border)] rounded-full" />
            <div className="hidden sm:flex items-center gap-2">
              <span>Built in Miami</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements - Subtle depth */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </section>
  )
}
