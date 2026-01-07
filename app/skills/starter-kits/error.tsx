'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { ArrowLeft, Package, RefreshCw, AlertTriangle } from 'lucide-react'

export default function StarterKitsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[StarterKits ErrorBoundary]', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    })
  }, [error])

  return (
    <main className="min-h-screen">
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="container py-8">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--id8-orange)] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Starter Kits</h1>
              <p className="text-[var(--text-secondary)] mt-1">
                Curated skill bundles for common workflows
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-6">
            We encountered an unexpected error while loading the starter kits.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-lg max-w-lg mx-auto">
              <p className="text-xs text-red-500 font-mono text-left break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-[var(--text-tertiary)] mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--id8-orange)] text-white rounded-lg hover:bg-[var(--id8-orange-hover)] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
            >
              Browse all skills
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
