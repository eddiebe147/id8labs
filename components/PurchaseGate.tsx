'use client'

import { useEffect, useState, ReactNode } from 'react'
import Link from 'next/link'
import { hasPurchasedClient } from '@/lib/purchase'
import CheckoutButton from './CheckoutButton'
import type { CourseProductId } from '@/lib/stripe'

interface PurchaseGateProps {
  productId: CourseProductId
  children: ReactNode
  moduleName?: string
}

export function PurchaseGate({ productId, children, moduleName = 'this module' }: PurchaseGateProps) {
  const [isPurchased, setIsPurchased] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkPurchase() {
      try {
        const purchased = await hasPurchasedClient(productId)
        setIsPurchased(purchased)
      } catch (error) {
        console.error('Error checking purchase:', error)
        setIsPurchased(false)
      } finally {
        setLoading(false)
      }
    }

    checkPurchase()
  }, [productId])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[var(--id8-orange)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  // User has purchased - show content
  if (isPurchased) {
    return <>{children}</>
  }

  // User has not purchased - show upgrade prompt
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-4">
      <div className="max-w-lg w-full text-center">
        <div className="card">
          {/* Lock icon */}
          <div className="w-16 h-16 bg-[var(--id8-orange)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-[var(--id8-orange)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold mb-4">
            Unlock {moduleName}
          </h1>

          <p className="text-secondary mb-6">
            This content is part of the complete Claude Code for Knowledge Workers course.
            Get access to all 5 premium modules plus lifetime updates.
          </p>

          {/* What's included */}
          <div className="text-left mb-8 space-y-3">
            <h3 className="font-semibold text-lg">What you'll get:</h3>
            <ul className="space-y-2">
              {[
                'Module 1: Advanced Prompting Mastery',
                'Module 2: Workflow Integration',
                'Module 3: Domain-Specific Applications',
                'Module 4: Automation & Efficiency',
                'Module 5: Future-Proofing Your Skills',
                'Lifetime updates as new features release',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price and CTA */}
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-4xl font-bold">$197</span>
              <span className="text-secondary ml-2">one-time</span>
            </div>

            <CheckoutButton
              productId={productId}
              className="w-full btn btn-primary text-lg py-4"
            />
          </div>

          {/* Back to course link */}
          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <Link
              href="/courses/claude-for-knowledge-workers"
              className="text-sm text-secondary hover:text-[var(--id8-orange)] transition"
            >
              ← Back to course overview
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
