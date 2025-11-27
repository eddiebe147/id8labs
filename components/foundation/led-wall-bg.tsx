'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * LED Wall Background Component
 *
 * True LED dot matrix aesthetic - like concert LED walls or Times Square displays
 * Fine grid (20-25px), pixel trace trails, multiple dot behaviors
 */

export type LEDWallVariant =
  | 'always-visible'    // Every dot dimly lit, orange paints over brighter
  | 'dots-on-demand'    // Dots invisible until orange passes, then glow and fade
  | 'wave-patterns'     // Charcoal dots pulse in waves, orange rides on top
  | 'data-rivers'       // Orange streams flow through like data rivers

interface LEDWallBgProps {
  variant?: LEDWallVariant
  dotSize?: number        // Size of each LED dot (default 4)
  gridSpacing?: number    // Distance between dots (default 22)
  orangeIntensity?: number // 0-100
  trailLength?: number    // How long trails persist (frames)
  particleCount?: number  // Number of orange particles
  className?: string
}

// Color palette
const COLORS = {
  // Charcoal LED states
  dotOff: '#1a1a1c',        // Dot when "off"
  dotDim: '#2a2a2e',        // Dimly lit dot
  dotMid: '#3a3a40',        // Medium brightness
  dotBright: '#4a4a52',     // Bright charcoal

  // Orange LED states
  orangeDim: 'rgba(255, 122, 77, 0.3)',
  orangeMid: 'rgba(255, 122, 77, 0.6)',
  orangeBright: 'rgba(255, 122, 77, 0.9)',
  orangeHot: 'rgba(255, 143, 102, 1)',

  // Background
  background: '#0f0f10',
}

interface Dot {
  x: number
  y: number
  baseIntensity: number     // 0-1 charcoal brightness
  orangeIntensity: number   // 0-1 orange overlay
  orangeDecay: number       // How fast orange fades (for trails)
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  speed: number
  life: number
  maxLife: number
}

/**
 * Canvas-based LED Wall
 * Uses a 2D array of "dots" that can be individually lit
 */
