/**
 * Tool Factory Verification Pipeline
 *
 * Validates generated tools through 4 phases:
 * 1. Format Validation - YAML structure, required fields
 * 2. Quality Checks - Description, content, no placeholders
 * 3. Type-Specific Validation - Tool type requirements
 * 4. AI Self-Review - Optional second pass critique
 */

import type {
  ToolType,
  GeneratedSkill,
  GeneratedCommand,
  GeneratedAgent,
  GeneratedMCP,
  VerificationResult,
  VerificationCheck,
} from './types'

// Common placeholder patterns to detect
const PLACEHOLDER_PATTERNS = [
  /\[your/i,
  /\[insert/i,
  /\[add/i,
  /\[todo\]/i,
  /\[placeholder\]/i,
  /\[example\]/i,
  /lorem ipsum/i,
  /xxx+/i,
  /\.\.\.\s*$/,
  /<your/i,
  /<insert/i,
  /FIXME/i,
]

// Kebab-case validation
const KEBAB_CASE_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/

/**
 * Validate format and structure
 */
function validateFormat(
  toolType: ToolType,
  data: GeneratedSkill | GeneratedCommand | GeneratedAgent | GeneratedMCP
): VerificationCheck {
  const issues: string[] = []

  // Required fields for all types
  if (!data.name || data.name.length < 2) {
    issues.push('Name is required and must be at least 2 characters')
  }

  if (!data.slug || !KEBAB_CASE_REGEX.test(data.slug)) {
    issues.push('Slug must be kebab-case (e.g., my-tool-name)')
  }

  if (data.slug && (data.slug.length < 3 || data.slug.length > 50)) {
    issues.push('Slug must be between 3 and 50 characters')
  }

  if (!data.description || data.description.length < 10) {
    issues.push('Description must be at least 10 characters')
  }

  if (!data.tags || data.tags.length < 1) {
    issues.push('At least one tag is required')
  }

  if (!data.content || data.content.length < 100) {
    issues.push('Content must be at least 100 characters')
  }

  return {
    passed: issues.length === 0,
    issues,
  }
}

/**
 * Validate content quality
 */
function validateQuality(
  data: GeneratedSkill | GeneratedCommand | GeneratedAgent | GeneratedMCP
): VerificationCheck {
  const issues: string[] = []
  const content = data.rawContent || data.content

  // Check for placeholder text
  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(content)) {
      issues.push(`Detected placeholder text matching: ${pattern.source}`)
      break // Only report one placeholder issue
    }
  }

  // Description quality
  if (data.description) {
    if (data.description.length > 200) {
      issues.push('Description should be under 200 characters for readability')
    }
    if (data.description.endsWith('...')) {
      issues.push('Description appears incomplete (ends with ...)')
    }
  }

  // Content comprehensiveness
  if (content.length < 300) {
    issues.push('Content seems too short. Consider adding more detail.')
  }

  // Check for repeated sections (lazy generation)
  const lines = content.split('\n')
  const lineSet = new Set(lines.filter(l => l.trim().length > 20))
  if (lines.length > 20 && lineSet.size < lines.length * 0.7) {
    issues.push('Content may have too much repetition')
  }

  return {
    passed: issues.length === 0,
    issues,
  }
}

/**
 * Type-specific validation for Skills
 */
function validateSkill(data: GeneratedSkill): VerificationCheck {
  const issues: string[] = []

  // Triggers validation
  if (!data.triggers || data.triggers.length < 2) {
    issues.push('Skills should have at least 2 trigger phrases')
  }

  // Check triggers are natural phrases
  if (data.triggers) {
    const shortTriggers = data.triggers.filter(t => t.length < 5)
    if (shortTriggers.length > 0) {
      issues.push('Trigger phrases should be natural language (at least 5 characters)')
    }
  }

  // Complexity validation
  const validComplexities = ['simple', 'complex', 'multi-agent']
  if (data.complexity && !validComplexities.includes(data.complexity)) {
    issues.push(`Invalid complexity: ${data.complexity}`)
  }

  // Category validation
  const validCategories = ['writing', 'coding', 'research', 'analysis', 'automation', 'communication', 'design', 'other']
  if (data.category && !validCategories.includes(data.category)) {
    issues.push(`Invalid category: ${data.category}`)
  }

  return {
    passed: issues.length === 0,
    issues,
  }
}

/**
 * Type-specific validation for Commands
 */
function validateCommand(data: GeneratedCommand): VerificationCheck {
  const issues: string[] = []

  // Command is required
  if (!data.command || data.command.length < 5) {
    issues.push('Command must be specified and at least 5 characters')
  }

  // Check for common shell syntax issues
  if (data.command) {
    // Unbalanced quotes
    const singleQuotes = (data.command.match(/'/g) || []).length
    const doubleQuotes = (data.command.match(/"/g) || []).length
    if (singleQuotes % 2 !== 0) {
      issues.push('Command has unbalanced single quotes')
    }
    if (doubleQuotes % 2 !== 0) {
      issues.push('Command has unbalanced double quotes')
    }

    // Check for variables
    if (!data.command.includes('$') && !data.command.includes('$(')) {
      // Not an issue, but if there are VARIABLE placeholders mentioned in docs
      if (data.content && data.content.includes('VARIABLE')) {
        issues.push('Command mentions variables but none are used')
      }
    }
  }

  // Prerequisites should be listed
  if (!data.prerequisites || data.prerequisites.length === 0) {
    issues.push('Prerequisites should be listed (e.g., git, npm, docker)')
  }

  // Category validation
  const validCategories = ['git', 'testing', 'deployment', 'setup', 'quality']
  if (data.category && !validCategories.includes(data.category)) {
    issues.push(`Invalid category: ${data.category}`)
  }

  return {
    passed: issues.length === 0,
    issues,
  }
}

/**
 * Type-specific validation for Agents
 */
function validateAgent(data: GeneratedAgent): VerificationCheck {
  const issues: string[] = []

  // Persona is required
  if (!data.persona || data.persona.length < 20) {
    issues.push('Agent persona should be detailed (at least 20 characters)')
  }

  // Capabilities should be specific
  if (!data.capabilities || data.capabilities.length < 2) {
    issues.push('Agents should have at least 2 capabilities')
  }

  // Triggers validation
  if (!data.triggers || data.triggers.length < 2) {
    issues.push('Agents should have at least 2 trigger phrases')
  }

  // Tools required
  if (!data.tools_required || data.tools_required.length === 0) {
    issues.push('Agent should specify required tools (read, write, grep, etc.)')
  }

  // Coordination object
  if (!data.coordination) {
    issues.push('Agent should specify coordination (reports_to, collaborates_with)')
  }

  // Category validation
  const validCategories = ['orchestration', 'quality', 'research', 'automation', 'domain']
  if (data.category && !validCategories.includes(data.category)) {
    issues.push(`Invalid category: ${data.category}`)
  }

  return {
    passed: issues.length === 0,
    issues,
  }
}

/**
 * Type-specific validation for MCP Servers
 */
function validateMCP(data: GeneratedMCP): VerificationCheck {
  const issues: string[] = []

  // Transport validation
  const validTransports = ['stdio', 'http']
  if (!data.transport || !validTransports.includes(data.transport)) {
    issues.push('MCP transport must be stdio or http')
  }

  // Language validation
  const validLanguages = ['typescript', 'python']
  if (!data.language || !validLanguages.includes(data.language)) {
    issues.push('MCP language must be typescript or python')
  }

  // SDK version
  if (!data.sdk_version) {
    issues.push('SDK version should be specified')
  }

  // Must have at least one tool
  if (!data.tools || data.tools.length === 0) {
    issues.push('MCP server must define at least one tool')
  }

  // Validate tool definitions
  if (data.tools) {
    for (const tool of data.tools) {
      if (!tool.name || !tool.description) {
        issues.push(`Tool missing name or description: ${tool.name || 'unnamed'}`)
      }
    }
  }

  // Dependencies should include SDK
  if (!data.dependencies || !data.dependencies.some(d => d.includes('modelcontextprotocol'))) {
    issues.push('Dependencies should include @modelcontextprotocol/sdk')
  }

  // Category validation
  const validCategories = ['integration', 'data', 'automation', 'ai', 'infrastructure']
  if (data.category && !validCategories.includes(data.category)) {
    issues.push(`Invalid category: ${data.category}`)
  }

  return {
    passed: issues.length === 0,
    issues,
  }
}

/**
 * Run type-specific validation
 */
function validateTypeSpecific(
  toolType: ToolType,
  data: GeneratedSkill | GeneratedCommand | GeneratedAgent | GeneratedMCP
): VerificationCheck {
  switch (toolType) {
    case 'skill':
      return validateSkill(data as GeneratedSkill)
    case 'command':
      return validateCommand(data as GeneratedCommand)
    case 'agent':
      return validateAgent(data as GeneratedAgent)
    case 'mcp':
      return validateMCP(data as GeneratedMCP)
    default:
      return { passed: false, issues: [`Unknown tool type: ${toolType}`] }
  }
}

/**
 * Calculate verification score (0-100)
 */
function calculateScore(checks: VerificationResult['checks']): number {
  const weights = {
    format: 30,
    quality: 25,
    typeSpecific: 35,
    aiReview: 10,
  }

  let score = 0

  if (checks.format.passed) score += weights.format
  else score += Math.max(0, weights.format - checks.format.issues.length * 5)

  if (checks.quality.passed) score += weights.quality
  else score += Math.max(0, weights.quality - checks.quality.issues.length * 5)

  if (checks.typeSpecific.passed) score += weights.typeSpecific
  else score += Math.max(0, weights.typeSpecific - checks.typeSpecific.issues.length * 5)

  // AI review always passes but can add up to 10 points based on suggestions
  score += weights.aiReview

  return Math.min(100, Math.max(0, Math.round(score)))
}

/**
 * Main verification function
 */
export function verifyTool(
  toolType: ToolType,
  data: GeneratedSkill | GeneratedCommand | GeneratedAgent | GeneratedMCP
): VerificationResult {
  // Run all verification checks
  const formatCheck = validateFormat(toolType, data)
  const qualityCheck = validateQuality(data)
  const typeSpecificCheck = validateTypeSpecific(toolType, data)

  // AI review is a placeholder - in full implementation, this would call Claude
  const aiReview = {
    suggestions: [],
    improvements: [],
  }

  const checks = {
    format: formatCheck,
    quality: qualityCheck,
    typeSpecific: typeSpecificCheck,
    aiReview,
  }

  const score = calculateScore(checks)
  const passed = formatCheck.passed && qualityCheck.passed && typeSpecificCheck.passed

  return {
    passed,
    score,
    checks,
  }
}

/**
 * Quick validation for preview (format only)
 */
export function quickValidate(
  toolType: ToolType,
  data: GeneratedSkill | GeneratedCommand | GeneratedAgent | GeneratedMCP
): { valid: boolean; issues: string[] } {
  const formatCheck = validateFormat(toolType, data)
  return {
    valid: formatCheck.passed,
    issues: formatCheck.issues,
  }
}

/**
 * Generate auto-fix suggestions
 */
export function generateAutoFixes(
  toolType: ToolType,
  data: GeneratedSkill | GeneratedCommand | GeneratedAgent | GeneratedMCP
): Array<{ field: string; original: string; fixed: string }> {
  const fixes: Array<{ field: string; original: string; fixed: string }> = []

  // Fix slug if not kebab-case
  if (data.slug && !KEBAB_CASE_REGEX.test(data.slug)) {
    const fixedSlug = data.slug
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    fixes.push({
      field: 'slug',
      original: data.slug,
      fixed: fixedSlug,
    })
  }

  // Truncate description if too long
  if (data.description && data.description.length > 200) {
    fixes.push({
      field: 'description',
      original: data.description,
      fixed: data.description.slice(0, 197) + '...',
    })
  }

  return fixes
}
