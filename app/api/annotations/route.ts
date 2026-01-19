import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Highlight, Note, AnnotationStats } from '@/lib/courses/types'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse query params for filtering
    const { searchParams } = new URL(request.url)
    const courseSlug = searchParams.get('courseSlug')
    const moduleSlug = searchParams.get('moduleSlug')

    // Build highlight query
    let highlightQuery = supabase
      .from('course_highlights')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (courseSlug) {
      highlightQuery = highlightQuery.eq('course_slug', courseSlug)
    }
    if (moduleSlug) {
      highlightQuery = highlightQuery.eq('module_slug', moduleSlug)
    }

    // Build note query
    let noteQuery = supabase
      .from('course_notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (courseSlug) {
      noteQuery = noteQuery.eq('course_slug', courseSlug)
    }
    if (moduleSlug) {
      noteQuery = noteQuery.eq('module_slug', moduleSlug)
    }

    // Execute both queries in parallel
    const [highlightResult, noteResult] = await Promise.all([
      highlightQuery,
      noteQuery,
    ])

    if (highlightResult.error) {
      console.error('Error fetching highlights:', highlightResult.error)
      return NextResponse.json({ error: 'Failed to fetch highlights' }, { status: 500 })
    }

    if (noteResult.error) {
      console.error('Error fetching notes:', noteResult.error)
      return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
    }

    const highlights = (highlightResult.data || []) as Highlight[]
    const notes = (noteResult.data || []) as Note[]

    // Calculate stats
    const stats = calculateStats(highlights, notes)

    return NextResponse.json({
      highlights,
      notes,
      stats,
    })
  } catch (error) {
    console.error('Annotations API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function calculateStats(highlights: Highlight[], notes: Note[]): AnnotationStats {
  const by_course: Record<string, { highlights: number; notes: number }> = {}

  // Count highlights by course
  for (const highlight of highlights) {
    if (!by_course[highlight.course_slug]) {
      by_course[highlight.course_slug] = { highlights: 0, notes: 0 }
    }
    by_course[highlight.course_slug].highlights++
  }

  // Count notes by course
  for (const note of notes) {
    if (!by_course[note.course_slug]) {
      by_course[note.course_slug] = { highlights: 0, notes: 0 }
    }
    by_course[note.course_slug].notes++
  }

  return {
    total_highlights: highlights.length,
    total_notes: notes.length,
    by_course,
  }
}
