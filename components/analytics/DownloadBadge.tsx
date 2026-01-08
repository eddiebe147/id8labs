'use client'

import { Download } from 'lucide-react'

interface DownloadBadgeProps {
  count: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function DownloadBadge({ count, size = 'sm', showLabel = true }: DownloadBadgeProps) {
  // Format large numbers
  const formatCount = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  if (count === 0) {
    return null
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-full border border-[var(--border)] font-medium`}
    >
      <Download className={iconSizes[size]} />
      <span>{formatCount(count)}</span>
      {showLabel && size !== 'sm' && (
        <span className="hidden sm:inline">
          {count === 1 ? 'install' : 'installs'}
        </span>
      )}
    </div>
  )
}
