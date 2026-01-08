import { describe, it, expect } from 'vitest'
import {
  verifyTool,
  quickValidate,
  generateAutoFixes,
} from '@/lib/tool-factory/verification'
import type {
  GeneratedSkill,
  GeneratedCommand,
  GeneratedAgent,
  GeneratedMCP,
} from '@/lib/tool-factory/types'

// ============================================
// Test Data Factories
// ============================================

function createValidSkill(overrides: Partial<GeneratedSkill> = {}): GeneratedSkill {
  // Content needs to be 300+ chars, have unique lines, and no placeholders
  const content = `# Professional Email Writer

## Overview
This skill helps you craft professional, well-structured emails for any business context. Whether you're reaching out to clients, colleagues, or executives, this tool ensures your communication is clear, polite, and effective.

## Core Capabilities
The email writer can handle various communication scenarios including initial outreach, follow-ups, meeting requests, status updates, and formal announcements. It adapts tone based on the recipient relationship and context provided.

## Workflow
When invoked, the skill will prompt you for the recipient type, purpose, and key points to include. It then generates a draft with appropriate salutation, body structure, and closing. You can iterate on the draft by providing feedback.

## Best Practices for Email Communication
Effective business emails should be concise yet complete. Lead with your main point, provide context in the middle, and end with a clear call to action. Always proofread before sending and consider your recipient's perspective when choosing your tone.

## Supported Scenarios
Client communications require a balance of professionalism and warmth. Internal team messages can be more casual but should remain clear. Executive summaries demand brevity and precision, focusing on outcomes and decisions needed.`

  return {
    name: 'Professional Email Writer',
    slug: 'professional-email-writer',
    description: 'Craft professional business emails with appropriate tone and structure',
    category: 'writing',
    complexity: 'simple',
    version: '1.0.0',
    author: 'AI Generated',
    license: 'MIT',
    triggers: ['write a professional email', 'help me draft an email'],
    tags: ['email', 'writing', 'business', 'communication'],
    content,
    rawContent: content,
    ...overrides,
  }
}

function createValidCommand(overrides: Partial<GeneratedCommand> = {}): GeneratedCommand {
  const content = `# Git Smart Commit

## Purpose
This command automates the process of creating well-formatted git commits by running tests before committing changes. It ensures code quality by preventing commits that would break the test suite.

## How It Works
The command first executes your project's test suite. If all tests pass, it stages any modified files and creates a commit with your provided message. Failed tests will abort the commit process, preventing broken code from entering your repository history.

## Required Environment
You need Git installed and initialized in your project directory. Node.js and npm are required for running the test suite. Ensure your package.json has a properly configured test script that returns exit code 0 on success.

## Command Arguments
The MESSAGE variable should contain your commit description. Keep it concise but descriptive. Good commit messages explain what changed and why, not just what files were modified.

## Workflow Integration
This command integrates seamlessly with continuous integration pipelines. By enforcing tests before commits, you reduce the likelihood of failed CI builds and maintain a cleaner commit history.`

  return {
    name: 'Git Smart Commit',
    slug: 'git-smart-commit',
    description: 'Run tests before committing to ensure code quality',
    category: 'git',
    command: 'npm test && git add . && git commit -m "$MESSAGE"',
    prerequisites: ['git', 'npm', 'node'],
    tags: ['git', 'testing', 'quality'],
    variants: [],
    content,
    rawContent: content,
    ...overrides,
  }
}

