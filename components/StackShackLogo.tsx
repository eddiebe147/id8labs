import React from 'react'

interface StackShackLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function StackShackLogo({ size = 'md', className = '' }: StackShackLogoProps) {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-2xl',
    xl: 'text-4xl md:text-5xl lg:text-6xl',
  }

  return (
    <span
      className={`${sizes[size]} ${className}`}
      style={{ fontFamily: 'var(--font-press-start)' }}
      suppressHydrationWarning
    >
      <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
        STACK
      </span>
      <span className="text-[#FF6B00] drop-shadow-[0_0_15px_#FF6B00]">
        SHACK
      </span>
    </span>
  )
}
