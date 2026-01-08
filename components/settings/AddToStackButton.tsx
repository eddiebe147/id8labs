'use client'

import { Plus, CheckCircle } from 'lucide-react'
import type { Setting } from '@/lib/settings'
import { useStackStore } from '@/lib/stores/stack-store'

interface AddToStackButtonProps {
  setting: Setting
  fullWidth?: boolean
}

export function AddToStackButton({ setting, fullWidth = false }: AddToStackButtonProps) {
  const { addItem, removeItem, isInStack } = useStackStore()
  const inStack = isInStack(setting.id)

  const handleClick = () => {
    if (inStack) {
      removeItem(setting.id)
    } else {
      addItem({
        id: setting.id,
        slug: setting.slug,
        name: setting.name,
        description: setting.description,
        type: 'setting',
        category: setting.category,
        tags: setting.tags,
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
