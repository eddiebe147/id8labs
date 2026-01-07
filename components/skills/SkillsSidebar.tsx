'use client'

import { X } from 'lucide-react'
import { FilterSection } from './FilterSection'
import { StarterKitsWidget } from './StarterKitsWidget'
import { HelpAccordion } from './HelpAccordion'
import type { SkillCategory, SkillCollection } from '@/lib/skill-types'

interface SkillsSidebarProps {
  categories: SkillCategory[]
  collections: SkillCollection[]
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
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export function SkillsSidebar({
  categories,
  collections,
  counts,
  selectedType,
  selectedCategories,
  onTypeChange,
  onCategoryToggle,
  onClearFilters,
  isMobileOpen = false,
  onMobileClose,
}: SkillsSidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto lg:top-24
          w-64 lg:w-64 flex-shrink-0
          bg-[var(--bg-primary)] lg:bg-transparent
          border-r lg:border-r-0 border-[var(--border)]
          z-50 lg:z-0
          transition-transform duration-300 lg:transform-none
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto
        `}
        suppressHydrationWarning
      >
        <div className="p-6 space-y-8">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between lg:hidden">
            <h2 className="font-bold text-lg">Filters</h2>
            <button
              onClick={onMobileClose}
              className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Section */}
          <FilterSection
            categories={categories}
            counts={counts}
            selectedType={selectedType}
            selectedCategories={selectedCategories}
            onTypeChange={onTypeChange}
            onCategoryToggle={onCategoryToggle}
            onClearFilters={onClearFilters}
          />

          {/* Divider */}
          <div className="border-t border-[var(--border)]" />

          {/* Starter Kits Widget */}
          <StarterKitsWidget collections={collections} limit={3} />

          {/* Divider */}
          <div className="border-t border-[var(--border)]" />

          {/* Help Accordion */}
          <HelpAccordion />
        </div>
      </aside>
    </>
  )
}
