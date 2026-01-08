'use client'

import { useEffect, useState } from 'react'
import { Package, Globe, Lock, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { makeStackPublic } from '@/lib/stacks-db-client'
import type { DbStack } from '@/lib/stacks-db'

interface UserStacksListProps {
  userId: string
}

export function UserStacksList({ userId }: UserStacksListProps) {
  const [stacks, setStacks] = useState<DbStack[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStacks()
  }, [userId])

  const loadStacks = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('user_skill_stacks')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })

      if (error) throw error
      setStacks(data || [])
    } catch (error) {
      console.error('Failed to load stacks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMakePublic = async (stackId: string) => {
    if (!confirm('Make this stack public?')) return
    const shareId = await makeStackPublic(stackId)
    if (shareId) {
      alert('Stack is now public!')
      loadStacks()
    }
  }

  const handleDelete = async (stackId: string, stackName: string) => {
    if (!confirm(`Delete "${stackName}"?`)) return
    try {
      const supabase = createClient()
      await supabase.from('user_skill_stacks').delete().eq('id', stackId)
      alert('Stack deleted')
      loadStacks()
    } catch (error) {
      alert('Failed to delete stack')
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (stacks.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto mb-4 text-[var(--text-secondary)]" />
        <h3 className="text-2xl font-bold mb-2">No Stacks Yet</h3>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {stacks.map((stack) => (
        <div key={stack.id} className="card">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold">{stack.name}</h3>
                {stack.is_public ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full">
                    <Globe className="w-3 h-3" />
                    Public
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-[var(--bg-secondary)] rounded-full">
                    <Lock className="w-3 h-3" />
                    Private
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-[var(--border)]">
            {!stack.is_public && (
              <button
                onClick={() => handleMakePublic(stack.id)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[var(--id8-orange)] text-white rounded-lg hover:bg-[var(--id8-orange-hover)] text-sm"
              >
                <Globe className="w-4 h-4" />
                Make Public
              </button>
            )}
            <button
              onClick={() => handleDelete(stack.id, stack.name)}
              className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 text-sm ml-auto"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
