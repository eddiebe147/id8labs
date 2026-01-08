'use client'

import { TrendingUp, Flame, Star } from 'lucide-react'

interface PopularityBadgeProps {
  installCount: number
  viewCount: number
  type?: 'trending' | 'popular' | 'hot'
}

export function PopularityBadge({ installCount, viewCount, type }: PopularityBadgeProps) {
  // Determine badge type based on metrics if not specified
  const getBadgeType = () => {
    if (type) return type

    // Hot: High install rate (installs / views > 10%)
    const installRate = viewCount > 0 ? (installCount / viewCount) * 100 : 0
    if (installRate > 10 && installCount > 50) {
      return 'hot'
    }

    // Trending: Growing install count
    if (installCount > 100) {
      return 'trending'
    }

    // Popular: High install count
    if (installCount > 50) {
      return 'popular'
    }

    return null
  }

  const badgeType = getBadgeType()

  if (!badgeType) {
    return null
  }

  const badges = {
    trending: {
      icon: TrendingUp,
      label: 'Trending',
      className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    },
    popular: {
      icon: Star,
      label: 'Popular',
      className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    },
    hot: {
      icon: Flame,
      label: 'Hot',
      className: 'bg-red-500/10 text-red-500 border-red-500/20',
    },
  }

  const badge = badges[badgeType]
  const Icon = badge.icon

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-full border ${badge.className}`}
    >
      <Icon className="w-3 h-3" />
      <span>{badge.label}</span>
    </div>
  )
}
