'use client'

import { useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import SignInModal from './SignInModal'

interface AuthGateProps {
  children: ReactNode
  moduleName?: string
  fallbackUrl?: string
}

/**
 * AuthGate wraps protected content and shows a sign-in modal
 * instead of redirecting to a separate page.
 *
 * When user is not authenticated:
 * - Shows the children content behind a blur
 * - Displays SignInModal overlay
 * - Clicking outside navigates to fallbackUrl (course landing)
 *
 * When user is authenticated:
 * - Renders children normally
 */
export default function AuthGate({
  children,
  moduleName,
  fallbackUrl = '/courses/claude-for-knowledge-workers'
}: AuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)

      // If not authenticated, show modal
      if (!user) {
        setShowModal(true)
      }
    }

    checkAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const isAuthed = !!session?.user
      setIsAuthenticated(isAuthed)

      if (isAuthed) {
        setShowModal(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const handleModalClose = () => {
    // Navigate back to course landing - "let them breathe"
    router.push(fallbackUrl)
  }

  const handleAuthSuccess = () => {
    setShowModal(false)
    setIsAuthenticated(true)
    router.refresh()
  }

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[var(--id8-orange)] border-t-transparent rounded-full animate-spin" />
          <p className="text-[var(--text-secondary)]">Loading...</p>
        </div>
      </div>
    )
  }

  // Authenticated - render children normally
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Not authenticated - show blurred content with modal
  return (
    <>
      {/* Blurred content preview */}
      <div className="filter blur-sm pointer-events-none select-none" aria-hidden="true">
        {children}
      </div>

      {/* Sign-in modal */}
      <SignInModal
        isOpen={showModal}
        onClose={handleModalClose}
        onSuccess={handleAuthSuccess}
        moduleName={moduleName}
      />
    </>
  )
}
