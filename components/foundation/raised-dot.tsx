'use client'

import { m } from '@/components/motion'

/**
 * RaisedDot Component
 *
 * Foundation element of the Living Circuit Board aesthetic
 * Tactile LED dot with raised 3D effect and glow states
 */

export interface RaisedDotProps {
  size?: 'sm' | 'md' | 'lg'
  glowIntensity?: 20 | 40 | 60 | 80 | 100 // Percentage
  color?: 'accent' | 'rgb-red' | 'rgb-green' | 'rgb-blue' | 'text-primary'
  animated?: 'static' | 'breathing' | 'pulse'
  className?: string
}

const sizeMap = {
  sm: '6px',
  md: '8px',
  lg: '12px',
}

const colorMap = {
  accent: 'var(--accent)',
  'rgb-red': 'var(--rgb-red)',
  'rgb-green': 'var(--rgb-green)',
  'rgb-blue': 'var(--rgb-blue)',
  'text-primary': 'var(--text-primary)',
}

export function RaisedDot({
  size = 'md',
  glowIntensity = 60,
  color = 'accent',
  animated = 'static',
  className = '',
}: RaisedDotProps) {
  const dotSize = sizeMap[size]
  const dotColor = colorMap[color]

  // Animation variants
  const animations = {
    static: {},
    breathing: {
      opacity: [glowIntensity / 100, 1, glowIntensity / 100],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    pulse: {
      opacity: [glowIntensity / 100, 1, glowIntensity / 100],
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <m.div
      className={`raised-dot ${className}`}
      animate={animations[animated]}
      style={{
        display: 'inline-block',
        width: dotSize,
        height: dotSize,
        borderRadius: '50%',
        backgroundColor: dotColor,
        opacity: glowIntensity / 100,
        position: 'relative',
        flexShrink: 0,

        // Raised 3D effect
        boxShadow: `
          0 -1px 0 rgba(255, 255, 255, 0.3),
          0 1px 2px rgba(0, 0, 0, 0.2)
        `,

        // Glow effect
        filter: `drop-shadow(0 0 ${parseInt(dotSize) / 2}px ${dotColor})`,

        // Smooth transitions
        transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
      }}
    />
  )
}
