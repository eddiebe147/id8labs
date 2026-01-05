'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { m } from '@/components/motion'
import { useFoundationGate } from '@/hooks/useProgress'

interface FoundationGateProps {
  children: ReactNode
  fallback?: ReactNode
}

const LockIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function FoundationGate({ children, fallback }: FoundationGateProps) {
  const { isLocked, loading, foundationPath, foundationTitle } = useFoundationGate()

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-id8-orange border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Show content if unlocked
  if (!isLocked) {
    return <>{children}</>
  }

  // Show custom fallback if provided
  if (fallback) {
    return <>{fallback}</>
  }

  // Default locked state
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[60vh] flex items-center justify-center"
    >
      <div className="max-w-md text-center px-6">
        <m.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-tertiary)] mb-6"
        >
          <LockIcon />
        </m.div>

        <h2 className="text-2xl font-semibold mb-3">Course Locked</h2>

        <p className="text-[var(--text-secondary)] mb-6">
          Complete the foundation course first to unlock this content.
          It provides the essential skills you&apos;ll need for everything that follows.
        </p>

        <Link
          href={foundationPath}
          className="btn btn-primary group inline-flex items-center gap-2"
        >
          Start {foundationTitle}
          <ArrowRightIcon />
        </Link>

        <p className="text-xs text-[var(--text-tertiary)] mt-4">
          6 modules &middot; ~45 minutes
        </p>
      </div>
    </m.div>
  )
}
