'use client'

import { m } from '@/components/motion'
import { useProgress } from '@/hooks/useProgress'
import { TOTAL_MODULES } from '@/lib/courses/config'

interface AcademyProgressBarProps {
  className?: string
  showLabel?: boolean
}

export default function AcademyProgressBar({
  className = '',
  showLabel = true,
}: AcademyProgressBarProps) {
  const { progress, loading } = useProgress()

  const completed = progress?.stats.completed ?? 0
  const percent = progress?.stats.percent ?? 0

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="h-2 bg-[var(--border)] rounded-full animate-pulse" />
      </div>
    )
  }

  // Don't show if not logged in
  if (!progress) {
    return null
  }

  return (
    <div className={`${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)]">
            Academy Progress
          </p>
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            {completed}/{TOTAL_MODULES} modules
          </p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="relative h-2 bg-[var(--border)] rounded-full overflow-hidden">
        <m.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-id8-orange to-id8-orange/80 rounded-full"
        />
      </div>

      {showLabel && percent > 0 && (
        <p className="text-xs text-[var(--text-tertiary)] mt-1">
          {percent}% complete
        </p>
      )}
    </div>
  )
}
