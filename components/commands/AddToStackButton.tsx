'use client'

import { Plus, CheckCircle } from 'lucide-react'
import type { Command } from '@/lib/commands'
import { useStackStore } from '@/lib/stores/stack-store'

interface AddToStackButtonProps {
  command: Command
  fullWidth?: boolean
}

export function AddToStackButton({ command, fullWidth = false }: AddToStackButtonProps) {
  const { addItem, removeItem, isInStack } = useStackStore()
  const inStack = isInStack(command.id)

  const handleClick = () => {
    if (inStack) {
      removeItem(command.id)
    } else {
      addItem({
        id: command.id,
        slug: command.slug,
        name: command.name,
        description: command.description,
        type: 'command',
        category: command.category,
        tags: command.tags,
      })
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
        fullWidth ? 'w-full' : ''
      } ${
        inStack
          ? 'bg-emerald-500/10 text-emerald-500 border-2 border-emerald-500 hover:bg-emerald-500/20'
          : 'bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange-hover)]'
      }`}
    >
      {inStack ? (
        <>
          <CheckCircle className="w-5 h-5" />
          In Stack
        </>
      ) : (
        <>
          <Plus className="w-5 h-5" />
          Add to Stack
        </>
      )}
    </button>
  )
}
