/**
 * Tool Factory Prompts - Central export
 */

export {
  SKILL_GENERATOR_SYSTEM_PROMPT,
  buildSkillGenerationPrompt,
} from './skill-prompt'

export {
  COMMAND_GENERATOR_SYSTEM_PROMPT,
  buildCommandGenerationPrompt,
} from './command-prompt'

export {
  AGENT_GENERATOR_SYSTEM_PROMPT,
  buildAgentGenerationPrompt,
} from './agent-prompt'

export {
  MCP_GENERATOR_SYSTEM_PROMPT,
  buildMCPGenerationPrompt,
} from './mcp-prompt'

import type { ToolType } from '../types'

import { SKILL_GENERATOR_SYSTEM_PROMPT } from './skill-prompt'
import { COMMAND_GENERATOR_SYSTEM_PROMPT } from './command-prompt'
import { AGENT_GENERATOR_SYSTEM_PROMPT } from './agent-prompt'
import { MCP_GENERATOR_SYSTEM_PROMPT } from './mcp-prompt'

/**
 * Get the system prompt for a given tool type
 */
export function getSystemPromptForToolType(toolType: ToolType): string {
  switch (toolType) {
    case 'skill':
      return SKILL_GENERATOR_SYSTEM_PROMPT
    case 'command':
      return COMMAND_GENERATOR_SYSTEM_PROMPT
    case 'agent':
      return AGENT_GENERATOR_SYSTEM_PROMPT
    case 'mcp':
      return MCP_GENERATOR_SYSTEM_PROMPT
    default:
      throw new Error(`Unknown tool type: ${toolType}`)
  }
}
