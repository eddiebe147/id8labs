'use client'

import { useEffect } from 'react'
import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL

export function UmamiAnalytics() {
  if (!UMAMI_WEBSITE_ID || !UMAMI_URL) return null

  return (
    <Script
      src={`${UMAMI_URL}/script.js`}
      data-website-id={UMAMI_WEBSITE_ID}
      strategy="lazyOnload"
    />
  )
}

export function GoogleAnalytics() {
  // Initialize gtag on client side only to avoid SSR issues
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    if (typeof window === 'undefined') return

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
    // Make gtag available globally
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    })
  }, [])

  if (!GA_MEASUREMENT_ID) return null

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="lazyOnload"
    />
  )
}

// Extend Window type for dataLayer and gtag
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

// Event tracking utility
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as Window & { gtag: (...args: unknown[]) => void }).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Pre-defined events for common actions
export const analytics = {
  // Button clicks
  buttonClick: (buttonName: string, location: string) => {
    trackEvent('click', 'button', `${buttonName} - ${location}`)
  },

  // CTA clicks
  ctaClick: (ctaName: string) => {
    trackEvent('cta_click', 'engagement', ctaName)
  },

  // External link clicks
  externalLink: (url: string) => {
    trackEvent('click', 'external_link', url)
  },

  // Form submissions
  formSubmit: (formName: string) => {
    trackEvent('form_submit', 'conversion', formName)
  },

  // Course interest
  courseInterest: (courseTier: string) => {
    trackEvent('course_interest', 'conversion', courseTier)
  },

  // Product launch
  productLaunch: (productName: string) => {
    trackEvent('product_launch', 'engagement', productName)
  },

  // Page scroll depth
  scrollDepth: (depth: number) => {
    trackEvent('scroll', 'engagement', `${depth}%`, depth)
  },
}
