'use client'

import { useState, useEffect, useCallback } from 'react'
import type { UserProgress, CourseProgressStats } from '@/lib/courses/types'
import { COURSES, FOUNDATION_COURSE } from '@/lib/courses/config'

interface UseProgressReturn {
  progress: UserProgress | null
  loading: boolean
  error: string | null
  markComplete: (courseSlug: string, moduleSlug: string) => Promise<boolean>
  isModuleComplete: (courseSlug: string, moduleSlug: string) => boolean
  getCourseStats: (courseSlug: string) => CourseProgressStats | null
  isFoundationComplete: boolean
  refetch: () => Promise<void>
}

export function useProgress(): UseProgressReturn {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/progress')

      if (response.status === 401) {
        // User not logged in - not an error, just no progress
        setProgress(null)
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch progress')
      }

      const data = await response.json()
      setProgress(data)
    } catch (err) {
      console.error('Error fetching progress:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProgress()
  }, [fetchProgress])

  const markComplete = useCallback(
    async (courseSlug: string, moduleSlug: string): Promise<boolean> => {
      try {
        const response = await fetch('/api/progress/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseSlug, moduleSlug }),
        })

        if (!response.ok) {
          throw new Error('Failed to mark complete')
        }

        // Refetch progress to update local state
        await fetchProgress()
        return true
      } catch (err) {
        console.error('Error marking complete:', err)
        return false
      }
    },
    [fetchProgress]
  )

  const isModuleComplete = useCallback(
    (courseSlug: string, moduleSlug: string): boolean => {
      if (!progress) return false
      return progress.progress.some(
        (p) => p.course_slug === courseSlug && p.module_slug === moduleSlug
      )
    },
    [progress]
  )

  const getCourseStats = useCallback(
    (courseSlug: string): CourseProgressStats | null => {
      if (!progress) return null
      return progress.courseStats[courseSlug] || null
    },
    [progress]
  )

  const isFoundationComplete = progress?.isFoundationComplete ?? false

  return {
    progress,
    loading,
    error,
    markComplete,
    isModuleComplete,
    getCourseStats,
    isFoundationComplete,
    refetch: fetchProgress,
  }
}

// Simpler hook just for foundation gate checking
export function useFoundationGate(): {
  isLocked: boolean
  loading: boolean
  foundationPath: string
  foundationTitle: string
} {
  const { isFoundationComplete, loading } = useProgress()
  const foundationCourse = COURSES[FOUNDATION_COURSE]

  return {
    isLocked: !isFoundationComplete,
    loading,
    foundationPath: foundationCourse?.path || '/courses/ai-conversation-fundamentals',
    foundationTitle: foundationCourse?.title || 'AI Conversation Fundamentals',
  }
}
