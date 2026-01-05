import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { COURSES, TOTAL_MODULES, FOUNDATION_COURSE, COURSES_BY_ORDER, getModulePath } from '@/lib/courses/config'
import type { CourseProgress, ProgressStats, CourseProgressStats, ResumePoint, UserProgress } from '@/lib/courses/types'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all progress for user
    const { data: progress, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })

    if (error) {
      console.error('Error fetching progress:', error)
      return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
    }

    const progressData = (progress || []) as CourseProgress[]

    // Calculate overall stats
    const completed = progressData.length
    const percent = Math.round((completed / TOTAL_MODULES) * 100)
    const stats: ProgressStats = { total: TOTAL_MODULES, completed, percent }

    // Calculate per-course stats
    const courseStats: Record<string, CourseProgressStats> = {}
    for (const [slug, config] of Object.entries(COURSES)) {
      const courseCompletions = progressData.filter(p => p.course_slug === slug)
      courseStats[slug] = {
        courseSlug: slug,
        total: config.modules,
        completed: courseCompletions.length,
        percent: Math.round((courseCompletions.length / config.modules) * 100),
      }
    }

    // Check if foundation is complete
    const foundationStats = courseStats[FOUNDATION_COURSE]
    const isFoundationComplete = foundationStats
      ? foundationStats.completed >= foundationStats.total
      : false

    // Find resume point (next uncompleted module in recommended order)
    let resumePoint: ResumePoint | null = null

    for (const course of COURSES_BY_ORDER) {
      const courseCompletions = progressData
        .filter(p => p.course_slug === course.slug)
        .map(p => parseInt(p.module_slug.replace('module-', ''), 10))

      // Find first uncompleted module in this course
      for (let i = 1; i <= course.modules; i++) {
        if (!courseCompletions.includes(i)) {
          // For non-foundation courses, only suggest if foundation is complete
          if (!course.isFoundation && !isFoundationComplete) {
            continue
          }

          resumePoint = {
            courseSlug: course.slug,
            moduleSlug: `module-${i}`,
            path: getModulePath(course.slug, i),
            courseTitle: course.title,
            moduleNumber: i,
          }
          break
        }
      }

      if (resumePoint) break
    }

    const response: UserProgress = {
      progress: progressData,
      stats,
      courseStats,
      isFoundationComplete,
      resumePoint,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Progress API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
