/**
 * Generate 10 essential Claude Code settings presets
 * Run with: tsx scripts/generate-settings.ts
 */

interface Setting {
  slug: string
  name: string
  description: string
  category: 'model' | 'permissions' | 'context' | 'budget' | 'behavior'
  settings: Record<string, any>
  tags: string[]
  useCase?: string
  warnings?: string[]
}

const settings: Setting[] = [
  // MODEL PRESETS (3)
  {
    slug: 'production-safe',
    name: 'Production Safe',
    description: 'Conservative settings for production work with strict safety checks and limited tool access',
    category: 'model',
    settings: {
      model: 'claude-sonnet-4.5',
      temperature: 0.3,
      max_tokens: 8192,
      tools_allowed: ['read', 'grep', 'glob', 'ls'],
      tools_restricted: ['execute', 'edit', 'create', 'delete'],
      safety_checks: true,
      require_confirmation: true,
      auto_save: false
    },
    tags: ['production', 'safe', 'conservative', 'read-only'],
    useCase: 'Use for production debugging, code review, and analysis where you want to prevent accidental changes',
    warnings: ['Execute, Edit, and Create tools are disabled', 'Requires manual confirmation for most actions']
  },
  {
    slug: 'rapid-prototyping',
    name: 'Rapid Prototyping',
    description: 'Maximum speed and flexibility for fast development and experimentation',
    category: 'model',
    settings: {
      model: 'claude-sonnet-4.5',
      temperature: 0.7,
      max_tokens: 16384,
      tools_allowed: ['all'],
      tools_restricted: [],
      safety_checks: false,
      require_confirmation: false,
      auto_save: true,
      parallel_tool_calls: true
    },
    tags: ['fast', 'prototyping', 'development', 'experimental'],
    useCase: 'Perfect for MVPs, proof-of-concepts, and rapid iteration where speed matters more than safety'
  },
  {
    slug: 'code-review-mode',
    name: 'Code Review Mode',
    description: 'Read-only analysis mode for comprehensive code review and documentation',
    category: 'model',
    settings: {
      model: 'claude-opus-4',
      temperature: 0.2,
      max_tokens: 32768,
      tools_allowed: ['read', 'grep', 'glob', 'ls', 'git'],
      tools_restricted: ['execute', 'edit', 'create', 'delete', 'patch'],
      safety_checks: true,
      require_confirmation: false,
      focus_mode: 'analysis'
    },
    tags: ['review', 'analysis', 'read-only', 'documentation'],
    useCase: 'Use for thorough code reviews, documentation generation, and codebase analysis'
  },

  // PERMISSIONS PRESETS (3)
  {
    slug: 'testing-mode',
    name: 'Testing Mode',
    description: 'Optimized for running tests with full execution permissions but restricted file modifications',
    category: 'permissions',
    settings: {
      model: 'claude-sonnet-4.5',
      temperature: 0.4,
      max_tokens: 12288,
      tools_allowed: ['read', 'execute', 'grep', 'glob', 'ls', 'git'],
      tools_restricted: ['edit', 'create', 'delete', 'patch'],
      safety_checks: true,
      require_confirmation: false,
      test_framework_support: true,
      allow_test_execution: true
    },
    tags: ['testing', 'qa', 'execution', 'ci-cd'],
    useCase: 'Perfect for test-driven development, running test suites, and CI/CD debugging'
  },
  {
    slug: 'refactoring-expert',
    name: 'Refactoring Expert',
    description: 'Full editing permissions with emphasis on code transformation and improvements',
    category: 'permissions',
    settings: {
      model: 'claude-sonnet-4.5',
      temperature: 0.3,
      max_tokens: 16384,
      tools_allowed: ['all'],
      tools_restricted: ['delete'],
      safety_checks: true,
      require_confirmation: true,
      backup_before_edit: true,
      track_changes: true
    },
    tags: ['refactoring', 'transformation', 'code-quality', 'improvement'],
    useCase: 'Use for major refactoring, code restructuring, and architectural improvements'
  },
  {
    slug: 'security-audit',
    name: 'Security Audit',
    description: 'Security-first settings with read-only access and vulnerability detection focus',
    category: 'permissions',
    settings: {
      model: 'claude-opus-4',
      temperature: 0.1,
      max_tokens: 32768,
      tools_allowed: ['read', 'grep', 'glob', 'ls'],
      tools_restricted: ['execute', 'edit', 'create', 'delete', 'patch'],
      safety_checks: true,
      require_confirmation: false,
      security_focus: true,
      check_secrets: true,
      check_vulnerabilities: true
    },
    tags: ['security', 'audit', 'vulnerabilities', 'compliance'],
    useCase: 'Use for security audits, vulnerability scanning, and compliance checks'
  },

  // CONTEXT PRESETS (2)
  {
    slug: 'large-codebase',
    name: 'Large Codebase',
    description: 'Optimized context settings for massive codebases with intelligent file prioritization',
    category: 'context',
    settings: {
      model: 'claude-opus-4',
      temperature: 0.4,
      max_tokens: 32768,
      context_window: 'extended',
      file_prioritization: true,
      smart_context: true,
      max_files_in_context: 50,
      prefer_recent_files: true,
      cache_frequently_accessed: true
    },
    tags: ['large', 'codebase', 'context', 'optimization'],
    useCase: 'Use for enterprise codebases, monorepos, and projects with thousands of files'
  },
  {
    slug: 'focused-feature',
    name: 'Focused Feature',
    description: 'Minimal context optimized for working on a single feature or component',
    category: 'context',
    settings: {
      model: 'claude-sonnet-4.5',
      temperature: 0.5,
      max_tokens: 8192,
      context_window: 'minimal',
      file_prioritization: true,
      smart_context: false,
      max_files_in_context: 10,
      prefer_recent_files: true,
      exclude_test_files: false
    },
    tags: ['focused', 'feature', 'minimal', 'fast'],
    useCase: 'Use when working on a single feature, bug fix, or small component'
  },

  // BUDGET/PERFORMANCE PRESETS (2)
  {
    slug: 'cost-optimized',
    name: 'Cost Optimized',
    description: 'Budget-conscious settings using Haiku model with token limits',
    category: 'budget',
    settings: {
      model: 'claude-haiku-3.5',
      temperature: 0.5,
      max_tokens: 4096,
      tools_allowed: ['all'],
      tools_restricted: [],
      token_budget_per_session: 50000,
      warn_at_percentage: 75,
      stop_at_percentage: 95,
      prefer_cached_responses: true
    },
    tags: ['budget', 'cost', 'economical', 'haiku'],
    useCase: 'Use when you need to minimize costs while maintaining good functionality'
  },
  {
    slug: 'performance-first',
    name: 'Performance First',
    description: 'Optimized for speed with Sonnet model and parallel execution',
    category: 'budget',
    settings: {
      model: 'claude-sonnet-4.5',
      temperature: 0.5,
      max_tokens: 8192,
      tools_allowed: ['all'],
      tools_restricted: [],
      parallel_tool_calls: true,
      streaming_enabled: true,
      cache_tool_results: true,
      prefer_fast_operations: true
    },
    tags: ['performance', 'speed', 'fast', 'parallel'],
    useCase: 'Use when speed is critical and you need rapid iteration'
  }
]

