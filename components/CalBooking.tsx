'use client'

import { useEffect } from 'react'

interface CalBookingProps {
  calLink: string // e.g., "id8labs/workshop" or full URL
  className?: string
}

// Cal.com types - using module augmentation pattern
type CalFunction = {
  (action: string, ...args: unknown[]): void
  ns?: Record<string, unknown>
  q?: unknown[]
  loaded?: boolean
}

export function CalBooking({ calLink, className = '' }: CalBookingProps) {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      const Cal = (window as unknown as { Cal?: CalFunction }).Cal
      if (Cal) {
        Cal('init', { origin: 'https://cal.com' })
      }
    }

    return () => {
      // Cleanup
      document.body.removeChild(script)
    }
  }, [])

  // Normalize the cal link
  const normalizedLink = calLink.startsWith('http')
    ? calLink.replace('https://cal.com/', '')
    : calLink

  return (
    <div className={className}>
      <div
        data-cal-link={normalizedLink}
        data-cal-config='{"layout":"month_view"}'
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      />
    </div>
  )
}

interface CalButtonProps {
  calLink: string
  children: React.ReactNode
  className?: string
}

export function CalButton({ calLink, children, className = '' }: CalButtonProps) {
  useEffect(() => {
    // Load Cal.com embed script
    const existingScript = document.querySelector('script[src*="cal.com/embed"]')
    if (existingScript) return

    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      const Cal = (window as unknown as { Cal?: CalFunction }).Cal
      if (Cal) {
        Cal('init', { origin: 'https://cal.com' })

        // Configure the modal
        Cal('ui', {
          styles: { branding: { brandColor: '#FF6B35' } },
          hideEventTypeDetails: false,
        })
      }
    }
  }, [])

  const normalizedLink = calLink.startsWith('http')
    ? calLink.replace('https://cal.com/', '')
    : calLink

  return (
    <button
      data-cal-link={normalizedLink}
      data-cal-config='{"layout":"month_view"}'
      className={className}
    >
      {children}
    </button>
  )
}

export default CalBooking
