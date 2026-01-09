'use client'

import Link from 'next/link'
import { Puzzle, Download, CheckCircle, Plus, Shield, Copy, Check, ExternalLink } from 'lucide-react'
import type { Plugin } from '@/lib/plugin-types'
import { PLUGIN_CATEGORY_EMOJI } from '@/lib/plugin-types'
import { useStackStore } from '@/lib/stores/stack-store'
import { useState } from 'react'

interface PluginCardProps {
  plugin: Plugin
}

export function PluginCard({ plugin }: PluginCardProps) {
  const { addItem, removeItem, isInStack } = useStackStore()
  const inStack = isInStack(plugin.id)
  const [copied, setCopied] = useState(false)

  const emoji = PLUGIN_CATEGORY_EMOJI[plugin.category] || '\ud83d\udd8c\ufe0f'

  const handleAddToStack = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (inStack) {
      removeItem(plugin.id)
    } else {
      addItem({
        id: plugin.id,
        slug: plugin.slug,
        name: plugin.name,
        description: plugin.description,
        type: 'plugin',
        category: plugin.category,
        tags: plugin.tags,
      })
    }
  }

  const handleCopyCommand = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(plugin.install_command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Special styling for official Anthropic plugins
  const officialClasses = plugin.official
    ? 'border-amber-500/30 shadow-amber-500/10'
    : ''

  const glowClasses = inStack
    ? 'ring-2 ring-emerald-500/80 shadow-[0_8px_30px_rgba(16,185,129,0.3)]'
    : ''

  return (
    <article
      className={`card group relative flex flex-col h-full hover-lift ${officialClasses} ${glowClasses} transition-all duration-300`}
    >
      {/* Stretched link - covers entire card for navigation */}
      <Link
        href={`/stackshack/plugins/${plugin.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${plugin.name} plugin details`}
      />

      {/* Official badge banner */}
      {plugin.official && (
        <div className="absolute -top-px -left-px -right-px h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-t-xl z-10" />
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3 relative z-10 pointer-events-none">
        <span className="text-3xl">{emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {plugin.official && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-500">
                <Shield className="w-3.5 h-3.5" />
                Official
              </span>
            )}
            {plugin.verified && !plugin.official && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-500">
                <CheckCircle className="w-3.5 h-3.5" />
                Verified
              </span>
            )}
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]">
              {plugin.category}
            </span>
          </div>
        </div>
      </div>

      {/* Title and description */}
      <div className="mb-3 flex-1 relative z-10 pointer-events-none">
        <h3 className="font-semibold text-lg mb-1 group-hover:text-[var(--id8-orange)] transition-colors line-clamp-1">
          {plugin.name}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
          {plugin.description}
        </p>

        {/* Install command preview */}
        <div className="flex items-center gap-2 p-2 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded text-xs font-mono text-[var(--text-secondary)] pointer-events-auto">
          <Puzzle className="w-3 h-3 flex-shrink-0" />
          <span className="truncate flex-1">{plugin.slash_command || plugin.install_command}</span>
          <button
            onClick={handleCopyCommand}
            className="relative z-20 flex-shrink-0 p-1 hover:bg-[var(--bg-secondary)] rounded transition-colors"
            title="Copy install command"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-500" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>

      {/* Author info */}
      <div className="flex items-center gap-2 mb-3 text-xs text-[var(--text-secondary)] relative z-10 pointer-events-none">
        <span>by <span className="font-medium text-[var(--text-primary)]">{plugin.author}</span></span>
        {plugin.original_author && plugin.original_author !== plugin.author && (
          <span className="text-[var(--text-tertiary)]">
            (originally by {plugin.original_author})
          </span>
        )}
      </div>

      {/* Use cases / Tags */}
      {plugin.use_cases && plugin.use_cases.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3 relative z-10 pointer-events-none">
          {plugin.use_cases.slice(0, 2).map((useCase) => (
            <span
              key={useCase}
              className="px-2 py-0.5 text-xs bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-md"
            >
              {useCase}
            </span>
          ))}
          {plugin.use_cases.length > 2 && (
            <span className="px-2 py-0.5 text-xs text-[var(--text-tertiary)]">
              +{plugin.use_cases.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Stats and actions */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] relative z-10">
        <div className="flex items-center gap-3 pointer-events-none">
          <span className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
            <Download className="w-4 h-4" />
            {plugin.install_count.toLocaleString()}
          </span>
          {plugin.github_repo && (
            <a
              href={`https://github.com/${plugin.github_repo}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto relative z-20 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              title="View on GitHub"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Add to Stack button */}
        <button
          onClick={handleAddToStack}
          className={`relative z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            inStack
              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500'
              : plugin.official
                ? 'bg-amber-500 text-white hover:bg-amber-600'
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
