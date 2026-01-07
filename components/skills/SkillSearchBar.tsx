'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Loader2 } from 'lucide-react'
import type { Skill } from '@/lib/skill-types'

interface SkillSearchBarProps {
  placeholder?: string
  onResultSelect?: (skill: Skill) => void
  autoFocus?: boolean
  showResultsInline?: boolean
}

export function SkillSearchBar({
  placeholder = 'Search 187+ skills...',
  onResultSelect,
  autoFocus = false,
  showResultsInline = true,
}: SkillSearchBarProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  // Debounced search via API route
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/skills/search?q=${encodeURIComponent(query)}&limit=8`)
        const data = await response.json()
        setResults(data.skills || [])
        setIsOpen(true)
        setSelectedIndex(-1)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || results.length === 0) {
        if (e.key === 'Enter' && query.trim()) {
          router.push(`/skills/search?q=${encodeURIComponent(query)}`)
        }
        return
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleSelect(results[selectedIndex])
          } else {
            router.push(`/skills/search?q=${encodeURIComponent(query)}`)
          }
          break
        case 'Escape':
          setIsOpen(false)
          inputRef.current?.blur()
          break
      }
    },
    [isOpen, results, selectedIndex, query, router]
  )

  const handleSelect = (skill: Skill) => {
    if (onResultSelect) {
      onResultSelect(skill)
    } else {
      router.push(`/skills/${skill.slug}`)
    }
    setIsOpen(false)
    setQuery('')
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-12 pr-12 py-3.5 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl text-base text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--id8-orange)] focus:ring-2 focus:ring-[var(--id8-orange)]/20 transition-all"
        />
        {isLoading ? (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)] animate-spin" />
        ) : query ? (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[var(--bg-tertiary)] rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-[var(--text-tertiary)]" />
          </button>
        ) : null}
      </div>

      {/* Results Dropdown */}
      {showResultsInline && isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl shadow-xl overflow-hidden z-50"
        >
          <div className="py-2">
            {results.map((skill, index) => (
              <button
                key={skill.id}
                onClick={() => handleSelect(skill)}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${index === selectedIndex
                    ? 'bg-[var(--id8-orange)]/10'
                    : 'hover:bg-[var(--bg-secondary)]'
                  }`}
              >
                <span className="text-xl flex-shrink-0">
                  {getCategoryEmoji(skill.category_id)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{skill.name}</div>
                  <div className="text-sm text-[var(--text-secondary)] truncate">
                    {skill.description}
                  </div>
                </div>
                {skill.verified && (
                  <span className="text-xs text-emerald-500 font-medium">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* View all results */}
          <div className="px-4 py-3 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
            <button
              onClick={() => {
                router.push(`/skills/search?q=${encodeURIComponent(query)}`)
                setIsOpen(false)
              }}
              className="text-sm text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)] font-medium"
            >
              View all results for &quot;{query}&quot; →
            </button>
          </div>
        </div>
      )}

      {/* No results message */}
      {showResultsInline && isOpen && results.length === 0 && query && !isLoading && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl shadow-xl p-6 text-center z-50"
        >
          <p className="text-[var(--text-secondary)]">
            No skills found for &quot;{query}&quot;
          </p>
          <p className="text-sm text-[var(--text-tertiary)] mt-1">
            Try a different search term
          </p>
        </div>
      )}
    </div>
  )
}

function getCategoryEmoji(categoryId: string | null): string {
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
  return CATEGORY_EMOJI[categoryId || 'meta'] || '⚙️'
}

export default SkillSearchBar
