'use client'

import { ReactNode, useRef } from 'react'
import { m, useInView } from '@/components/motion'

/**
 * ScrollReveal - Framer Motion wrapper for scroll-triggered animations
 *
 * Note: Uses motion directly from framer-motion for compatibility with
 * the existing codebase pattern (other components do the same).
 *
 * Usage:
 * <ScrollReveal direction="up" delay={0.2}>
 *   <TerminalCard ... />
 * </ScrollReveal>
 *
 * <ScrollReveal direction="left">
 *   <div>Content fades in from left</div>
 * </ScrollReveal>
 */

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  immediate?: boolean // Show immediately without scroll trigger
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  immediate = false
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  })

  // When immediate=true, bypass useInView entirely (useful for hero elements)
  const shouldShow = immediate || isInView

  // Direction-based initial positions
  const directionVariants = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 }
  }

  const initial = {
    opacity: 0,
    ...directionVariants[direction]
  }

  const animate = {
    opacity: shouldShow ? 1 : 0,
    y: shouldShow ? 0 : directionVariants[direction].y,
    x: shouldShow ? 0 : directionVariants[direction].x
  }

  return (
    <m.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1] // Custom easing for smooth motion
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}
