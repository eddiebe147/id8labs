'use client'

import { StackBuilder } from './StackBuilder'

/**
 * Desktop-only wrapper for StackBuilder sidebar
 * Hidden on mobile (uses StackFloatingButton instead)
 */
export function StackBuilderWrapper() {
  return (
    <div className="hidden lg:block">
      <StackBuilder />
    </div>
  )
}
