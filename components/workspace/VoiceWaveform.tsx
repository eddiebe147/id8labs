'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface VoiceWaveformProps {
  isActive?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

/**
 * VoiceWaveform - Animated waveform visualization for voice input
 *
 * Shows animated bars that respond to the active state.
 * When active: bars animate with varying heights
 * When inactive: bars show minimal height
 */
export function VoiceWaveform({
  isActive = false,
  size = 'md',
  color = 'var(--accent)',
  className = '',
}: VoiceWaveformProps) {
  const BAR_COUNT = 12
  const [bars, setBars] = useState<number[]>(() =>
    new Array(BAR_COUNT).fill(0).map((_, i) => {
      const centerDist = Math.abs(i - BAR_COUNT / 2) / (BAR_COUNT / 2)
      return 20 - centerDist * 10
    })
  )
  const [isMounted, setIsMounted] = useState(false)

  // Size mapping
  const sizeMap = {
    sm: { height: 'h-6', barWidth: 'w-0.5', gap: 'gap-0.5' },
    md: { height: 'h-10', barWidth: 'w-1', gap: 'gap-1' },
    lg: { height: 'h-14', barWidth: 'w-1.5', gap: 'gap-1' },
  }

  // Client-side mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isMounted) return

    let animationFrame: number
    let timeout: ReturnType<typeof setTimeout>

    const animate = () => {
      setBars((currentBars) =>
        currentBars.map((_, i) => {
          const centerDist = Math.abs(i - BAR_COUNT / 2) / (BAR_COUNT / 2)
          const base = isActive ? 50 - centerDist * 25 : 15 - centerDist * 8
          const variance = isActive ? 45 : 5
          return Math.max(5, Math.min(100, base + Math.random() * variance))
        })
      )

      timeout = setTimeout(() => {
        animationFrame = requestAnimationFrame(animate)
      }, isActive ? 60 : 200)
    }

    animate()

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      if (timeout) clearTimeout(timeout)
    }
  }, [isActive, isMounted])

  return (
    <div
      className={`flex items-center justify-center ${sizeMap[size].height} ${sizeMap[size].gap} ${className}`}
    >
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className={`${sizeMap[size].barWidth} rounded-full`}
          style={{
            height: `${height}%`,
            backgroundColor: color,
            opacity: isActive ? 0.8 + Math.random() * 0.2 : 0.4,
            transition: 'height 60ms ease-out',
          }}
        />
      ))}

      {/* Pulse ring when active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `0 0 20px ${color}40`,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  )
}

export default VoiceWaveform
