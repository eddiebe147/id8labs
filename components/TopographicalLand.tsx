'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * TopographicalLand Component
 * Animated contour lines with Marauder's Map ink effect and easter eggs
 */

interface TopographicalLandProps {
  position: 'left' | 'right'
  sectionName: 'products' | 'mission' | 'builder'
  className?: string
}

type NoiseFunction = (x: number, y: number) => number

export default function TopographicalLand({
  position,
  sectionName,
  className = '',
}: TopographicalLandProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [mounted, setMounted] = useState(false)
  const noiseRef = useRef<NoiseFunction | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const timeRef = useRef(0)

  // Easter egg visibility state
  const [easterEggsVisible, setEasterEggsVisible] = useState<{
    [key: string]: boolean
  }>({})

  useEffect(() => {
    setMounted(true)
    // Dynamically import and initialize noise function only on client side
    if (!noiseRef.current) {
      import('simplex-noise').then(({ createNoise2D }) => {
        noiseRef.current = createNoise2D()
      })
    }
  }, [])

  // Easter egg content based on section
  const getEasterEggs = () => {
    switch (sectionName) {
      case 'products':
        return [
          { id: 'composer', text: 'Composer', delay: 8000 },
          { id: 'lexicon', text: 'Lexicon', delay: 10000 },
          { id: 'clearance', text: 'Clearance', delay: 12000 },
          { id: 'milo', text: 'MILO', delay: 15000 },
        ]
      case 'mission':
        return [
          { id: 'coords', text: '25.7617° N, 80.1918° W', delay: 8000 },
          { id: 'palm1', text: '🌴', delay: 11000 },
          { id: 'palm2', text: '🌴', delay: 14000 },
        ]
      case 'builder':
        return [
          { id: 'pattern1', text: '⚡︎', delay: 9000 },
          { id: 'pattern2', text: '◆', delay: 12000 },
          { id: 'pattern3', text: '⚙', delay: 15000 },
        ]
      default:
        return []
    }
  }

  // Staggered fade-in for easter eggs
  useEffect(() => {
    if (!mounted) return

    const eggs = getEasterEggs()
    const timers: NodeJS.Timeout[] = []

    eggs.forEach((egg) => {
      const timer = setTimeout(() => {
        setEasterEggsVisible((prev) => ({ ...prev, [egg.id]: true }))
      }, egg.delay)
      timers.push(timer)
    })

    return () => {
      timers.forEach(clearTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, sectionName])

  // Animate contour lines with simplex noise
  useEffect(() => {
    if (!mounted || !noiseRef.current) return

    const animate = () => {
      timeRef.current += 0.01

      const paths = svgRef.current?.querySelectorAll('.contour-line')
      if (paths && noiseRef.current) {
        paths.forEach((path, index) => {
          const pathElement = path as SVGPathElement
          const baseOffset = index * 30
          const noise = noiseRef.current!(timeRef.current, index * 0.5)
          const offset = baseOffset + noise * 5

          pathElement.style.transform = `translateY(${offset}px)`
        })
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [mounted])

  if (!mounted) return null

  const isLeft = position === 'left'
  const chevronSymbol = isLeft ? '>' : '<'
  const eggs = getEasterEggs()

  return (
    <div
      className={`absolute ${isLeft ? 'left-0' : 'right-0'} top-0 w-64 h-full pointer-events-none ${className}`}
    >
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 256 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Marauder's Map ink effect filter */}
          <filter id={`ink-effect-${sectionName}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="0.5" />
          </filter>

          {/* Gradient for fade effect */}
          <linearGradient
            id={`fade-gradient-${sectionName}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            {isLeft ? (
              <>
                <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </>
            )}
          </linearGradient>
        </defs>

        {/* Chevron shapes */}
        <g opacity="0.35" className="text-[var(--text-tertiary)]">
          {Array.from({ length: 15 }, (_, i) => {
            const y = (i * 1000) / 15 + 50
            const x = isLeft ? 200 : 50

            return (
              <text
                key={`chevron-${i}`}
                x={x}
                y={y}
                fontSize="24"
                fontWeight="bold"
                fill="currentColor"
                textAnchor="middle"
                style={{
                  filter: `url(#ink-effect-${sectionName})`,
                }}
              >
                {chevronSymbol}
              </text>
            )
          })}
        </g>

        {/* Animated contour lines */}
        <g className="text-[var(--text-tertiary)]">
          {Array.from({ length: 8 }, (_, i) => {
            const baseY = 100 + i * 120
            const waveAmplitude = 15
            const waveFrequency = 0.02

            // Generate wavy path
            const pathData = Array.from({ length: 20 }, (_, point) => {
              const x = (point / 19) * 256
              const y =
                baseY +
                Math.sin(point * waveFrequency * Math.PI * 2) * waveAmplitude
              return `${point === 0 ? 'M' : 'L'} ${x},${y}`
            }).join(' ')

            return (
              <path
                key={`contour-${i}`}
                className="contour-line"
                d={pathData}
                stroke={`url(#fade-gradient-${sectionName})`}
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="5,3"
                style={{
                  filter: `url(#ink-effect-${sectionName})`,
                  transition: 'transform 0.3s ease-out',
                }}
              />
            )
          })}
        </g>

        {/* Easter eggs - staggered fade-in */}
        <g className="text-[var(--id8-orange)]">
          {eggs.map((egg, index) => {
            const y = 200 + index * 150
            const x = isLeft ? 128 : 128

            return (
              <text
                key={egg.id}
                x={x}
                y={y}
                fontSize={egg.text.length > 10 ? '10' : '14'}
                fontWeight="600"
                fill="currentColor"
                textAnchor="middle"
                opacity={easterEggsVisible[egg.id] ? 0.6 : 0}
                style={{
                  transition: 'opacity 2s ease-in',
                  filter: `url(#ink-effect-${sectionName})`,
                }}
              >
                {egg.text}
              </text>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

/**
 * Export boundary data for collision detection
 * This would be used by InteractiveLake for wave-boundary collision
 */
export function getTopographicalBoundary(
  position: 'left' | 'right',
  width: number = 256,
  height: number = 1000
) {
  const isLeft = position === 'left'

  // Generate boundary points along the edge
  const points = Array.from({ length: 50 }, (_, i) => {
    const y = (i / 49) * height
    const x = isLeft ? width : 0

    return { x, y }
  })

  return points
}
