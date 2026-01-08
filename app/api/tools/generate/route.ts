import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  getSystemPromptForToolType,
  buildSkillGenerationPrompt,
  buildCommandGenerationPrompt,
  buildAgentGenerationPrompt,
  buildMCPGenerationPrompt,
} from '@/lib/tool-factory/prompts'
import type { ToolType } from '@/lib/tool-factory/types'

export const runtime = 'nodejs'
export const maxDuration = 60 // Allow up to 60 seconds for generation

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Rate limits per tool type (per hour per user)
const RATE_LIMITS: Record<ToolType, number> = {
  skill: 10,
  command: 15,
  agent: 8,
  mcp: 5,
}
const RATE_WINDOW = 60 * 60 * 1000 // 1 hour

// Separate rate limit tracking per tool type
const rateLimitMaps: Record<ToolType, Map<string, { count: number; resetTime: number }>> = {
  skill: new Map(),
  command: new Map(),
  agent: new Map(),
  mcp: new Map(),
}

function checkRateLimit(
  userId: string,
  toolType: ToolType
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const limit = RATE_LIMITS[toolType]
  const rateLimitMap = rateLimitMaps[toolType]
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
    return { allowed: true, remaining: limit - 1 }
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: limit - entry.count }
}

interface GenerateRequest {
  toolType: ToolType
  description: string
  // Skill-specific
  categoryHint?: string
  complexityHint?: string
  // Command-specific
  commandCategoryHint?: string
  // Agent-specific
  agentCategoryHint?: string
  personaHint?: string
  // MCP-specific
  mcpCategoryHint?: string
  transportHint?: string
  languageHint?: string
}

function buildUserPrompt(request: GenerateRequest): string {
  const { toolType, description } = request

  switch (toolType) {
    case 'skill':
      return buildSkillGenerationPrompt(
        description,
        request.categoryHint,
        request.complexityHint
      )
    case 'command':
      return buildCommandGenerationPrompt(description, request.commandCategoryHint)
    case 'agent':
      return buildAgentGenerationPrompt(
        description,
        request.agentCategoryHint,
        request.complexityHint,
        request.personaHint
      )
    case 'mcp':
      return buildMCPGenerationPrompt(
        description,
        request.mcpCategoryHint,
        request.transportHint,
        request.languageHint
      )
    default:
      throw new Error(`Unknown tool type: ${toolType}`)
  }
}

const TOOL_TYPE_LABELS: Record<ToolType, string> = {
  skill: 'Skill',
  command: 'Command',
  agent: 'Agent',
  mcp: 'MCP Server',
}

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'AI service not configured' }, { status: 500 })
    }

    // Check authentication
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Please sign in to generate tools' },
        { status: 401 }
      )
    }

    // Parse request body
    const body: GenerateRequest = await request.json()
    const { toolType, description } = body

    // Validate tool type
    if (!toolType || !['skill', 'command', 'agent', 'mcp'].includes(toolType)) {
      return NextResponse.json(
        { error: 'Invalid tool type. Must be: skill, command, agent, or mcp' },
        { status: 400 }
      )
    }

    // Rate limiting by user and tool type
    const { allowed, remaining } = checkRateLimit(user.id, toolType)
    const limit = RATE_LIMITS[toolType]

    if (!allowed) {
      return NextResponse.json(
        {
          error: `Rate limit exceeded. You can generate ${limit} ${TOOL_TYPE_LABELS[toolType]}s per hour.`,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'Retry-After': '3600',
          },
        }
      )
    }

    // Validate description
    if (!description || typeof description !== 'string') {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 })
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

    // Get system prompt for tool type
    const systemPrompt = getSystemPromptForToolType(toolType)

    // Build user prompt with type-specific hints
    const userPrompt = buildUserPrompt(body)

    // Create streaming response from Claude Sonnet
    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192, // Increased for MCP servers which can be large
      system: systemPrompt,
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
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-Tool-Type': toolType,
      },
    })
  } catch (error) {
    console.error('Tool generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate tool. Please try again.' },
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
    rateLimits: {
      skill: `${RATE_LIMITS.skill} per hour`,
      command: `${RATE_LIMITS.command} per hour`,
      agent: `${RATE_LIMITS.agent} per hour`,
      mcp: `${RATE_LIMITS.mcp} per hour`,
    },
    totalPerHour: Object.values(RATE_LIMITS).reduce((a, b) => a + b, 0),
  })
}
