'use client'

import { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

interface CalEmbedProps {
  calLink: string
  children: React.ReactNode
  className?: string
}

export default function CalEmbed({ calLink, children, className }: CalEmbedProps) {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi()
      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })()
  }, [])

  return (
    <button
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view","theme":"dark"}'
      className={className}
    >
      {children}
    </button>
  )
}
