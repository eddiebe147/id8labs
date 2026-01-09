'use client'

import Link from 'next/link'
import { Zap, Terminal, Settings, Puzzle, Download, Eye, Shield, CheckCircle, Plus, Star, Rocket } from 'lucide-react'
import type { TrendingItem, TrendingItemType } from '@/lib/trending'
import { useStackStore } from '@/lib/stores/stack-store'

const TYPE_CONFIG: Record<TrendingItemType, { icon: React.ElementType; color: string; bgColor: string }> = {
  skill: { icon: Zap, color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)' },
  command: { icon: Terminal, color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.1)' },
  setting: { icon: Settings, color: '#a855f7', bgColor: 'rgba(168, 85, 247, 0.1)' },
  plugin: { icon: Puzzle, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)' },
}

interface TrendingItemCardProps {
  item: TrendingItem
  featured?: boolean
  showBadge?: 'new' | 'featured'
}

export function TrendingItemCard({ item, featured, showBadge }: TrendingItemCardProps) {
  const { addItem, removeItem, isInStack } = useStackStore()
  const inStack = isInStack(item.id)
  const config = TYPE_CONFIG[item.type]
  const Icon = config.icon

  const handleAddToStack = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (inStack) {
      removeItem(item.id)
    } else {
      addItem({
        id: item.id,
        slug: item.slug,
        name: item.name,
        description: item.description,
        type: item.type,
        category: item.category,
      })
    }
  }

  const href = getItemHref(item)

  const glowClasses = inStack
    ? 'ring-2 ring-emerald-500/80 shadow-[0_8px_30px_rgba(16,185,129,0.3)]'
    : ''

  const officialClasses = item.official
    ? 'border-amber-500/30 shadow-amber-500/10'
    : ''

  return (
    <article
      className={`card group relative flex flex-col h-full hover-lift ${officialClasses} ${glowClasses} transition-all duration-300 ${
        featured ? 'border-2 border-amber-500/20' : ''
      }`}
    >
      {/* Stretched link - covers entire card for navigation */}
      <Link
        href={href}
        className="absolute inset-0 z-0"
        aria-label={`View ${item.name} details`}
      />

      {/* Official banner */}
      {item.official && (
        <div className="absolute -top-px -left-px -right-px h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-t-xl z-10" />
      )}

      {/* Badge */}
      {showBadge === 'new' && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-0.5 bg-emerald-500 text-white text-xs font-medium rounded-full z-10">
          <Rocket className="w-3 h-3" />
          New
        </div>
      )}
      {showBadge === 'featured' && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full z-10">
          <Star className="w-3 h-3" />
          Featured
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3 relative z-10 pointer-events-none">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: config.bgColor }}
        >
          <Icon className="w-5 h-5" style={{ color: config.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full capitalize"
              style={{ backgroundColor: config.bgColor, color: config.color }}
            >
              {item.type}
            </span>
            {item.official && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-500">
                <Shield className="w-3 h-3" />
                Official
              </span>
            )}
            {item.verified && !item.official && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-500">
                <CheckCircle className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Title and description */}
      <div className="mb-3 flex-1 relative z-10 pointer-events-none">
        <h3 className="font-semibold text-lg mb-1 group-hover:text-[var(--id8-orange)] transition-colors line-clamp-1">
          {item.name}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
          {item.description}
        </p>
      </div>

      {/* Stats and actions */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] relative z-10">
        <div className="flex items-center gap-3 pointer-events-none">
          <span className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
            <Download className="w-4 h-4" />
            {item.install_count.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 text-sm text-[var(--text-tertiary)]">
            <Eye className="w-4 h-4" />
            {item.view_count.toLocaleString()}
          </span>
        </div>

        {/* Add to Stack button */}
        <button
          onClick={handleAddToStack}
          className={`relative z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            inStack
              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500'
              : 'bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange-hover)]'
          }`}
        >
          {inStack ? (
            <>
              <CheckCircle className="w-3.5 h-3.5" />
              In Stack
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              Add
            </>
          )}
        </button>
      </div>
    </article>
  )
}

function getItemHref(item: TrendingItem): string {
  switch (item.type) {
    case 'skill':
      return `/stackshack/${item.slug}`
    case 'command':
      return `/stackshack?tab=commands`
    case 'setting':
      return `/stackshack?tab=settings`
    case 'plugin':
      return `/stackshack/plugins/${item.slug}`
    default:
      return '/stackshack'
  }
}
