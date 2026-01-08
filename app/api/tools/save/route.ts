import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type {
  ToolType,
  GeneratedSkill,
  GeneratedCommand,
  GeneratedAgent,
  GeneratedMCP,
} from '@/lib/tool-factory/types'

export const runtime = 'nodejs'

interface SaveToolRequest {
  toolType: ToolType
  name: string
  slug: string
  description: string
  tags: string[]
  content: string
  rawContent: string
  // Type-specific fields
  [key: string]: unknown
}

const TOOL_TYPE_LABELS: Record<ToolType, string> = {
  skill: 'Skill',
  command: 'Command',
  agent: 'Agent',
  mcp: 'MCP Server',
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
        { error: 'Please sign in to save tools' },
        { status: 401 }
      )
    }

    // Parse request body
    const body: SaveToolRequest = await request.json()
    const { toolType, name, slug, description, tags, content, rawContent } = body

    // Validate tool type
    if (!toolType || !['skill', 'command', 'agent', 'mcp'].includes(toolType)) {
      return NextResponse.json(
        { error: 'Invalid tool type. Must be: skill, command, agent, or mcp' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!name || !slug || !description || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Ensure slug is unique by appending user-specific suffix
    const uniqueSlug = `${slug}-${user.id.slice(0, 8)}`

    // Add tool type to tags for filtering
    const toolTags = tags || []
    if (!toolTags.includes(toolType)) {
      toolTags.unshift(toolType) // Add tool type as first tag
    }

    // Build type-specific metadata to store in README field as JSON
    const typeMetadata = buildTypeMetadata(toolType, body)

    // Check if slug already exists
    const { data: existingTool } = await supabase
      .from('skills')
      .select('id')
      .eq('slug', uniqueSlug)
      .single()

    if (existingTool) {
      // Update existing tool
      const { data: updatedTool, error: updateError } = await supabase
        .from('skills')
        .update({
          name,
          description,
          category_id: getCategoryId(toolType, body),
          complexity: getComplexity(toolType, body),
          version: '1.0.0',
          author: `AI Generated (${user.email || 'User'})`,
          license: 'MIT',
          triggers: getTriggers(toolType, body),
          tags: toolTags,
          content,
          readme: JSON.stringify({
            rawContent,
            toolType,
            ...typeMetadata,
          }),
          status: 'draft',
          updated_at: new Date().toISOString(),
        })
        .eq('slug', uniqueSlug)
        .select('id')
        .single()

      if (updateError) {
        console.error('Update error:', updateError)
        return NextResponse.json({ error: `Failed to update ${toolType}` }, { status: 500 })
      }

      return NextResponse.json({
        toolId: updatedTool.id,
        slug: uniqueSlug,
        message: `${TOOL_TYPE_LABELS[toolType]} updated successfully`,
      })
    }

    // Insert new tool
    const { data: newTool, error: insertError } = await supabase
      .from('skills')
      .insert({
        name,
        slug: uniqueSlug,
        description,
        category_id: getCategoryId(toolType, body),
        complexity: getComplexity(toolType, body),
        version: '1.0.0',
        author: `AI Generated (${user.email || 'User'})`,
        license: 'MIT',
        triggers: getTriggers(toolType, body),
        tags: toolTags,
        content,
        readme: JSON.stringify({
          rawContent,
          toolType,
          ...typeMetadata,
        }),
        status: 'draft',
        validated: false,
        verified: false,
        featured: false,
        install_count: 0,
        view_count: 0,
        review_count: 0,
        avg_rating: 0,
      })
      .select('id')
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json({ error: `Failed to save ${toolType}` }, { status: 500 })
    }

    return NextResponse.json({
      toolId: newTool.id,
      slug: uniqueSlug,
      message: `${TOOL_TYPE_LABELS[toolType]} saved successfully`,
    })
  } catch (error) {
    console.error('Save tool error:', error)
    return NextResponse.json(
      { error: 'Failed to save tool. Please try again.' },
      { status: 500 }
    )
  }
}

