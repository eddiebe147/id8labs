'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, Users, Download } from 'lucide-react'
import Link from 'next/link'

const HELP_ITEMS = [
  {
    id: 'install',
    icon: Download,
    title: 'How to Install',
    content: (
      <div className="space-y-2 text-sm text-[var(--text-secondary)]">
        <p>Three ways to add skills & agents:</p>
        <ol className="list-decimal list-inside space-y-1 ml-2">
          <li>Click "Add to Claude" button</li>
          <li>Install a Starter Kit</li>
          <li>Copy markdown files manually</li>
        </ol>
      </div>
    ),
  },
  {
    id: 'difference',
    icon: Users,
    title: 'Skills vs Agents',
    content: (
      <div className="space-y-2 text-sm text-[var(--text-secondary)]">
        <p><strong className="text-emerald-500">Skills:</strong> Task specialists that do one thing really well.</p>
        <p><strong className="text-purple-500">Agents:</strong> Domain experts that provide strategic guidance.</p>
        <p className="text-xs mt-2">Use agents for context, skills for tasks.</p>
      </div>
    ),
  },
]

export function HelpAccordion() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-blue-500" />
        <h3 className="font-semibold text-sm uppercase tracking-wide text-[var(--text-secondary)]">
          Help
        </h3>
      </div>

      {/* Accordion Items */}
      <div className="space-y-2">
        {HELP_ITEMS.map((item) => {
          const Icon = item.icon
          const isOpen = openItem === item.id

          return (
            <div key={item.id} className="border border-[var(--border)] rounded-lg overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-3 flex items-center gap-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <Icon className="w-4 h-4 text-[var(--text-tertiary)]" />
                <span className="text-sm font-medium text-[var(--text-primary)] flex-1 text-left">
                  {item.title}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-[var(--text-tertiary)]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)]" />
                )}
              </button>
              
              {isOpen && (
                <div className="p-3 bg-[var(--bg-primary)] border-t border-[var(--border)]">
                  {item.content}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Full Guide Link */}
      <Link
        href="/skills/guide"
        className="flex items-center gap-1 text-sm text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)] font-medium transition-colors"
      >
        <BookOpen className="w-4 h-4" />
        View full guide
      </Link>
    </div>
  )
}
