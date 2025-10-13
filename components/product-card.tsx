'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type AccentColor = 'orange' | 'red' | 'rgb-red' | 'rgb-green' | 'rgb-blue'
type ProductStatus = 'active' | 'mystery'

interface ProductCardProps {
  name: string
  tagline: string
  status: ProductStatus
  href: string | null
  accentColor: AccentColor
}

/**
 * ProductCard Component
 *
 * Individual product card with:
 * - Dynamic accent colors
 * - Hover effects (scale, glow, border)
 * - Status indicators (Active/Classified)
 * - Conditional linking
 * - Theme-aware styling
 */
export function ProductCard({
  name,
  tagline,
  status,
  href,
  accentColor,
}: ProductCardProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && theme === 'dark'

  // Get accent color values
  const getAccentColors = () => {
    // In dark mode, orange becomes red
    const effectiveColor = isDark && accentColor === 'orange' ? 'red' : accentColor

    const colorMap = {
      orange: {
        rgb: '255, 107, 53',
        hex: '#FF6B35',
      },
      red: {
        rgb: '255, 60, 56',
        hex: '#FF3C38',
      },
      'rgb-red': {
        rgb: '255, 60, 56',
        hex: '#FF3C38',
      },
      'rgb-green': {
        rgb: '57, 255, 20',
        hex: '#39FF14',
      },
      'rgb-blue': {
        rgb: '0, 217, 255',
        hex: '#00D9FF',
      },
    }

    return colorMap[effectiveColor]
  }

  const colors = getAccentColors()

  // Status badge styling
  const statusConfig = {
    active: {
      text: '● ACTIVE',
      color: '#39FF14', // rgb-green
      animation: '',
    },
    mystery: {
      text: '⧗ CLASSIFIED',
      color: '#FF3C38', // rgb-red
      animation: 'pulse-mystery 2s ease-in-out infinite',
    },
  }

  const statusStyle = statusConfig[status]

  // Card styles
  const cardStyles = {
    borderColor: `rgba(${isDark ? '184, 174, 163' : '92, 83, 74'}, 0.2)`,
    hoverBorderColor: colors.hex,
    hoverShadow: `0 0 30px rgba(${colors.rgb}, 0.2), 0 0 60px rgba(${colors.rgb}, 0.1)`,
  }

  // Render card with conditional wrapper
  const cardContent = (
      <div
        className="relative group rounded-lg p-8 transition-all duration-300 ease-out bg-bg-secondary min-h-[280px] flex flex-col"
        style={{
          border: `2px solid ${cardStyles.borderColor}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)'
          e.currentTarget.style.borderColor = cardStyles.hoverBorderColor
          e.currentTarget.style.boxShadow = cardStyles.hoverShadow
          e.currentTarget.style.filter = 'brightness(1.02)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.borderColor = cardStyles.borderColor
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.filter = 'brightness(1)'
        }}
      >
        {/* Product Name */}
        <h3 className="text-3xl font-bold text-text-primary mb-3">{name}</h3>

        {/* Tagline */}
        <p className="text-base text-text-secondary font-light mb-auto">
          {tagline}
        </p>

        {/* Status Badge */}
        <div className="mt-6">
          <span
            className="inline-block font-mono text-sm tracking-wider uppercase"
            style={{
              color: statusStyle.color,
              animation: statusStyle.animation,
            }}
          >
            {statusStyle.text}
          </span>
        </div>
      </div>
  )

  // Choose wrapper (Link or div)
  if (href) {
    return (
      <Link
        href={href}
        className="block cursor-pointer rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
      >
        {cardContent}
        {/* Pulsing animation for mystery status */}
        <style jsx>{`
          @keyframes pulse-mystery {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
      </Link>
    )
  }

  return (
    <div className="block cursor-default">
      {cardContent}
      {/* Pulsing animation for mystery status */}
      <style jsx>{`
        @keyframes pulse-mystery {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  )
}
