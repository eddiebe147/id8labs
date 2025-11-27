'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState, useRef, useCallback } from 'react'

/**
 * Electric Data Background Component
 *
 * Charcoal waves with bold electric orange data visualization
 * Three variants to compare: data-stream-grid, circuit-pulse-network, electric-field
 */

export type ElectricVariant =
  | 'data-stream-grid'
  | 'circuit-pulse-network'
  | 'electric-field'

interface ElectricDataBgProps {
  variant?: ElectricVariant
  orangeIntensity?: number // 0-100, default 40
  waveSpeed?: number // multiplier, default 1
  className?: string
}

// Charcoal palette - 3 depths for wave system
const CHARCOAL = {
  deep: '#141416',
  mid: '#1C1C1E',
  light: '#2A2A2E',
  lighter: '#38383A',
}

// Orange palette - electric data feel
const ORANGE = {
  primary: '#FF7A4D',
  bright: '#FF8F66',
  glow: 'rgba(255, 122, 77, 0.5)',
  medium: 'rgba(255, 122, 77, 0.3)',
  dim: 'rgba(255, 122, 77, 0.1)',
}

/**
 * Shared Charcoal Wave Layer
 * Used by all variants as the base atmosphere
 */
function CharcoalWaveLayer({ speed = 1 }: { speed?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base layer */}
      <div className="absolute inset-0" style={{ background: CHARCOAL.deep }} />

      {/* Wave layer 1 - slow drift */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 50%', '0% 100%', '0% 0%'],
        }}
        transition={{
          duration: 25 / speed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 20% 30%, ${CHARCOAL.mid} 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 80% 70%, ${CHARCOAL.light} 0%, transparent 45%)
          `,
        }}
      />

      {/* Wave layer 2 - breathing */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 12 / speed,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1], // custom bezier for organic feel
        }}
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 60% 20%, ${CHARCOAL.lighter}88 0%, transparent 40%),
            radial-gradient(ellipse 60% 40% at 30% 80%, ${CHARCOAL.light}66 0%, transparent 35%)
          `,
          transformOrigin: '40% 60%',
        }}
      />

      {/* Wave layer 3 - subtle surface shimmer */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: ['-5%', '5%', '-5%'],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 18 / speed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: `
            linear-gradient(135deg,
              transparent 0%,
              ${CHARCOAL.lighter}33 25%,
              transparent 50%,
              ${CHARCOAL.light}22 75%,
              transparent 100%
            )
          `,
        }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// VARIANT 1: DATA STREAM GRID
// Network traffic visualization with packets traveling on grid
// ═══════════════════════════════════════════════════════════════

interface GridPacket {
  id: number
  x: number
  y: number
  direction: 'up' | 'down' | 'left' | 'right'
  speed: number
  brightness: number
}

