'use client'

import { useEffect, useState } from 'react'

/**
 * CRTOverlay - Fixed overlay that adds CRT monitor effects
 *
 * Features:
 * - Scanlines (horizontal lines, subtle opacity)
 * - Vignette (darker corners for tube effect)
 * - Phosphor glow pulse (subtle green tint animation)
 * - Optional flicker effect
 * - Respects prefers-reduced-motion
 *
 * Usage:
 * <CRTOverlay enableFlicker={false} />
 */

interface CRTOverlayProps {
  enableFlicker?: boolean
  className?: string
}

export default function CRTOverlay({
  enableFlicker = false,
  className = ''
}: CRTOverlayProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] ${className}`}
      aria-hidden="true"
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          )`
        }}
      />

      {/* Vignette - darker corners */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 50%,
            rgba(0, 0, 0, 0.4) 100%
          )`
        }}
      />

      {/* Phosphor glow - subtle pulsing green tint */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-0 animate-phosphor-pulse"
          style={{
            background: `radial-gradient(
              ellipse at center,
              #00ff41 0%,
              transparent 70%
            )`,
            opacity: 0.02
          }}
        />
      )}

      {/* Optional flicker */}
      {enableFlicker && !prefersReducedMotion && (
        <div
          className="absolute inset-0 animate-flicker"
          style={{
            background: 'transparent'
          }}
        />
      )}

      {/* Add animations to global styles if not present */}
      <style jsx global>{`
        @keyframes phosphor-pulse {
          0%, 100% {
            opacity: 0.02;
          }
          50% {
            opacity: 0.04;
          }
        }

        @keyframes flicker {
          0%, 100% {
            opacity: 0.97;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-phosphor-pulse {
          animation: phosphor-pulse 4s ease-in-out infinite;
        }

        .animate-flicker {
          animation: flicker 0.15s infinite;
        }
      `}</style>
    </div>
  )
}
