import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Highlight, Note } from '@/lib/courses/types'
import {
  CONNECTIONS_SYSTEM_PROMPT,
  buildConnectionsPrompt,
} from '@/lib/annotations/ai-prompts'

export const runtime = 'nodejs'
export const maxDuration = 30

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface ConnectionsRequest {
  courseSlug?: string
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

    const body = await request.json() as ConnectionsRequest
    const { courseSlug } = body

    // Fetch user's annotations
    let highlightQuery = supabase
      .from('course_highlights')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })

    let noteQuery = supabase
      .from('course_notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })

    if (courseSlug) {
      highlightQuery = highlightQuery.eq('course_slug', courseSlug)
      noteQuery = noteQuery.eq('course_slug', courseSlug)
    }

    const [highlightResult, noteResult] = await Promise.all([
      highlightQuery,
      noteQuery,
    ])

    if (highlightResult.error || noteResult.error) {
      return NextResponse.json({ error: 'Failed to fetch annotations' }, { status: 500 })
    }

    const highlights = (highlightResult.data || []) as Highlight[]
    const notes = (noteResult.data || []) as Note[]

    // Need at least 3 annotations to find meaningful connections
    if (highlights.length + notes.length < 3) {
      return NextResponse.json({
        error: 'Need at least 3 annotations to find connections',
      }, { status: 400 })
    }

    // Build prompt and call Claude
    const userPrompt = buildConnectionsPrompt(highlights, notes, courseSlug)

    const stream = await anthropic.messages.stream({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: CONNECTIONS_SYSTEM_PROMPT,
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
    console.error('Connections API error:', error)
    return NextResponse.json({ error: 'Failed to find connections' }, { status: 500 })
  }
}
