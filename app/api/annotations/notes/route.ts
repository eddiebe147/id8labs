import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { CreateNoteInput, Note } from '@/lib/courses/types'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json() as CreateNoteInput

    // Validate required fields
    if (!body.course_slug || !body.content) {
      return NextResponse.json(
        { error: 'Missing required fields: course_slug, content' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('course_notes')
      .insert({
        user_id: user.id,
        course_slug: body.course_slug,
        module_slug: body.module_slug || null,
        title: body.title || null,
        content: body.content,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating note:', error)
      return NextResponse.json({ error: 'Failed to create note' }, { status: 500 })
    }

    return NextResponse.json(data as Note, { status: 201 })
  } catch (error) {
    console.error('Create note API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
