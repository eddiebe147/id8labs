'use client'

import { Filter, X } from 'lucide-react'
import type { SkillCategory } from '@/lib/skill-types'

interface FilterSectionProps {
  categories: SkillCategory[]
  counts: {
    total: number
    skills: number
    agents: number
    byCategory: Record<string, number>
  }
  selectedType: 'all' | 'skills' | 'agents'
  selectedCategories: string[]
  onTypeChange: (type: 'all' | 'skills' | 'agents') => void
  onCategoryToggle: (categoryId: string) => void
  onClearFilters: () => void
}

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

export function FilterSection({
  categories,
  counts,
  selectedType,
  selectedCategories,
  onTypeChange,
  onCategoryToggle,
  onClearFilters,
}: FilterSectionProps) {
  const hasActiveFilters = selectedType !== 'all' || selectedCategories.length > 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[var(--text-secondary)]" />
          <h3 className="font-semibold text-sm uppercase tracking-wide text-[var(--text-secondary)]">
            Filters
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)] flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Type Filter */}
      <div>
        <h4 className="text-sm font-medium mb-3">Type</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="type"
              value="all"
              checked={selectedType === 'all'}
              onChange={() => onTypeChange('all')}
              className="w-4 h-4 text-[var(--id8-orange)] border-[var(--border)] focus:ring-[var(--id8-orange)] focus:ring-offset-0"
            />
            <span className="text-sm flex-1 group-hover:text-[var(--text-primary)] transition-colors">
              All Items
            </span>
            <span className="text-xs text-[var(--text-tertiary)] font-medium">
              {counts.total}
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="type"
              value="skills"
              checked={selectedType === 'skills'}
              onChange={() => onTypeChange('skills')}
              className="w-4 h-4 text-[var(--id8-orange)] border-[var(--border)] focus:ring-[var(--id8-orange)] focus:ring-offset-0"
            />
            <span className="text-sm flex-1 group-hover:text-[var(--text-primary)] transition-colors">
              Skills
            </span>
            <span className="text-xs text-[var(--text-tertiary)] font-medium">
              {counts.skills}
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="type"
              value="agents"
              checked={selectedType === 'agents'}
              onChange={() => onTypeChange('agents')}
              className="w-4 h-4 text-[var(--id8-orange)] border-[var(--border)] focus:ring-[var(--id8-orange)] focus:ring-offset-0"
            />
            <span className="text-sm flex-1 group-hover:text-[var(--text-primary)] transition-colors">
              Agents
            </span>
            <span className="text-xs text-[var(--text-tertiary)] font-medium">
              {counts.agents}
            </span>
          </label>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)]" />

      {/* Category Filter */}
      <div>
        <h4 className="text-sm font-medium mb-3">Categories</h4>
        <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-thin">
          {categories.map((category) => {
            const emoji = CATEGORY_EMOJI[category.id] || '📦'
            const count = counts.byCategory[category.id] || 0
            const isSelected = selectedCategories.includes(category.id)

            return (
              <label
                key={category.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onCategoryToggle(category.id)}
                  className="w-4 h-4 text-[var(--id8-orange)] border-[var(--border)] rounded focus:ring-[var(--id8-orange)] focus:ring-offset-0"
                />
                <span className="text-lg">{emoji}</span>
                <span className="text-sm flex-1 group-hover:text-[var(--text-primary)] transition-colors">
                  {category.name}
                </span>
                <span className="text-xs text-[var(--text-tertiary)] font-medium">
                  {count}
                </span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}
