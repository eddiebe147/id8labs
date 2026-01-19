import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { UpdateHighlightInput, Highlight } from '@/lib/courses/types'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json() as UpdateHighlightInput

    // Validate color if provided
    const validColors = ['yellow', 'green', 'blue', 'pink']
    if (body.color && !validColors.includes(body.color)) {
      return NextResponse.json(
        { error: 'Invalid color. Must be one of: yellow, green, blue, pink' },
        { status: 400 }
      )
    }

    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {}
    if (body.color !== undefined) updateData.color = body.color
    if (body.note !== undefined) updateData.note = body.note

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('course_highlights')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id) // RLS check + ownership verification
      .select()
      .single()

    if (error) {
      console.error('Error updating highlight:', error)
      return NextResponse.json({ error: 'Failed to update highlight' }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Highlight not found' }, { status: 404 })
    }

    return NextResponse.json(data as Highlight)
  } catch (error) {
    console.error('Update highlight API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error, count } = await supabase
      .from('course_highlights')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id) // RLS check + ownership verification

    if (error) {
      console.error('Error deleting highlight:', error)
      return NextResponse.json({ error: 'Failed to delete highlight' }, { status: 500 })
    }

    // count will be 0 if no rows matched (either doesn't exist or doesn't belong to user)
    // We don't distinguish between these cases for security reasons

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete highlight API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
