'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { X, Download, Share2, Trash2, ChevronRight, Package, Sparkles } from 'lucide-react'
import { getInstallCommand, type Skill } from '@/lib/skill-client'

const STORAGE_KEY = 'id8labs-skill-stack'

interface SkillStackBuilderProps {
  isOpen?: boolean
  onToggle?: () => void
  className?: string
}

export function SkillStackBuilder({
  isOpen = true,
  onToggle,
  className = '',
}: SkillStackBuilderProps) {
  const [stack, setStack] = useState<Skill[]>([])
  const [copied, setCopied] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setStack(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Failed to load stack:', error)
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stack))
    } catch (error) {
      console.error('Failed to save stack:', error)
    }
  }, [stack])

  const addToStack = useCallback((skill: Skill) => {
    setStack((prev) => {
      if (prev.some((s) => s.id === skill.id)) {
        return prev // Already in stack
      }
      return [...prev, skill]
    })
  }, [])

  const removeFromStack = useCallback((skillId: string) => {
    setStack((prev) => prev.filter((s) => s.id !== skillId))
  }, [])

  const clearStack = useCallback(() => {
    setStack([])
  }, [])

  const isInStack = useCallback(
    (skillId: string) => stack.some((s) => s.id === skillId),
    [stack]
  )

  // Generate combined install script
  const generateInstallScript = useCallback(() => {
    if (stack.length === 0) return ''

    const commands = stack.map((skill) => getInstallCommand(skill, 'curl')).join('\n')
    return `#!/bin/bash
# ID8Labs Skill Stack Installation
# Generated: ${new Date().toISOString()}
# Skills: ${stack.length}

mkdir -p ~/.claude/skills

${commands}

echo "✅ Installed ${stack.length} skills!"
`
  }, [stack])

  const copyInstallScript = async () => {
    const script = generateInstallScript()
    try {
      await navigator.clipboard.writeText(script)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  // Share stack (generate URL with skill slugs)
  const shareStack = async () => {
    const slugs = stack.map((s) => s.slug).join(',')
    const shareUrl = `${window.location.origin}/skills/stack?skills=${slugs}`

    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('Stack URL copied to clipboard!')
    } catch (error) {
      console.error('Failed to share:', error)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40 flex items-center gap-2 px-4 py-3 bg-[var(--id8-orange)] text-white rounded-full shadow-lg hover:bg-[var(--id8-orange-hover)] transition-all"
      >
        <Package className="w-5 h-5" />
        <span className="font-semibold">My Stack</span>
        {stack.length > 0 && (
          <span className="flex items-center justify-center w-6 h-6 bg-white text-[var(--id8-orange)] rounded-full text-sm font-bold">
            {stack.length}
          </span>
        )}
      </button>
    )
  }

  return (
    <aside
      className={`flex flex-col h-full bg-[var(--bg-primary)] border-l border-[var(--border)] ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-[var(--id8-orange)]" />
          <h2 className="font-bold text-lg">My Stack</h2>
          {stack.length > 0 && (
            <span className="px-2 py-0.5 bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] rounded-full text-sm font-semibold">
              {stack.length}
            </span>
          )}
        </div>
        {onToggle && (
          <button
            onClick={onToggle}
            className="p-1.5 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Stack Content */}
      <div className="flex-1 overflow-y-auto">
        {stack.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="w-16 h-16 mb-4 bg-[var(--bg-secondary)] rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[var(--text-tertiary)]" />
            </div>
            <h3 className="font-semibold mb-2">Your stack is empty</h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-[200px]">
              Browse skills and click &quot;Add to Stack&quot; to build your custom setup
            </p>
            <Link
              href="/skills"
              className="mt-4 text-sm text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)] font-medium inline-flex items-center gap-1"
            >
              Browse Skills <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <ul className="p-4 space-y-2">
            {stack.map((skill) => (
              <li
                key={skill.id}
                className="group flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg"
              >
                <Link
                  href={`/skills/${skill.slug}`}
                  className="flex-1 min-w-0 hover:text-[var(--id8-orange)] transition-colors"
                >
                  <span className="font-medium text-sm truncate block">
                    {skill.name}
                  </span>
                </Link>
                <button
                  onClick={() => removeFromStack(skill.id)}
                  className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-[var(--bg-tertiary)] rounded-md transition-all"
                  title="Remove from stack"
                >
                  <X className="w-4 h-4 text-[var(--text-tertiary)]" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions */}
      {stack.length > 0 && (
        <div className="p-4 border-t border-[var(--border)] space-y-3">
          {/* Install All */}
          <button
            onClick={copyInstallScript}
            className="w-full btn btn-primary justify-center"
          >
            <Download className="w-5 h-5" />
            {copied ? 'Copied!' : 'Install All'}
          </button>

          {/* Secondary Actions */}
          <div className="flex gap-2">
            <button
              onClick={shareStack}
              className="flex-1 btn btn-ghost justify-center py-2 text-sm"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={clearStack}
              className="flex-1 btn btn-ghost justify-center py-2 text-sm text-red-500 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}

// Hook for using stack state across components
export function useSkillStack() {
  const [stack, setStack] = useState<Skill[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setStack(JSON.parse(saved))
      }
    } catch {
      // Ignore
    }

    // Listen for storage changes from other tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setStack(JSON.parse(e.newValue))
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const addToStack = useCallback((skill: Skill) => {
    setStack((prev) => {
      if (prev.some((s) => s.id === skill.id)) return prev
      const newStack = [...prev, skill]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStack))
      return newStack
    })
  }, [])

  const removeFromStack = useCallback((skillId: string) => {
    setStack((prev) => {
      const newStack = prev.filter((s) => s.id !== skillId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStack))
      return newStack
    })
  }, [])

  const isInStack = useCallback(
    (skillId: string) => stack.some((s) => s.id === skillId),
    [stack]
  )

  const clearStack = useCallback(() => {
    setStack([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return {
    stack,
    addToStack,
    removeFromStack,
    isInStack,
    clearStack,
    count: stack.length,
  }
}

export default SkillStackBuilder
