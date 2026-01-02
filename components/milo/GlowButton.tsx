'use client'

import { ReactNode, MouseEvent } from 'react'
import Link from 'next/link'

/**
 * GlowButton - Terminal-styled CTA buttons with Pip-Boy aesthetic
 *
 * Usage:
 * <GlowButton variant="primary" size="lg" href="/waitlist">
 *   JOIN WAITLIST
 * </GlowButton>
 *
 * <GlowButton variant="secondary" onClick={handleClick}>
 *   LEARN MORE
 * </GlowButton>
 *
 * <GlowButton variant="ghost" size="sm">
 *   CANCEL
 * </GlowButton>
 */

interface GlowButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  className?: string
  disabled?: boolean
}

export default function GlowButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled = false
}: GlowButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  // Base classes
  const baseClasses = `
    inline-flex items-center justify-center
    font-mono font-semibold uppercase tracking-wider
    transition-all duration-300 ease-out
    ${sizeClasses[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `

  // Variant styles
  const variantClasses = {
    primary: `
      bg-transparent border-2 border-[#00ff41] text-[#00ff41]
      hover:bg-[#00ff41] hover:text-[#0a0a0a] hover:shadow-[0_0_20px_rgba(0,255,65,0.5)]
      active:scale-95
    `,
    secondary: `
      bg-transparent border border-[#333333] text-[#00ff41]
      hover:border-[#00ff41] hover:shadow-[0_0_10px_rgba(0,255,65,0.3)]
      active:scale-95
    `,
    ghost: `
      bg-transparent border-none text-[#00cc33]
      hover:text-[#00ff41] hover:drop-shadow-[0_0_5px_currentColor]
      active:scale-95
    `
  }

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

  // Render as link or button
  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        onClick={onClick as any}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  )
}
