'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import type { SkillCategory } from '@/lib/skill-types'

interface SkillFiltersProps {
  categories: SkillCategory[]
  className?: string
}

export function SkillFilters({ categories, className = '' }: SkillFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get('category')
  const currentComplexity = searchParams.get('complexity')
  const currentTier = searchParams.get('tier')
  const currentSort = searchParams.get('sort') || 'popular'
  const verifiedOnly = searchParams.get('verified') === 'true'

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`?${params.toString()}`)
    },
    [router, searchParams]
  )

  const clearAllFilters = () => {
    router.push('?')
  }

  const hasActiveFilters =
    currentCategory || currentComplexity || currentTier || verifiedOnly

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)]"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Category
        </label>
        <select
          value={currentCategory || ''}
          onChange={(e) => updateFilter('category', e.target.value || null)}
          className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--id8-orange)]"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.emoji} {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Complexity Filter */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Complexity
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: '', label: 'All' },
            { value: 'simple', label: 'Simple' },
            { value: 'complex', label: 'Complex' },
            { value: 'multi-agent', label: 'Multi-Agent' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateFilter('complexity', option.value || null)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                (currentComplexity || '') === option.value
                  ? 'bg-[var(--id8-orange)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quality Tier Filter */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Quality Tier
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: '', label: 'All' },
            { value: 'platinum', label: '💎 Platinum' },
            { value: 'gold', label: '🥇 Gold' },
            { value: 'silver', label: '🥈 Silver' },
            { value: 'bronze', label: '🥉 Bronze' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateFilter('tier', option.value || null)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                (currentTier || '') === option.value
                  ? 'bg-[var(--id8-orange)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Verified Toggle */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) =>
              updateFilter('verified', e.target.checked ? 'true' : null)
            }
            className="w-4 h-4 rounded border-[var(--border)] text-[var(--id8-orange)] focus:ring-[var(--id8-orange)]"
          />
          <span className="text-sm">Verified only</span>
        </label>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Sort by
        </label>
        <select
          value={currentSort}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--id8-orange)]"
        >
          <option value="popular">Most Popular</option>
          <option value="newest">Newest</option>
          <option value="rating">Highest Rated</option>
          <option value="installs">Most Installs</option>
        </select>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text-tertiary)] mb-2">
            Active filters:
          </p>
          <div className="flex flex-wrap gap-2">
            {currentCategory && (
              <FilterTag
                label={categories.find((c) => c.id === currentCategory)?.name || currentCategory}
                onRemove={() => updateFilter('category', null)}
              />
            )}
            {currentComplexity && (
              <FilterTag
                label={currentComplexity}
                onRemove={() => updateFilter('complexity', null)}
              />
            )}
            {currentTier && (
              <FilterTag
                label={currentTier}
                onRemove={() => updateFilter('tier', null)}
              />
            )}
            {verifiedOnly && (
              <FilterTag
                label="Verified"
                onRemove={() => updateFilter('verified', null)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function FilterTag({
  label,
  onRemove,
}: {
  label: string
  onRemove: () => void
}) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] rounded-md text-xs font-medium">
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-[var(--id8-orange)]/20 rounded-full p-0.5"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  )
}

// Compact inline filters for mobile/header
export function InlineFilters({ className = '' }: { className?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentSort = searchParams.get('sort') || 'popular'

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <select
        value={currentSort}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set('sort', e.target.value)
          router.push(`?${params.toString()}`)
        }}
        className="px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--id8-orange)]"
      >
        <option value="popular">Most Popular</option>
        <option value="newest">Newest</option>
        <option value="rating">Highest Rated</option>
        <option value="installs">Most Installs</option>
      </select>
    </div>
  )
}

export default SkillFilters
