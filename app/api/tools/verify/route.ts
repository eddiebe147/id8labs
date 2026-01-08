import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { verifyTool, generateAutoFixes } from '@/lib/tool-factory/verification'
import type {
  ToolType,
  GeneratedSkill,
  GeneratedCommand,
  GeneratedAgent,
  GeneratedMCP,
} from '@/lib/tool-factory/types'

export const runtime = 'nodejs'

interface VerifyRequest {
  toolType: ToolType
  data: GeneratedSkill | GeneratedCommand | GeneratedAgent | GeneratedMCP
}

export async function POST(request: NextRequest) {
  try {
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
        { error: 'Please sign in to verify tools' },
        { status: 401 }
      )
    }

    // Parse request body
    const body: VerifyRequest = await request.json()
    const { toolType, data } = body

    // Validate tool type
    if (!toolType || !['skill', 'command', 'agent', 'mcp'].includes(toolType)) {
      return NextResponse.json(
        { error: 'Invalid tool type. Must be: skill, command, agent, or mcp' },
        { status: 400 }
      )
    }

    // Validate data exists
    if (!data) {
      return NextResponse.json({ error: 'Tool data is required' }, { status: 400 })
    }

    // Run verification
    const result = verifyTool(toolType, data)

    // Generate auto-fix suggestions if there are issues
    const autoFixes = result.passed ? [] : generateAutoFixes(toolType, data)

    return NextResponse.json({
      ...result,
      autoFixes,
    })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify tool. Please try again.' },
      { status: 500 }
    )
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    verificationPhases: [
      'Format Validation',
      'Quality Checks',
      'Type-Specific Validation',
      'AI Review',
    ],
    scoringWeights: {
      format: 30,
      quality: 25,
      typeSpecific: 35,
      aiReview: 10,
    },
  })
}
