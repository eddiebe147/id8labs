'use client'

/**
 * Motion Components Re-export
 *
 * Simple re-export from framer-motion for consistent imports across the app.
 */

// Re-export motion and commonly used components/hooks
export { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion'

// Also export as 'm' for compatibility with existing code
export { motion as m } from 'framer-motion'

// Pre-configured animation variants for common patterns
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}
