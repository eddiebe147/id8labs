'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface WaveformGaugeProps {
  isActive?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  className?: string
}

/**
 * WaveformGauge - Animated MILO waveform monitor gauge
 * Industrial submarine cockpit aesthetic with animated waveform bars
 */
export default function WaveformGauge({
  isActive = true,
  size = 'lg',
  className = ''
}: WaveformGaugeProps) {
  // Size mapping
  const sizeMap = {
    sm: { container: 'w-16 h-16', pixels: 64 },
    md: { container: 'w-24 h-24', pixels: 96 },
    lg: { container: 'w-32 h-32', pixels: 128 },
    xl: { container: 'w-48 h-48', pixels: 192 },
    hero: { container: 'w-64 h-64 md:w-80 md:h-80', pixels: 320 }
  }

  // Animated waveform bars state - static initial values to avoid hydration mismatch
  const BAR_COUNT = 24
  const [bars, setBars] = useState<number[]>(() =>
    // Create consistent initial waveform shape (no randomness on first render)
    new Array(BAR_COUNT).fill(0).map((_, i) => {
      const centerDist = Math.abs(i - BAR_COUNT / 2) / (BAR_COUNT / 2)
      return 30 - centerDist * 15 // Deterministic wave shape
    })
  )
  const [isMounted, setIsMounted] = useState(false)

  // Set mounted state client-side only
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Animation effect - only runs after mount to avoid hydration issues
  useEffect(() => {
    if (!isMounted) return

    let animationFrame: number
    let timeout: ReturnType<typeof setTimeout>

    const animate = () => {
      setBars(currentBars => currentBars.map((_, i) => {
        // Create a more natural waveform shape - higher in center
        const centerDist = Math.abs(i - BAR_COUNT / 2) / (BAR_COUNT / 2)
        const base = isActive ? 40 - centerDist * 20 : 8 - centerDist * 5
        const variance = isActive ? 50 : 8
        return Math.max(3, Math.min(95, base + Math.random() * variance))
      }))

      timeout = setTimeout(() => {
        animationFrame = requestAnimationFrame(animate)
      }, isActive ? 80 : 150)
    }

    animate()

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      if (timeout) clearTimeout(timeout)
    }
  }, [isActive, isMounted])

  return (
    <div className={`relative ${sizeMap[size].container} ${className}`}>
      {/* Base Image - The actual asset with all the industrial detail */}
      <Image
        src="/products/milo/milo-waveform.png"
        alt="MILO Waveform Monitor"
        width={sizeMap[size].pixels}
        height={sizeMap[size].pixels}
        className={`absolute inset-0 w-full h-full object-cover rounded-full ${!isActive ? 'opacity-80' : 'opacity-100'} transition-opacity duration-300`}
        draggable={false}
        priority
      />

      {/* Animated Waveform Overlay - positioned in center of gauge */}
      <div className="absolute inset-[18%] flex items-center justify-center overflow-hidden rounded-full">
        <div className="flex items-center justify-center gap-[2px] h-full w-full">
          {bars.map((height, i) => (
            <div
              key={i}
              className="flex-1 max-w-[3%] rounded-sm transition-all duration-75 ease-out"
              style={{
                height: `${height}%`,
                backgroundColor: isActive
                  ? `rgba(0, 255, 65, ${0.7 + Math.random() * 0.3})`
                  : 'rgba(0, 255, 65, 0.4)',
                boxShadow: isActive
                  ? `0 0 ${4 + height/20}px rgba(0, 255, 65, 0.6)`
                  : '0 0 2px rgba(0, 255, 65, 0.3)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Pulsing glow when active */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: '0 0 40px rgba(0, 255, 65, 0.5), inset 0 0 20px rgba(0, 255, 65, 0.1)',
            animation: 'pulse-glow 2s ease-in-out infinite'
          }}
        />
      )}

      {/* Breathing effect when idle */}
      {!isActive && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)',
            animation: 'breathe 3s ease-in-out infinite'
          }}
        />
      )}

      {/* Scanline sweep animation */}
      <div
        className="absolute inset-[10%] rounded-full overflow-hidden pointer-events-none"
        style={{ mixBlendMode: 'overlay' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(0, 255, 65, 0.1) 50%, transparent 100%)',
            height: '200%',
            animation: 'scanline 4s linear infinite'
          }}
        />
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 40px rgba(0, 255, 65, 0.5), inset 0 0 20px rgba(0, 255, 65, 0.1);
          }
          50% {
            box-shadow: 0 0 60px rgba(0, 255, 65, 0.7), inset 0 0 30px rgba(0, 255, 65, 0.2);
          }
        }
        @keyframes breathe {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
          }
        }
        @keyframes scanline {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }
      `}</style>
    </div>
  )
}
