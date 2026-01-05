'use client'

import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useProgress } from '@/hooks/useProgress'
import { COURSES, getNextRecommendedCourse } from '@/lib/courses/config'

interface ModuleCompleteProps {
  courseSlug: string
  moduleSlug: string
  nextModulePath?: string
  showCelebration?: boolean
}

const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function ModuleComplete({
  courseSlug,
  moduleSlug,
  nextModulePath,
  showCelebration = true,
}: ModuleCompleteProps) {
  const { markComplete, isModuleComplete, progress } = useProgress()
  const [isCompleting, setIsCompleting] = useState(false)
  const [justCompleted, setJustCompleted] = useState(false)

  const isComplete = isModuleComplete(courseSlug, moduleSlug)
  const course = COURSES[courseSlug]

  // Determine what comes next
  const moduleNumber = parseInt(moduleSlug.replace('module-', ''), 10)
  const isLastModule = course && moduleNumber >= course.modules
  const nextCourse = isLastModule ? getNextRecommendedCourse(courseSlug) : null

  const handleMarkComplete = async () => {
    if (isComplete || isCompleting) return

    setIsCompleting(true)
    const success = await markComplete(courseSlug, moduleSlug)

    if (success && showCelebration) {
      setJustCompleted(true)
      setTimeout(() => setJustCompleted(false), 3000)
    }

    setIsCompleting(false)
  }

  // Auto-mark complete when component mounts (user reached the end)
  useEffect(() => {
    if (!isComplete && progress) {
      handleMarkComplete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress])

  // Don't render if not logged in
  if (!progress) {
    return null
  }

  return (
    <div className="mt-12 pt-8 border-t border-[var(--border)]">
      <AnimatePresence mode="wait">
        {justCompleted ? (
          <m.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-8"
          >
            <m.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4"
            >
              <CheckIcon />
            </m.div>
            <h3 className="text-xl font-semibold mb-2">Module Complete!</h3>
            <p className="text-[var(--text-secondary)]">
              Great work. Keep going!
            </p>
          </m.div>
        ) : (
          <m.div
            key="navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              {isComplete && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                  <CheckIcon />
                  Completed
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {nextModulePath && (
                <Link
                  href={nextModulePath}
                  className="btn btn-primary group inline-flex items-center gap-2"
                >
                  Next Module
                  <ArrowRightIcon />
                </Link>
              )}

              {isLastModule && nextCourse && (
                <Link
                  href={nextCourse.path}
                  className="btn btn-primary group inline-flex items-center gap-2"
                >
                  Next: {nextCourse.title}
                  <ArrowRightIcon />
                </Link>
              )}

              {isLastModule && !nextCourse && (
                <Link
                  href="/academy"
                  className="btn btn-primary group inline-flex items-center gap-2"
                >
                  Back to Academy
                  <ArrowRightIcon />
                </Link>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
