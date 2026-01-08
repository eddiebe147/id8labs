#!/usr/bin/env npx tsx
/**
 * Fix Categories for Newly Imported Skills
 * Updates the 64 newly imported skills with their correct categories
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Map of skill slugs to their correct categories
const SKILL_CATEGORIES: Record<string, string> = {
  // Social Media Marketing - writing (13) + communication (5) + business (3)
  'instagram-strategist': 'writing',
  'tiktok-creator': 'writing',
  'youtube-optimizer': 'writing',
  'linkedin-publisher': 'writing',
  'twitter-thread-builder': 'writing',
  'pinterest-strategist': 'writing',
  'social-caption-writer': 'writing',
  'reel-script-writer': 'writing',
  'story-sequencer': 'writing',
  'meme-curator': 'writing',
  'hashtag-researcher': 'research',
  'carousel-designer': 'design',
  'ugc-campaign-planner': 'business',
  'social-listening-analyst': 'research',
  'community-manager': 'communication',
  'social-crisis-manager': 'communication',
  'engagement-optimizer': 'business',
  'social-media-reporter': 'business',
  'creator-partnership-manager': 'business',
  'social-commerce-strategist': 'business',

  // Founders & Entrepreneurs - business (19) + research (1) + personal (1)
  'pitch-deck-builder': 'business',
  'term-sheet-analyzer': 'business',
  'cap-table-manager': 'business',
  'fundraising-strategist': 'business',
  'due-diligence-coordinator': 'business',
  'gtm-strategist': 'business',
  'launch-planner': 'business',
  'pmf-analyzer': 'business',
  'mvp-planner': 'business',
  'lean-canvas-builder': 'business',
  'customer-discovery-guide': 'research',
  'runway-calculator': 'business',
  'growth-hacker': 'business',
  'saas-metrics-tracker': 'business',
  'founder-coach': 'personal',
  'board-meeting-prep': 'business',
  'advisory-board-builder': 'business',
  'exit-strategist': 'business',
  'equity-structurer': 'business',

  // Knowledge Workers - writing (8) + research (3) + communication (2) + design (1)
  'executive-summary-writer': 'writing',
  'research-synthesizer': 'research',
  'wiki-maintainer': 'writing',
  'citation-manager': 'writing',
  'peer-reviewer': 'research',
  'conference-paper-writer': 'writing',
  'course-creator': 'writing',
  'slide-deck-designer': 'design',
  'data-storyteller': 'writing',
  'explainer-video-scripter': 'writing',
  'workshop-facilitator': 'communication',
  'webinar-producer': 'communication',

  // Additional High-Value - meta (3) + business (7) + design (1)
  'automation-architect': 'meta',
  'ai-integration-specialist': 'meta',
  'chatbot-designer': 'meta',
  'affiliate-marketing-manager': 'business',
  'lifecycle-marketing-manager': 'business',
  'retention-marketer': 'business',
  'product-launch-coordinator': 'business',
  'community-builder': 'communication',
  'brand-partnership-negotiator': 'business',
  'client-onboarding-designer': 'business',
  'proposal-designer': 'design',
  'retainer-structurer': 'business',
  'freelance-business-manager': 'business'
}

async function fixCategories() {
  console.log('🔧 Fixing categories for newly imported skills\n')

  let updated = 0
  let errors = 0

  for (const [slug, categoryId] of Object.entries(SKILL_CATEGORIES)) {
    try {
      const { error } = await supabase
        .from('skills')
        .update({ category_id: categoryId })
        .eq('slug', slug)

      if (error) {
        console.error(`  ❌ Error updating ${slug}:`, error.message)
        errors++
      } else {
        console.log(`  ✅ ${slug} → ${categoryId}`)
        updated++
      }
    } catch (err) {
      console.error(`  ❌ Exception updating ${slug}:`, err)
      errors++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Update Summary')
  console.log('='.repeat(50))
  console.log(`✅ Updated: ${updated}`)
  console.log(`❌ Errors:  ${errors}`)
  console.log('='.repeat(50))
}

fixCategories()
  .then(() => {
    console.log('\n🎉 Categories fixed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Fix failed:', error)
    process.exit(1)
  })
