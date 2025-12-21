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
            Every tool here started as a real problem.{' '}
            <span className="text-gradient-orange font-bold">
              The solutions became products.
            </span>
          </p>

          {/* Supporting Detail */}
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--id8-orange)]">For Creators</span> — AI writing partners with memory that lasts. <span className="text-purple-400">For Builders</span> — orchestration that turns tab-switching into workflows. <span className="text-cyan-400">For Fun</span> — experiments we couldn't resist building.
          </p>
        </motion.div>
      </div>

      {/* Subtle separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </section>
  )
}
