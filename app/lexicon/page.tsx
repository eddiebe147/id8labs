'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * Lexicon Product Page
 *
 * Version-controlled wiki for story universes
 * Accent Color: RGB Blue (#00D9FF)
 */
export default function LexiconPage() {
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
            Lexicon
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
            GitHub for story universes
          </p>
        </motion.header>

        {/* What It Does */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h2 className="text-3xl font-bold text-text-primary">What It Does</h2>
          <div className="text-lg text-text-secondary max-w-2xl space-y-4">
            <p>
              Lexicon is a version-controlled wiki system for managing complex story
              universes and world-building canon. Track every character, location,
              event, and lore element with the precision of software version control.
            </p>
            <p>
              Branch timelines, merge alternate realities, and maintain consistency
              across multiverses. Whether you&apos;re building a 10-season TV franchise
              or a video game with expansive lore, Lexicon keeps your canon organized
              and accessible.
            </p>
            <p>
              Collaborate with writers, game designers, and creative teams without the
              chaos of spreadsheets and wikis. Every change is tracked, every conflict
              is flagged, and your universe stays coherent.
            </p>
          </div>
        </motion.section>

        {/* Who Its For */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h2 className="text-3xl font-bold text-text-primary">Who It&apos;s For</h2>
          <ul className="text-lg text-text-secondary max-w-2xl space-y-3">
            <li className="flex items-start gap-3">
              <span className="font-bold mt-1" style={{ color: '#00D9FF' }}>
                →
              </span>
              <span>
                <strong className="text-text-primary">Writers & Novelists</strong>
                {' '}building epic series, cinematic universes, or long-running
                narratives that span years
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold mt-1" style={{ color: '#00D9FF' }}>
                →
              </span>
              <span>
                <strong className="text-text-primary">Game Developers</strong>
                {' '}managing lore, quest lines, and narrative consistency across
                expansive open-world games
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold mt-1" style={{ color: '#00D9FF' }}>
                →
              </span>
              <span>
                <strong className="text-text-primary">Franchise Creators</strong>
                {' '}coordinating canon across multiple media: books, shows, comics,
                and games
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
            className="product-cta inline-flex items-center gap-2 px-8 py-4 font-mono font-semibold text-sm md:text-base tracking-wide rounded-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary group"
            style={{
              backgroundColor: '#00D9FF',
              color: '#1A1614',
            }}
          >
            Try It Free
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.section>
      </motion.div>

      {/* Product-Specific Button Glow (RGB Blue) */}
      <style jsx>{`
        .product-cta:hover {
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.5),
            0 0 40px rgba(0, 217, 255, 0.3),
            inset 0 0 10px rgba(255, 255, 255, 0.2);
          filter: brightness(1.1);
        }

        .product-cta {
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .product-cta:focus {
          ring-color: #00d9ff;
        }
      `}</style>
    </div>
  )
}
