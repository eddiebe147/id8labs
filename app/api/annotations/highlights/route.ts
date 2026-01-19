import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { CreateHighlightInput, Highlight } from '@/lib/courses/types'

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

    const body = await request.json() as CreateHighlightInput

    // Validate required fields
    if (!body.course_slug || !body.module_slug || !body.highlighted_text) {
      return NextResponse.json(
        { error: 'Missing required fields: course_slug, module_slug, highlighted_text' },
        { status: 400 }
      )
    }

    // Validate color if provided
    const validColors = ['yellow', 'green', 'blue', 'pink']
    if (body.color && !validColors.includes(body.color)) {
      return NextResponse.json(
        { error: 'Invalid color. Must be one of: yellow, green, blue, pink' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('course_highlights')
      .insert({
        user_id: user.id,
        course_slug: body.course_slug,
        module_slug: body.module_slug,
        highlighted_text: body.highlighted_text,
        text_prefix: body.text_prefix || null,
        text_suffix: body.text_suffix || null,
        color: body.color || 'yellow',
        note: body.note || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating highlight:', error)
      return NextResponse.json({ error: 'Failed to create highlight' }, { status: 500 })
    }

    return NextResponse.json(data as Highlight, { status: 201 })
  } catch (error) {
    console.error('Create highlight API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
