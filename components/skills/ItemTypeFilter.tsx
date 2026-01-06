'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Package, Bot, Grid3x3 } from 'lucide-react'

export type ItemType = 'all' | 'skills' | 'agents'

interface ItemTypeFilterProps {
  className?: string
}

export function ItemTypeFilter({ className = '' }: ItemTypeFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentType = (searchParams.get('type') as ItemType) || 'all'

  const handleTypeChange = (type: ItemType) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (type === 'all') {
      params.delete('type')
    } else {
      params.set('type', type)
    }

    router.push(`/skills?${params.toString()}`)
  }

  const filters: { value: ItemType; label: string; icon: React.ReactNode; count?: string }[] = [
    { value: 'all', label: 'All Items', icon: <Grid3x3 className="w-4 h-4" /> },
    { value: 'skills', label: 'Skills', icon: <Package className="w-4 h-4" /> },
    { value: 'agents', label: 'Agents', icon: <Bot className="w-4 h-4" /> },
  ]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-[var(--text-tertiary)] font-medium hidden sm:block">
        Show:
      </span>
      <div className="inline-flex bg-[var(--bg-secondary)] rounded-lg p-1">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleTypeChange(filter.value)}
            className={`
              inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all
              ${
                currentType === filter.value
                  ? 'bg-[var(--bg-primary)] text-[var(--id8-orange)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }
            `}
          >
            {filter.icon}
            <span className="hidden sm:inline">{filter.label}</span>
            <span className="sm:hidden">{filter.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
