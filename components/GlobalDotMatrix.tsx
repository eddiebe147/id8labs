'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useWaveSimulation } from '@/hooks/useWaveSimulation'
import { getInterpolatedDisplacement } from '@/utils/wavePhysics'

/**
 * GlobalDotMatrix - Full-page flowing dot matrix like water
 * Renders behind all content, stopped by land masses (section dividers)
 */

interface LandMass {
  top: number // percentage from top
  height: number // height in pixels
  shape: 'organic' | 'angular'
}

export default function GlobalDotMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const lastMouseMoveRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)

  // Land masses that block the water flow (section dividers)
  const landMasses: LandMass[] = [
    { top: 90, height: 120, shape: 'organic' }, // After Hero
    { top: 190, height: 100, shape: 'angular' }, // After ProductGrid
    { top: 290, height: 130, shape: 'organic' }, // After Mission
  ]

  const isMobile = isMounted && typeof window !== 'undefined' && window.innerWidth < 768
  const prefersReducedMotion =
    isMounted &&
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const spacing = isMobile ? 50 : 30
  const targetFPS = isMobile ? 30 : 60
  const frameInterval = 1000 / targetFPS
  const mouseDebounce = 50

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Wave simulation
  const { grid, addRipple } = useWaveSimulation({
    width: dimensions.width,
    height: dimensions.height,
    spacing,
    dampening: 0.96,
    ambientRippleInterval: isMobile ? 6000 : 4000,
    maxAmbientRipples: isMobile ? 1 : 2,
    enabled: !prefersReducedMotion,
  })

  // Update dimensions - just viewport size, not full page
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Track scroll for ripple positioning
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mouse interaction
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!canvasRef.current || prefersReducedMotion) return

      const now = Date.now()
      if (now - lastMouseMoveRef.current < mouseDebounce) return

      const x = e.clientX
      const y = e.clientY + scrollY

      addRipple(x, y)
      lastMouseMoveRef.current = now
    },
    [addRipple, prefersReducedMotion, scrollY]
  )

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // Check if point is blocked by land mass
  const isBlockedByLand = (y: number): boolean => {
    const vh = window.innerHeight
    for (const land of landMasses) {
      const landTop = (land.top * vh) / 100
      const landBottom = landTop + land.height
      if (y >= landTop && y <= landBottom) {
        return true
      }
    }
    return false
  }

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    let lastFrameTime = 0

    const render = (timestamp: number) => {
      if (timestamp - lastFrameTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(render)
        return
      }
      lastFrameTime = timestamp

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDarkMode =
        typeof window !== 'undefined' &&
        document.documentElement.classList.contains('dark')

      const dotColor = isDarkMode ? '#B0B0B0' : '#404040'
      const dotRadius = isMobile ? 2 : 1.5

      const { points } = grid

      // Render all points in viewport
      for (let y = 0; y < points.length; y++) {
        for (let x = 0; x < points[y].length; x++) {
          const point = points[y][x]

          const displacement = getInterpolatedDisplacement(grid, point.x, point.y)

          // Organic flow - not uniform
          const flowNoise = Math.sin(point.x * 0.01 + timestamp * 0.0001) * 3
          const scale = 1 + (displacement + flowNoise) * 0.02
          const offsetX = point.x + displacement * 0.5
          const offsetY = point.y + displacement * 0.5 + flowNoise

          const activity = Math.abs(displacement)
          const opacity = Math.min(1, 0.3 + activity * 0.02 + Math.random() * 0.1)

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
  }, [dimensions, grid, spacing, frameInterval, isMobile, scrollY])

  if (!isMounted || prefersReducedMotion) {
    return null
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        width: '100vw',
        height: '100vh'
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          display: 'block'
        }}
        aria-label="Interactive dot matrix background"
        role="img"
      />
    </div>
  )
}
