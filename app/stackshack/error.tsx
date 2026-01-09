'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props): React.JSX.Element {
  useEffect(() => {
    console.error('StackShack Error:', error)
  }, [error])

  return (
    <div className="container py-20 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <div className="text-red-500 mb-8 max-w-lg mx-auto bg-[var(--bg-secondary)] p-4 rounded text-left overflow-auto">
        <p>{error.message}</p>
        {error.digest && (
          <span className="block text-xs mt-2 text-[var(--text-tertiary)]">
            Digest: {error.digest}
          </span>
        )}
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-[var(--id8-orange)] text-white rounded hover:bg-[var(--id8-orange-hover)] transition-colors"
        >
          Try again
        </button>
        <Link
          href="/stackshack"
          className="px-4 py-2 border border-[var(--border)] rounded hover:bg-[var(--bg-secondary)] transition-colors"
        >
          Back to StackShack
        </Link>
      </div>
    </div>
  )
}
