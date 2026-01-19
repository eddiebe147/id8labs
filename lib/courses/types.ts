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

// ═══════════════════════════════════════════════════════════════════════════
// Annotation Types (Highlights & Notes)
// ═══════════════════════════════════════════════════════════════════════════

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink'

export interface Highlight {
  id: string
  user_id: string
  course_slug: string
  module_slug: string
  highlighted_text: string
  text_prefix: string | null
  text_suffix: string | null
  color: HighlightColor
  note: string | null
  created_at: string
  updated_at: string
}

export interface Note {
  id: string
  user_id: string
  course_slug: string
  module_slug: string | null
  title: string | null
  content: string
  created_at: string
  updated_at: string
}

export interface AnnotationStats {
  total_highlights: number
  total_notes: number
  by_course: Record<string, { highlights: number; notes: number }>
}

export interface UserAnnotations {
  highlights: Highlight[]
  notes: Note[]
  stats: AnnotationStats
}

// Input types for creating/updating annotations
export interface CreateHighlightInput {
  course_slug: string
  module_slug: string
  highlighted_text: string
  text_prefix?: string
  text_suffix?: string
  color?: HighlightColor
  note?: string
}

export interface UpdateHighlightInput {
  color?: HighlightColor
  note?: string
}

export interface CreateNoteInput {
  course_slug: string
  module_slug?: string
  title?: string
  content: string
}

export interface UpdateNoteInput {
  title?: string
  content?: string
}
