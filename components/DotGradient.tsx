'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Simple Dot Gradient Background
 * Full-page flowing dot matrix with varying sizes for fabric-like feel
 */

export default function DotGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  const timeRef = useRef(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update dimensions on resize
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

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isMounted) return

    // Skip render if dimensions not set yet
    if (dimensions.width <= 0 || dimensions.height <= 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const render = (timestamp: number) => {
      timeRef.current = timestamp * 0.0003 // Slow, organic movement

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDarkMode = document.documentElement.classList.contains('dark')
      const baseColor = isDarkMode ? '#B0B0B0' : '#404040'

      // Grid spacing - not too tight
      const spacing = 35

      // Calculate grid dimensions
      const cols = Math.ceil(canvas.width / spacing) + 1
      const rows = Math.ceil(canvas.height / spacing) + 1

      // Draw dots with varying sizes and organic flow
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const baseX = x * spacing
          const baseY = y * spacing

          // Create organic flow with multiple sine waves
          const flowX = Math.sin(y * 0.05 + timeRef.current) * 5 +
                        Math.sin(x * 0.03 + timeRef.current * 0.7) * 3
          const flowY = Math.cos(x * 0.05 + timeRef.current) * 5 +
                        Math.cos(y * 0.03 + timeRef.current * 0.7) * 3

          const posX = baseX + flowX
          const posY = baseY + flowY

          // Varying dot sizes - gradient from top to bottom
          const gradientFactor = rows > 0 ? (y / rows) : 0
          const sizeVariation = Math.sin(x * 0.2 + y * 0.3 + timeRef.current) * 0.5 + 1
          const baseSize = 1 + (gradientFactor * 1.5) // Larger dots toward bottom
          // Ensure radius is always positive to prevent IndexSizeError
          const dotRadius = Math.max(0.1, baseSize * sizeVariation)

          // Opacity gradient - fades at top
          const opacityGradient = 0.3 + (gradientFactor * 0.4)
          const opacityVariation = Math.sin(x * 0.1 + y * 0.1) * 0.1
          const opacity = opacityGradient + opacityVariation

          ctx.fillStyle = baseColor
          ctx.globalAlpha = opacity
          ctx.beginPath()
          ctx.arc(posX, posY, dotRadius, 0, Math.PI * 2)
          ctx.fill()
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
  }, [dimensions, isMounted])

  if (!isMounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="Flowing dot gradient background"
        role="img"
      />
    </div>
  )
}
