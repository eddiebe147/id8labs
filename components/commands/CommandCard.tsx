'use client'

import Link from 'next/link'
import { Terminal, Download, CheckCircle, Plus } from 'lucide-react'
import type { Command } from '@/lib/commands'
import { useStackStore } from '@/lib/stores/stack-store'

interface CommandCardProps {
  command: Command
}

const CATEGORY_EMOJI: Record<string, string> = {
  git: '🔄',
  testing: '🧪',
  deployment: '🚀',
  setup: '⚡',
  quality: '✨',
}

export function CommandCard({ command }: CommandCardProps) {
  const { addItem, removeItem, isInStack } = useStackStore()
  const inStack = isInStack(command.id)

  const emoji = CATEGORY_EMOJI[command.category] || '⚡'

  const handleAddToStack = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (inStack) {
      removeItem(command.id)
    } else {
      addItem({
        id: command.id,
        slug: command.slug,
        name: command.name,
        description: command.description,
        type: 'command',
        category: command.category,
        tags: command.tags,
      })
    }
  }

  const glowClasses = inStack
    ? 'ring-2 ring-emerald-500/80 shadow-[0_8px_30px_rgba(16,185,129,0.3)]'
    : ''

  return (
    <Link href={`/commands/${command.slug}`}>
      <article
        className={`card group relative flex flex-col h-full hover-lift ${glowClasses} transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl">{emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {command.verified && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-500">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified
                </span>
              )}
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]">
                {command.category}
              </span>
            </div>
          </div>
        </div>

        {/* Title and description */}
        <div className="mb-3 flex-1">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-[var(--id8-orange)] transition-colors line-clamp-1">
            {command.name}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
            {command.description}
          </p>

          {/* Command preview */}
          <div className="p-2 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded text-xs font-mono text-[var(--text-secondary)] truncate">
            <Terminal className="w-3 h-3 inline mr-1" />
            {command.command}
          </div>
        </div>

        {/* Prerequisites */}
        {command.prerequisites && command.prerequisites.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {command.prerequisites.slice(0, 3).map((prereq) => (
              <span
                key={prereq}
                className="px-2 py-0.5 text-xs bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-md"
              >
                {prereq}
              </span>
            ))}
            {command.prerequisites.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-[var(--text-tertiary)]">
                +{command.prerequisites.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
          <span className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
            <Download className="w-4 h-4" />
            {command.install_count.toLocaleString()}
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
