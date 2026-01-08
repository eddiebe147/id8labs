'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, Download, Copy, CheckCircle } from 'lucide-react'
import type { DbStack } from '@/lib/stacks-db'
import { forkStack } from '@/lib/stacks-db-client'
import { useRouter } from 'next/navigation'

interface GalleryStackCardProps {
  stack: DbStack
}

export function GalleryStackCard({ stack }: GalleryStackCardProps) {
  const router = useRouter()
  const [forking, setForking] = useState(false)
  const [forked, setForked] = useState(false)

  const handleFork = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setForking(true)

    try {
      const newStackId = await forkStack(stack.id, `${stack.name} (forked)`)
      if (newStackId) {
        setForked(true)
        setTimeout(() => router.push('/profile'), 1500)
      } else {
        alert('Please sign in to fork stacks')
      }
    } catch (error) {
      alert('Failed to fork stack')
    } finally {
      setForking(false)
    }
  }

  return (
    <Link href={`/gallery/${stack.share_id}`}>
      <article className="card group hover-lift h-full flex flex-col">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-[var(--id8-orange)]/20 rounded-lg">
            <Package className="w-6 h-6 text-[var(--id8-orange)]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg mb-1 group-hover:text-[var(--id8-orange)] transition-colors line-clamp-1">
              {stack.name}
            </h3>
            {stack.description && (
              <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                {stack.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-[var(--text-secondary)]">
          <span>{stack.items?.length || 0} items</span>
        </div>

        <div className="mt-auto pt-4 border-t border-[var(--border)]">
          <button
            onClick={handleFork}
            disabled={forking || forked}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              forked
                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500'
                : 'bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange-hover)]'
            }`}
          >
            {forked ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Forked!
              </>
            ) : forking ? (
              'Forking...'
            ) : (
              <>
                <Download className="w-4 h-4" />
                Fork
              </>
            )}
          </button>
        </div>
      </article>
    </Link>
  )
}
