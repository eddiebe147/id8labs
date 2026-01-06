'use client'

import { CheckCircle, Download, Star, Github, Shield } from 'lucide-react'

interface TrustBadgesProps {
  verified?: boolean
  installCount?: number
  rating?: number
  reviewCount?: number
  githubStars?: number
  variant?: 'inline' | 'stacked' | 'compact'
  className?: string
}

export function TrustBadges({
  verified,
  installCount,
  rating,
  reviewCount,
  githubStars,
  variant = 'inline',
  className = '',
}: TrustBadgesProps) {
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 text-xs ${className}`}>
        {verified && (
          <span className="text-emerald-500">
            <CheckCircle className="w-3.5 h-3.5" />
          </span>
        )}
        {installCount !== undefined && installCount > 0 && (
          <span className="flex items-center gap-1 text-[var(--text-secondary)]">
            <Download className="w-3.5 h-3.5" />
            {formatNumber(installCount)}
          </span>
        )}
        {rating !== undefined && rating > 0 && (
          <span className="flex items-center gap-1 text-[var(--text-secondary)]">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            {rating.toFixed(1)}
          </span>
        )}
      </div>
    )
  }

  if (variant === 'stacked') {
    return (
      <div className={`space-y-2 ${className}`}>
        {verified && <VerifiedBadge size="lg" />}
        {installCount !== undefined && installCount > 0 && (
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-[var(--text-tertiary)]" />
            <span className="text-sm">
              <strong>{formatNumber(installCount)}</strong>{' '}
              <span className="text-[var(--text-secondary)]">installs</span>
            </span>
          </div>
        )}
        {rating !== undefined && rating > 0 && (
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm">
              <strong>{rating.toFixed(1)}</strong>{' '}
              <span className="text-[var(--text-secondary)]">
                ({reviewCount || 0} reviews)
              </span>
            </span>
          </div>
        )}
        {githubStars !== undefined && githubStars > 0 && (
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-[var(--text-tertiary)]" />
            <span className="text-sm">
              <strong>{formatNumber(githubStars)}</strong>{' '}
              <span className="text-[var(--text-secondary)]">stars</span>
            </span>
          </div>
        )}
      </div>
    )
  }

  // Default: inline
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {verified && <VerifiedBadge />}
      {installCount !== undefined && installCount > 0 && (
        <span className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
          <Download className="w-4 h-4" />
          {formatNumber(installCount)} installs
        </span>
      )}
      {rating !== undefined && rating > 0 && (
        <span className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          {rating.toFixed(1)}
          {reviewCount !== undefined && reviewCount > 0 && (
            <span className="text-[var(--text-tertiary)]">
              ({reviewCount})
            </span>
          )}
        </span>
      )}
      {githubStars !== undefined && githubStars > 0 && (
        <span className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
          <Github className="w-4 h-4" />
          {formatNumber(githubStars)}
        </span>
      )}
    </div>
  )
}

// Individual badge components
export function VerifiedBadge({
  size = 'default',
}: {
  size?: 'sm' | 'default' | 'lg'
}) {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs gap-1',
    default: 'px-2 py-1 text-xs gap-1',
    lg: 'px-3 py-1.5 text-sm gap-1.5',
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    default: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }

  return (
    <span
      className={`inline-flex items-center ${sizeClasses[size]} bg-emerald-500/10 text-emerald-500 rounded-full font-medium`}
    >
      <CheckCircle className={iconSizes[size]} />
      Verified
    </span>
  )
}

export function OfficialBadge({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs gap-1',
    default: 'px-2 py-1 text-xs gap-1',
    lg: 'px-3 py-1.5 text-sm gap-1.5',
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    default: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }

  return (
    <span
      className={`inline-flex items-center ${sizeClasses[size]} bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] rounded-full font-medium`}
    >
      <Shield className={iconSizes[size]} />
      ID8Labs
    </span>
  )
}

export function FeaturedBadge({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs gap-1',
    default: 'px-2 py-1 text-xs gap-1',
    lg: 'px-3 py-1.5 text-sm gap-1.5',
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    default: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }

  return (
    <span
      className={`inline-flex items-center ${sizeClasses[size]} bg-amber-500/10 text-amber-500 rounded-full font-medium`}
    >
      <Star className={`${iconSizes[size]} fill-current`} />
      Featured
    </span>
  )
}

// Complexity badge
export function ComplexityBadge({
  complexity,
  size = 'default',
}: {
  complexity: 'simple' | 'complex' | 'multi-agent'
  size?: 'sm' | 'default' | 'lg'
}) {
  const styles: Record<string, { bg: string; text: string; label: string }> = {
    simple: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-500',
      label: 'Simple',
    },
    complex: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-500',
      label: 'Complex',
    },
    'multi-agent': {
      bg: 'bg-purple-500/10',
      text: 'text-purple-500',
      label: 'Multi-Agent',
    },
  }

  const style = styles[complexity] || styles.simple

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    default: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  }

  return (
    <span
      className={`inline-flex items-center ${sizeClasses[size]} ${style.bg} ${style.text} rounded-full font-medium`}
    >
      {style.label}
    </span>
  )
}

// Quality tier badge
export function QualityTierBadge({
  tier,
  size = 'default',
}: {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  size?: 'sm' | 'default' | 'lg'
}) {
  const styles: Record<string, { bg: string; text: string; emoji: string }> = {
    bronze: { bg: 'bg-orange-700/10', text: 'text-orange-700', emoji: '🥉' },
    silver: { bg: 'bg-gray-400/10', text: 'text-gray-400', emoji: '🥈' },
    gold: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', emoji: '🥇' },
    platinum: { bg: 'bg-cyan-400/10', text: 'text-cyan-400', emoji: '💎' },
  }

  const style = styles[tier] || styles.silver

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs gap-1',
    default: 'px-2 py-1 text-xs gap-1',
    lg: 'px-3 py-1.5 text-sm gap-1.5',
  }

  return (
    <span
      className={`inline-flex items-center ${sizeClasses[size]} ${style.bg} ${style.text} rounded-full font-medium capitalize`}
    >
      <span>{style.emoji}</span>
      {tier}
    </span>
  )
}

// Star rating display
export function StarRating({
  rating,
  maxRating = 5,
  size = 'default',
  showValue = true,
}: {
  rating: number
  maxRating?: number
  size?: 'sm' | 'default' | 'lg'
  showValue?: boolean
}) {
  const iconSizes = {
    sm: 'w-3 h-3',
    default: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`${iconSizes[size]} text-yellow-500 fill-yellow-500`}
        />
      ))}
      {/* Half star - show as full for simplicity */}
      {hasHalfStar && (
        <Star
          className={`${iconSizes[size]} text-yellow-500 fill-yellow-500 opacity-60`}
        />
      )}
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={`${iconSizes[size]} text-[var(--text-tertiary)]`}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-sm text-[var(--text-secondary)]">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

// Helper function
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export default TrustBadges
