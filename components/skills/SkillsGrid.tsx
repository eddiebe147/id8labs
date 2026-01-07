'use client'

import { useState, useEffect, useMemo } from 'react'
import { SkillCard } from './SkillCard'
import type { Skill } from '@/lib/skill-types'

interface SkillsGridProps {
  skills: Skill[]
  selectedType: 'all' | 'skills' | 'agents'
  selectedCategories: string[]
}

export function SkillsGrid({
  skills,
  selectedType,
  selectedCategories,
}: SkillsGridProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter skills based on selected filters
  const filteredSkills = useMemo(() => {
    let filtered = [...skills]

    // Filter by type (skills vs agents)
    // Agents have 'agent' tag, skills don't
    if (selectedType === 'skills') {
      filtered = filtered.filter((skill) => !skill.tags?.includes('agent'))
    } else if (selectedType === 'agents') {
      filtered = filtered.filter((skill) => skill.tags?.includes('agent'))
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((skill) =>
        selectedCategories.includes(skill.category_id || '')
      )
    }

    // Filter out invalid skills (no name)
    filtered = filtered.filter((skill) => skill.name && skill.name.trim().length > 0)

    return filtered
  }, [skills, selectedType, selectedCategories])

  // Sort: featured first, then by name
  const sortedSkills = useMemo(() => {
    return [...filteredSkills].sort((a, b) => {
      // Featured items first
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      // Then alphabetical
      return a.name.localeCompare(b.name)
    })
  }, [filteredSkills])

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" suppressHydrationWarning>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-64 bg-[var(--bg-secondary)] rounded-xl animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (sortedSkills.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center">
          <span className="text-3xl">🔍</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">No skills found</h3>
        <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-6">
          Try adjusting your filters or clearing them to see all available skills and agents.
        </p>
      </div>
    )
  }

  return (
    <div suppressHydrationWarning>
      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between" suppressHydrationWarning>
        <p className="text-sm text-[var(--text-secondary)]">
          Showing <span className="font-semibold text-[var(--text-primary)]">{sortedSkills.length}</span> of {skills.length} items
        </p>
        
        {/* Optional: Add sort dropdown here */}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  )
}
