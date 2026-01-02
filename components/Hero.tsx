'use client'

import { m } from '@/components/motion'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-zone-text">
      <div className="container relative z-10">
        <m.div
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
              Tools for creators.
            </span>
            <span className="block text-[clamp(2rem,5vw,3.5rem)] font-bold text-[var(--text-primary)]">
              Infrastructure for builders.
            </span>
          </h1>

          {/* Subheadline */}
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto font-medium leading-relaxed"
          >
            AI as thinking partner, not chatbot. Tools that compound—every session builds on the last.
          </m.p>

          {/* CTA Buttons */}
          <m.div
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
          </m.div>

          {/* Social Proof / Status */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-12 text-sm text-[var(--text-tertiary)]"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full animate-pulse" />
              <span>Composer v0.8.1</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-[var(--border)] rounded-full" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full animate-pulse" />
              <span>DeepStack v2.5.0</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-[var(--border)] rounded-full" />
            <div className="hidden sm:flex items-center gap-2">
              <span>Built in Miami</span>
            </div>
          </m.div>
        </m.div>
      </div>

      {/* Decorative elements - Subtle depth */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </section>
  )
}
