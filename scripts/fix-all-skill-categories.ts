#!/usr/bin/env npx tsx
/**
 * Fix All Skill Categories
 * Correct the 227 skills that are wrongly categorized as 'meta'
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Comprehensive category mapping for ALL skills
const CORRECT_CATEGORIES: Record<string, string> = {
  // Writing skills (should be ~50+)
  'blog-post-writer': 'writing',
  'case-study-writer': 'writing',
  'copywriter': 'writing',
  'email-composer': 'writing',
  'grant-writer': 'writing',
  'newsletter-writer': 'writing',
  'press-release-writer': 'writing',
  'technical-writer': 'writing',
  'white-paper-author': 'writing',
  'product-description-writer': 'writing',
  'speech-writer': 'writing',
  'story-writer': 'writing',
  
  // Social Media (writing category)
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
  'social-post-creator': 'writing',
  
  // Knowledge Workers - Writing
  'executive-summary-writer': 'writing',
  'wiki-maintainer': 'writing',
  'citation-manager': 'writing',
  'conference-paper-writer': 'writing',
  'course-creator': 'writing',
  'data-storyteller': 'writing',
  'explainer-video-scripter': 'writing',
  
  // Business skills (should be ~80+)
  'business-plan-writer': 'business',
  'customer-success': 'business',
  'expense-tracker': 'business',
  'financial-reporter': 'business',
  'inventory-manager': 'business',
  'kpi-dashboard': 'business',
  
  // Founders & Entrepreneurs
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
  'runway-calculator': 'business',
  'growth-hacker': 'business',
  'saas-metrics-tracker': 'business',
  'board-meeting-prep': 'business',
  'advisory-board-builder': 'business',
  'exit-strategist': 'business',
  'equity-structurer': 'business',
  'investor-relations': 'business',
  
  // Business Operations
  'ugc-campaign-planner': 'business',
  'engagement-optimizer': 'business',
  'social-media-reporter': 'business',
  'creator-partnership-manager': 'business',
  'social-commerce-strategist': 'business',
  'affiliate-marketing-manager': 'business',
  'lifecycle-marketing-manager': 'business',
  'retention-marketer': 'business',
  'product-launch-coordinator': 'business',
  'brand-partnership-negotiator': 'business',
  'client-onboarding-designer': 'business',
  'retainer-structurer': 'business',
  'freelance-business-manager': 'business',
  'contract-analyzer': 'business',
  'cost-optimizer': 'business',
  'billing-manager': 'business',
  'procurement-assistant': 'business',
  'accounts-reconciler': 'business',
  'incident-responder': 'business',
  'migration-planner': 'business',
  'operations-optimizer': 'business',
  'resource-allocator': 'business',
  'vendor-manager': 'business',
  'billing-security-auditor': 'business',
  'payment-flow-debugger': 'business',
  'subscription-lifecycle-manager': 'business',
  
  // Research skills
  'hashtag-researcher': 'research',
  'social-listening-analyst': 'research',
  'customer-discovery-guide': 'research',
  'research-synthesizer': 'research',
  'peer-reviewer': 'research',
  'competitive-intelligence': 'research',
  'data-analyzer': 'research',
  'financial-analyst': 'research',
  'industry-expert': 'research',
  'literature-review': 'research',
  'market-research-analyst': 'research',
  'trend-spotter': 'research',
  'survey-analyzer': 'research',
  
  // Communication
  'community-manager': 'communication',
  'social-crisis-manager': 'communication',
  'workshop-facilitator': 'communication',
  'webinar-producer': 'communication',
  'community-builder': 'communication',
  'announcement-drafter': 'communication',
  'chat-response-generator': 'communication',
  'customer-support-reply': 'communication',
  'internal-memo-creator': 'communication',
  'meeting-scheduler': 'communication',
  'slack-message-writer': 'communication',
  
  // Design
  'carousel-designer': 'design',
  'slide-deck-designer': 'design',
  'proposal-designer': 'design',
  'brand-identity-builder': 'design',
  'color-palette-generator': 'design',
  'icon-designer': 'design',
  'infographic-designer': 'design',
  'layout-designer': 'design',
  'logo-ideator': 'design',
  'mockup-generator': 'design',
  'presentation-maker': 'design',
  'social-media-designer': 'design',
  'typography-advisor': 'design',
  'wireframe-creator': 'design',
  
  // Personal
  'founder-coach': 'personal',
  'daily-planner': 'personal',
  'decision-helper': 'personal',
  'focus-timer': 'personal',
  'goal-setter': 'personal',
  'habit-tracker': 'personal',
  'idea-capturer': 'personal',
  'journal-prompter': 'personal',
  'learning-path-creator': 'personal',
  'reading-list-manager': 'personal',
  'time-blocker': 'personal',
  
  // Meta/Tooling (legitimate meta skills)
  'automation-architect': 'meta',
  'ai-integration-specialist': 'meta',
  'chatbot-designer': 'meta',
  'agent-orchestrator': 'meta',
  'agent-workflow-builder': 'meta',
  'chain-builder': 'meta',
  'context-manager': 'meta',
  'knowledge-base-builder': 'meta',
  'prompt-engineer': 'meta',
  'skill-creator': 'meta',
  'workflow-automator': 'meta',
  'workflow-designer': 'meta',
  'llm-prompt-optimizer': 'meta',
  'rag-pipeline-builder': 'meta',
  'vector-search-designer': 'meta',
  'embedding-generator': 'meta',
  'entity-extractor': 'meta',
  'sentiment-analyzer': 'meta',
  'summarization-engine': 'meta',
  'translation-assistant': 'meta',
  'output-formatter': 'meta',
  
  // Code/Technical
  'nextjs-project-manager': 'code',
  'api-design': 'code',
  'database-design': 'code',
  'supabase-expert': 'code',
  'deployment-automation': 'code',
  'ui-builder': 'code',
  'state-management': 'code',
  'performance-optimization': 'code',
  'file-uploads': 'code',
  'email-notifications': 'code',
  'real-time-features': 'code',
  'analytics-tracking': 'code',
  'testing-qa': 'code',
  'error-monitoring': 'code',
  'verify': 'code',
  'mcp-builder': 'code',
  'tui-builder': 'code',
  'security-scanner': 'code',
  'test-generator': 'code',
  'performance-profiler': 'code',
  'log-analyzer': 'code',
  'monitoring-setup': 'code',
  
  // Document Creation
  'contract-drafter': 'document-creation',
  'form-builder': 'document-creation',
  'invoice-generator': 'document-creation',
  'letter-writer': 'document-creation',
  'pdf-generator': 'document-creation',
  'report-builder': 'document-creation',
  'resume-cv-creator': 'document-creation',
  'spreadsheet-builder': 'document-creation',
  'word-document-creator': 'document-creation',
  
  // Domain-specific
  'appstore-readiness': 'domain',
  'llc-ops': 'domain',
  'construction-estimator': 'domain',
  'ecommerce-manager': 'domain',
  'education-tutor': 'domain',
  'healthcare-compliance': 'domain',
  'hospitality-coordinator': 'domain',
  'hr-assistant': 'domain',
  'insurance-analyst': 'domain',
  'legal-assistant': 'domain',
  'medical-scribe': 'domain',
  'real-estate-analyst': 'domain',
  
  // Project Management
  'milestone-tracker': 'project',
  'project-planner': 'project',
  'roadmap-builder': 'project',
  'sprint-planner': 'project',
  'task-manager': 'project',
  'retrospective-facilitator': 'project',
  'onboarding-designer': 'project',
}

async function fixCategories() {
  console.log('🔧 Fixing All Skill Categories\n')

  let updated = 0
  let errors = 0
  let skipped = 0

  for (const [slug, correctCategory] of Object.entries(CORRECT_CATEGORIES)) {
    // Check current category
    const { data: current } = await supabase
      .from('skills')
      .select('category_id')
      .eq('slug', slug)
      .single()

    if (!current) {
      console.log(`  ⏭️  ${slug} - not found in database`)
      skipped++
      continue
    }

    if (current.category_id === correctCategory) {
      // Already correct
      continue
    }

    // Update to correct category
    const { error } = await supabase
      .from('skills')
      .update({ category_id: correctCategory })
      .eq('slug', slug)

    if (error) {
      console.error(`  ❌ ${slug}: ${error.message}`)
      errors++
    } else {
      console.log(`  ✅ ${slug}: ${current.category_id} → ${correctCategory}`)
      updated++
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('📊 Update Summary')
  console.log('='.repeat(60))
  console.log(`✅ Updated: ${updated}`)
  console.log(`⏭️  Skipped: ${skipped}`)
  console.log(`❌ Errors:  ${errors}`)
  console.log('='.repeat(60))

  // Show new distribution
  const { data: skills } = await supabase
    .from('skills')
    .select('category_id')
    .eq('status', 'published')

  const counts: Record<string, number> = {}
  skills?.forEach(s => {
    const cat = s.category_id || 'null'
    counts[cat] = (counts[cat] || 0) + 1
  })

  console.log('\n📊 New Category Distribution:')
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`)
    })
}

fixCategories()
  .then(() => {
    console.log('\n🎉 Categories fixed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Failed:', error)
    process.exit(1)
  })
