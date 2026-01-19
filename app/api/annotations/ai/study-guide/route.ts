import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Highlight, Note } from '@/lib/courses/types'
import {
  STUDY_GUIDE_SYSTEM_PROMPT,
  buildStudyGuidePrompt,
} from '@/lib/annotations/ai-prompts'

export const runtime = 'nodejs'
export const maxDuration = 45 // Longer timeout for study guide generation

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface StudyGuideRequest {
  courseSlug: string
}

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

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'AI service not configured' }, { status: 500 })
    }

    const body = await request.json() as StudyGuideRequest
    const { courseSlug } = body

    if (!courseSlug) {
      return NextResponse.json({ error: 'courseSlug is required' }, { status: 400 })
    }

    // Fetch user's annotations for this course
    const [highlightResult, noteResult] = await Promise.all([
      supabase
        .from('course_highlights')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_slug', courseSlug)
        .order('module_slug', { ascending: true })
        .order('created_at', { ascending: true }),
      supabase
        .from('course_notes')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_slug', courseSlug)
        .order('module_slug', { ascending: true })
        .order('created_at', { ascending: true }),
    ])

    if (highlightResult.error || noteResult.error) {
      return NextResponse.json({ error: 'Failed to fetch annotations' }, { status: 500 })
    }

    const highlights = (highlightResult.data || []) as Highlight[]
    const notes = (noteResult.data || []) as Note[]

    if (highlights.length === 0 && notes.length === 0) {
      return NextResponse.json({
        error: 'No annotations found for this course',
      }, { status: 400 })
    }

    // Need at least a few annotations for a meaningful study guide
    if (highlights.length + notes.length < 3) {
      return NextResponse.json({
        error: 'Need at least 3 annotations to generate a study guide',
      }, { status: 400 })
    }

    // Build prompt and call Claude
    const userPrompt = buildStudyGuidePrompt(highlights, notes, courseSlug)

    // Use Sonnet for better quality study guides (more complex task)
    const stream = await anthropic.messages.stream({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      system: STUDY_GUIDE_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Study guide API error:', error)
    return NextResponse.json({ error: 'Failed to generate study guide' }, { status: 500 })
  }
}