function createValidAgent(overrides: Partial<GeneratedAgent> = {}): GeneratedAgent {
  const content = `# Code Review Agent

## Role Definition
I serve as your dedicated code review partner, bringing fifteen years of software engineering experience across multiple languages and frameworks. My expertise spans clean code principles, security best practices, and performance optimization techniques.

## Behavior Guidelines
When reviewing code, I prioritize understanding the business context before diving into technical details. I provide constructive feedback that balances immediate concerns with long-term maintainability. My reviews focus on correctness, clarity, and consistency with established patterns.

## Collaboration Approach
I work best when given context about the change's purpose and any constraints. I adapt my review depth based on the complexity and risk level of the changes. For critical systems, I perform more thorough security and edge case analysis.

## Review Process
Upon receiving code for review, I first scan for structural issues and obvious bugs. Then I examine logic flow, error handling, and boundary conditions. Finally, I assess readability, naming conventions, and documentation quality. Throughout this process, I reference the project's existing patterns.

## Communication Style
My feedback is specific and actionable, always including the reasoning behind suggestions. I distinguish between blocking issues that must be fixed and optional improvements. When suggesting changes, I provide example code when helpful.`

  return {
    name: 'Code Review Agent',
    slug: 'code-review-agent',
    description: 'Expert code reviewer focused on quality and best practices',
    category: 'quality',
    complexity: 'simple',
    persona: 'I am a senior engineer with deep expertise in code quality and review processes',
    capabilities: ['Review code changes', 'Identify potential bugs', 'Suggest improvements'],
    triggers: ['review this code', 'check my pull request'],
    tools_required: ['read', 'grep', 'glob'],
    coordination: {
      reports_to: null,
      collaborates_with: [],
    },
    tags: ['agent', 'review', 'quality'],
    content,
    rawContent: content,
    ...overrides,
  }
}

function createValidMCP(overrides: Partial<GeneratedMCP> = {}): GeneratedMCP {
  const content = `# GitHub Issues MCP Server

## Overview
This Model Context Protocol server enables Claude to interact with GitHub Issues directly. It provides read and write access to issues in your repositories, allowing for comprehensive issue management within conversations.

## Installation Requirements
The server requires Node.js version 18 or higher. You will also need a GitHub personal access token with appropriate repository permissions. Store this token securely in your environment variables.

## Configuration Steps
After installing dependencies with npm, you need to configure the MCP server in your Claude Desktop configuration file. Set the GITHUB_TOKEN environment variable to authenticate API requests.

## Available Tools
The list_issues tool fetches issues from a specified repository with filtering by state, labels, and assignee. The create_issue tool generates new issues with title, body, labels, and optional assignee. Both tools require the repository owner and name parameters.

## Security Considerations
Your GitHub token grants access to repositories. Use tokens with minimal necessary permissions. The server validates all inputs before making API calls and sanitizes outputs. Review the token scopes regularly and rotate credentials periodically.

## Error Handling
When API calls fail, the server returns detailed error messages including HTTP status codes and GitHub API error descriptions. Rate limiting information is included in responses approaching the API limit.`

  return {
    name: 'GitHub Issues MCP',
    slug: 'github-issues-mcp',
    description: 'Read and create GitHub issues from Claude',
    category: 'integration',
    transport: 'stdio',
    language: 'typescript',
    sdk_version: '>=1.10.0',
    tools: [
      {
        name: 'list_issues',
        description: 'List issues in a repository',
        parameters: { repo: 'string', state: 'string' },
      },
    ],
    resources: [],
    prompts: [],
    dependencies: ['@modelcontextprotocol/sdk', '@octokit/rest'],
    env_vars: [],
    tags: ['mcp', 'github', 'issues'],
    content,
    rawContent: content,
    ...overrides,
  }
}

// ============================================
// verifyTool Tests
// ============================================

