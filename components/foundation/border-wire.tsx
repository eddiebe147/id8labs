'use client'

import { m } from '@/components/motion'
import { useEffect, useState } from 'react'

/**
 * BorderWire Component
 *
 * Data highway visualization - shows connections between elements
 * Glows and flows particles when data is traveling
 */

export interface BorderWireProps {
  start: { x: string | number; y: string | number }
  end: { x: string | number; y: string | number }
  active?: boolean // Data flowing
  direction?: 'down' | 'up' | 'bidirectional'
  glowIntensity?: number // 0-100
  color?: string
  width?: number
  className?: string
}

export function BorderWire({
  start,
  end,
  active = false,
  direction = 'down',
  glowIntensity = 30,
  color = 'var(--text-secondary)',
  width = 2,
  className = '',
}: BorderWireProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Convert values to strings for SVG
  const startX = typeof start.x === 'number' ? `${start.x}px` : start.x
  const startY = typeof start.y === 'number' ? `${start.y}px` : start.y
  const endX = typeof end.x === 'number' ? `${end.x}px` : end.x
  const endY = typeof end.y === 'number' ? `${end.y}px` : end.y

  if (!isClient) return null

  return (
    <svg
      className={`border-wire absolute pointer-events-none ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        zIndex: 1,
      }}
    >
      {/* Main wire line */}
      <m.line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        initial={{ opacity: glowIntensity / 100 }}
        animate={{
          opacity: active ? 0.8 : glowIntensity / 100,
          strokeWidth: active ? width * 1.5 : width,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
        style={{
          filter: active
            ? `drop-shadow(0 0 ${width * 2}px ${color})`
            : 'none',
        }}
      />

      {/* Particle flow indicator (when active) */}
      {active && (
        <m.circle
          r="3"
          fill={color}
          initial={{
            cx: startX,
            cy: startY,
            opacity: 0,
          }}
          animate={{
            cx: direction === 'up' ? startX : endX,
            cy: direction === 'up' ? startY : endY,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: [0.4, 0.0, 0.2, 1], // Organic easing
          }}
          style={{
            filter: `drop-shadow(0 0 4px ${color})`,
          }}
        />
      )}
    </svg>
  )
}
