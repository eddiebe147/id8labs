'use client'

import { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

const CAL_LINK = 'eddie-belaval-x343gh'

export default function BookCallCard() {
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
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view","theme":"dark"}'
      className="group flex flex-col p-8 bg-[var(--surface)] border border-[var(--border)] rounded-lg hover:border-[var(--id8-orange)] transition-all duration-300 text-left w-full cursor-pointer"
    >
      <div className="mb-6 transition-colors duration-300 text-[#10B981]">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
      <h2 className="text-xl font-bold mb-3 group-hover:text-id8-orange transition-colors">
        Book a Call
      </h2>
      <p className="text-[var(--text-secondary)] mb-6 flex-grow">
        Skip the back-and-forth. Grab a time that works and let&apos;s talk live.
      </p>
      <div className="inline-flex items-center gap-2 font-semibold text-[#10B981]">
        Schedule Now
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </button>
  )
}