function DataStreamGrid({ intensity = 40, speed = 1 }: { intensity?: number; speed?: number }) {
  const [packets, setPackets] = useState<GridPacket[]>([])
  const [isClient, setIsClient] = useState(false)
  const gridSize = 50 // pixels
  const maxPackets = Math.floor(8 + (intensity / 100) * 12) // 8-20 based on intensity

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Spawn and update packets
  useEffect(() => {
    if (!isClient) return

    const spawnPacket = (): GridPacket => {
      const directions: GridPacket['direction'][] = ['up', 'down', 'left', 'right']
      const dir = directions[Math.floor(Math.random() * 4)]

      // Start from edges based on direction
      let x = 0, y = 0
      if (dir === 'right') { x = 0; y = Math.floor(Math.random() * 20) * gridSize }
      else if (dir === 'left') { x = window.innerWidth; y = Math.floor(Math.random() * 20) * gridSize }
      else if (dir === 'down') { x = Math.floor(Math.random() * 30) * gridSize; y = 0 }
      else { x = Math.floor(Math.random() * 30) * gridSize; y = window.innerHeight }

      return {
        id: Date.now() + Math.random(),
        x, y,
        direction: dir,
        speed: (1 + Math.random() * 2) * speed,
        brightness: 0.5 + Math.random() * 0.5,
      }
    }

    // Initialize packets
    const initial: GridPacket[] = []
    for (let i = 0; i < maxPackets / 2; i++) {
      initial.push(spawnPacket())
    }
    setPackets(initial)

    // Animation loop
    const interval = setInterval(() => {
      setPackets(prev => {
        let updated = prev.map(p => {
          const moveAmount = p.speed * 3
          let newX = p.x, newY = p.y, newDir = p.direction

          // Move packet
          if (p.direction === 'right') newX += moveAmount
          else if (p.direction === 'left') newX -= moveAmount
          else if (p.direction === 'down') newY += moveAmount
          else newY -= moveAmount

          // At grid intersections, maybe change direction
          const atIntersection =
            Math.abs(newX % gridSize) < moveAmount &&
            Math.abs(newY % gridSize) < moveAmount

          if (atIntersection && Math.random() < 0.2) {
            // 20% chance to turn at intersection
            const turns: Record<string, GridPacket['direction'][]> = {
              'right': ['up', 'down'],
              'left': ['up', 'down'],
              'up': ['left', 'right'],
              'down': ['left', 'right'],
            }
            newDir = turns[p.direction][Math.floor(Math.random() * 2)]
          }

          return { ...p, x: newX, y: newY, direction: newDir }
        })

        // Remove off-screen packets
        updated = updated.filter(p =>
          p.x > -50 && p.x < window.innerWidth + 50 &&
          p.y > -50 && p.y < window.innerHeight + 50
        )

        // Spawn new packets if below max
        while (updated.length < maxPackets && Math.random() < 0.3) {
          updated.push(spawnPacket())
        }

        return updated
      })
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [isClient, maxPackets, speed])

  if (!isClient) return null

  const opacityMultiplier = intensity / 100

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid lines - subtle charcoal */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${CHARCOAL.light}40 1px, transparent 1px),
            linear-gradient(90deg, ${CHARCOAL.light}40 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Grid intersection dots */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${CHARCOAL.lighter}60 1.5px, transparent 1.5px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Packets */}
      {packets.map(packet => (
        <div
          key={packet.id}
          className="absolute rounded-full"
          style={{
            left: packet.x - 4,
            top: packet.y - 4,
            width: 8,
            height: 8,
            background: ORANGE.primary,
            opacity: packet.brightness * opacityMultiplier,
            boxShadow: `
              0 0 ${10 * packet.brightness}px ${ORANGE.glow},
              0 0 ${20 * packet.brightness}px ${ORANGE.medium},
              0 0 ${30 * packet.brightness}px ${ORANGE.dim}
            `,
            transition: 'opacity 0.1s',
          }}
        />
      ))}

      {/* Packet trails (using pseudo-elements would be better, but this works) */}
      {packets.map(packet => (
        <div
          key={`trail-${packet.id}`}
          className="absolute"
          style={{
            left: packet.direction === 'right' ? packet.x - 30 :
                  packet.direction === 'left' ? packet.x + 4 : packet.x - 2,
            top: packet.direction === 'down' ? packet.y - 30 :
                 packet.direction === 'up' ? packet.y + 4 : packet.y - 2,
            width: packet.direction === 'left' || packet.direction === 'right' ? 30 : 4,
            height: packet.direction === 'up' || packet.direction === 'down' ? 30 : 4,
            background: packet.direction === 'right'
              ? `linear-gradient(to right, transparent, ${ORANGE.medium})`
              : packet.direction === 'left'
              ? `linear-gradient(to left, transparent, ${ORANGE.medium})`
              : packet.direction === 'down'
              ? `linear-gradient(to bottom, transparent, ${ORANGE.medium})`
              : `linear-gradient(to top, transparent, ${ORANGE.medium})`,
            opacity: packet.brightness * opacityMultiplier * 0.6,
            borderRadius: 2,
            filter: 'blur(2px)',
          }}
        />
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// VARIANT 2: CIRCUIT PULSE NETWORK
// PCB-style traces with pulses traveling through
// ═══════════════════════════════════════════════════════════════

interface CircuitPath {
  id: string
  d: string // SVG path data
  length: number
}

interface CircuitPulse {
  id: number
  pathId: string
  progress: number // 0-1
  speed: number
  brightness: number
}

function CircuitPulseNetwork({ intensity = 40, speed = 1 }: { intensity?: number; speed?: number }) {
  const [pulses, setPulses] = useState<CircuitPulse[]>([])
  const [isClient, setIsClient] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  // Define circuit paths (bezier curves like PCB traces)
  const paths: CircuitPath[] = [
    { id: 'path1', d: 'M -50 200 Q 200 200 400 350 T 800 300 T 1200 400 T 1600 350', length: 1700 },
    { id: 'path2', d: 'M -50 400 Q 150 500 350 400 T 700 500 T 1000 400 T 1400 500 T 1700 400', length: 1750 },
    { id: 'path3', d: 'M 200 -50 Q 200 150 350 300 T 400 600 T 500 900 T 450 1100', length: 1200 },
    { id: 'path4', d: 'M 800 -50 Q 750 200 850 400 T 800 700 T 900 1000', length: 1100 },
    { id: 'path5', d: 'M -50 600 Q 300 550 500 650 T 900 600 T 1300 700 T 1700 650', length: 1750 },
    { id: 'path6', d: 'M 1200 -50 Q 1150 200 1250 350 T 1200 600 T 1300 850 T 1200 1100', length: 1200 },
    { id: 'path7', d: 'M -50 100 Q 200 150 400 100 T 800 150 T 1200 100 T 1600 150', length: 1700 },
    { id: 'path8', d: 'M 500 -50 Q 550 200 450 400 T 550 700 T 500 1000', length: 1100 },
  ]

  const maxPulses = Math.floor(3 + (intensity / 100) * 5) // 3-8 based on intensity

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const spawnPulse = (): CircuitPulse => ({
      id: Date.now() + Math.random(),
      pathId: paths[Math.floor(Math.random() * paths.length)].id,
      progress: 0,
      speed: (0.0005 + Math.random() * 0.001) * speed,
      brightness: 0.6 + Math.random() * 0.4,
    })

    // Initialize pulses
    const initial: CircuitPulse[] = []
    for (let i = 0; i < maxPulses; i++) {
      initial.push({ ...spawnPulse(), progress: Math.random() })
    }
    setPulses(initial)

    const interval = setInterval(() => {
      setPulses(prev => {
        let updated = prev.map(p => ({
          ...p,
          progress: p.progress + p.speed,
        }))

        // Remove completed pulses
        updated = updated.filter(p => p.progress < 1)

        // Spawn new pulses
        while (updated.length < maxPulses && Math.random() < 0.1) {
          updated.push(spawnPulse())
        }

        return updated
      })
    }, 16)

    return () => clearInterval(interval)
  }, [isClient, maxPulses, speed])

  if (!isClient) return null

  const opacityMultiplier = intensity / 100

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glow filter */}
          <filter id="pulse-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for pulse */}
          <radialGradient id="pulse-gradient">
            <stop offset="0%" stopColor={ORANGE.bright} />
            <stop offset="50%" stopColor={ORANGE.primary} />
            <stop offset="100%" stopColor={ORANGE.primary} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background paths - dim glow */}
        {paths.map(path => (
          <path
            key={path.id}
            d={path.d}
            fill="none"
            stroke={ORANGE.dim}
            strokeWidth="3"
            opacity={0.3 * opacityMultiplier}
          />
        ))}

        {/* Junction points */}
        {[
          [400, 350], [700, 500], [350, 300], [800, 400],
          [500, 650], [1200, 350], [800, 150], [450, 400]
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="6"
            fill={CHARCOAL.lighter}
            stroke={ORANGE.dim}
            strokeWidth="2"
            opacity={0.5 * opacityMultiplier}
          />
        ))}

        {/* Animated pulses */}
        {pulses.map(pulse => {
          const path = paths.find(p => p.id === pulse.pathId)
          if (!path) return null

          return (
            <g key={pulse.id}>
              {/* Pulse glow trail */}
              <circle
                r="12"
                fill="url(#pulse-gradient)"
                opacity={pulse.brightness * opacityMultiplier * 0.6}
                filter="url(#pulse-glow)"
              >
                <animateMotion
                  dur={`${path.length / (pulse.speed * 60000)}s`}
                  begin={`-${pulse.progress * path.length / (pulse.speed * 60000)}s`}
                  repeatCount="1"
                  fill="freeze"
                >
                  <mpath href={`#${path.id}-motion`} />
                </animateMotion>
              </circle>

              {/* Pulse core */}
              <circle
                r="4"
                fill={ORANGE.bright}
                opacity={pulse.brightness * opacityMultiplier}
              >
                <animateMotion
                  dur={`${path.length / (pulse.speed * 60000)}s`}
                  begin={`-${pulse.progress * path.length / (pulse.speed * 60000)}s`}
                  repeatCount="1"
                  fill="freeze"
                >
                  <mpath href={`#${path.id}-motion`} />
                </animateMotion>
              </circle>
            </g>
          )
        })}

        {/* Hidden motion paths */}
        {paths.map(path => (
          <path key={`${path.id}-motion`} id={`${path.id}-motion`} d={path.d} fill="none" />
        ))}
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// VARIANT 3: ELECTRIC FIELD
// Plasma/static electricity particle system with attractors
// ═══════════════════════════════════════════════════════════════

interface FieldParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
}

interface Attractor {
  x: number
  y: number
  vx: number
  vy: number
  strength: number
}

function ElectricField({ intensity = 40, speed = 1 }: { intensity?: number; speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isClient, setIsClient] = useState(false)
  const particleCount = Math.floor(40 + (intensity / 100) * 80) // 40-120

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize attractors
    const attractors: Attractor[] = [
      { x: width * 0.25, y: height * 0.3, vx: 0.3, vy: 0.2, strength: 0.00015 },
      { x: width * 0.75, y: height * 0.4, vx: -0.2, vy: 0.3, strength: 0.00012 },
      { x: width * 0.5, y: height * 0.7, vx: 0.25, vy: -0.15, strength: 0.00018 },
      { x: width * 0.3, y: height * 0.8, vx: -0.15, vy: -0.25, strength: 0.0001 },
    ]

    // Initialize particles
    const particles: FieldParticle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: 2 + Math.random() * 4,
        life: Math.random() * 300,
        maxLife: 200 + Math.random() * 200,
      })
    }

    const opacityMultiplier = intensity / 100
    let animationId: number

    const animate = () => {
      // Fade trail effect
      ctx.fillStyle = `${CHARCOAL.deep}18`
      ctx.fillRect(0, 0, width, height)

      // Update attractors (slow drift)
      attractors.forEach(a => {
        a.x += a.vx * speed
        a.y += a.vy * speed

        // Bounce off edges
        if (a.x < width * 0.1 || a.x > width * 0.9) a.vx *= -1
        if (a.y < height * 0.1 || a.y > height * 0.9) a.vy *= -1
      })

      // Update and draw particles
      particles.forEach((p, i) => {
        // Apply attractor forces
        attractors.forEach(a => {
          const dx = a.x - p.x
          const dy = a.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy) + 1
          const force = a.strength * speed / (dist * 0.01)
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        })

        // Apply some friction
        p.vx *= 0.99
        p.vy *= 0.99

        // Update position
        p.x += p.vx * speed
        p.y += p.vy * speed
        p.life++

        // Wrap around edges
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Reset dead particles
        if (p.life >= p.maxLife) {
          p.x = Math.random() * width
          p.y = Math.random() * height
          p.vx = (Math.random() - 0.5) * 2
          p.vy = (Math.random() - 0.5) * 2
          p.life = 0
          p.maxLife = 200 + Math.random() * 200
        }

        // Calculate alpha based on life
        const lifeRatio = p.life / p.maxLife
        const alpha = Math.sin(lifeRatio * Math.PI) * opacityMultiplier

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        gradient.addColorStop(0, `rgba(255, 143, 102, ${alpha})`)
        gradient.addColorStop(0.3, `rgba(255, 122, 77, ${alpha * 0.7})`)
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 200, 180, ${alpha})`
        ctx.fill()
      })

      // Draw faint attractor indicators (optional, for debug/style)
      attractors.forEach(a => {
        ctx.beginPath()
        ctx.arc(a.x, a.y, 30, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 122, 77, ${0.03 * opacityMultiplier})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    // Initial fill
    ctx.fillStyle = CHARCOAL.deep
    ctx.fillRect(0, 0, width, height)

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [isClient, particleCount, speed, intensity])

  if (!isClient) {
    return <div className="absolute inset-0" style={{ background: CHARCOAL.deep }} />
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════

export function ElectricDataBg({
  variant = 'data-stream-grid',
  orangeIntensity = 40,
  waveSpeed = 1,
  className = ''
}: ElectricDataBgProps) {

  const renderVariant = () => {
    switch (variant) {
      case 'data-stream-grid':
        return <DataStreamGrid intensity={orangeIntensity} speed={waveSpeed} />
      case 'circuit-pulse-network':
        return <CircuitPulseNetwork intensity={orangeIntensity} speed={waveSpeed} />
      case 'electric-field':
        return <ElectricField intensity={orangeIntensity} speed={waveSpeed} />
      default:
        return <DataStreamGrid intensity={orangeIntensity} speed={waveSpeed} />
    }
  }

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      {/* Charcoal wave base layer */}
      <CharcoalWaveLayer speed={waveSpeed} />

      {/* Orange electric variant layer */}
      {renderVariant()}
    </div>
  )
}

export default ElectricDataBg
