'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { SkillGeneratorModal } from './SkillGeneratorModal'

interface GenerateSkillButtonProps {
  variant?: 'primary' | 'secondary'
  className?: string
}

export function GenerateSkillButton({
  variant = 'primary',
  className = '',
}: GenerateSkillButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSaved = (skillId: string) => {
    // Could redirect to the skill page or show a toast
    console.log('Skill saved with ID:', skillId)
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
        <Sparkles className="w-4 h-4" />
        Generate with AI
      </button>

      <SkillGeneratorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSaved={handleSaved}
      />
    </>
  )
}
