'use client'

import Link from 'next/link'
import { Package, ArrowRight } from 'lucide-react'
import type { SkillCollection } from '@/lib/skill-types'

interface StarterKitsWidgetProps {
  collections: SkillCollection[]
  limit?: number
}

const COLLECTION_EMOJI: Record<string, string> = {
  'frontend-developer-kit': '⚛️',
  'content-creator-kit': '✍️',
  'business-operations-kit': '📊',
  'research-analysis-kit': '🔬',
  'solopreneur-essentials': '🚀',
  'executive-assistant-kit': '📋',
  'data-analyst-kit': '📊',
  'consultant-strategist-kit': '💼',
  'product-manager-kit': '🚀',
  'knowledge-operations-kit': '📚',
}

export function StarterKitsWidget({ collections, limit = 3 }: StarterKitsWidgetProps) {
  const displayCollections = collections.slice(0, limit)

  if (collections.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Package className="w-4 h-4 text-purple-500" />
        <h3 className="font-semibold text-sm uppercase tracking-wide text-[var(--text-secondary)]">
          Quick Start
        </h3>
      </div>

      {/* Collections */}
      <div className="space-y-2">
        {displayCollections.map((collection) => {
          const emoji = COLLECTION_EMOJI[collection.slug] || COLLECTION_EMOJI[collection.id] || '📦'
          
          return (
            <Link
              key={collection.id}
              href={`/skills/starter-kits/${collection.slug}`}
              className="block p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] hover:border-purple-500/30 transition-all group"
            >
              <div className="flex items-start gap-2">
                <span className="text-xl">{emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-purple-500 transition-colors truncate">
                    {collection.name}
                  </div>
                  <div className="text-xs text-[var(--text-tertiary)] mt-0.5">
                    {collection.skill_count || collection.skills?.length || 0} skills
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* View All Link */}
      <Link
        href="/skills/starter-kits"
        className="flex items-center gap-1 text-sm text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)] font-medium transition-colors"
      >
        Browse all kits
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
