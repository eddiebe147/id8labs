'use client'

import { motion } from 'framer-motion'
import { RaisedDot } from '@/components/foundation/raised-dot'

/**
 * Social Proof Strip Component - Living Circuit Board Edition
 *
 * Minimal trust builder with circuit board accent
 * - Raised dots as visual markers (input/output flow)
 * - Wire borders showing data transmission
 * - Clean, centered credibility statement
 */
export function SocialProofStrip() {
  return (
    <section
      className="relative px-6 bg-bg-secondary overflow-hidden"
      style={{
        paddingTop: 'var(--spacing-xl)',
        paddingBottom: 'var(--spacing-xl)',
      }}
    >
      {/* Wire Borders - Top & Bottom */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-text-secondary"
        style={{ opacity: 0.2 }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-text-secondary"
        style={{ opacity: 0.2 }}
      />

      {/* Content Container */}
      <div className="max-w-4xl mx-auto relative">
        {/* Left Dot Indicator */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          <RaisedDot size="sm" color="rgb-green" glowIntensity={60} />
        </motion.div>

        {/* Social Proof Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-center text-sm md:text-base text-text-secondary font-light tracking-wide px-8 md:px-0"
        >
          Powering creative projects from{' '}
          <span className="text-text-primary font-medium">
            Emmy-winning TV shows
          </span>{' '}
          to{' '}
          <span className="text-text-primary font-medium">
            bestselling novels
          </span>
        </motion.p>

        {/* Right Dot Indicator */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          <RaisedDot size="sm" color="accent" glowIntensity={60} />
        </motion.div>
      </div>
    </section>
  )
}
