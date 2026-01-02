'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { PRODUCTS } from '@/lib/products'

const CheckCircleIcon = () => (
  <svg className="w-16 h-16 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const MailIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const BookIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
)

function SuccessContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const sessionId = searchParams.get('session_id')

  // Get product info based on type
  const product = type ? PRODUCTS[type] : null

  // Determine what type of success this is
  const isBooking = product?.purchaseType === 'booking'
  const isCourse = product?.purchaseType === 'stripe'
  const isFree = product?.purchaseType === 'free'

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="container max-w-2xl">
        <div className="card text-center p-12">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <CheckCircleIcon />
          </div>

          {/* Main Message */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {isBooking ? "You're Booked!" : isCourse ? "Welcome Aboard!" : "Success!"}
          </h1>

          <p className="text-xl text-[var(--text-secondary)] mb-8">
            {product?.name ? (
              <>Thank you for choosing <span className="text-id8-orange font-semibold">{product.name}</span></>
            ) : (
              "Your request has been received"
            )}
          </p>

          {/* Next Steps */}
          <div className="bg-[var(--bg-secondary)] rounded-xl p-6 mb-8 text-left">
            <h2 className="font-semibold text-lg mb-4">What happens next:</h2>

            <ul className="space-y-4">
              {isBooking && (
                <>
                  <li className="flex items-start gap-3">
                    <span className="text-id8-orange mt-0.5"><CalendarIcon /></span>
                    <div>
                      <p className="font-medium">Check your calendar</p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        You'll receive a calendar invite with the session details and Zoom link.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-id8-orange mt-0.5"><MailIcon /></span>
                    <div>
                      <p className="font-medium">Prep materials incoming</p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        I'll send you a short questionnaire to make our time together as valuable as possible.
                      </p>
                    </div>
                  </li>
                </>
              )}

              {isCourse && (
                <>
                  <li className="flex items-start gap-3">
                    <span className="text-id8-orange mt-0.5"><BookIcon /></span>
                    <div>
                      <p className="font-medium">Your access is active</p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        All course modules are now unlocked. Start with Module 1 when you're ready.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-id8-orange mt-0.5"><MailIcon /></span>
                    <div>
                      <p className="font-medium">Receipt sent</p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Check your email for your purchase confirmation and receipt.
                      </p>
                    </div>
                  </li>
                </>
              )}

              {!isBooking && !isCourse && (
                <li className="flex items-start gap-3">
                  <span className="text-id8-orange mt-0.5"><MailIcon /></span>
                  <div>
                    <p className="font-medium">Confirmation email sent</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Check your inbox for next steps and access details.
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Access Instructions */}
          {product?.accessInstructions && (
            <p className="text-[var(--text-secondary)] mb-8 italic">
              "{product.accessInstructions}"
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isCourse && (
              <Link
                href="/courses/claude-for-knowledge-workers/module-1"
                className="btn btn-primary inline-flex items-center justify-center gap-2"
              >
                Start Module 1
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            )}

            <Link
              href="/services"
              className="btn bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50"
            >
              Back to Services
            </Link>
          </div>

          {/* Support Note */}
          <p className="mt-8 text-sm text-[var(--text-tertiary)]">
            Questions? Reach out at{' '}
            <a href="mailto:eb@id8labs.tech" className="text-id8-orange hover:underline">
              eb@id8labs.tech
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[var(--text-secondary)]">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
