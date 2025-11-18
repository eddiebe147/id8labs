'use client'

import { useEffect } from 'react'

/**
 * Dark Mode Only Theme Provider
 * Light mode removed - LED halftone background requires dark mode
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Force dark mode always
    document.documentElement.classList.add('dark')
  }, [])

  return <>{children}</>
}
