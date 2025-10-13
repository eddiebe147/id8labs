'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * 404 Not Found Page
 *
 * Custom error page with VHS glitch aesthetic
 * Maintains brand identity while handling missing routes
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary text-text-primary px-6 relative overflow-hidden">
      {/* Background RGB Geometric Elements */}
      <motion.div
        className="absolute top-20 right-20 w-24 h-24"
        style={{
          backgroundColor: 'rgba(255, 60, 56, 0.1)',
        }}
        animate={{
          rotate: [0, 90, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-32 left-16 w-16 h-16 rounded-full"
        style={{
          backgroundColor: 'rgba(0, 217, 255, 0.1)',
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main Content */}
      <motion.div
        className="text-center space-y-8 max-w-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Glitchy 404 */}
        <div className="relative">
          <motion.h1
            className="text-9xl md:text-[12rem] font-mono font-bold"
            style={{
              color: 'var(--accent)',
            }}
            animate={{
              textShadow: [
                '-3px 0 var(--rgb-red), 3px 0 var(--rgb-blue)',
                '-4px 0 var(--rgb-red), 4px 0 var(--rgb-blue)',
                '-3px 0 var(--rgb-red), 3px 0 var(--rgb-blue)',
              ],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            404
          </motion.h1>
        </div>

        {/* Message */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Page Not Found
          </h2>
          <p className="text-lg text-text-secondary max-w-md mx-auto">
            Looks like this route doesn&apos;t exist. Maybe it&apos;s still in
            development, or perhaps you&apos;ve discovered a glitch in the matrix.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/"
            className="not-found-cta inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg-primary font-mono font-semibold text-sm md:text-base tracking-wide rounded-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary group"
          >
            Return Home
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Button Hover Effects */}
      <style jsx>{`
        .not-found-cta:hover {
          box-shadow: 0 0 20px rgba(255, 107, 53, 0.4),
            0 0 40px rgba(255, 107, 53, 0.2),
            inset 0 0 10px rgba(255, 255, 255, 0.1);
          filter: brightness(1.1);
        }

        :global([data-theme='dark']) .not-found-cta:hover {
          box-shadow: 0 0 20px rgba(255, 60, 56, 0.5),
            0 0 40px rgba(255, 60, 56, 0.3),
            inset 0 0 10px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  )
}
