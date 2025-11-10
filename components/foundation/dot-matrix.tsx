'use client'

import { RaisedDot, RaisedDotProps } from './raised-dot'

/**
 * DotMatrix Component
 *
 * Creates dot matrix patterns for headers and branding
 * Pattern: ⬤⬤⬤ Text
 */

export interface DotMatrixProps {
  text: string
  pattern?: 'header' | 'compact' | 'emphasis' | 'logo'
  dotCount?: number // How many dots to show
  glowIntensity?: 20 | 40 | 60 | 80 | 100
  color?: RaisedDotProps['color']
  animated?: RaisedDotProps['animated']
  className?: string
}

export function DotMatrix({
  text,
  pattern = 'header',
  dotCount,
  glowIntensity = 60,
  color = 'accent',
  animated = 'static',
  className = '',
}: DotMatrixProps) {
  // Pattern configurations
  const patternConfig = {
    header: {
      dotCount: dotCount || 3,
      dotSize: 'sm' as const,
      gap: '4px',
      textSize: 'inherit',
      textWeight: 'inherit',
    },
    compact: {
      dotCount: dotCount || 2,
      dotSize: 'sm' as const,
      gap: '3px',
      textSize: 'inherit',
      textWeight: 'inherit',
    },
    emphasis: {
      dotCount: dotCount || 4,
      dotSize: 'md' as const,
      gap: '6px',
      textSize: 'inherit',
      textWeight: 'bold',
    },
    logo: {
      dotCount: dotCount || 5,
      dotSize: 'md' as const,
      gap: '4px',
      textSize: 'inherit',
      textWeight: 'bold',
    },
  }

  const config = patternConfig[pattern]

  return (
    <div
      className={`dot-matrix flex items-center gap-3 ${className}`}
      style={{
        fontSize: config.textSize,
        fontWeight: config.textWeight,
      }}
    >
      {/* Dot Pattern */}
      <div
        className="dot-pattern flex items-center"
        style={{ gap: config.gap }}
      >
        {Array.from({ length: config.dotCount }).map((_, i) => (
          <RaisedDot
            key={i}
            size={config.dotSize}
            glowIntensity={glowIntensity}
            color={color}
            animated={animated}
          />
        ))}
      </div>

      {/* Text */}
      {text && (
        <span className="dot-matrix-text" style={{ lineHeight: 1 }}>
          {text}
        </span>
      )}
    </div>
  )
}
