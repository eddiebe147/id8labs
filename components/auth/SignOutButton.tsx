'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SignOutButtonProps {
  className?: string
  children?: React.ReactNode
}

export function SignOutButton({ className, children }: SignOutButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className={className}
    >
      {children || (loading ? 'Signing out...' : 'Sign out')}
    </button>
  )
}