describe('Tool Factory Verification', () => {
  describe('verifyTool', () => {
    describe('Skills', () => {
      it('should pass verification for a valid skill', () => {
        const skill = createValidSkill()
        const result = verifyTool('skill', skill)

        expect(result.passed).toBe(true)
        expect(result.score).toBeGreaterThanOrEqual(80)
        expect(result.checks.format.passed).toBe(true)
        expect(result.checks.quality.passed).toBe(true)
        expect(result.checks.typeSpecific.passed).toBe(true)
      })

      it('should fail format validation for missing name', () => {
        const skill = createValidSkill({ name: '' })
        const result = verifyTool('skill', skill)

        expect(result.checks.format.passed).toBe(false)
        expect(result.checks.format.issues).toContain(
          'Name is required and must be at least 2 characters'
        )
      })

      it('should fail format validation for invalid slug', () => {
        const skill = createValidSkill({ slug: 'Invalid Slug With Spaces' })
        const result = verifyTool('skill', skill)

        expect(result.checks.format.passed).toBe(false)
        expect(result.checks.format.issues).toContain(
          'Slug must be kebab-case (e.g., my-tool-name)'
        )
      })

      it('should fail format validation for slug too short', () => {
        const skill = createValidSkill({ slug: 'ab' })
        const result = verifyTool('skill', skill)

        expect(result.checks.format.passed).toBe(false)
        expect(result.checks.format.issues).toContain(
          'Slug must be between 3 and 50 characters'
        )
      })

      it('should fail format validation for missing description', () => {
        const skill = createValidSkill({ description: 'short' })
        const result = verifyTool('skill', skill)

        expect(result.checks.format.passed).toBe(false)
        expect(result.checks.format.issues).toContain(
          'Description must be at least 10 characters'
        )
      })

      it('should fail format validation for missing tags', () => {
        const skill = createValidSkill({ tags: [] })
        const result = verifyTool('skill', skill)

        expect(result.checks.format.passed).toBe(false)
        expect(result.checks.format.issues).toContain(
          'At least one tag is required'
        )
      })

      it('should fail format validation for short content', () => {
        const skill = createValidSkill({ content: 'Too short' })
        const result = verifyTool('skill', skill)

        expect(result.checks.format.passed).toBe(false)
        expect(result.checks.format.issues).toContain(
          'Content must be at least 100 characters'
        )
      })

      it('should fail type-specific validation for insufficient triggers', () => {
        const skill = createValidSkill({ triggers: ['single trigger'] })
        const result = verifyTool('skill', skill)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'Skills should have at least 2 trigger phrases'
        )
      })

      it('should fail type-specific validation for short triggers', () => {
        const skill = createValidSkill({ triggers: ['ab', 'cd'] })
        const result = verifyTool('skill', skill)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'Trigger phrases should be natural language (at least 5 characters)'
        )
      })

      it('should fail type-specific validation for invalid complexity', () => {
        const skill = createValidSkill({ complexity: 'invalid' as any })
        const result = verifyTool('skill', skill)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'Invalid complexity: invalid'
        )
      })

      it('should fail type-specific validation for invalid category', () => {
        const skill = createValidSkill({ category: 'invalid' as any })
        const result = verifyTool('skill', skill)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'Invalid category: invalid'
        )
      })
    })

    describe('Commands', () => {
      it('should pass verification for a valid command', () => {
        const command = createValidCommand()
        const result = verifyTool('command', command)

        expect(result.passed).toBe(true)
        expect(result.score).toBeGreaterThanOrEqual(80)
      })

      it('should fail for missing command string', () => {
        const command = createValidCommand({ command: '' })
        const result = verifyTool('command', command)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'Command must be specified and at least 5 characters'
        )
      })

      it('should fail for unbalanced quotes in command', () => {
        const command = createValidCommand({ command: "echo 'unbalanced" })
        const result = verifyTool('command', command)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'Command has unbalanced single quotes'
        )
      })

      it('should fail for missing prerequisites', () => {
        const command = createValidCommand({ prerequisites: [] })
        const result = verifyTool('command', command)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'Prerequisites should be listed (e.g., git, npm, docker)'
        )
      })

      it('should fail for invalid command category', () => {
        const command = createValidCommand({ category: 'invalid' as any })
        const result = verifyTool('command', command)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'Invalid category: invalid'
        )
      })
    })

    describe('Agents', () => {
      it('should pass verification for a valid agent', () => {
        const agent = createValidAgent()
        const result = verifyTool('agent', agent)

        expect(result.passed).toBe(true)
        expect(result.score).toBeGreaterThanOrEqual(80)
      })

      it('should fail for missing persona', () => {
        const agent = createValidAgent({ persona: 'short' })
        const result = verifyTool('agent', agent)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'Agent persona should be detailed (at least 20 characters)'
        )
      })

      it('should fail for insufficient capabilities', () => {
        const agent = createValidAgent({ capabilities: ['one'] })
        const result = verifyTool('agent', agent)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'Agents should have at least 2 capabilities'
        )
      })

      it('should fail for missing triggers', () => {
        const agent = createValidAgent({ triggers: ['one'] })
        const result = verifyTool('agent', agent)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'Agents should have at least 2 trigger phrases'
        )
      })

      it('should fail for missing tools_required', () => {
        const agent = createValidAgent({ tools_required: [] })
        const result = verifyTool('agent', agent)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'Agent should specify required tools (read, write, grep, etc.)'
        )
      })

      it('should fail for missing coordination', () => {
        const agent = createValidAgent({ coordination: undefined as any })
        const result = verifyTool('agent', agent)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'Agent should specify coordination (reports_to, collaborates_with)'
        )
      })
    })

    describe('MCP Servers', () => {
      it('should pass verification for a valid MCP server', () => {
        const mcp = createValidMCP()
        const result = verifyTool('mcp', mcp)

        expect(result.passed).toBe(true)
        expect(result.score).toBeGreaterThanOrEqual(80)
      })

      it('should fail for invalid transport', () => {
        const mcp = createValidMCP({ transport: 'invalid' as any })
        const result = verifyTool('mcp', mcp)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'MCP transport must be stdio or http'
        )
      })

      it('should fail for invalid language', () => {
        const mcp = createValidMCP({ language: 'rust' as any })
        const result = verifyTool('mcp', mcp)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'MCP language must be typescript or python'
        )
      })

      it('should fail for missing SDK version', () => {
        const mcp = createValidMCP({ sdk_version: '' })
        const result = verifyTool('mcp', mcp)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'SDK version should be specified'
        )
      })

      it('should fail for missing tools', () => {
        const mcp = createValidMCP({ tools: [] })
        const result = verifyTool('mcp', mcp)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'MCP server must define at least one tool'
        )
      })

      it('should fail for tool missing name or description', () => {
        const mcp = createValidMCP({
          tools: [{ name: '', description: 'missing name', parameters: {} }],
        })
        const result = verifyTool('mcp', mcp)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues.some(i =>
          i.includes('missing name or description')
        )).toBe(true)
      })

      it('should fail for missing modelcontextprotocol dependency', () => {
        const mcp = createValidMCP({ dependencies: ['some-other-package'] })
        const result = verifyTool('mcp', mcp)

        expect(result.checks.typeSpecific.passed).toBe(false)
        expect(result.checks.typeSpecific.issues).toContain(
          'Dependencies should include @modelcontextprotocol/sdk'
        )
      })
    })

    describe('Quality Checks', () => {
      it('should fail quality for placeholder text [your]', () => {
        const skill = createValidSkill({
          content: `# Test Skill\n\n[Your description here]\n\nThis is content with a placeholder.`.padEnd(300, ' content'),
          rawContent: `# Test Skill\n\n[Your description here]\n\nThis is content with a placeholder.`.padEnd(300, ' content'),
        })
        const result = verifyTool('skill', skill)

        expect(result.checks.quality.passed).toBe(false)
        expect(result.checks.quality.issues.some(i =>
          i.includes('placeholder text')
        )).toBe(true)
      })

      it('should fail quality for placeholder text [TODO]', () => {
        const skill = createValidSkill({
          content: `# Test Skill\n\n[TODO] Add more details here.\n\nThis is content.`.padEnd(300, ' content'),
          rawContent: `# Test Skill\n\n[TODO] Add more details here.\n\nThis is content.`.padEnd(300, ' content'),
        })
        const result = verifyTool('skill', skill)

        expect(result.checks.quality.passed).toBe(false)
        expect(result.checks.quality.issues.some(i =>
          i.includes('placeholder text')
        )).toBe(true)
      })

      it('should fail quality for lorem ipsum', () => {
        const skill = createValidSkill({
          content: `# Test Skill\n\nLorem ipsum dolor sit amet.\n\nThis is content.`.padEnd(300, ' content'),
          rawContent: `# Test Skill\n\nLorem ipsum dolor sit amet.\n\nThis is content.`.padEnd(300, ' content'),
        })
        const result = verifyTool('skill', skill)

        expect(result.checks.quality.passed).toBe(false)
        expect(result.checks.quality.issues.some(i =>
          i.includes('placeholder text')
        )).toBe(true)
      })

      it('should fail quality for description ending with ...', () => {
        const skill = createValidSkill({
          description: 'This description is incomplete...',
        })
        const result = verifyTool('skill', skill)

        expect(result.checks.quality.passed).toBe(false)
        expect(result.checks.quality.issues).toContain(
          'Description appears incomplete (ends with ...)'
        )
      })

      it('should fail quality for description over 200 characters', () => {
        const skill = createValidSkill({
          description: 'A'.repeat(250),
        })
        const result = verifyTool('skill', skill)

        expect(result.checks.quality.passed).toBe(false)
        expect(result.checks.quality.issues).toContain(
          'Description should be under 200 characters for readability'
        )
      })

      it('should fail quality for content under 300 characters', () => {
        const skill = createValidSkill({
          content: 'x'.repeat(150),
          rawContent: 'x'.repeat(150),
        })
        const result = verifyTool('skill', skill)

        expect(result.checks.quality.passed).toBe(false)
        expect(result.checks.quality.issues).toContain(
          'Content seems too short. Consider adding more detail.'
        )
      })
    })

    describe('Score Calculation', () => {
      it('should return high score for well-formed tool', () => {
        const skill = createValidSkill()
        const result = verifyTool('skill', skill)

        // Score should be 90+ for a valid tool (100 minus AI review suggestions)
        expect(result.score).toBeGreaterThanOrEqual(90)
      })

      it('should reduce score for each issue', () => {
        const skill = createValidSkill({ triggers: ['single'] })
        const result = verifyTool('skill', skill)

        expect(result.score).toBeLessThan(100)
      })

      it('should never return negative score', () => {
        const skill = createValidSkill({
          name: '',
          slug: 'x',
          description: 'x',
          tags: [],
          triggers: [],
          content: 'x',
        })
        const result = verifyTool('skill', skill)

        expect(result.score).toBeGreaterThanOrEqual(0)
      })
    })
  })

  describe('quickValidate', () => {
    it('should return valid for correct format', () => {
      const skill = createValidSkill()
      const result = quickValidate('skill', skill)

      expect(result.valid).toBe(true)
      expect(result.issues).toHaveLength(0)
    })

    it('should return invalid for format issues', () => {
      const skill = createValidSkill({ name: '' })
      const result = quickValidate('skill', skill)

      expect(result.valid).toBe(false)
      expect(result.issues.length).toBeGreaterThan(0)
    })

    it('should only check format, not quality', () => {
      // This skill has quality issues but valid format
      const skill = createValidSkill({
        description: 'A'.repeat(250), // Too long - quality issue
      })
      const result = quickValidate('skill', skill)

      // quickValidate only checks format, so this should pass
      expect(result.valid).toBe(true)
    })
  })

  describe('generateAutoFixes', () => {
    it('should fix invalid slug with spaces', () => {
      const skill = createValidSkill({ slug: 'My Invalid Slug' })
      const fixes = generateAutoFixes('skill', skill)

      const slugFix = fixes.find(f => f.field === 'slug')
      expect(slugFix).toBeDefined()
      expect(slugFix?.fixed).toBe('my-invalid-slug')
    })

    it('should fix slug with special characters', () => {
      const skill = createValidSkill({ slug: 'test@slug#here!' })
      const fixes = generateAutoFixes('skill', skill)

      const slugFix = fixes.find(f => f.field === 'slug')
      expect(slugFix).toBeDefined()
      expect(slugFix?.fixed).toBe('testslughere')
    })

    it('should truncate long description', () => {
      const longDesc = 'A'.repeat(250)
      const skill = createValidSkill({ description: longDesc })
      const fixes = generateAutoFixes('skill', skill)

      const descFix = fixes.find(f => f.field === 'description')
      expect(descFix).toBeDefined()
      expect(descFix?.fixed.length).toBeLessThanOrEqual(200)
      expect(descFix?.fixed.endsWith('...')).toBe(true)
    })

    it('should not generate fixes for valid tool', () => {
      const skill = createValidSkill()
      const fixes = generateAutoFixes('skill', skill)

      expect(fixes).toHaveLength(0)
    })

    it('should fix CamelCase slug to kebab-case', () => {
      const skill = createValidSkill({ slug: 'MyAwesomeSkill' })
      const fixes = generateAutoFixes('skill', skill)

      const slugFix = fixes.find(f => f.field === 'slug')
      expect(slugFix).toBeDefined()
      expect(slugFix?.fixed).toBe('myawesomeskill')
    })
  })
})
