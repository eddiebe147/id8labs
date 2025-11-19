'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useWaveSimulation } from '@/hooks/useWaveSimulation'
import { getInterpolatedDisplacement } from '@/utils/wavePhysics'

/**
 * InteractiveLake Component
 * Canvas-based wave simulation with mouse/touch interaction
 */

interface InteractiveLakeProps {
  className?: string
}

export default function InteractiveLake({ className = '' }: InteractiveLakeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const lastMouseMoveRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)

  // Device and accessibility detection (only after mount)
  const isMobile = isMounted && typeof window !== 'undefined' && window.innerWidth < 768
  const prefersReducedMotion =
    isMounted &&
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Responsive configuration
  const spacing = isMobile ? 50 : 30
  const targetFPS = isMobile ? 30 : 60
  const frameInterval = 1000 / targetFPS
  const mouseDebounce = 100

  // Mount detection
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Wave simulation
  const { grid, ripples, addRipple } = useWaveSimulation({
    width: dimensions.width,
    height: dimensions.height,
    spacing,
    dampening: 0.95,
    ambientRippleInterval: isMobile ? 5000 : 3500,
    maxAmbientRipples: isMobile ? 2 : 3,
    enabled: !prefersReducedMotion,
  })

  // Handle window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current
        setDimensions({
          width: clientWidth,
          height: clientHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  // Mouse/touch interaction handlers
  const handleInteraction = useCallback(
    (clientX: number, clientY: number) => {
      if (!canvasRef.current || prefersReducedMotion) return

      const now = Date.now()
      if (now - lastMouseMoveRef.current < mouseDebounce) return

      const rect = canvasRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      addRipple(x, y)
      lastMouseMoveRef.current = now
    },
    [addRipple, prefersReducedMotion]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleInteraction(e.clientX, e.clientY)
    },
    [handleInteraction]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY)
      }
    },
    [handleInteraction]
  )

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion) return
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      addRipple(x, y, 8) // Larger amplitude for clicks
    },
    [addRipple, prefersReducedMotion]
  )

  // Setup event listeners
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('click', handleClick)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('click', handleClick)
    }
  }, [handleMouseMove, handleTouchMove, handleClick])

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    let lastFrameTime = 0

    const render = (timestamp: number) => {
      // Frame rate limiting
      if (timestamp - lastFrameTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(render)
        return
      }
      lastFrameTime = timestamp

      // Reset transform before clearing (prevents transform accumulation bug)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get current theme for dot colors
      const isDarkMode =
        typeof window !== 'undefined' &&
        document.documentElement.classList.contains('dark')

      const dotColor = isDarkMode ? '#B0B0B0' : '#404040'
      const dotRadius = isMobile ? 2 : 1.5

      // Render dots with wave displacement
      const { points } = grid

      for (let y = 0; y < points.length; y++) {
        for (let x = 0; x < points[y].length; x++) {
          const point = points[y][x]

          // Viewport culling for performance
          if (
            point.x < -spacing ||
            point.x > canvas.width + spacing ||
            point.y < -spacing ||
            point.y > canvas.height + spacing
          ) {
            continue
          }

          // Get interpolated displacement for smoother visuals
          const displacement = getInterpolatedDisplacement(grid, point.x, point.y)

          // Apply displacement (scaled for visibility)
          const scale = 1 + displacement * 0.02
          const offsetX = point.x + displacement * 0.5
          const offsetY = point.y + displacement * 0.5

          // Calculate opacity based on wave activity
          const activity = Math.abs(displacement)
          const opacity = Math.min(1, 0.4 + activity * 0.03)

          // Draw dot
          ctx.save()
          ctx.translate(offsetX, offsetY)
          ctx.scale(scale, scale)

          ctx.fillStyle = dotColor
          ctx.globalAlpha = opacity
          ctx.beginPath()
          ctx.arc(0, 0, dotRadius, 0, Math.PI * 2)
          ctx.fill()

          ctx.restore()
        }
      }

      animationFrameRef.current = requestAnimationFrame(render)
    }

    animationFrameRef.current = requestAnimationFrame(render)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [dimensions, grid, spacing, frameInterval, isMobile])

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 z-[1] pointer-events-none ${className}`}
      >
        <canvas ref={canvasRef} className="w-full h-full" style={{ opacity: 0 }} />
      </div>
    )
  }

  // Fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 z-[1] pointer-events-none ${className}`}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ opacity: 0.3 }}
        />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-[1] ${className}`}
      style={{ cursor: 'pointer' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="Interactive wave visualization"
        role="img"
      />
    </div>
  )
}
