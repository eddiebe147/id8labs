'use client'

import { useState } from 'react'
import { Download, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useStackStore, type SavedStack } from '@/lib/stores/stack-store'

interface ImportStackButtonProps {
  stack: SavedStack
}

export function ImportStackButton({ stack }: ImportStackButtonProps) {
  const router = useRouter()
  const { importStack, savedStacks } = useStackStore()
  const [imported, setImported] = useState(false)

  // Check if already imported
  const alreadyImported = savedStacks.some((s) =>
    s.items.length === stack.items.length &&
    s.items.every((item, index) => item.id === stack.items[index]?.id)
  )

  const handleImport = () => {
    const json = JSON.stringify(stack)
    const imported = importStack(json)
    
    if (imported) {
      setImported(true)
      setTimeout(() => {
        router.push('/skills')
      }, 1500)
    } else {
      alert('Failed to import stack')
    }
  }

  if (alreadyImported) {
    return (
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 text-emerald-500 border-2 border-emerald-500 rounded-lg font-medium">
        <CheckCircle className="w-5 h-5" />
        Already in Your Collection
      </div>
    )
  }

  if (imported) {
    return (
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 text-emerald-500 border-2 border-emerald-500 rounded-lg font-medium">
        <CheckCircle className="w-5 h-5" />
        Stack Imported! Redirecting...
      </div>
    )
  }

  return (
    <button
      onClick={handleImport}
      className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--id8-orange)] text-white rounded-lg hover:bg-[var(--id8-orange-hover)] font-medium transition-colors"
    >
      <Download className="w-5 h-5" />
      Import to My Collection
    </button>
  )
}
