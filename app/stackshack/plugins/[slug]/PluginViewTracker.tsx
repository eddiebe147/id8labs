'use client'

import { useEffect, useRef } from 'react'

interface PluginViewTrackerProps {
  pluginId: string
}

export function PluginViewTracker({ pluginId }: PluginViewTrackerProps) {
  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current) return
    tracked.current = true

    // Track view via API
    fetch('/api/plugins/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pluginId }),
    }).catch(() => {
      // Silently fail - view tracking is non-critical
    })
  }, [pluginId])

  return null
}
