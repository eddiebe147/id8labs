import { describe, it, expect } from 'vitest'
import {
  generateInstallPrompt,
  generateQuickInstall,
  getInstallLocation,
} from '@/lib/tool-factory/install-prompts'
import type {
  GeneratedSkill,
  GeneratedCommand,
  GeneratedAgent,
  GeneratedMCP,
} from '@/lib/tool-factory/types'

// Test data factories
function createTestSkill(overrides: Partial<GeneratedSkill> = {}): GeneratedSkill {
  return {
    name: 'Test Skill',
    slug: 'test-skill',
    description: 'A test skill for validation',
    category: 'writing',
    complexity: 'simple',
    version: '1.0.0',
    author: 'Test',
    license: 'MIT',
    triggers: ['test the skill', 'run test'],
    tags: ['test'],
    content: '# Test Skill\n\nThis is test content.',
    rawContent: '---\nname: Test Skill\n---\n# Test Skill',
    ...overrides,
  }
}

function createTestCommand(overrides: Partial<GeneratedCommand> = {}): GeneratedCommand {
  return {
    name: 'Test Command',
    slug: 'test-command',
    description: 'A test command',
    category: 'git',
    command: 'git status && echo $MESSAGE',
    prerequisites: ['git', 'npm'],
    tags: ['test'],
    content: '# Test Command\n\nUsage notes here.',
    rawContent: '---\nname: Test Command\n---\n# Test',
    variants: [
      { name: 'Quick', command: 'git status', description: 'Quick status check' },
    ],
    ...overrides,
  }
}

function createTestAgent(overrides: Partial<GeneratedAgent> = {}): GeneratedAgent {
  return {
    name: 'Test Agent',
    slug: 'test-agent',
    description: 'A test agent',
    category: 'quality',
    complexity: 'simple',
    persona: 'An expert test agent',
    capabilities: ['Testing', 'Validation'],
    triggers: ['test agent', 'run test agent'],
    tools_required: ['read', 'write', 'grep'],
    coordination: {
      reports_to: 'parent-agent',
      collaborates_with: ['helper-agent'],
    },
    tags: ['test', 'agent'],
    content: '# Test Agent\n\nAgent content.',
    rawContent: '---\nname: Test Agent\n---\n# Test Agent',
    ...overrides,
  }
}

function createTestMCP(overrides: Partial<GeneratedMCP> = {}): GeneratedMCP {
  return {
    name: 'Test MCP',
    slug: 'test-mcp',
    description: 'A test MCP server',
    category: 'integration',
    transport: 'stdio',
    language: 'typescript',
    sdk_version: '>=1.10.0',
    tools: [
      { name: 'test_tool', description: 'A test tool', parameters: {} },
    ],
    resources: [
      { name: 'test/resource', description: 'A test resource' },
    ],
    dependencies: ['@modelcontextprotocol/sdk', '@octokit/rest'],
    env_vars: [
      { name: 'API_KEY', description: 'API key for service', required: true },
    ],
    tags: ['test', 'mcp'],
    content: '# Test MCP\n\nImplementation here.',
    rawContent: '---\nname: Test MCP\n---\n# Test MCP',
    ...overrides,
  }
}

