'use client'

import { useEffect, useState } from 'react'

/**
 * CRTOverlay - Industrial submarine cockpit visual effects layer
 *
 * Features:
 * - Scanlines (horizontal lines)
 * - Vignette (darker corners for tube effect)
 * - Phosphor glow pulse (subtle green tint animation)
 * - Film grain / noise texture (industrial wear)
 * - Surface scratch marks (aged equipment aesthetic)
 * - Chromatic aberration (RGB split at edges)
 * - Optional flicker effect
 * - Respects prefers-reduced-motion
 *
 * Layer ordering (bottom to top):
 * 1. phosphor-glow - Subtle pulsing green afterglow
 * 2. vignette - Darker corners for depth
 * 3. scanlines - Horizontal scanline pattern
 * 4. flicker - Subtle screen flicker
 * 5. chromatic-aberration - RGB split at edges
 * 6. noise-grain - Film grain / industrial noise
 * 7. scratches - Surface wear marks
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
            opacity: 0.02,
            zIndex: 1
          }}
        />
      )}

      {/* Vignette - darker corners */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 50%,
            rgba(0, 0, 0, 0.4) 100%
          )`,
          zIndex: 5
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          )`,
          zIndex: 6
        }}
      />

      {/* Optional flicker */}
      {enableFlicker && !prefersReducedMotion && (
        <div
          className="absolute inset-0 animate-flicker"
          style={{
            background: 'transparent',
            zIndex: 7
          }}
        />
      )}

      {/* Chromatic aberration - subtle RGB split at edges */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg,
            rgba(255, 0, 0, 0.03) 0%,
            transparent 5%,
            transparent 95%,
            rgba(0, 255, 255, 0.03) 100%
          )`,
          zIndex: 10
        }}
      />

      {/* Film grain / noise texture - subtle industrial wear */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-0 animate-grain"
          style={{
            opacity: 0.05,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
            zIndex: 11
          }}
        />
      )}

      {/* Scratches overlay - subtle industrial wear marks */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='10' y1='45' x2='80' y2='52' stroke='%23fff' stroke-width='0.5' opacity='0.4'/%3E%3Cline x1='120' y1='130' x2='190' y2='138' stroke='%23fff' stroke-width='0.3' opacity='0.3'/%3E%3Cline x1='40' y1='160' x2='100' y2='168' stroke='%23fff' stroke-width='0.4' opacity='0.35'/%3E%3Cline x1='150' y1='30' x2='195' y2='25' stroke='%23fff' stroke-width='0.3' opacity='0.25'/%3E%3Cline x1='5' y1='90' x2='50' y2='95' stroke='%23fff' stroke-width='0.4' opacity='0.3'/%3E%3Cline x1='160' y1='75' x2='198' y2='70' stroke='%23fff' stroke-width='0.3' opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
          zIndex: 12
        }}
      />

      {/* Corner shadows - subtle CRT tube effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80px 80px at 0% 0%, rgba(0, 0, 0, 0.25) 0%, transparent 60%),
            radial-gradient(ellipse 80px 80px at 100% 0%, rgba(0, 0, 0, 0.25) 0%, transparent 60%),
            radial-gradient(ellipse 60px 60px at 0% 100%, rgba(0, 0, 0, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60px 60px at 100% 100%, rgba(0, 0, 0, 0.15) 0%, transparent 60%)
          `,
          zIndex: 9
        }}
      />

      {/* Add animations to global styles */}
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

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(1%, 1%); }
          30% { transform: translate(-1%, 1%); }
          40% { transform: translate(1%, -1%); }
          50% { transform: translate(-1%, 0); }
          60% { transform: translate(1%, 0); }
          70% { transform: translate(0, 1%); }
          80% { transform: translate(0, -1%); }
          90% { transform: translate(1%, 1%); }
        }

        .animate-phosphor-pulse {
          animation: phosphor-pulse 4s ease-in-out infinite;
        }

        .animate-flicker {
          animation: flicker 0.15s infinite;
        }

        .animate-grain {
          animation: grain 0.5s steps(1) infinite;
        }
      `}</style>
    </div>
  )
}
