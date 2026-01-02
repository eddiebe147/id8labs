'use client'

import { m } from '@/components/motion'

interface CourseProgressProps {
  currentModule: number
  totalModules: number
  courseTitle?: string
}

export default function CourseProgress({
  currentModule,
  totalModules,
  courseTitle
}: CourseProgressProps) {
  const progress = (currentModule / totalModules) * 100

  return (
    <div className="mb-8">
      {courseTitle && (
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-2">
          {courseTitle}
        </p>
      )}

      {/* Progress Bar */}
      <div className="relative h-1.5 bg-[var(--border)] rounded-full overflow-hidden mb-2">
        <m.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 h-full bg-[var(--id8-orange)] rounded-full"
        />
      </div>

      {/* Module Counter */}
      <p className="text-sm text-[var(--text-tertiary)]">
        Module {currentModule} of {totalModules}
      </p>
    </div>
  )
}
