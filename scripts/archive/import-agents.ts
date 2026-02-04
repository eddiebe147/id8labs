#!/usr/bin/env npx ts-node
/**
 * Import Agents to StackShack database
 */

import * as fs from 'fs'
import * as path from 'path'
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const AGENTS_DIR = '/Users/eddiebelaval/Development/id8/claude-settings/agents'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function parseYamlFrontmatter(content: string): Record<string, any> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null

  const yamlStr = match[1]
  const result: Record<string, any> = {}
  const lines = yamlStr.split('\n')
  let currentKey: string | null = null

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    if (trimmed.startsWith('- ')) {
      if (currentKey && Array.isArray(result[currentKey])) {
        const value = trimmed.slice(2).replace(/^["']|["']$/g, '')
        result[currentKey].push(value)
      }
      continue
    }

    const colonIdx = trimmed.indexOf(':')
    if (colonIdx > 0) {
      currentKey = trimmed.slice(0, colonIdx).trim()
      const value = trimmed.slice(colonIdx + 1).trim()

      if (value === '' || value === '|') {
        result[currentKey] = []
      } else {
        result[currentKey] = value.replace(/^["']|["']$/g, '')
        currentKey = null
      }
    }
  }

  return result
}

function extractDescription(content: string): string {
  const afterFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n*/, '')
  const lines = afterFrontmatter.split('\n').filter(l => l.trim() && !l.startsWith('#'))
  return lines[0]?.slice(0, 200) || ''
}

async function importAgents() {
  console.log('🤖 Starting Agent Import to StackShack\n')

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing environment variables')
    process.exit(1)
  }

  const files = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md'))
  console.log(`📋 Found ${files.length} agents\n`)

  let imported = 0
  let errors = 0

  for (const file of files) {
    const slug = file.replace('.md', '')
    console.log(`📦 Processing: ${slug}`)

    const filePath = path.join(AGENTS_DIR, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const frontmatter = parseYamlFrontmatter(content)

    let name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    let description = extractDescription(content)
    let triggers: string[] = []

    if (frontmatter) {
      name = frontmatter.name || frontmatter.title || name
      description = frontmatter.description || description
      triggers = Array.isArray(frontmatter.triggers) ? frontmatter.triggers : []
    }

    // Determine if TMNT agent
    const isTMNT = ['bebop', 'leonardo', 'donatello', 'michelangelo', 'krang', 'casey'].some(t => slug.includes(t))

    const agentData = {
      slug: `agent-${slug}`,
      name,
      description: description.slice(0, 300),
      category_id: 'meta',
      complexity: 'multi-agent' as const,
      version: '1.0.0',
      author: 'ID8Labs',
      license: 'MIT',
      triggers,
      commands: [],
      tags: ['agent', 'autonomous', isTMNT ? 'tmnt-squad' : 'specialist'],
      content,
      readme: null,
      repo_url: 'https://github.com/eddiebelaval/claude-settings',
      repo_path: `agents/${file}`,
      quality_score: 80,
      quality_tier: 'gold' as const,
      validated: true,
      status: 'published' as const,
      featured: ['nextjs-senior-dev', 'market-intelligence-analyst', 'leonardo-strategist-agent'].includes(slug),
      verified: true,
      published_at: new Date().toISOString()
    }

    try {
      const { error } = await supabase
        .from('skills')
        .upsert(agentData, { onConflict: 'slug' })

      if (error) {
        console.error(`  ❌ Error: ${error.message}`)
        errors++
      } else {
        console.log(`  ✅ Imported: ${name}`)
        imported++
      }
    } catch (err: any) {
      console.error(`  ❌ Exception: ${err.message}`)
      errors++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Import Summary')
  console.log('='.repeat(50))
  console.log(`✅ Imported: ${imported}`)
  console.log(`❌ Errors:   ${errors}`)

  const { count } = await supabase
    .from('skills')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  console.log(`\n📈 Total in StackShack: ${count}`)
}

importAgents()
  .then(() => {
    console.log('\n🎉 Agent import complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Import failed:', error)
    process.exit(1)
  })
