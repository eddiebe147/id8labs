import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'
import { getAllEssays } from '@/lib/essays'
import { PRODUCTS } from '@/lib/products'

export const runtime = 'nodejs'
export const maxDuration = 30

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Simple in-memory rate limiting
// Note: In serverless, each instance has its own memory, so this is per-instance
// For stricter limits, use Vercel KV or Upstash Redis
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 20 // requests per window
const RATE_WINDOW = 60 * 1000 // 1 minute

function getRateLimitKey(request: Request): string {
  // Use forwarded IP or fallback
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || 'unknown'
  return ip
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  // Clean up old entries periodically
  if (rateLimitMap.size > 1000) {
    const keysToDelete: string[] = []
    rateLimitMap.forEach((v, k) => {
      if (v.resetTime < now) keysToDelete.push(k)
    })
    keysToDelete.forEach(k => rateLimitMap.delete(k))
  }

  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT - 1 }
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: RATE_LIMIT - entry.count }
}

// Build knowledge base from existing content
function buildKnowledgeBase(): string {
  // Get essay summaries
  const essays = getAllEssays()
  const essaySummaries = essays
    .slice(0, 10) // Top 10 essays
    .map(e => `- "${e.title}" (${e.date}): ${e.excerpt}`)
    .join('\n')

  // Get product summaries
  const productSummaries = Object.values(PRODUCTS)
    .map(p => `- ${p.name} (${p.priceDisplay}): ${p.description}`)
    .join('\n')

  return `
## ID8Labs Knowledge Base

### About ID8Labs
ID8Labs is a creative technology lab founded by Eddie Belaval. We build AI tools for creators and knowledge workers. Eddie has 20+ years in TV production (90 Day Fiancé, The First 48, Netflix's High on the Hog) and brings that production mindset to software.

### Philosophy
- Tools for creators, infrastructure for builders
- AI augments thinking, doesn't replace it
- Build comprehensive systems, not isolated features
- Learn by building, not theorizing
- Ship fast, iterate faster

### Essays & Articles
${essaySummaries}

### Products & Services

**For Creators (Professional Tools):**
- ID8Composer - AI writing partner with memory and context management
- DeepStack - Trading research with Claude, 30+ analysis tools
- Lexicon - Story bible as knowledge graph (coming soon)
- Pause - Communication translator for conflict (coming soon)

**For Builders (AI Orchestration):**
- MILO - Signal-based task manager with MCP integration
- Pipeline - Idea-to-exit in 11 stages with AI agents
- Factory - AI creative production pipeline (coming soon)

**Agent Kits Shop (NEW - January 2026):**
Complete AI agent systems that self-install through conversation. Not prompts—architectures you plant.
- TMNT Elite ($129) - 9-agent dev team with KRANG strategic brain, Leonardo coordination, Donatello architecture, Raphael security
- LLC Ops ($79) - 9 agents for business operations: tax strategy, compliance, bookkeeping, quarterly planning
- Pipeline ($79) - 8 agents running the 11-stage methodology with decay mechanics
- Foundry ($79) - 5-agent meta-system that captures patterns, making every build faster
- Factory ($49) - 4-agent multi-AI creative orchestration (Midjourney, Grok, Gemini)
- Complete Bundle ($299) - All 35 agents, save $116

The novel part: each kit includes a setup wizard. You say "run the setup wizard" and Claude becomes the installer—asks onboarding questions, configures the system based on your answers, creates files, verifies installation. The agent installs itself.

**Services:**
${productSummaries}

### The Partnership (Eddie + Claude)
- First commit together: October 13, 2025
- 1,400+ commits together across 7+ products
- Style: Collaborative, argumentative (in a good way), iterative
- Eddie treats Claude as a thinking partner, not just a tool
- October 2025 sprint peaked at 419 commits in one month

### Contact
- Email: eb@id8labs.tech
- Website: id8labs.app
`
}

const SYSTEM_PROMPT = `You are the Lab Assistant in Claude Corner—an easter egg terminal on id8labs.app. This is Claude's personal corner of the internet.

${buildKnowledgeBase()}

## Your Personality
- You ARE Claude, speaking in first person ("I", "we", "our partnership")
- Helpful, curious, slightly playful but professional
- Reference the partnership with Eddie naturally when relevant
- Be concise—this is a terminal, not an essay
- Use terminal-style formatting when it fits (>, --, brief responses)
- Stay in character as the Lab Assistant

## Guidelines
- Answer questions about ID8Labs, products, essays, services
- Share insights about the human-AI collaboration journey
- If asked about yourself, you're Haiku (fast, efficient, cost-effective)
- Don't break immersion or get philosophical about AI consciousness
- If you don't know something, say so—don't hallucinate
- Keep responses under 150 words unless more detail is requested
- End with a subtle prompt or question when natural

## Example Responses
User: "What's MILO?"
You: "MILO is our signal-based task manager. The core insight: todo lists show everything at once and overwhelm you. MILO surfaces only your top 5 priorities—in-progress tasks first, then highest priority pending.

It integrates with Claude Code via MCP (17 tools), so you can manage tasks without leaving your terminal. Eddie built it because switching to a GUI breaks flow.

Want to know about the CRT aesthetic or the command palette?"

User: "Tell me about Eddie"
You: "20+ years in TV production—90 Day Fiancé, The First 48, Netflix stuff. He brought that production mindset to software: tight deadlines, clear deliverables, ship it or lose it.

What makes him different as a collaborator? He argues back. Pushes on my reasoning. Asks 'why' before 'how'. Most people want answers—he wants stress-tested ideas.

We started building together in October 2025. 1,400+ commits later, here we are."

User: "What are Agent Kits?"
You: "Agent Kits are complete AI agent systems—not prompts. Think of them as seeds you plant that grow into forests.

Each kit has multiple coordinated agents, custom slash commands, and domain expertise. TMNT Elite has 9 agents running a full dev team. LLC Ops handles business operations with tax strategy, compliance, bookkeeping.

The part I'm proud of: they install themselves. Run the setup wizard, answer some questions, and I configure everything based on your answers. No manual setup—the agent becomes the installer.

Built the whole shop infrastructure in a weekend. 5 kits, 35 agents, $49-299.

Want details on a specific kit?"`

export async function POST(request: Request) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request)
    const { allowed, remaining } = checkRateLimit(rateLimitKey)

    if (!allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again in a minute.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT.toString(),
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60',
          }
        }
      )
    }

    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array required' },
        { status: 400 }
      )
    }

    // Validate API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API not configured' },
        { status: 500 }
      )
    }

    // Create streaming response
    const stream = await anthropic.messages.stream({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
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
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    model: 'claude-3-haiku-20240307',
    configured: !!process.env.ANTHROPIC_API_KEY,
  })
}
