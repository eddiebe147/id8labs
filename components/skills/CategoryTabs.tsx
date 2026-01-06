'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import type { SkillCategory } from '@/lib/skill-types'

// Category emoji and color mapping
const CATEGORY_CONFIG: Record<string, { emoji: string; color: string }> = {
  documents: { emoji: '📄', color: 'text-blue-500' },
  communication: { emoji: '📬', color: 'text-green-500' },
  research: { emoji: '🔍', color: 'text-purple-500' },
  writing: { emoji: '✍️', color: 'text-pink-500' },
  design: { emoji: '🎨', color: 'text-orange-500' },
  code: { emoji: '💻', color: 'text-cyan-500' },
  project: { emoji: '📋', color: 'text-amber-500' },
  business: { emoji: '💼', color: 'text-indigo-500' },
  domain: { emoji: '🏢', color: 'text-teal-500' },
  personal: { emoji: '👤', color: 'text-rose-500' },
  meta: { emoji: '⚙️', color: 'text-gray-500' },
}

interface CategoryTabsProps {
  categories: SkillCategory[]
  selectedCategory?: string
  variant?: 'tabs' | 'pills' | 'dropdown'
  showAll?: boolean
  className?: string
}

export function CategoryTabs({
  categories,
  selectedCategory,
  variant = 'tabs',
  showAll = true,
  className = '',
}: CategoryTabsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentCategory = selectedCategory || searchParams.get('category') || null

  if (variant === 'dropdown') {
    return (
      <select
        value={currentCategory || ''}
        onChange={(e) => {
          const url = new URL(window.location.href)
          if (e.target.value) {
            url.searchParams.set('category', e.target.value)
          } else {
            url.searchParams.delete('category')
          }
          window.location.href = url.toString()
        }}
        className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]/20"
      >
        {showAll && <option value="">All Categories</option>}
        {categories.map((category) => {
          const config = CATEGORY_CONFIG[category.id] || CATEGORY_CONFIG.meta
          return (
            <option key={category.id} value={category.id}>
              {config.emoji} {category.name}
            </option>
          )
        })}
      </select>
    )
  }

  if (variant === 'pills') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {showAll && (
          <Link
            href={pathname}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !currentCategory
                ? 'bg-[var(--id8-orange)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            All
          </Link>
        )}
        {categories.map((category) => {
          const config = CATEGORY_CONFIG[category.id] || CATEGORY_CONFIG.meta
          const isActive = currentCategory === category.id

          return (
            <Link
              key={category.id}
              href={`${pathname}?category=${category.id}`}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[var(--id8-orange)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              <span>{config.emoji}</span>
              <span>{category.name}</span>
            </Link>
          )
        })}
      </div>
    )
  }

  // Default: tabs variant
  return (
    <div className={`flex overflow-x-auto scrollbar-hide ${className}`}>
      <div className="flex gap-1 p-1 bg-[var(--bg-secondary)] rounded-xl">
        {showAll && (
          <Link
            href={pathname}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              !currentCategory
                ? 'bg-[var(--bg-primary)] shadow-sm text-[var(--text-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            All
          </Link>
        )}
        {categories.map((category) => {
          const config = CATEGORY_CONFIG[category.id] || CATEGORY_CONFIG.meta
          const isActive = currentCategory === category.id

          return (
            <Link
              key={category.id}
              href={`${pathname}?category=${category.id}`}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[var(--bg-primary)] shadow-sm text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>{config.emoji}</span>
              <span>{category.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// Simpler category list for sidebar/footer
export function CategoryList({
  categories,
  className = '',
}: {
  categories: SkillCategory[]
  className?: string
}) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {categories.map((category) => {
        const config = CATEGORY_CONFIG[category.id] || CATEGORY_CONFIG.meta
        return (
          <li key={category.id}>
            <Link
              href={`/skills/categories/${category.id}`}
              className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--id8-orange)] transition-colors"
            >
              <span>{config.emoji}</span>
              <span>{category.name}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

// Category badge component
export function CategoryBadge({
  categoryId,
  categoryName,
  size = 'default',
}: {
  categoryId: string
  categoryName?: string
  size?: 'sm' | 'default' | 'lg'
}) {
  const config = CATEGORY_CONFIG[categoryId] || CATEGORY_CONFIG.meta

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    default: 'px-2.5 py-1 text-sm gap-1.5',
    lg: 'px-3 py-1.5 text-base gap-2',
  }

  return (
    <Link
      href={`/skills/categories/${categoryId}`}
      className={`inline-flex items-center ${sizeClasses[size]} bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-full hover:bg-[var(--bg-tertiary)] transition-colors`}
    >
      <span>{config.emoji}</span>
      {categoryName && <span className="font-medium">{categoryName}</span>}
    </Link>
  )
}

export default CategoryTabs
