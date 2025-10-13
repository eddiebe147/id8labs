'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * ID8Composer Product Page
 *
 * Story composition platform with dual-panel editing
 * Accent Color: Orange (light mode) / Red (dark mode)
 */
export default function ID8ComposerPage() {
  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <motion.div
        className="max-w-4xl mx-auto px-8 py-20 space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.header variants={itemVariants} className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary">
            ID8Composer
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
            The Final Cut Pro for AI-assisted text creation
          </p>
        </motion.header>

        {/* What It Does */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h2 className="text-3xl font-bold text-text-primary">What It Does</h2>
          <div className="text-lg text-text-secondary max-w-2xl space-y-4">
            <p>
              ID8Composer is a story composition platform that combines the precision
              of professional editing tools with the power of AI collaboration. Think
              dual-panel workspace: your story on the left, intelligent AI assistance
              on the right.
            </p>
            <p>
              Unlike generic writing tools, ID8Composer understands narrative structure,
              character arcs, and story beats. It&apos;s built specifically for long-form
              content creation where consistency and quality matter.
            </p>
            <p>
              Draft faster, edit smarter, and maintain creative control while AI handles
              the heavy lifting of research, continuity checking, and suggestion generation.
            </p>
          </div>
        </motion.section>

        {/* Who Its For */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h2 className="text-3xl font-bold text-text-primary">Who It&apos;s For</h2>
          <ul className="text-lg text-text-secondary max-w-2xl space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">→</span>
              <span>
                <strong className="text-text-primary">TV Producers & Showrunners</strong>
                {' '}who need to maintain consistency across episodes and seasons while
                managing writer&apos;s rooms
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">→</span>
              <span>
                <strong className="text-text-primary">Content Creators</strong>
                {' '}building serialized narratives for YouTube, podcasts, or streaming
                platforms
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">→</span>
              <span>
                <strong className="text-text-primary">Marketing Teams</strong>
                {' '}crafting campaign narratives and brand stories that need to stay
                on-message across channels
              </span>
            </li>
          </ul>
        </motion.section>

        {/* Status */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h2 className="text-3xl font-bold text-text-primary">Status</h2>
          <div>
            <span
              className="inline-block font-mono text-sm tracking-wider uppercase px-4 py-2 rounded-md"
              style={{
                color: '#39FF14',
                backgroundColor: 'rgba(57, 255, 20, 0.1)',
                border: '1px solid rgba(57, 255, 20, 0.3)',
              }}
            >
              ● ACTIVE BETA
            </span>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section variants={itemVariants} className="pt-8">
          <Link
            href="#"
            className="product-cta inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg-primary font-mono font-semibold text-sm md:text-base tracking-wide rounded-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary group"
          >
            Try It Free
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.section>
      </motion.div>

      {/* Product-Specific Button Glow (Orange) */}
      <style jsx>{`
        .product-cta:hover {
          box-shadow: 0 0 20px rgba(255, 107, 53, 0.4),
            0 0 40px rgba(255, 107, 53, 0.2),
            inset 0 0 10px rgba(255, 255, 255, 0.1);
          filter: brightness(1.1);
        }

        :global([data-theme='dark']) .product-cta:hover {
          box-shadow: 0 0 20px rgba(255, 60, 56, 0.5),
            0 0 40px rgba(255, 60, 56, 0.3),
            inset 0 0 10px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  )
}