describe('lib/tool-factory/install-prompts', () => {
  describe('generateInstallPrompt', () => {
    describe('Skill Install Prompt', () => {
      it('should generate valid install prompt for skill', () => {
        const skill = createTestSkill()
        const result = generateInstallPrompt({
          toolType: 'skill',
          data: skill,
          generatedDate: '2025-01-08',
        })

        expect(result).toContain('## Installing: Test Skill')
        expect(result).toContain('~/.claude/skills/test-skill.md')
        expect(result).toContain('test the skill')
        expect(result).toContain('2025-01-08')
      })

      it('should include pre-installation verification', () => {
        const skill = createTestSkill()
        const result = generateInstallPrompt({ toolType: 'skill', data: skill })

        expect(result).toContain('Pre-Installation Verification')
        expect(result).toContain('mkdir -p ~/.claude/skills/')
        expect(result).toContain('Verify no existing skill conflicts')
      })

      it('should include post-installation verification', () => {
        const skill = createTestSkill()
        const result = generateInstallPrompt({ toolType: 'skill', data: skill })

        expect(result).toContain('Post-Installation Verification')
        expect(result).toContain('Confirm file was created')
        expect(result).toContain('Test the skill')
      })

      it('should include uninstall instructions', () => {
        const skill = createTestSkill()
        const result = generateInstallPrompt({ toolType: 'skill', data: skill })

        expect(result).toContain('Uninstall')
        expect(result).toContain('rm ~/.claude/skills/test-skill.md')
      })

      it('should use rawContent when available', () => {
        const skill = createTestSkill({ rawContent: '---\ncustom: frontmatter\n---' })
        const result = generateInstallPrompt({ toolType: 'skill', data: skill })

        expect(result).toContain('custom: frontmatter')
      })

      it('should fallback to content when rawContent is missing', () => {
        const skill = createTestSkill({ rawContent: undefined })
        const result = generateInstallPrompt({ toolType: 'skill', data: skill })

        expect(result).toContain('# Test Skill')
        expect(result).toContain('This is test content')
      })

      it('should handle skill without triggers', () => {
        const skill = createTestSkill({ triggers: [] })
        const result = generateInstallPrompt({ toolType: 'skill', data: skill })

        // Should use name as fallback trigger example
        expect(result).toContain('test skill')
      })
    })

    describe('Command Install Prompt', () => {
      it('should generate valid install prompt for command', () => {
        const command = createTestCommand()
        const result = generateInstallPrompt({
          toolType: 'command',
          data: command,
          generatedDate: '2025-01-08',
        })

        expect(result).toContain('## Installing: Test Command')
        expect(result).toContain('git status && echo $MESSAGE')
        expect(result).toContain('2025-01-08')
      })

      it('should include prerequisites check', () => {
        const command = createTestCommand()
        const result = generateInstallPrompt({ toolType: 'command', data: command })

        expect(result).toContain('Prerequisites Check')
        expect(result).toContain('which git')
        expect(result).toContain('which npm')
      })

      it('should include multiple installation options', () => {
        const command = createTestCommand()
        const result = generateInstallPrompt({ toolType: 'command', data: command })

        expect(result).toContain('Option 1: Shell Alias')
        expect(result).toContain('Option 2: Shell Function')
        expect(result).toContain('Option 3: Standalone Script')
      })

      it('should convert slug to underscore for alias', () => {
        const command = createTestCommand()
        const result = generateInstallPrompt({ toolType: 'command', data: command })

        expect(result).toContain('alias test_command=')
      })

      it('should include variants when defined', () => {
        const command = createTestCommand()
        const result = generateInstallPrompt({ toolType: 'command', data: command })

        expect(result).toContain('Variants')
        expect(result).toContain('Quick')
        expect(result).toContain('git status')
        expect(result).toContain('Quick status check')
      })

      it('should handle command without prerequisites', () => {
        const command = createTestCommand({ prerequisites: [] })
        const result = generateInstallPrompt({ toolType: 'command', data: command })

        expect(result).toContain('No specific prerequisites listed')
      })

      it('should handle command without variants', () => {
        const command = createTestCommand({ variants: undefined })
        const result = generateInstallPrompt({ toolType: 'command', data: command })

        expect(result).toContain('No variants defined')
      })
    })

    describe('Agent Install Prompt', () => {
      it('should generate valid install prompt for agent', () => {
        const agent = createTestAgent()
        const result = generateInstallPrompt({
          toolType: 'agent',
          data: agent,
          generatedDate: '2025-01-08',
        })

        expect(result).toContain('## Installing: Test Agent')
        expect(result).toContain('~/.claude/agents/test-agent.md')
        expect(result).toContain('2025-01-08')
      })

      it('should include environment verification', () => {
        const agent = createTestAgent()
        const result = generateInstallPrompt({ toolType: 'agent', data: agent })

        expect(result).toContain('Environment Verification')
        expect(result).toContain('mkdir -p ~/.claude/agents/')
      })

      it('should include required tools', () => {
        const agent = createTestAgent()
        const result = generateInstallPrompt({ toolType: 'agent', data: agent })

        expect(result).toContain('read, write, grep')
      })

      it('should include coordination info', () => {
        const agent = createTestAgent()
        const result = generateInstallPrompt({ toolType: 'agent', data: agent })

        expect(result).toContain('reports to: `parent-agent`')
        expect(result).toContain('helper-agent')
      })

      it('should include activation triggers', () => {
        const agent = createTestAgent()
        const result = generateInstallPrompt({ toolType: 'agent', data: agent })

        expect(result).toContain('Activation')
        expect(result).toContain('test agent')
        expect(result).toContain('run test agent')
      })

      it('should include capabilities', () => {
        const agent = createTestAgent()
        const result = generateInstallPrompt({ toolType: 'agent', data: agent })

        expect(result).toContain('Agent Capabilities')
        expect(result).toContain('Testing')
        expect(result).toContain('Validation')
      })

      it('should include persona', () => {
        const agent = createTestAgent()
        const result = generateInstallPrompt({ toolType: 'agent', data: agent })

        expect(result).toContain('Persona')
        expect(result).toContain('expert test agent')
      })

      it('should handle agent without coordination', () => {
        const agent = createTestAgent({ coordination: undefined })
        const result = generateInstallPrompt({ toolType: 'agent', data: agent })

        expect(result).toContain('standalone')
      })
    })

    describe('MCP Install Prompt', () => {
      it('should generate valid install prompt for MCP', () => {
        const mcp = createTestMCP()
        const result = generateInstallPrompt({
          toolType: 'mcp',
          data: mcp,
          generatedDate: '2025-01-08',
        })

        expect(result).toContain('## Installing: Test MCP')
        expect(result).toContain('~/.claude/mcps/test-mcp')
        expect(result).toContain('2025-01-08')
      })

      it('should include TypeScript prerequisites', () => {
        const mcp = createTestMCP({ language: 'typescript' })
        const result = generateInstallPrompt({ toolType: 'mcp', data: mcp })

        expect(result).toContain('Node.js 18+')
        expect(result).toContain('npm install -g @modelcontextprotocol/sdk')
      })

      it('should include Python prerequisites', () => {
        const mcp = createTestMCP({ language: 'python' })
        const result = generateInstallPrompt({ toolType: 'mcp', data: mcp })

        expect(result).toContain('Python 3.9+')
        expect(result).toContain('pip install mcp')
      })

      it('should include installation steps', () => {
        const mcp = createTestMCP()
        const result = generateInstallPrompt({ toolType: 'mcp', data: mcp })

        expect(result).toContain('Step 1: Create Server Directory')
        expect(result).toContain('Step 2: Initialize Project')
        expect(result).toContain('Step 3: Create Server File')
        expect(result).toContain('Step 4: Configure Claude Desktop')
      })

      it('should include dependencies', () => {
        const mcp = createTestMCP()
        const result = generateInstallPrompt({ toolType: 'mcp', data: mcp })

        expect(result).toContain('@modelcontextprotocol/sdk')
        expect(result).toContain('@octokit/rest')
      })

      it('should include environment variables', () => {
        const mcp = createTestMCP()
        const result = generateInstallPrompt({ toolType: 'mcp', data: mcp })

        expect(result).toContain('Environment Variables')
        expect(result).toContain('API_KEY')
        expect(result).toContain('API key for service')
        expect(result).toContain('required')
      })

      it('should include tools reference', () => {
        const mcp = createTestMCP()
        const result = generateInstallPrompt({ toolType: 'mcp', data: mcp })

        expect(result).toContain('Available Tools')
        expect(result).toContain('test_tool')
        expect(result).toContain('A test tool')
      })

      it('should include resources reference', () => {
        const mcp = createTestMCP()
        const result = generateInstallPrompt({ toolType: 'mcp', data: mcp })

        expect(result).toContain('Available Resources')
        expect(result).toContain('test/resource')
      })

      it('should include security considerations', () => {
        const mcp = createTestMCP()
        const result = generateInstallPrompt({ toolType: 'mcp', data: mcp })

        expect(result).toContain('Security Considerations')
        expect(result).toContain('MCP Security Checklist')
      })

      it('should include claude_desktop_config.json example', () => {
        const mcp = createTestMCP()
        const result = generateInstallPrompt({ toolType: 'mcp', data: mcp })

        expect(result).toContain('claude_desktop_config.json')
        expect(result).toContain('"mcpServers"')
        expect(result).toContain('"test-mcp"')
      })

      it('should handle MCP without env vars', () => {
        const mcp = createTestMCP({ env_vars: [] })
        const result = generateInstallPrompt({ toolType: 'mcp', data: mcp })

        expect(result).toContain('No environment variables required')
      })
    })

    describe('Error Handling', () => {
      it('should throw for unknown tool type', () => {
        expect(() => {
          generateInstallPrompt({
            toolType: 'invalid' as any,
            data: createTestSkill(),
          })
        }).toThrow('Unknown tool type')
      })
    })

    describe('Date Handling', () => {
      it('should use provided date', () => {
        const skill = createTestSkill()
        const result = generateInstallPrompt({
          toolType: 'skill',
          data: skill,
          generatedDate: '2024-12-25',
        })

        expect(result).toContain('2024-12-25')
      })

      it('should use current date when not provided', () => {
        const skill = createTestSkill()
        const result = generateInstallPrompt({
          toolType: 'skill',
          data: skill,
        })

        // Should contain a date in ISO format
        expect(result).toMatch(/\d{4}-\d{2}-\d{2}/)
      })
    })
  })

  describe('generateQuickInstall', () => {
    it('should generate quick install for skill', () => {
      const skill = createTestSkill()
      const result = generateQuickInstall({ toolType: 'skill', data: skill })

      expect(result).toContain('Quick Install: Test Skill')
      expect(result).toContain('mkdir -p ~/.claude/skills')
      expect(result).toContain('test-skill.md')
      expect(result).toContain('EOF')
    })

    it('should generate quick install for command', () => {
      const command = createTestCommand()
      const result = generateQuickInstall({ toolType: 'command', data: command })

      expect(result).toContain('Quick Install: Test Command')
      expect(result).toContain('alias test_command=')
      expect(result).toContain('source ~/.zshrc')
    })

    it('should generate quick install for agent', () => {
      const agent = createTestAgent()
      const result = generateQuickInstall({ toolType: 'agent', data: agent })

      expect(result).toContain('Quick Install: Test Agent')
      expect(result).toContain('mkdir -p ~/.claude/agents')
      expect(result).toContain('test-agent.md')
    })

    it('should generate quick install for MCP', () => {
      const mcp = createTestMCP()
      const result = generateQuickInstall({ toolType: 'mcp', data: mcp })

      expect(result).toContain('Quick Install: Test MCP')
      expect(result).toContain('mkdir -p ~/.claude/mcps/test-mcp')
      expect(result).toContain('npm init -y')
    })

    it('should handle unknown tool type gracefully', () => {
      const result = generateQuickInstall({
        toolType: 'invalid' as any,
        data: createTestSkill(),
      })

      expect(result).toContain('Unknown tool type')
    })
  })

  describe('getInstallLocation', () => {
    it('should return correct location for skill', () => {
      expect(getInstallLocation('skill', 'my-skill')).toBe('~/.claude/skills/my-skill.md')
    })

    it('should return correct location for command', () => {
      expect(getInstallLocation('command', 'my-command')).toBe(
        '~/.zshrc or ~/.bashrc (as alias)'
      )
    })

    it('should return correct location for agent', () => {
      expect(getInstallLocation('agent', 'my-agent')).toBe('~/.claude/agents/my-agent.md')
    })

    it('should return correct location for MCP', () => {
      expect(getInstallLocation('mcp', 'my-mcp')).toBe('~/.claude/mcps/my-mcp/')
    })

    it('should return unknown for invalid tool type', () => {
      expect(getInstallLocation('invalid' as any, 'test')).toBe('Unknown location')
    })
  })
})
