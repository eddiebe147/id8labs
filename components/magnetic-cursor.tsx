'use client'

import { motion, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useMouse } from '@/lib/hooks/use-mouse'

/**
 * Magnetic Cursor Distortion Effect
 * Mimics the way a magnet warps a CRT TV screen
 *
 * Features:
 * - Smooth spring-based cursor tracking
 * - SVG filter distortion (feTurbulence + feDisplacementMap)
 * - Theme-aware color tinting
 * - GPU-accelerated for 60fps performance
 * - Non-intrusive (pointer-events: none)
 */
export function MagneticCursor() {
  const { mouseX, mouseY } = useMouse()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Transform mouse position to center the distortion effect
  // Subtract half the distortion radius (150px) to center on cursor
  const cursorX = useTransform(mouseX, (x) => x - 150)
  const cursorY = useTransform(mouseY, (y) => y - 150)

  // Don't render on server or until mounted
  if (!mounted) {
    return null
  }

  // Theme-aware colors
  const isDark = theme === 'dark'
  const tintColor = isDark ? '#FF3C38' : '#FF6B35' // Red for dark, Orange for light

  return (
    <>
      {/* SVG Filter Definition */}
      <svg
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          pointerEvents: 'none',
          zIndex: 9997,
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id="magnetic-distortion" x="-50%" y="-50%" width="200%" height="200%">
            {/* Create turbulence noise pattern */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="3"
              seed="2"
              stitchTiles="stitch"
              result="turbulence"
            />

            {/* Displace the source graphic using the turbulence */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacement"
            />

            {/* Slightly blur the edges for smoother effect */}
            <feGaussianBlur in="displacement" stdDeviation="0.5" result="blur" />

            {/* Composite with original for subtle blend */}
            <feBlend in="blur" in2="SourceGraphic" mode="normal" />
          </filter>

          {/* Radial gradient for smooth falloff */}
          <radialGradient id="magnetic-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={tintColor} stopOpacity="0.25" />
            <stop offset="40%" stopColor={tintColor} stopOpacity="0.15" />
            <stop offset="70%" stopColor={tintColor} stopOpacity="0.05" />
            <stop offset="100%" stopColor={tintColor} stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Magnetic Distortion Overlay */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '300px', // 2x radius for full circular effect
          height: '300px',
          pointerEvents: 'none',
          zIndex: 9997,
          x: cursorX,
          y: cursorY,
          willChange: 'transform', // GPU acceleration hint
        }}
        aria-hidden="true"
      >
        {/* Distorted gradient circle */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'url(#magnetic-gradient)',
            filter: 'url(#magnetic-distortion)',
            mixBlendMode: isDark ? 'screen' : 'multiply',
            opacity: 0.8,
          }}
        />

        {/* Additional color tint layer (no distortion) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${tintColor} 0%, transparent 70%)`,
            mixBlendMode: isDark ? 'screen' : 'multiply',
            opacity: 0.15,
          }}
        />
      </motion.div>
    </>
  )
}
