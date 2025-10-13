'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * Clear Product Page
 *
 * AI-powered background music removal tool
 * Accent Color: RGB Green (#39FF14)
 */
export default function ClearPage() {
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
            Clear
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
            Extract dialogue, remove the noise
          </p>
        </motion.header>

        {/* What It Does */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h2 className="text-3xl font-bold text-text-primary">What It Does</h2>
          <div className="text-lg text-text-secondary max-w-2xl space-y-4">
            <p>
              Clear is an AI-powered audio processing tool that surgically removes
              background music from recordings while preserving crystal-clear dialogue
              and vocals. No more choosing between good music and clean audio.
            </p>
            <p>
              Unlike traditional audio editing that requires manual EQ work and often
              destroys vocal clarity, Clear uses advanced AI models trained specifically
              on dialogue extraction. Upload a file, get clean audio back in minutes.
            </p>
            <p>
              Perfect for content creators who need to repurpose interviews, isolate
              dialogue from archival footage, or clean up podcast recordings with
              intrusive background tracks.
            </p>
          </div>
        </motion.section>

        {/* Who It's For */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h2 className="text-3xl font-bold text-text-primary">Who It&apos;s For</h2>
          <ul className="text-lg text-text-secondary max-w-2xl space-y-3">
            <li className="flex items-start gap-3">
              <span className="font-bold mt-1" style={{ color: '#39FF14' }}>
                →
              </span>
              <span>
                <strong className="text-text-primary">Podcasters</strong>
                {' '}who need to isolate guest dialogue from recordings with
                background music or ambient noise
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold mt-1" style={{ color: '#39FF14' }}>
                →
              </span>
              <span>
                <strong className="text-text-primary">Video Editors</strong>
                {' '}extracting dialogue from B-roll, interviews, or archival footage
                for remixing and repurposing
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold mt-1" style={{ color: '#39FF14' }}>
                →
              </span>
              <span>
                <strong className="text-text-primary">Content Creators</strong>
                {' '}who need clean audio stems for multilingual dubbing, remixes,
                or accessibility features
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
              backgroundColor: '#39FF14',
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

      {/* Product-Specific Button Glow (RGB Green) */}
      <style jsx>{`
        .product-cta:hover {
          box-shadow: 0 0 20px rgba(57, 255, 20, 0.5),
            0 0 40px rgba(57, 255, 20, 0.3),
            inset 0 0 10px rgba(255, 255, 255, 0.2);
          filter: brightness(1.1);
        }

        .product-cta {
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .product-cta:focus {
          ring-color: #39ff14;
        }
      `}</style>
    </div>
  )
}
