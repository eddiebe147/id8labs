'use client'

import { useEffect, useState } from 'react'

/**
 * SignalMeter - Animated signal strength visualization for hero section
 *
 * Usage:
 * <SignalMeter /> // Auto-animates between 60-95%
 * <SignalMeter value={87} /> // Fixed value
 */

interface SignalMeterProps {
  value?: number // 0-100, animates if not provided
  className?: string
}

export default function SignalMeter({
  value,
  className = ''
}: SignalMeterProps) {
  const [currentValue, setCurrentValue] = useState(value ?? 75)
  const [isAnimating, setIsAnimating] = useState(!value)

  useEffect(() => {
    if (!isAnimating) {
      setCurrentValue(value ?? 75)
      return
    }

    // Animate signal strength between 60-95%
    const interval = setInterval(() => {
      setCurrentValue(prev => {
        const direction = Math.random() > 0.5 ? 1 : -1
        const change = Math.random() * 5 * direction
        const newValue = prev + change

        // Keep within bounds
        return Math.max(60, Math.min(95, newValue))
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [isAnimating, value])

  // Calculate filled bars (10 total bars)
  const totalBars = 10
  const filledBars = Math.round((currentValue / 100) * totalBars)

  return (
    <div
      className={`
        flex items-center gap-3
        font-mono text-sm uppercase tracking-wider
        ${className}
      `}
    >
      {/* Label */}
      <span
        className="text-[#00ff41]"
        style={{
          textShadow: '0 0 5px currentColor'
        }}
      >
        SIGNAL
      </span>

      {/* Bar container */}
      <div className="flex gap-1">
        {Array.from({ length: totalBars }).map((_, index) => (
          <div
            key={index}
            className={`
              w-2 h-4
              transition-all duration-300
              ${index < filledBars
                ? 'bg-[#00ff41] shadow-[0_0_5px_currentColor]'
                : 'bg-[#333333]'
              }
            `}
            style={{
              borderRadius: '2px'
            }}
          />
        ))}
      </div>

      {/* Percentage */}
      <span
        className="
          text-[#00ff41]
          tabular-nums
          min-w-[3ch]
        "
        style={{
          textShadow: '0 0 5px currentColor'
        }}
      >
        {Math.round(currentValue)}%
      </span>
    </div>
  )
}
