'use client'

import Link from 'next/link'
import { m } from '@/components/motion'
import { useProgress } from '@/hooks/useProgress'
import { COURSES, FOUNDATION_COURSE, getNextRecommendedCourse } from '@/lib/courses/config'
import type { CourseConfig } from '@/lib/courses/types'

interface CourseProgressCardProps {
  course: CourseConfig
  index?: number
}

const LockIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function CourseProgressCard({ course, index = 0 }: CourseProgressCardProps) {
  const { progress, isFoundationComplete, getCourseStats } = useProgress()

  const stats = getCourseStats(course.slug)
  const isLocked = !course.isFoundation && !isFoundationComplete
  const isComplete = stats ? stats.completed >= stats.total : false
  const hasStarted = stats ? stats.completed > 0 : false

  // Check if this is the recommended next course
  const currentResumePoint = progress?.resumePoint
  const isRecommendedNext =
    currentResumePoint?.courseSlug === course.slug ||
    (!currentResumePoint && course.slug === FOUNDATION_COURSE)

  // Find next module to continue
  const nextModule = hasStarted && stats ? stats.completed + 1 : 1
  const continueUrl =
    nextModule <= course.modules
      ? `${course.path}/module-${nextModule}`
      : course.path

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative p-6 rounded-xl border transition-all ${
        isLocked
          ? 'bg-[var(--bg-secondary)]/50 border-[var(--border)] opacity-60'
          : 'bg-[var(--bg-secondary)] border-[var(--border)] hover:border-[var(--text-tertiary)]'
      }`}
    >
      {/* Badges */}
      <div className="flex items-center gap-2 mb-3">
        {course.isFoundation && (
          <span className="px-2 py-0.5 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
            Start Here
          </span>
        )}
        {isRecommendedNext && !course.isFoundation && !isLocked && (
          <span className="px-2 py-0.5 text-xs font-mono uppercase tracking-wider bg-blue-500/20 text-blue-400 rounded">
            Recommended Next
          </span>
        )}
        {isComplete && (
          <span className="px-2 py-0.5 text-xs font-mono uppercase tracking-wider bg-green-500/20 text-green-400 rounded flex items-center gap-1">
            <CheckIcon />
            Complete
          </span>
        )}
        {isLocked && (
          <span className="px-2 py-0.5 text-xs font-mono uppercase tracking-wider bg-[var(--border)] text-[var(--text-tertiary)] rounded flex items-center gap-1">
            <LockIcon />
            Locked
          </span>
        )}
      </div>

      {/* Course Title */}
      <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-4">
        {course.description}
      </p>

      {/* Progress Bar */}
      {stats && !isLocked && (
        <div className="mb-4">
          <div className="relative h-1.5 bg-[var(--border)] rounded-full overflow-hidden mb-1">
            <m.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.percent}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 h-full bg-id8-orange rounded-full"
            />
          </div>
          <p className="text-xs text-[var(--text-tertiary)]">
            {stats.completed}/{stats.total} modules
          </p>
        </div>
      )}

      {/* Module count for locked courses */}
      {isLocked && (
        <p className="text-xs text-[var(--text-tertiary)] mb-4">
          {course.modules} modules
        </p>
      )}

      {/* Action Button */}
      {isLocked ? (
        <div className="text-sm text-[var(--text-tertiary)]">
          Complete{' '}
          <Link
            href={COURSES[FOUNDATION_COURSE].path}
            className="text-id8-orange hover:underline"
          >
            {COURSES[FOUNDATION_COURSE].title}
          </Link>{' '}
          to unlock
        </div>
      ) : (
        <Link
          href={continueUrl}
          className="inline-flex items-center gap-2 text-sm font-medium text-id8-orange hover:text-id8-orange/80 transition-colors group"
        >
          {isComplete ? 'Review' : hasStarted ? 'Continue' : 'Start'}
          <ArrowRightIcon />
        </Link>
      )}
    </m.div>
  )
}
