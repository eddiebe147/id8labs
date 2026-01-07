'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { SkillsSidebar } from './SkillsSidebar'
import { SkillsGrid } from './SkillsGrid'
import type { Skill, SkillCategory, SkillCollection } from '@/lib/skill-types'

interface SkillsPageContentProps {
  skills: Skill[]
  categories: SkillCategory[]
  collections: SkillCollection[]
  counts: {
    total: number
    skills: number
    agents: number
    byCategory: Record<string, number>
  }
}

export function SkillsPageContent({
  skills,
  categories,
  collections,
  counts,
}: SkillsPageContentProps) {
  const [selectedType, setSelectedType] = useState<'all' | 'skills' | 'agents'>('all')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleTypeChange = (type: 'all' | 'skills' | 'agents') => {
    setSelectedType(type)
  }

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleClearFilters = () => {
    setSelectedType('all')
    setSelectedCategories([])
  }

  return (
    <div className="container py-8" suppressHydrationWarning>
      <div className="flex gap-8">
        {/* Sidebar */}
        <SkillsSidebar
          categories={categories}
          collections={collections}
          counts={counts}
          selectedType={selectedType}
          selectedCategories={selectedCategories}
          onTypeChange={handleTypeChange}
          onCategoryToggle={handleCategoryToggle}
          onClearFilters={handleClearFilters}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile Filter Button */}
          <div className="mb-6 lg:hidden">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <Menu className="w-5 h-5" />
              <span className="font-medium">Filters</span>
              {(selectedType !== 'all' || selectedCategories.length > 0) && (
                <span className="px-2 py-0.5 bg-[var(--id8-orange)] text-white text-xs rounded-full">
                  {(selectedType !== 'all' ? 1 : 0) + selectedCategories.length}
                </span>
              )}
            </button>
          </div>

          {/* Skills Grid */}
          <SkillsGrid
            skills={skills}
            selectedType={selectedType}
            selectedCategories={selectedCategories}
          />
        </div>
      </div>
    </div>
  )
}
