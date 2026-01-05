// Course Progress Types

export interface CourseConfig {
  slug: string
  title: string
  path: string
  modules: number
  isFoundation: boolean
  recommendedOrder: number
  description: string
}

export interface CourseProgress {
  id: string
  user_id: string
  course_slug: string
  module_slug: string
  completed_at: string
  created_at: string
}

export interface ProgressStats {
  total: number
  completed: number
  percent: number
}

export interface CourseProgressStats {
  courseSlug: string
  total: number
  completed: number
  percent: number
}

export interface ResumePoint {
  courseSlug: string
  moduleSlug: string
  path: string
  courseTitle: string
  moduleNumber: number
}

export interface UserProgress {
  progress: CourseProgress[]
  stats: ProgressStats
  courseStats: Record<string, CourseProgressStats>
  isFoundationComplete: boolean
  resumePoint: ResumePoint | null
}
