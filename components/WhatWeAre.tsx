'use client'

import { motion } from 'framer-motion'

/**
 * WhatWeAre Section
 * Steve Jobs-inspired clarity statement explaining what id8Labs is
 * Sits between Hero and ProductGrid ("What's happening in the lab")
 */
export default function WhatWeAre() {
  return (
    <section className="relative py-24 bg-zone-text">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          {/* Main Statement */}
          <p className="text-2xl md:text-3xl font-medium leading-relaxed text-[var(--text-primary)]">
            Most AI tools are calculators for words.{' '}
            <span className="text-gradient-orange font-bold">
              We're building instruments for ideas.
            </span>
          </p>

          {/* Supporting Detail */}
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            id8Labs creates tools that think <span className="italic">with</span> you, not <span className="italic">for</span> you — starting with ID8Composer, where your thoughts become living, evolving things.
          </p>
        </motion.div>
      </div>

      {/* Subtle separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </section>
  )
}