export function LEDWallBg({
  variant = 'always-visible',
  dotSize = 4,
  gridSpacing = 22,
  orangeIntensity = 50,
  trailLength = 30,
  particleCount = 25,
  className = '',
}: LEDWallBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isClient, setIsClient] = useState(false)
  const dotsRef = useRef<Dot[][]>([])
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef(0)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Initialize and run the LED wall
  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let cols = Math.ceil(width / gridSpacing) + 1
    let rows = Math.ceil(height / gridSpacing) + 1

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      cols = Math.ceil(width / gridSpacing) + 1
      rows = Math.ceil(height / gridSpacing) + 1
      initializeDots()
    }

    // Initialize dot grid
    const initializeDots = () => {
      dotsRef.current = []
      for (let row = 0; row < rows; row++) {
        dotsRef.current[row] = []
        for (let col = 0; col < cols; col++) {
          dotsRef.current[row][col] = {
            x: col * gridSpacing,
            y: row * gridSpacing,
            baseIntensity: variant === 'always-visible' ? 0.15 + Math.random() * 0.1 : 0,
            orangeIntensity: 0,
            orangeDecay: 0.92 + Math.random() * 0.05, // Slight variation in decay
          }
        }
      }
    }

    // Initialize particles (orange data points)
    const initializeParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        spawnParticle()
      }
    }

    const spawnParticle = () => {
      // Spawn from edges
      const edge = Math.floor(Math.random() * 4)
      let x = 0, y = 0, vx = 0, vy = 0

      switch (edge) {
        case 0: // Top
          x = Math.random() * width
          y = -10
          vx = (Math.random() - 0.5) * 2
          vy = 1 + Math.random() * 2
          break
        case 1: // Right
          x = width + 10
          y = Math.random() * height
          vx = -(1 + Math.random() * 2)
          vy = (Math.random() - 0.5) * 2
          break
        case 2: // Bottom
          x = Math.random() * width
          y = height + 10
          vx = (Math.random() - 0.5) * 2
          vy = -(1 + Math.random() * 2)
          break
        case 3: // Left
          x = -10
          y = Math.random() * height
          vx = 1 + Math.random() * 2
          vy = (Math.random() - 0.5) * 2
          break
      }

      particlesRef.current.push({
        x, y, vx, vy,
        speed: 1.5 + Math.random(),
        life: 0,
        maxLife: 300 + Math.random() * 400,
      })
    }

    // Light up dots near a particle - energy shines THROUGH the dots from beneath
    const lightNearbyDots = (px: number, py: number, intensity: number) => {
      const gridX = Math.round(px / gridSpacing)
      const gridY = Math.round(py / gridSpacing)

      // Wider radius for "shine through" effect - energy illuminates more dots
      const radius = 3
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const row = gridY + dy
          const col = gridX + dx

          if (row >= 0 && row < rows && col >= 0 && col < cols) {
            const dot = dotsRef.current[row]?.[col]
            if (dot) {
              const dist = Math.sqrt(dx * dx + dy * dy)
              // Softer falloff for more gradual "backlight" effect
              const falloff = Math.max(0, 1 - dist / (radius + 0.5))
              // Squared falloff for more concentrated center glow
              const addIntensity = intensity * falloff * falloff * (orangeIntensity / 100)

              // Add to orange intensity - the dot itself glows brighter
              dot.orangeIntensity = Math.min(1, dot.orangeIntensity + addIntensity * 0.4)
            }
          }
        }
      }
    }

    // Wave pattern for charcoal dots
    const updateWavePattern = (frame: number) => {
      if (variant !== 'wave-patterns') return

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const dot = dotsRef.current[row]?.[col]
          if (dot) {
            // Multiple overlapping sine waves
            const wave1 = Math.sin((col * 0.15) + (frame * 0.02)) * 0.5 + 0.5
            const wave2 = Math.sin((row * 0.12) + (frame * 0.015)) * 0.5 + 0.5
            const wave3 = Math.sin(((col + row) * 0.08) + (frame * 0.025)) * 0.5 + 0.5

            dot.baseIntensity = (wave1 * wave2 * wave3) * 0.4 + 0.05
          }
        }
      }
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      frameRef.current++
      const frame = frameRef.current

      // Clear canvas
      ctx.fillStyle = COLORS.background
      ctx.fillRect(0, 0, width, height)

      // Update wave patterns if applicable
      updateWavePattern(frame)

      // Update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]

        // Add slight curve to movement
        p.vx += Math.sin(frame * 0.01 + i) * 0.02
        p.vy += Math.cos(frame * 0.01 + i) * 0.02

        // Normalize velocity to maintain consistent speed
        const mag = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (mag > 0) {
          p.vx = (p.vx / mag) * p.speed
          p.vy = (p.vy / mag) * p.speed
        }

        p.x += p.vx
        p.y += p.vy
        p.life++

        // Light up nearby dots (creates the trail)
        const lifeRatio = p.life / p.maxLife
        const particleBrightness = Math.sin(lifeRatio * Math.PI) // Fade in and out
        lightNearbyDots(p.x, p.y, particleBrightness)

        // Remove if off-screen or expired
        if (p.life >= p.maxLife ||
            p.x < -50 || p.x > width + 50 ||
            p.y < -50 || p.y > height + 50) {
          particlesRef.current.splice(i, 1)
          spawnParticle()
        }
      }

      // Draw all dots
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const dot = dotsRef.current[row]?.[col]
          if (!dot) continue

          // Decay orange intensity (pixel trace effect)
          dot.orangeIntensity *= dot.orangeDecay

          // Determine dot color
          let r, g, b, a = 1

          if (dot.orangeIntensity > 0.01) {
            // Orange-lit dot
            const t = dot.orangeIntensity
            // Interpolate from charcoal to orange
            r = Math.floor(26 + (255 - 26) * t)
            g = Math.floor(26 + (122 - 26) * t)
            b = Math.floor(30 + (77 - 30) * t)
            a = 0.3 + t * 0.7
          } else if (variant === 'dots-on-demand') {
            // Invisible when not lit
            continue
          } else {
            // Charcoal dot
            const intensity = dot.baseIntensity
            const base = 20
            const range = 50
            const val = Math.floor(base + range * intensity)
            r = val
            g = val
            b = val + 2
            a = 0.6 + intensity * 0.4
          }

          // Draw the dot with glow
          const x = dot.x
          const y = dot.y

          // Glow for orange dots
          if (dot.orangeIntensity > 0.1) {
            const glowSize = dotSize * (2 + dot.orangeIntensity * 2)
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize)
            gradient.addColorStop(0, `rgba(255, 122, 77, ${dot.orangeIntensity * 0.5})`)
            gradient.addColorStop(0.5, `rgba(255, 122, 77, ${dot.orangeIntensity * 0.2})`)
            gradient.addColorStop(1, 'transparent')
            ctx.fillStyle = gradient
            ctx.fillRect(x - glowSize, y - glowSize, glowSize * 2, glowSize * 2)
          }

          // Draw the actual dot
          ctx.beginPath()
          ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
          ctx.fill()

          // Highlight for bright dots
          if (dot.orangeIntensity > 0.5 || dot.baseIntensity > 0.5) {
            ctx.beginPath()
            ctx.arc(x - dotSize * 0.15, y - dotSize * 0.15, dotSize * 0.2, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 255, 255, ${(dot.orangeIntensity || dot.baseIntensity) * 0.3})`
            ctx.fill()
          }
        }
      }

      // No floating particle cores - orange only shines THROUGH the dots
      // The energy manifests in the LED dots themselves, not on top

      animationId = requestAnimationFrame(animate)
    }

    resize()
    initializeDots()
    initializeParticles()
    window.addEventListener('resize', resize)
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [isClient, variant, dotSize, gridSpacing, orangeIntensity, trailLength, particleCount])

  if (!isClient) {
    return <div className={`absolute inset-0 ${className}`} style={{ background: COLORS.background }} />
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{ background: COLORS.background }}
    />
  )
}

export default LEDWallBg
