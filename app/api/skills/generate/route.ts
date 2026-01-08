import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  SKILL_GENERATOR_SYSTEM_PROMPT,
  buildSkillGenerationPrompt,
} from '@/lib/skill-generator-prompt'

export const runtime = 'nodejs'
export const maxDuration = 60 // Allow up to 60 seconds for generation

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Rate limiting: 10 generations per hour per user
const rateLimitMap = new Map<
  string,
  { count: number; resetTime: number }
>()
const RATE_LIMIT = 10
const RATE_WINDOW = 60 * 60 * 1000 // 1 hour

function checkRateLimit(userId: string): {
  allowed: boolean
  remaining: number
} {
  const now = Date.now()
  const entry = rateLimitMap.get(userId)

  // Clean up old entries periodically
  if (rateLimitMap.size > 1000) {
    const keysToDelete: string[] = []
    rateLimitMap.forEach((v, k) => {
      if (v.resetTime < now) keysToDelete.push(k)
    })
    keysToDelete.forEach((k) => rateLimitMap.delete(k))
  }

  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + RATE_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT - 1 }
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: RATE_LIMIT - entry.count }
}

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      )
    }

    // Check authentication
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Please sign in to generate skills' },
        { status: 401 }
      )
    }

    // Rate limiting by user
    const { allowed, remaining } = checkRateLimit(user.id)
    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. You can generate 10 skills per hour.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT.toString(),
            'X-RateLimit-Remaining': '0',
            'Retry-After': '3600',
          },
        }
      )
    }

    // Parse request body
    const body = await request.json()
    const { description, category, complexity } = body as {
      description: string
      category?: string
      complexity?: string
    }

    // Validate input
    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      )
    }

    if (description.length < 10) {
      return NextResponse.json(
        { error: 'Description must be at least 10 characters' },
        { status: 400 }
      )
    }

    if (description.length > 1000) {
      return NextResponse.json(
        { error: 'Description must be less than 1000 characters' },
        { status: 400 }
      )
    }

    // Build the prompt
    const userPrompt = buildSkillGenerationPrompt(
      description,
      category,
      complexity
    )

    // Create streaming response from Claude Sonnet
    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SKILL_GENERATOR_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    })

    // Return streaming response
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
          console.error('Streaming error:', error)
          controller.error(error)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
        'X-RateLimit-Limit': RATE_LIMIT.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
      },
    })
  } catch (error) {
    console.error('Skill generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate skill. Please try again.' },
      { status: 500 }
    )
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    model: 'claude-sonnet-4-20250514',
    configured: !!process.env.ANTHROPIC_API_KEY,
    rateLimit: `${RATE_LIMIT} per hour`,
  })
}
