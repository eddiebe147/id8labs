import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { COURSES } from '@/lib/courses/config'

interface CompleteRequest {
  courseSlug: string
  moduleSlug: string
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json() as CompleteRequest
    const { courseSlug, moduleSlug } = body

    // Validate course exists
    if (!COURSES[courseSlug]) {
      return NextResponse.json({ error: 'Invalid course' }, { status: 400 })
    }

    // Validate module format
    const moduleMatch = moduleSlug.match(/^module-(\d+)$/)
    if (!moduleMatch) {
      return NextResponse.json({ error: 'Invalid module format' }, { status: 400 })
    }

    const moduleNumber = parseInt(moduleMatch[1], 10)
    if (moduleNumber < 1 || moduleNumber > COURSES[courseSlug].modules) {
      return NextResponse.json({ error: 'Invalid module number' }, { status: 400 })
    }

    // Upsert to handle idempotency (marking same module complete multiple times is fine)
    const { error } = await supabase
      .from('course_progress')
      .upsert(
        {
          user_id: user.id,
          course_slug: courseSlug,
          module_slug: moduleSlug,
          completed_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,course_slug,module_slug',
        }
      )

    if (error) {
      console.error('Error marking complete:', error)
      return NextResponse.json({ error: 'Failed to mark complete' }, { status: 500 })
    }

    return NextResponse.json({ success: true, courseSlug, moduleSlug })
  } catch (error) {
    console.error('Complete API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
