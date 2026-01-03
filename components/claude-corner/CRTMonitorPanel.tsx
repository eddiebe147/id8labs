'use client'

import { useState, useEffect, ReactNode } from 'react'

interface CRTMonitorPanelProps {
  children: ReactNode
  title?: string           // Label on bezel (e.g., "stats_console")
  className?: string
  enableStatic?: boolean   // Toggle static/noise effect (default: true)
  glowColor?: string       // Panel glow color (#ff6b35, #27c93f, #f59e0b)
}

/**
 * CRTMonitorPanel - Wraps content in a mini CRT monitor aesthetic
 *
 * Features:
 * - Thick dark plastic bezel (clean, no effects)
 * - Recessed screen area with contained CRT effects
 * - Scanlines, vignette, static noise INSIDE screen only
 * - Color-coded phosphor glow per panel
 * - Title label on bezel
 */
export default function CRTMonitorPanel({
  children,
  title,
  className = '',
  enableStatic = true,
  glowColor = '#ff6b35'
}: CRTMonitorPanelProps) {
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
    <div className={`crt-monitor ${className}`}>
      {/* Bezel - Thick dark plastic frame with pronounced depth */}
      <div
        className="relative rounded-2xl p-4"
        style={{
          background: `linear-gradient(
            145deg,
            #2a2a2a 0%,
            #1a1a1a 30%,
            #0d0d0d 70%,
            #050505 100%
          )`,
          boxShadow: `
            0 12px 48px rgba(0, 0, 0, 0.9),
            0 6px 16px rgba(0, 0, 0, 0.6),
            inset 0 2px 0 rgba(255, 255, 255, 0.08),
            inset 0 -2px 4px rgba(0, 0, 0, 0.6),
            inset 0 0 0 1px rgba(0, 0, 0, 0.8)
          `,
          border: '2px solid #0a0a0a'
        }}
      >

        {/* Screen - Deeply recessed glass area with curved edges */}
        <div
          className="relative rounded-lg overflow-hidden"
          style={{
            background: '#000000',
            boxShadow: `
              inset 0 4px 20px rgba(0, 0, 0, 0.95),
              inset 0 8px 32px rgba(0, 0, 0, 0.8),
              inset 0 0 0 1px rgba(0, 0, 0, 0.9),
              inset 0 0 60px rgba(0, 0, 0, 0.6)
            `,
            // Subtle CRT glass curve effect
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Glass surface reflection layer */}
          <div
            className="absolute inset-0 pointer-events-none rounded-lg"
            style={{
              background: `linear-gradient(
                165deg,
                rgba(255, 255, 255, 0.08) 0%,
                transparent 15%,
                transparent 85%,
                rgba(255, 255, 255, 0.03) 100%
              )`,
              zIndex: 15
            }}
          />

          {/* CRT Effects Layer - Contained inside screen */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 10 }}
          >
            {/* Phosphor glow - color-coded per panel (slower, more subtle) */}
            {!prefersReducedMotion && (
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(
                    ellipse at center,
                    ${glowColor}12 0%,
                    ${glowColor}06 30%,
                    transparent 65%
                  )`,
                  animation: 'phosphor-pulse 4s ease-in-out infinite'
                }}
              />
            )}

            {/* Vignette - darker corners for CRT tube effect (stronger) */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(
                  ellipse at center,
                  transparent 30%,
                  rgba(0, 0, 0, 0.3) 70%,
                  rgba(0, 0, 0, 0.6) 100%
                )`
              }}
            />

            {/* Scanlines - more visible */}
            <div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  rgba(0, 0, 0, 0.25),
                  rgba(0, 0, 0, 0.25) 1px,
                  transparent 1px,
                  transparent 2px
                )`,
                opacity: 0.6
              }}
            />

            {/* Horizontal scanline flicker - subtle movement */}
            {!prefersReducedMotion && (
              <div
                className="absolute inset-0"
                style={{
                  background: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(255, 255, 255, 0.03) 2px,
                    rgba(255, 255, 255, 0.03) 4px
                  )`,
                  animation: 'scanline-drift 8s linear infinite'
                }}
              />
            )}

            {/* Static / Noise grain - slightly more visible */}
            {enableStatic && !prefersReducedMotion && (
              <div
                className="absolute inset-0"
                style={{
                  opacity: 0.06,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  mixBlendMode: 'overlay',
                  animation: 'grain 0.8s steps(2) infinite'
                }}
              />
            )}

            {/* Corner shadows - pronounced CRT tube curvature */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 80px 80px at 0% 0%, rgba(0, 0, 0, 0.5) 0%, transparent 50%),
                  radial-gradient(ellipse 80px 80px at 100% 0%, rgba(0, 0, 0, 0.5) 0%, transparent 50%),
                  radial-gradient(ellipse 70px 70px at 0% 100%, rgba(0, 0, 0, 0.4) 0%, transparent 50%),
                  radial-gradient(ellipse 70px 70px at 100% 100%, rgba(0, 0, 0, 0.4) 0%, transparent 50%)
                `
              }}
            />

            {/* Screen edge glow - colored phosphor bleed */}
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                boxShadow: `
                  inset 0 0 30px ${glowColor}15,
                  inset 0 0 60px ${glowColor}08
                `
              }}
            />

            {/* Subtle CRT barrel distortion hint via gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(
                  ellipse 120% 120% at center,
                  transparent 0%,
                  rgba(0, 0, 0, 0.1) 100%
                )`
              }}
            />
          </div>

          {/* Content wrapper - sits below effects layer */}
          <div className="relative" style={{ zIndex: 1 }}>
            {children}
          </div>
        </div>
      </div>

{/* CSS Keyframe Animations */}
      <style jsx global>{`
        @keyframes phosphor-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
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

        @keyframes scanline-drift {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }

      `}</style>
    </div>
  )
}
