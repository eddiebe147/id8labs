import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Highlight } from '@/lib/courses/types'
import {
  EXPAND_SYSTEM_PROMPT,
  buildExpandPrompt,
} from '@/lib/annotations/ai-prompts'

export const runtime = 'nodejs'
export const maxDuration = 30

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface ExpandRequest {
  highlightId: string
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

    const body = await request.json() as ExpandRequest
    const { highlightId } = body

    if (!highlightId) {
      return NextResponse.json({ error: 'highlightId is required' }, { status: 400 })
    }

    // Fetch the specific highlight
    const { data: highlight, error } = await supabase
      .from('course_highlights')
      .select('*')
      .eq('id', highlightId)
      .eq('user_id', user.id)
      .single()

    if (error || !highlight) {
      return NextResponse.json({ error: 'Highlight not found' }, { status: 404 })
    }

    // Build prompt and call Claude
    const userPrompt = buildExpandPrompt(highlight as Highlight)

    const stream = await anthropic.messages.stream({
      model: 'claude-3-haiku-20240307',
      max_tokens: 512,
      system: EXPAND_SYSTEM_PROMPT,
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
    console.error('Expand API error:', error)
    return NextResponse.json({ error: 'Failed to expand highlight' }, { status: 500 })
  }
}
