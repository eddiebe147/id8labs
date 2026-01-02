'use client'

import { ReactNode, createElement } from 'react'

/**
 * GlowText - Typography component with Pip-Boy glow variants
 *
 * Usage:
 * <GlowText as="h1" glow="high" color="green">
 *   MILO ASSISTANT
 * </GlowText>
 *
 * <GlowText as="p" glow="low" color="dim">
 *   Your personal AI companion
 * </GlowText>
 */

interface GlowTextProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  glow?: 'none' | 'low' | 'medium' | 'high'
  color?: 'green' | 'amber' | 'red' | 'dim'
  className?: string
}

const colorMap = {
  green: '#00ff41',
  amber: '#ffb000',
  red: '#ff3333',
  dim: '#00cc33'
}

const glowMap = {
  none: '',
  low: '0 0 5px currentColor',
  medium: '0 0 5px currentColor, 0 0 10px currentColor',
  high: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor'
}

export default function GlowText({
  children,
  as = 'p',
  glow = 'none',
  color = 'green',
  className = ''
}: GlowTextProps) {
  const styles = {
    color: colorMap[color],
    textShadow: glowMap[glow],
    fontFamily: "'Share Tech Mono', 'Courier New', monospace"
  }

  return createElement(
    as,
    {
      className: `${className}`,
      style: styles
    },
    children
  )
}
