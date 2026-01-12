'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

// Initialize PostHog
if (typeof window !== 'undefined' && POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: false, // We capture manually for SPA navigation
    capture_pageleave: true,
    autocapture: true,
    // Session recording settings
    session_recording: {
      maskAllInputs: false,
      maskInputOptions: {
        password: true,
        email: false,
      },
    },
  })
}

// Page view tracker component (inner)
function PostHogPageViewInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && POSTHOG_KEY) {
      let url = window.origin + pathname
      if (searchParams?.toString()) {
        url = url + '?' + searchParams.toString()
      }
      posthog.capture('$pageview', {
        $current_url: url,
      })
    }
  }, [pathname, searchParams])

  return null
}

// Wrapped with Suspense for Next.js 14 compatibility
function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageViewInner />
    </Suspense>
  )
}

// Main provider component
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!POSTHOG_KEY) {
    return <>{children}</>
  }

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  )
}

// Export posthog instance for manual event tracking
export { posthog }

// Convenience functions for common tracking patterns
export const analytics = {
  // Track custom events
  track: (event: string, properties?: Record<string, unknown>) => {
    if (POSTHOG_KEY) {
      posthog.capture(event, properties)
    }
  },

  // Identify users (for logged-in experiences)
  identify: (userId: string, properties?: Record<string, unknown>) => {
    if (POSTHOG_KEY) {
      posthog.identify(userId, properties)
    }
  },

  // Reset identity (on logout)
  reset: () => {
    if (POSTHOG_KEY) {
      posthog.reset()
    }
  },

  // Feature flags
  isFeatureEnabled: (flag: string) => {
    if (POSTHOG_KEY) {
      return posthog.isFeatureEnabled(flag)
    }
    return false
  },

  // Track button clicks
  buttonClick: (buttonName: string, location: string) => {
    if (POSTHOG_KEY) {
      posthog.capture('button_click', {
        button_name: buttonName,
        location,
      })
    }
  },

  // Track CTA interactions
  ctaClick: (ctaName: string, destination?: string) => {
    if (POSTHOG_KEY) {
      posthog.capture('cta_click', {
        cta_name: ctaName,
        destination,
      })
    }
  },

  // Track form submissions
  formSubmit: (formName: string, success: boolean) => {
    if (POSTHOG_KEY) {
      posthog.capture('form_submit', {
        form_name: formName,
        success,
      })
    }
  },

  // Track course/product interest
  productInterest: (productName: string, action: string) => {
    if (POSTHOG_KEY) {
      posthog.capture('product_interest', {
        product_name: productName,
        action,
      })
    }
  },

  // Track external link clicks
  externalLink: (url: string, linkText?: string) => {
    if (POSTHOG_KEY) {
      posthog.capture('external_link_click', {
        url,
        link_text: linkText,
      })
    }
  },
}
