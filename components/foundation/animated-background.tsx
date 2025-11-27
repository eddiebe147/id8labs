'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

/**
 * AnimatedBackground Component
 *
 * Experimental: Charcoal waves with orange flutter accent
 * Multiple variants to explore different approaches
 */

export type BackgroundVariant =
  | 'charcoal-waves'      // Undulating charcoal gradient layers
  | 'grid-flutter'        // LED grid with orange particles flowing
  | 'aurora-charcoal'     // Aurora borealis style with charcoal + orange
  | 'particle-paint'      // Orange particles that "paint" across charcoal

interface AnimatedBackgroundProps {
  variant?: BackgroundVariant
  className?: string
}

// Charcoal palette - 3 shades for depth
const CHARCOAL = {
  deep: '#141416',      // Darkest
  mid: '#1C1C1E',       // Current dark mode bg
  light: '#2A2A2E',     // Lighter accent
  lighter: '#38383A',   // Border color - even lighter
}

const ORANGE = {
  primary: '#FF7A4D',
  glow: 'rgba(255, 122, 77, 0.4)',
  faint: 'rgba(255, 122, 77, 0.1)',
}

/**
 * Variant 1: Charcoal Waves
 * Layered gradients that undulate smoothly
 */
function CharcoalWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base layer - deepest charcoal */}
      <div
        className="absolute inset-0"
        style={{ background: CHARCOAL.deep }}
      />

      {/* Wave layer 1 - slow undulation */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, ${CHARCOAL.mid} 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, ${CHARCOAL.light} 0%, transparent 40%)
          `,
          opacity: 0.8,
        }}
      />

      {/* Wave layer 2 - different timing */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 60% 30%, ${CHARCOAL.lighter} 0%, transparent 35%)
          `,
        }}
      />

      {/* Orange flutter element - subtle painting effect */}
      <motion.div
        className="absolute"
        animate={{
          x: ['-10%', '110%'],
          y: ['30%', '70%', '30%'],
          opacity: [0, 0.15, 0.3, 0.15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width: '40%',
          height: '20%',
          background: `radial-gradient(ellipse at center, ${ORANGE.glow} 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />
    </div>
  )
}

/**
 * Variant 2: Grid Flutter
 * LED-style grid with orange particles flowing across
 */
function GridFlutter() {
  const [particles, setParticles] = useState<Array<{ id: number; startX: number; startY: number; delay: number }>>([])

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: CHARCOAL.deep }}>
      {/* Grid pattern - charcoal on charcoal */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${CHARCOAL.mid} 1px, transparent 1px),
            linear-gradient(90deg, ${CHARCOAL.mid} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.4,
        }}
      />

      {/* Subtle charcoal gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% 0%, ${CHARCOAL.light} 0%, transparent 50%),
            radial-gradient(ellipse 80% 40% at 50% 100%, ${CHARCOAL.lighter} 0%, transparent 40%)
          `,
          opacity: 0.5,
        }}
      />

      {/* Flutter particles - orange dots that flow */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          initial={{
            left: `${particle.startX}%`,
            top: `${particle.startY}%`,
            opacity: 0,
          }}
          animate={{
            left: [`${particle.startX}%`, `${(particle.startX + 30) % 100}%`],
            top: [`${particle.startY}%`, `${(particle.startY + 20) % 100}%`, `${particle.startY}%`],
            opacity: [0, 0.8, 0.8, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
          style={{
            background: ORANGE.primary,
            boxShadow: `0 0 10px ${ORANGE.glow}, 0 0 20px ${ORANGE.glow}`,
          }}
        />
      ))}
    </div>
  )
}

/**
 * Variant 3: Aurora Charcoal
 * Northern lights effect with charcoal base and orange accent streaks
 */
function AuroraCharcoal() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: CHARCOAL.deep }}>
      {/* Aurora wave 1 - charcoal */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '50% 100%', '0% 0%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: `
            linear-gradient(180deg,
              transparent 0%,
              ${CHARCOAL.mid}66 30%,
              ${CHARCOAL.light}44 50%,
              ${CHARCOAL.mid}66 70%,
              transparent 100%
            )
          `,
          transform: 'skewY(-5deg)',
        }}
      />

      {/* Aurora wave 2 - lighter charcoal */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['100% 0%', '0% 100%', '100% 0%'],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: `
            linear-gradient(160deg,
              transparent 0%,
              ${CHARCOAL.lighter}33 40%,
              ${CHARCOAL.light}55 60%,
              transparent 100%
            )
          `,
          transform: 'skewY(3deg)',
        }}
      />

      {/* Orange accent streak - the "flutter" */}
      <motion.div
        className="absolute"
        style={{
          width: '200%',
          height: '100px',
          left: '-50%',
          top: '40%',
        }}
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['-20px', '20px', '-20px'],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(90deg,
              transparent 0%,
              ${ORANGE.faint} 30%,
              ${ORANGE.glow} 50%,
              ${ORANGE.faint} 70%,
              transparent 100%
            )`,
            filter: 'blur(30px)',
            transform: 'skewY(-3deg)',
          }}
        />
      </motion.div>
    </div>
  )
}

/**
 * Variant 4: Particle Paint
 * Orange particles that leave trailing "paint" effect on charcoal canvas
 */
function ParticlePaint() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
    }> = []

    // Animation loop
    let animationId: number
    const animate = () => {
      // Fade existing content (creates trail effect)
      ctx.fillStyle = `${CHARCOAL.deep}15`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Spawn new particles occasionally
      if (Math.random() < 0.03 && particles.length < 15) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 0,
          maxLife: 200 + Math.random() * 200,
        })
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life++

        // Organic movement - slight wave
        p.vx += Math.sin(p.life * 0.02) * 0.1
        p.vy += Math.cos(p.life * 0.02) * 0.1

        // Fade based on life
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.6

        // Draw with glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 122, 77, ${alpha})`
        ctx.shadowBlur = 20
        ctx.shadowColor = ORANGE.glow
        ctx.fill()

        // Remove dead particles
        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    // Initial fill
    ctx.fillStyle = CHARCOAL.deep
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [isClient])

  if (!isClient) {
    return <div className="absolute inset-0" style={{ background: CHARCOAL.deep }} />
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Charcoal gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 30% 20%, ${CHARCOAL.mid}88 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 70% 80%, ${CHARCOAL.light}66 0%, transparent 40%)
          `,
        }}
      />
    </div>
  )
}

export function AnimatedBackground({ variant = 'charcoal-waves', className = '' }: AnimatedBackgroundProps) {
  const variants = {
    'charcoal-waves': CharcoalWaves,
    'grid-flutter': GridFlutter,
    'aurora-charcoal': AuroraCharcoal,
    'particle-paint': ParticlePaint,
  }

  const VariantComponent = variants[variant]

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <VariantComponent />
    </div>
  )
}
