'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Neural Network Background Component
 *
 * 3D visualization of neurons firing and connecting
 * Slowly rotates in space, synapses fire and travel to connected neurons
 */

interface NeuralNetworkBgProps {
  neuronCount?: number      // Number of neurons (default 60)
  connectionDensity?: number // 0-100, how connected the network is
  rotationSpeed?: number    // How fast it rotates (default 0.001)
  fireRate?: number         // How often neurons fire (0-100)
  orangeIntensity?: number  // 0-100
  parallaxFactor?: number   // How much parallax effect (0 = none, 0.15 = subtle)
  zoomFactor?: number       // How much to zoom on scroll (0 = none, 0.5 = subtle zoom in)
  className?: string
}

// Color palette
const COLORS = {
  background: '#0a0a0b',
  neuronDim: '#1a1a1c',
  neuronActive: '#2a2a2e',
  connectionDim: 'rgba(40, 40, 45, 0.3)',
  connectionActive: 'rgba(255, 122, 77, 0.6)',
  fireOrange: '#FF7A4D',
  fireGlow: 'rgba(255, 122, 77, 0.8)',
}

interface Vector3 {
  x: number
  y: number
  z: number
}

interface Neuron {
  pos: Vector3           // 3D position
  connections: number[]  // Indices of connected neurons
  brightness: number     // Current brightness (0-1)
  baseSize: number       // Base size of neuron
}

interface Signal {
  from: number          // Neuron index
  to: number            // Neuron index
  progress: number      // 0-1 along the connection
  speed: number         // How fast it travels
}

// 3D rotation functions
function rotateY(point: Vector3, angle: number): Vector3 {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return {
    x: point.x * cos - point.z * sin,
    y: point.y,
    z: point.x * sin + point.z * cos,
  }
}

function rotateX(point: Vector3, angle: number): Vector3 {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos,
  }
}

// Project 3D to 2D with perspective
function project(point: Vector3, width: number, height: number, fov: number = 500): { x: number; y: number; scale: number } {
  // Ensure scale is always positive to prevent negative radius in canvas arc()
  // When point.z < -fov, the object is "behind the camera" - clamp to small positive value
  const rawScale = fov / (fov + point.z)
  const scale = Math.max(0.01, rawScale)
  return {
    x: point.x * scale + width / 2,
    y: point.y * scale + height / 2,
    scale: scale,
  }
}