// Helper functions for type-specific data extraction

function getCategoryId(toolType: ToolType, body: SaveToolRequest): string {
  switch (toolType) {
    case 'skill':
      return (body as unknown as GeneratedSkill).category || 'writing'
    case 'command':
      return (body as unknown as GeneratedCommand).category || 'quality'
    case 'agent':
      return (body as unknown as GeneratedAgent).category || 'automation'
    case 'mcp':
      return (body as unknown as GeneratedMCP).category || 'integration'
    default:
      return 'writing'
  }
}

function getComplexity(toolType: ToolType, body: SaveToolRequest): string {
  switch (toolType) {
    case 'skill':
      return (body as unknown as GeneratedSkill).complexity || 'simple'
    case 'command':
      return 'simple' // Commands don't have complexity
    case 'agent':
      return (body as unknown as GeneratedAgent).complexity || 'complex'
    case 'mcp':
      return 'complex' // MCPs are inherently complex
    default:
      return 'simple'
  }
}

function getTriggers(toolType: ToolType, body: SaveToolRequest): string[] {
  switch (toolType) {
    case 'skill':
      return (body as unknown as GeneratedSkill).triggers || []
    case 'command':
      // Use the command itself as a trigger
      const cmd = (body as unknown as GeneratedCommand).command
      return cmd ? [cmd.slice(0, 100)] : []
    case 'agent':
      return (body as unknown as GeneratedAgent).triggers || []
    case 'mcp':
      return [] // MCPs don't have triggers
    default:
      return []
  }
}

function buildTypeMetadata(toolType: ToolType, body: SaveToolRequest): Record<string, unknown> {
  switch (toolType) {
    case 'skill':
      return {
        category: (body as unknown as GeneratedSkill).category,
        complexity: (body as unknown as GeneratedSkill).complexity,
        version: (body as unknown as GeneratedSkill).version,
        license: (body as unknown as GeneratedSkill).license,
      }
    case 'command':
      const cmdBody = body as unknown as GeneratedCommand
      return {
        category: cmdBody.category,
        command: cmdBody.command,
        prerequisites: cmdBody.prerequisites,
        variants: cmdBody.variants,
        notes: cmdBody.notes,
      }
    case 'agent':
      const agentBody = body as unknown as GeneratedAgent
      return {
        category: agentBody.category,
        complexity: agentBody.complexity,
        persona: agentBody.persona,
        capabilities: agentBody.capabilities,
        tools_required: agentBody.tools_required,
        coordination: agentBody.coordination,
      }
    case 'mcp':
      const mcpBody = body as unknown as GeneratedMCP
      return {
        category: mcpBody.category,
        transport: mcpBody.transport,
        language: mcpBody.language,
        sdk_version: mcpBody.sdk_version,
        tools: mcpBody.tools,
        resources: mcpBody.resources,
        prompts: mcpBody.prompts,
        dependencies: mcpBody.dependencies,
        env_vars: mcpBody.env_vars,
      }
    default:
      return {}
  }
}

// Get user's saved tools
export async function GET(request: NextRequest) {
  try {
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
        { error: 'Please sign in to view your tools' },
        { status: 401 }
      )
    }

    // Get tool type filter from query params
    const { searchParams } = new URL(request.url)
    const toolType = searchParams.get('type') as ToolType | null

    // Build query
    let query = supabase
      .from('skills')
      .select('*')
      .eq('status', 'draft')
      .ilike('author', `%${user.email}%`)
      .order('created_at', { ascending: false })

    // Filter by tool type if specified
    if (toolType && ['skill', 'command', 'agent', 'mcp'].includes(toolType)) {
      query = query.contains('tags', [toolType])
    }

    const { data: tools, error: fetchError } = await query

    if (fetchError) {
      console.error('Fetch error:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 })
    }

    return NextResponse.json({ tools })
  } catch (error) {
    console.error('Get tools error:', error)
    return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 })
  }
}