console.log(`Generated ${settings.length} Claude Code settings presets`)
console.log('Categories:', [...new Set(settings.map(s => s.category))].join(', '))
console.log('\nSettings by category:')

const byCategory = settings.reduce((acc: any, setting: any) => {
  acc[setting.category] = (acc[setting.category] || 0) + 1
  return acc
}, {})

Object.entries(byCategory).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`)
})

console.log('\nWriting to JSON...')

// Write to JSON file for import
import fs from 'fs'
import path from 'path'

const outputPath = path.join(process.cwd(), 'settings', 'settings-data.json')
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, JSON.stringify(settings, null, 2))

console.log(`✓ Written to ${outputPath}`)
console.log('\nNext steps:')
console.log('1. Run: tsx scripts/import-settings-to-db.ts')
console.log('2. Test API: curl https://id8labs.app/api/v1/settings/production-safe')
console.log('3. Test CLI: stackshack install production-safe')

// Generate example output for each setting
console.log('\n' + '='.repeat(60))
console.log('PREVIEW OF GENERATED SETTINGS:')
console.log('='.repeat(60) + '\n')

settings.slice(0, 2).forEach((setting, i) => {
  console.log(`${i + 1}. ${setting.name} (${setting.category})`)
  console.log(`   ${setting.description}`)
  console.log(`   Model: ${setting.settings.model}`)
  console.log(`   Tags: ${setting.tags.join(', ')}`)
  if (setting.useCase) {
    console.log(`   Use: ${setting.useCase}`)
  }
  console.log()
})

console.log('... and 8 more settings')
