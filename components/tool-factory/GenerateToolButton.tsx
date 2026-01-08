'use client'

import { useState } from 'react'
import { Wand2 } from 'lucide-react'
import { ToolFactoryModal } from './ToolFactoryModal'
import type { ToolType } from '@/lib/tool-factory/types'

interface GenerateToolButtonProps {
  variant?: 'primary' | 'secondary'
  className?: string
  initialToolType?: ToolType
}

export function GenerateToolButton({
  variant = 'primary',
  className = '',
  initialToolType = 'skill',
}: GenerateToolButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSaved = (toolId: string, toolType: ToolType) => {
    console.log(`${toolType} saved with ID:`, toolId)
  }

  const baseClasses =
    'inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all'
  const variantClasses =
    variant === 'primary'
      ? 'bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange-hover)] shadow-lg shadow-[var(--id8-orange)]/20'
      : 'bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--id8-orange)] hover:text-[var(--id8-orange)]'

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        <Wand2 className="w-4 h-4" />
        AI Tool Factory
      </button>

      <ToolFactoryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSaved={handleSaved}
        initialToolType={initialToolType}
      />
    </>
  )
}
