'use client'

import Link from 'next/link'
import { Download, Star, CheckCircle, Sparkles } from 'lucide-react'
import type { Skill } from '@/lib/skill-types'
import { useStackStore } from '@/lib/stores/stack-store'
import { FlipCard } from '@/components/stack/FlipCard'

// Category emoji mapping
const CATEGORY_EMOJI: Record<string, string> = {
  documents: '📄',
  communication: '📬',
  research: '🔍',
  writing: '✍️',
  design: '🎨',
  code: '💻',
  project: '📋',
  business: '💼',
  domain: '🏢',
  personal: '👤',
  meta: '⚙️',
}

// Complexity badge styles
const COMPLEXITY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  simple: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-500',
    label: 'Simple',
  },
  complex: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-500',
    label: 'Complex',
  },
  'multi-agent': {
    bg: 'bg-purple-500/10',
    text: 'text-purple-500',
    label: 'Multi-Agent',
  },
}

// Quality tier styles
const TIER_STYLES: Record<string, { bg: string; text: string }> = {
  bronze: { bg: 'bg-orange-700/10', text: 'text-orange-700' },
  silver: { bg: 'bg-gray-400/10', text: 'text-gray-400' },
  gold: { bg: 'bg-yellow-500/10', text: 'text-yellow-500' },
  platinum: { bg: 'bg-cyan-400/10', text: 'text-cyan-400' },
}

interface SkillCardProps {
  skill: Skill
  onAddToStack?: (skill: Skill) => void
  isInStack?: boolean
  variant?: 'default' | 'compact' | 'featured'
  enableFlip?: boolean
}

export function SkillCard({
  skill,
  onAddToStack,
  isInStack: isInStackProp,
  variant = 'default',
  enableFlip = false,
}: SkillCardProps) {
  const { addItem, removeItem, isInStack: isInStackStore } = useStackStore()
  
  // Use store state if no prop provided
  const isInStack = isInStackProp !== undefined ? isInStackProp : isInStackStore(skill.id)
  
  const categoryEmoji = CATEGORY_EMOJI[skill.category_id || 'meta'] || '⚙️'
  const complexityStyle = COMPLEXITY_STYLES[skill.complexity] || COMPLEXITY_STYLES.simple
  const tierStyle = skill.quality_tier ? TIER_STYLES[skill.quality_tier] : null
  
  const handleAddToStack = () => {
    if (isInStack) {
      removeItem(skill.id)
    } else {
      // Convert Skill to StackItem format
      const isAgent = skill.tags?.includes('agent')
      addItem({
        id: skill.id,
        slug: skill.slug,
        name: skill.name,
        description: skill.description || '',
        type: isAgent ? 'agent' : 'skill',
        category: skill.category_id || undefined,
        tags: skill.tags,
      })
    }
    if (onAddToStack) {
      onAddToStack(skill)
    }
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/skills/${skill.slug}`}
        className="group flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] transition-all duration-200"
      >
        <span className="text-2xl">{categoryEmoji}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate">{skill.name}</h4>
          <p className="text-xs text-[var(--text-secondary)] truncate">
            {skill.description}
          </p>
        </div>
        {skill.verified && (
          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        )}
      </Link>
    )
  }

  const cardClasses =
    variant === 'featured'
      ? 'card-featured group relative flex flex-col h-full'
      : 'card group relative flex flex-col h-full'

  // Add green glow when in stack
  const glowClasses = isInStack 
    ? 'ring-2 ring-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
    : ''

  const cardContent = (
    <article className={`${cardClasses} ${glowClasses} transition-all duration-300`}>
      {/* Featured badge */}
      {skill.featured && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="flex items-center gap-1 px-2 py-1 bg-[var(--id8-orange)] text-white text-xs font-semibold rounded-full shadow-lg">
            <Sparkles className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}

      {/* Header with emoji and badges */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">{categoryEmoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {skill.verified && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-500">
                <CheckCircle className="w-3.5 h-3.5" />
                Verified
              </span>
            )}
            <span
              className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${complexityStyle.bg} ${complexityStyle.text}`}
            >
              {complexityStyle.label}
            </span>
            {tierStyle && (
              <span
                className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${tierStyle.bg} ${tierStyle.text}`}
              >
                {skill.quality_tier}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Title and description */}
      <Link href={`/skills/${skill.slug}`} className="block mb-3 flex-1">
        <h3 className="font-semibold text-lg mb-1 group-hover:text-[var(--id8-orange)] transition-colors line-clamp-1" title={skill.name}>
          {skill.name}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-3 min-h-[3em]">
          {skill.description || 'No description available.'}
        </p>
      </Link>

      {/* Tags */}
      {skill.tags && skill.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skill.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-md"
            >
              {tag}
            </span>
          ))}
          {skill.tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-[var(--text-tertiary)]">
              +{skill.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mt-auto pt-3 border-t border-[var(--border)]">
        <span className="flex items-center gap-1">
          <Download className="w-4 h-4" />
          {skill.install_count.toLocaleString()}
        </span>
        {skill.avg_rating > 0 && (
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {skill.avg_rating.toFixed(1)}
          </span>
        )}
        <span className="ml-auto text-xs">v{skill.version}</span>
      </div>

      {/* Add to Stack button */}
      <button
        onClick={(e) => {
          e.preventDefault()
          handleAddToStack()
        }}
        className={`mt-3 w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
          isInStack
            ? 'bg-emerald-500/10 text-emerald-500 border-2 border-emerald-500'
            : 'bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange-hover)] hover:shadow-lg'
        }`}
      >
        {isInStack ? '✓ In Stack' : '+ Add to Stack'}
      </button>
    </article>
  )

  // No longer using FlipCard - just show the card with glow effect
  return cardContent
}

export default SkillCard
