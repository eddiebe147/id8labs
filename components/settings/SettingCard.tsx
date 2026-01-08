'use client'

import Link from 'next/link'
import { Settings, Download, CheckCircle, Plus, Sparkles } from 'lucide-react'
import type { Setting } from '@/lib/settings'
import { formatModelName } from '@/lib/utils/format'
import { useStackStore } from '@/lib/stores/stack-store'

interface SettingCardProps {
  setting: Setting
}

const CATEGORY_EMOJI: Record<string, string> = {
  model: '🤖',
  permissions: '🔐',
  context: '📚',
  budget: '💰',
  optimization: '⚡',
  safety: '🛡️',
}

export function SettingCard({ setting }: SettingCardProps) {
  const { addItem, removeItem, isInStack } = useStackStore()
  const inStack = isInStack(setting.id)

  const emoji = CATEGORY_EMOJI[setting.category] || '⚙️'

  const handleAddToStack = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (inStack) {
      removeItem(setting.id)
    } else {
      addItem({
        id: setting.id,
        slug: setting.slug,
        name: setting.name,
        description: setting.description,
        type: 'setting',
        category: setting.category,
        tags: setting.tags,
      })
    }
  }

  const glowClasses = inStack
    ? 'ring-2 ring-emerald-500/80 shadow-[0_8px_30px_rgba(16,185,129,0.3)]'
    : ''

  return (
    <Link href={`/settings/${setting.slug}`}>
      <article
        className={`card group relative flex flex-col h-full hover-lift ${glowClasses} transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl">{emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {setting.verified && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-500">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified
                </span>
              )}
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]">
                {setting.category}
              </span>
            </div>
          </div>
        </div>

        {/* Title and description */}
        <div className="mb-3 flex-1">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-[var(--id8-orange)] transition-colors line-clamp-1">
            {setting.name}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
            {setting.description}
          </p>

          {/* Model info */}
          {setting.model && (
            <div className="flex items-center gap-2 p-2 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded text-xs">
              <Sparkles className="w-3.5 h-3.5 text-[var(--id8-orange)]" />
              <span className="font-medium">{formatModelName(setting.model)}</span>
              {setting.max_tokens && (
                <span className="text-[var(--text-secondary)]">
                  • {setting.max_tokens.toLocaleString()} tokens
                </span>
              )}
            </div>
          )}

          {/* Use case */}
          {setting.use_case && (
            <div className="mt-2 text-xs text-[var(--text-secondary)]">
              <span className="font-semibold">Use case:</span> {setting.use_case}
            </div>
          )}
        </div>

        {/* Tags */}
        {setting.tags && setting.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {setting.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-md"
              >
                #{tag}
              </span>
            ))}
            {setting.tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-[var(--text-tertiary)]">
                +{setting.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
          <span className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
            <Download className="w-4 h-4" />
            {setting.install_count.toLocaleString()}
          </span>

          {/* Add to Stack button */}
          <button
            onClick={handleAddToStack}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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
    </Link>
  )
}
