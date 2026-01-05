'use client'

import Link from 'next/link'
import { useProgress } from '@/hooks/useProgress'
import { COURSES, COURSES_BY_ORDER, FOUNDATION_COURSE } from '@/lib/courses/config'

const CheckIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const LockIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export default function LearningRoadmap() {
  const { progress, isFoundationComplete, getCourseStats } = useProgress()

  const foundation = COURSES[FOUNDATION_COURSE]
  const foundationStats = getCourseStats(FOUNDATION_COURSE)
  const foundationComplete = foundationStats
    ? foundationStats.completed >= foundationStats.total
    : false

  // Non-foundation courses
  const parallelCourses = COURSES_BY_ORDER.filter((c) => !c.isFoundation)

  return (
    <div className="py-8">
      {/* Foundation Course */}
      <div
        className="flex justify-center mb-4"
      >
        <Link
          href={foundation.path}
          className={`relative px-6 py-4 rounded-xl border-2 transition-all ${
            foundationComplete
              ? 'bg-green-500/10 border-green-500/50 hover:border-green-500'
              : 'bg-id8-orange/10 border-id8-orange/50 hover:border-id8-orange'
          }`}
        >
          <div className="flex items-center gap-3">
            {foundationComplete ? (
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400">
                <CheckIcon />
              </span>
            ) : (
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-id8-orange/20 text-id8-orange text-xs font-bold">
                1
              </span>
            )}
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-0.5">
                Start Here
              </p>
              <p className="font-semibold">{foundation.title}</p>
              {foundationStats && (
                <p className="text-xs text-[var(--text-tertiary)]">
                  {foundationStats.completed}/{foundationStats.total} modules
                </p>
              )}
            </div>
          </div>
        </Link>
      </div>

      {/* Connecting Line */}
      <div className="flex justify-center mb-4">
        <div className="w-px h-8 bg-gradient-to-b from-[var(--border)] to-transparent" />
      </div>

      {/* Unlock Message */}
      {!isFoundationComplete && (
        <p className="text-center text-sm text-[var(--text-tertiary)] mb-4">
          Complete foundation to unlock all courses below
        </p>
      )}

      {/* Parallel Courses Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {parallelCourses.map((course, index) => {
          const stats = getCourseStats(course.slug)
          const isComplete = stats ? stats.completed >= stats.total : false
          const hasStarted = stats ? stats.completed > 0 : false
          const isLocked = !isFoundationComplete

          return (
            <div key={course.slug}>
              {isLocked ? (
                <div className="p-3 rounded-lg bg-[var(--bg-secondary)]/50 border border-[var(--border)] opacity-50 text-center">
                  <span className="flex items-center justify-center w-6 h-6 mx-auto rounded-full bg-[var(--border)] text-[var(--text-tertiary)] mb-2">
                    <LockIcon />
                  </span>
                  <p className="text-xs font-medium truncate">{course.title}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    {course.modules} modules
                  </p>
                </div>
              ) : (
                <Link
                  href={course.path}
                  className={`block p-3 rounded-lg border transition-all text-center ${
                    isComplete
                      ? 'bg-green-500/10 border-green-500/30 hover:border-green-500/50'
                      : hasStarted
                      ? 'bg-id8-orange/5 border-id8-orange/30 hover:border-id8-orange/50'
                      : 'bg-[var(--bg-secondary)] border-[var(--border)] hover:border-[var(--text-tertiary)]'
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 mx-auto rounded-full mb-2 ${
                      isComplete
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-[var(--border)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {isComplete ? (
                      <CheckIcon />
                    ) : (
                      <span className="text-xs font-bold">
                        {course.recommendedOrder}
                      </span>
                    )}
                  </span>
                  <p className="text-xs font-medium truncate">{course.title}</p>
                  {stats && (
                    <p className="text-xs text-[var(--text-tertiary)]">
                      {stats.completed}/{stats.total}
                    </p>
                  )}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
