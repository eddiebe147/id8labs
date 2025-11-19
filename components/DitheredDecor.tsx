'use client'

/**
 * Dithered Decoration Components
 * Minimalist dithered patterns for visual accents
 */

interface DitheredBorderProps {
  className?: string
}

export function DitheredBorder({ className = '' }: DitheredBorderProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg
        className="w-full h-full"
        style={{ position: 'absolute' }}
        aria-hidden="true"
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4,4"
          className="text-[var(--id8-orange)] opacity-20"
        />
      </svg>
    </div>
  )
}

export function DitheredSectionDivider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
  )
}

interface FloatingDitheredShapeProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  shape: 'circle' | 'square'
}

export function FloatingDitheredShape({
  position,
  shape,
}: FloatingDitheredShapeProps) {
  const positionClasses = {
    'top-left': 'top-8 left-8',
    'top-right': 'top-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'bottom-right': 'bottom-8 right-8',
  }

  return (
    <div
      className={`absolute ${positionClasses[position]} w-16 h-16 pointer-events-none opacity-10`}
    >
      <svg className="w-full h-full" viewBox="0 0 64 64" aria-hidden="true">
        {shape === 'circle' ? (
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4,4"
            className="text-[var(--id8-orange)]"
          />
        ) : (
          <rect
            x="4"
            y="4"
            width="56"
            height="56"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4,4"
            className="text-[var(--id8-orange)]"
          />
        )}
      </svg>
    </div>
  )
}

interface PalmLeafSidePanelProps {
  side: 'left' | 'right'
}

export function PalmLeafSidePanel({ side }: PalmLeafSidePanelProps) {
  const sideClass = side === 'left' ? 'left-0' : 'right-0'

  return (
    <div
      className={`absolute ${sideClass} top-0 w-32 h-full pointer-events-none opacity-5`}
      aria-hidden="true"
    >
      <div className="relative w-full h-full">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="absolute text-6xl"
            style={{
              top: `${20 + i * 15}%`,
              [side]: '10%',
            }}
          >
            🌴
          </div>
        ))}
      </div>
    </div>
  )
}