export function NeuralNetworkBg({
  neuronCount = 60,
  connectionDensity = 40,
  rotationSpeed = 0.001,
  fireRate = 30,
  orangeIntensity = 60,
  parallaxFactor = 0.15,
  zoomFactor = 0.4,
  className = '',
}: NeuralNetworkBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const neuronsRef = useRef<Neuron[]>([])
  const signalsRef = useRef<Signal[]>([])
  const rotationRef = useRef({ x: 0, y: 0 })
  const scrollOffsetRef = useRef(0)
  const zoomRef = useRef(1) // Current zoom level (1 = normal, higher = zoomed in)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Parallax scroll effect + zoom
  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const scrollProgress = Math.min(1, window.scrollY / maxScroll)

      // Parallax translation
      if (parallaxFactor !== 0) {
        scrollOffsetRef.current = window.scrollY * parallaxFactor
        if (containerRef.current) {
          containerRef.current.style.transform = `translateY(${scrollOffsetRef.current}px)`
        }
      }

      // Zoom effect: scale from 1 to (1 + zoomFactor) as user scrolls
      // Higher zoom = camera moves closer to the neural network
      zoomRef.current = 1 + scrollProgress * zoomFactor
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient, parallaxFactor, zoomFactor])

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let viewportHeight = window.innerHeight  // For centering neurons
    let canvasHeight = window.innerHeight    // Extended for parallax

    // Calculate extra height needed for parallax scrolling
    // This ensures the background never runs out as we scroll
    const getCanvasHeight = () => {
      const pageHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight
      )
      const maxScroll = pageHeight - window.innerHeight
      const maxParallaxOffset = maxScroll * parallaxFactor
      // Add generous buffer to ensure we never see the edge
      return window.innerHeight + maxParallaxOffset + 500
    }

    const resize = () => {
      width = window.innerWidth
      viewportHeight = window.innerHeight  // Actual viewport for centering
      canvasHeight = getCanvasHeight()     // Extended height for parallax
      canvas.width = width
      canvas.height = canvasHeight
    }

    // Initialize neurons in a 3D sphere/ellipsoid
    const initializeNeurons = () => {
      neuronsRef.current = []
      signalsRef.current = [] // Clear any existing signals
      // Use viewportHeight for spread calculation so neurons stay in visible area
      const spread = Math.min(width, viewportHeight) * 0.4

      for (let i = 0; i < neuronCount; i++) {
        // Distribute in a sphere using fibonacci sphere
        const phi = Math.acos(1 - 2 * (i + 0.5) / neuronCount)
        const theta = Math.PI * (1 + Math.sqrt(5)) * i

        // Add some randomness to break perfect sphere
        const r = spread * (0.6 + Math.random() * 0.4)

        const pos: Vector3 = {
          x: r * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * spread * 0.3,
          y: r * Math.sin(phi) * Math.sin(theta) * 0.7 + (Math.random() - 0.5) * spread * 0.3, // Flatten slightly
          z: r * Math.cos(phi) + (Math.random() - 0.5) * spread * 0.3,
        }

        neuronsRef.current.push({
          pos,
          connections: [],
          brightness: 0.1 + Math.random() * 0.1,
          baseSize: 2 + Math.random() * 3,
        })
      }

      // Create connections based on proximity
      const maxDist = spread * 0.6
      for (let i = 0; i < neuronCount; i++) {
        for (let j = i + 1; j < neuronCount; j++) {
          const dx = neuronsRef.current[i].pos.x - neuronsRef.current[j].pos.x
          const dy = neuronsRef.current[i].pos.y - neuronsRef.current[j].pos.y
          const dz = neuronsRef.current[i].pos.z - neuronsRef.current[j].pos.z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          // Connect if close enough and random chance based on density
          if (dist < maxDist && Math.random() * 100 < connectionDensity) {
            neuronsRef.current[i].connections.push(j)
            neuronsRef.current[j].connections.push(i)
          }
        }
      }
    }

    // Fire a signal from a random neuron
    const fireSignal = () => {
      if (neuronsRef.current.length === 0) return

      const fromIdx = Math.floor(Math.random() * neuronsRef.current.length)
      const neuron = neuronsRef.current[fromIdx]

      if (neuron.connections.length > 0) {
        const toIdx = neuron.connections[Math.floor(Math.random() * neuron.connections.length)]

        signalsRef.current.push({
          from: fromIdx,
          to: toIdx,
          progress: 0,
          speed: 0.008 + Math.random() * 0.012,
        })

        // Light up the source neuron
        neuron.brightness = 1
      }
    }

    // Animation loop
    let animationId: number
    let frameCount = 0

    const animate = () => {
      frameCount++

      // Clear canvas (use full canvasHeight for extended parallax area)
      ctx.fillStyle = COLORS.background
      ctx.fillRect(0, 0, width, canvasHeight)

      // Slowly rotate
      rotationRef.current.y += rotationSpeed
      rotationRef.current.x = Math.sin(frameCount * 0.0003) * 0.3 // Gentle tilt

      // Fire new signals based on rate
      if (Math.random() * 100 < fireRate * 0.3) {
        fireSignal()
      }

      // Transform all neuron positions
      // Use viewportHeight for projection centering so neurons stay in visible viewport
      // Apply zoom by adjusting FOV: lower FOV = more zoomed in
      // Base FOV is 500, zoom multiplies the scale effect
      const currentZoom = zoomRef.current
      const transformedNeurons = neuronsRef.current.map(n => {
        let rotated = rotateY(n.pos, rotationRef.current.y)
        rotated = rotateX(rotated, rotationRef.current.x)
        // Scale positions by zoom to create "diving in" effect
        const zoomedRotated = {
          x: rotated.x * currentZoom,
          y: rotated.y * currentZoom,
          z: rotated.z,
        }
        return {
          ...n,
          projected: project(zoomedRotated, width, viewportHeight),
          rotated: zoomedRotated,
        }
      })

      // Sort by z for proper depth rendering (back to front)
      const sortedIndices = transformedNeurons
        .map((n, i) => ({ idx: i, z: n.rotated.z }))
        .sort((a, b) => a.z - b.z)

      // Draw connections first (behind neurons)
      ctx.lineWidth = 1
      for (let i = 0; i < neuronsRef.current.length; i++) {
        const neuron = neuronsRef.current[i]
        const t1 = transformedNeurons[i]

        for (const connIdx of neuron.connections) {
          if (connIdx > i) { // Draw each connection only once
            const t2 = transformedNeurons[connIdx]

            // Depth-based opacity
            const avgZ = (t1.rotated.z + t2.rotated.z) / 2
            const depthAlpha = Math.max(0.1, Math.min(0.4, (avgZ + 400) / 800))

            ctx.beginPath()
            ctx.moveTo(t1.projected.x, t1.projected.y)
            ctx.lineTo(t2.projected.x, t2.projected.y)
            ctx.strokeStyle = `rgba(40, 40, 45, ${depthAlpha})`
            ctx.stroke()
          }
        }
      }

      // Update and draw signals
      for (let i = signalsRef.current.length - 1; i >= 0; i--) {
        const signal = signalsRef.current[i]
        signal.progress += signal.speed

        if (signal.progress >= 1) {
          // Signal arrived - light up destination and maybe cascade
          neuronsRef.current[signal.to].brightness = 1

          // Chance to cascade to another connected neuron
          if (Math.random() < 0.4) {
            const nextNeuron = neuronsRef.current[signal.to]
            if (nextNeuron.connections.length > 0) {
              const nextTo = nextNeuron.connections[Math.floor(Math.random() * nextNeuron.connections.length)]
              if (nextTo !== signal.from) { // Don't go back
                signalsRef.current.push({
                  from: signal.to,
                  to: nextTo,
                  progress: 0,
                  speed: 0.008 + Math.random() * 0.012,
                })
              }
            }
          }

          signalsRef.current.splice(i, 1)
        } else {
          // Draw the signal
          const t1 = transformedNeurons[signal.from]
          const t2 = transformedNeurons[signal.to]

          // Guard against undefined neurons (can happen during reinitialization)
          if (!t1 || !t2) {
            signalsRef.current.splice(i, 1)
            continue
          }

          const x = t1.projected.x + (t2.projected.x - t1.projected.x) * signal.progress
          const y = t1.projected.y + (t2.projected.y - t1.projected.y) * signal.progress
          const scale = t1.projected.scale + (t2.projected.scale - t1.projected.scale) * signal.progress

          const intensity = orangeIntensity / 100

          // Draw glowing signal
          const glowSize = Math.max(0.1, 8 * scale * intensity)
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize)
          gradient.addColorStop(0, `rgba(255, 200, 180, ${0.9 * intensity})`)
          gradient.addColorStop(0.3, `rgba(255, 122, 77, ${0.6 * intensity})`)
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, glowSize, 0, Math.PI * 2)
          ctx.fill()

          // Draw signal core
          ctx.beginPath()
          ctx.arc(x, y, Math.max(0.1, 2 * scale), 0, Math.PI * 2)
          ctx.fillStyle = COLORS.fireOrange
          ctx.fill()

          // Light up connection path behind signal
          ctx.beginPath()
          ctx.moveTo(t1.projected.x, t1.projected.y)
          ctx.lineTo(x, y)
          ctx.strokeStyle = `rgba(255, 122, 77, ${0.4 * intensity * (1 - signal.progress)})`
          ctx.lineWidth = 2 * scale
          ctx.stroke()
          ctx.lineWidth = 1
        }
      }

      // Draw neurons (front to back for proper layering)
      for (const { idx } of sortedIndices) {
        const neuron = neuronsRef.current[idx]
        const t = transformedNeurons[idx]

        // Decay brightness
        neuron.brightness *= 0.95

        // Depth-based alpha
        const depthAlpha = Math.max(0.3, Math.min(1, (t.rotated.z + 400) / 600))
        const size = neuron.baseSize * t.projected.scale

        // Draw glow if bright
        if (neuron.brightness > 0.2) {
          const glowSize = Math.max(0.1, size * 4 * neuron.brightness * (orangeIntensity / 100))
          const gradient = ctx.createRadialGradient(t.projected.x, t.projected.y, 0, t.projected.x, t.projected.y, glowSize)
          gradient.addColorStop(0, `rgba(255, 122, 77, ${neuron.brightness * 0.5 * depthAlpha})`)
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(t.projected.x, t.projected.y, glowSize, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw neuron body
        const safeSize = Math.max(0.1, size)
        ctx.beginPath()
        ctx.arc(t.projected.x, t.projected.y, safeSize, 0, Math.PI * 2)

        if (neuron.brightness > 0.3) {
          // Orange when firing
          const t_intensity = Math.min(1, neuron.brightness)
          const r = Math.floor(26 + (255 - 26) * t_intensity)
          const g = Math.floor(26 + (122 - 26) * t_intensity)
          const b = Math.floor(28 + (77 - 28) * t_intensity)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${depthAlpha})`
        } else {
          // Charcoal when dim
          const brightness = 26 + neuron.brightness * 30
          ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness + 2}, ${depthAlpha * 0.8})`
        }
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    initializeNeurons()
    window.addEventListener('resize', resize)
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [isClient, neuronCount, connectionDensity, rotationSpeed, fireRate, orangeIntensity])

  if (!isClient) {
    return <div className={`fixed inset-0 ${className}`} style={{ background: COLORS.background }} />
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 ${className}`}
      style={{
        willChange: 'transform',
        background: COLORS.background,
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ background: 'transparent' }}
      />
    </div>
  )
}

export default NeuralNetworkBg
