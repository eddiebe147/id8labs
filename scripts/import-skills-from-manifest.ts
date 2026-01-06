#!/usr/bin/env npx ts-node
/**
 * Import Skills from Claude Settings Manifest
 *
 * This script reads the skills-manifest.json from claude-settings
 * and imports all skills into the Supabase skills marketplace database.
 *
 * Usage:
 *   npm run import:skills
 */

import * as fs from 'fs'
import * as path from 'path'
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables from .env.local
config({ path: '.env.local' })

// Configuration
const CLAUDE_SETTINGS_PATH = '/Users/eddiebelaval/Development/id8/claude-settings'
const MANIFEST_PATH = path.join(CLAUDE_SETTINGS_PATH, 'skills-manifest.json')
const SKILLS_DIR = path.join(CLAUDE_SETTINGS_PATH, 'skills')

// Supabase client with service role (for writing)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Map manifest categories to database category IDs
const CATEGORY_MAP: Record<string, string> = {
  'business-ops': 'business',
  'nextjs-stack': 'code',
  'ui-ux': 'design',
  'features': 'code',
  'quality': 'code',
  'billing': 'business',
  'tooling': 'meta',
  'appstore': 'domain',
  'content': 'writing',
  'senior-devs': 'code',
  'image-generation': 'design',
  'social-media': 'communication',
  'content-production': 'writing',
  'mcp-specialists': 'meta',
  'strategic': 'business',
  'automation': 'meta'
}

// Complexity detection based on skill structure
function detectComplexity(skillPath: string, manifest: ManifestSkill): 'simple' | 'complex' | 'multi-agent' {
  // Multi-agent if has agents array
  if (manifest.agents && manifest.agents.length > 0) {
    return 'multi-agent'
  }

  // Check if it's a directory with references
  const refsPath = path.join(skillPath, 'references')
  if (fs.existsSync(refsPath)) {
    return 'complex'
  }

  // Simple if just a single file
  if (manifest.type === 'file') {
    return 'simple'
  }

  return 'simple'
}

interface ManifestSkill {
  name: string
  description: string
  source?: string
  repository?: string
  path: string
  installPath: string
  version?: string
  category: string
  triggers?: string[]
  commands?: string[]
  agents?: string[]
  type?: 'file'
}

interface SkillManifest {
  version: string
  totalSkills: number
  skills: Record<string, ManifestSkill>
}

async function readSkillContent(slug: string, manifest: ManifestSkill): Promise<string | null> {
  // Determine skill path
  let skillPath: string

  if (manifest.type === 'file') {
    // Single file skill (e.g., billing-security-auditor.md)
    skillPath = path.join(SKILLS_DIR, manifest.path.replace('skills/', ''))
  } else {
    // Directory skill - look for SKILL.md
    skillPath = path.join(SKILLS_DIR, slug, 'SKILL.md')
  }

  try {
    if (fs.existsSync(skillPath)) {
      return fs.readFileSync(skillPath, 'utf-8')
    }

    // Fallback: Try CLAUDE.md
    const claudePath = path.join(SKILLS_DIR, slug, 'CLAUDE.md')
    if (fs.existsSync(claudePath)) {
      return fs.readFileSync(claudePath, 'utf-8')
    }

    // Last resort: Try README.md
    const readmePath = path.join(SKILLS_DIR, slug, 'README.md')
    if (fs.existsSync(readmePath)) {
      return fs.readFileSync(readmePath, 'utf-8')
    }

    console.warn(`  ⚠️  No content found for ${slug}`)
    return null
  } catch (error) {
    console.error(`  ❌ Error reading content for ${slug}:`, error)
    return null
  }
}

async function importSkills() {
  console.log('🚀 Starting Skills Import from Manifest\n')

  // Check environment
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing required environment variables:')
    console.error('   - NEXT_PUBLIC_SUPABASE_URL')
    console.error('   - SUPABASE_SERVICE_ROLE_KEY')
    console.error('\nRun with: env $(cat .env.local | xargs) npx ts-node scripts/import-skills-from-manifest.ts')
    process.exit(1)
  }

  // Read manifest
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(`❌ Manifest not found at: ${MANIFEST_PATH}`)
    process.exit(1)
  }

  const manifestRaw = fs.readFileSync(MANIFEST_PATH, 'utf-8')
  const manifest: SkillManifest = JSON.parse(manifestRaw)

  console.log(`📋 Found ${Object.keys(manifest.skills).length} skills in manifest\n`)

  let imported = 0
  let skipped = 0
  let errors = 0

  for (const [slug, skillManifest] of Object.entries(manifest.skills)) {
    console.log(`📦 Processing: ${slug}`)

    // Read skill content
    const content = await readSkillContent(slug, skillManifest)

    // Map category
    const categoryId = CATEGORY_MAP[skillManifest.category] || 'meta'

    // Detect complexity
    const skillDir = path.join(SKILLS_DIR, slug)
    const complexity = detectComplexity(skillDir, skillManifest)

    // Prepare skill data
    const skillData = {
      slug,
      name: skillManifest.name,
      description: skillManifest.description,
      category_id: categoryId,
      complexity,
      version: skillManifest.version || '1.0.0',
      author: 'ID8Labs',
      license: 'MIT',
      triggers: skillManifest.triggers || [],
      commands: skillManifest.commands || [],
      tags: [skillManifest.category, ...( skillManifest.triggers?.slice(0, 5) || [])],
      content,
      readme: null, // Could extract from README.md if needed
      repo_url: skillManifest.repository ? `https://github.com/${skillManifest.repository}` : null,
      repo_path: skillManifest.path,
      quality_score: 75, // Default score - to be refined later
      quality_tier: 'silver' as const,
      validated: true,
      status: 'published' as const,
      featured: ['ui-builder', 'supabase-expert', 'appstore-readiness', 'llc-ops'].includes(slug),
      verified: true, // All ID8Labs skills are verified
      published_at: new Date().toISOString()
    }

    try {
      // Upsert skill (insert or update on conflict)
      const { error } = await supabase
        .from('skills')
        .upsert(skillData, {
          onConflict: 'slug'
        })

      if (error) {
        console.error(`  ❌ Error importing ${slug}:`, error.message)
        errors++
      } else {
        console.log(`  ✅ Imported: ${skillManifest.name} (${categoryId}, ${complexity})`)
        imported++
      }
    } catch (err) {
      console.error(`  ❌ Exception importing ${slug}:`, err)
      errors++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Import Summary')
  console.log('='.repeat(50))
  console.log(`✅ Imported: ${imported}`)
  console.log(`⏭️  Skipped:  ${skipped}`)
  console.log(`❌ Errors:   ${errors}`)
  console.log('='.repeat(50))

  // Verify import
  const { count } = await supabase
    .from('skills')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  console.log(`\n📈 Total published skills in database: ${count}`)
}

// Run import
importSkills()
  .then(() => {
    console.log('\n🎉 Import complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Import failed:', error)
    process.exit(1)
  })
