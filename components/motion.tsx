'use client'

/**
 * Optimized Motion Components
 *
 * Uses LazyMotion with domAnimation for smaller bundle size.
 * This reduces framer-motion from ~116KB to ~25KB by only loading
 * the features actually used (DOM animations, no SVG/3D/etc).
 *
 * Usage: Replace `import { motion } from 'framer-motion'`
 *        with `import { m } from '@/components/motion'`
 */

import { LazyMotion, domAnimation, m } from 'framer-motion'
import { ReactNode } from 'react'

// Re-export m as both m and motion for easy migration
export { m, m as motion }

// Export commonly used hooks
export { useInView, useAnimation, AnimatePresence } from 'framer-motion'

// Provider wrapper - use this at the layout level
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}

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
