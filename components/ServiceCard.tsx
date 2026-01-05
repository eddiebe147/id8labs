'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@/lib/products'
import { CheckIcon, ArrowRightIcon, LoadingSpinner } from '@/components/icons'

// Load Cal.com script once
let calLoaded = false
function loadCalScript() {
  if (calLoaded || typeof window === 'undefined') return

  const existingScript = document.querySelector('script[src*="cal.com/embed"]')
  if (existingScript) {
    calLoaded = true
    return
  }

  const script = document.createElement('script')
  script.src = 'https://app.cal.com/embed/embed.js'
  script.async = true
  document.body.appendChild(script)

  script.onload = () => {
    calLoaded = true
    if ((window as { Cal?: { (action: string, config: object): void } }).Cal) {
      (window as { Cal: { (action: string, config: object): void } }).Cal('init', { origin: 'https://cal.com' })
      ;(window as { Cal: { (action: string, config: object): void } }).Cal('ui', {
        styles: { branding: { brandColor: '#FF6B35' } },
        hideEventTypeDetails: false,
      })
    }
  }
}

interface ServiceCardProps {
  product: Product
  className?: string
}

export function ServiceCard({ product, className = '' }: ServiceCardProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load Cal.com script for booking products
  useEffect(() => {
    if (product.purchaseType === 'booking' && product.calEventTypeSlug) {
      loadCalScript()
    }
  }, [product.purchaseType, product.calEventTypeSlug])

  const handleClick = async () => {
    setError(null)
    setIsLoading(true)

    try {
      switch (product.purchaseType) {
        case 'stripe':
          // Redirect to Stripe checkout
          const response = await fetch('/api/stripe/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: product.id }),
          })

          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.error || 'Failed to create checkout session')
          }

          // Redirect to Stripe
          window.location.href = data.url
          break

        case 'booking':
          // Redirect to Cal.com booking page
          if (product.calEventTypeSlug) {
            // Open Cal.com in a new tab or embed
            const calUrl = `https://cal.com/id8labs/${product.calEventTypeSlug}`
            window.open(calUrl, '_blank')
          } else {
            // Fallback to contact email
            window.location.href = `mailto:eb@id8labs.tech?subject=${encodeURIComponent(product.name)}`
          }
          setIsLoading(false)
          break

        case 'free':
          // Direct navigation to the resource
          if (product.successRedirect) {
            router.push(product.successRedirect)
          }
          break
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsLoading(false)
    }
  }

  const getButtonText = () => {
    if (isLoading) return null

    switch (product.purchaseType) {
      case 'stripe':
        return `Get Access — ${product.priceDisplay}`
      case 'booking':
        return product.price === null ? 'Book Discovery Call' : 'Schedule Session'
      case 'free':
        return 'Start Free'
      default:
        return 'Learn More'
    }
  }

  return (
    <div
      className={`relative overflow-hidden flex flex-col ${
        product.popular ? 'card-featured' : 'card'
      } ${className}`}
    >
      {product.popular && (
        <span className="absolute top-4 right-4 text-xs font-mono uppercase tracking-wider text-id8-orange bg-[var(--id8-orange-light)] px-3 py-1.5 rounded-md">
          Most Popular
        </span>
      )}

      {product.tier && (
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-3">
          {product.tier}
        </p>
      )}

      <h3 className="text-2xl font-bold mb-2 tracking-tight">
        {product.name}
      </h3>

      <div className="mb-5">
        {product.originalPrice && (
          <span className="text-lg text-[var(--text-tertiary)] line-through font-mono mr-2">
            ${(product.originalPrice / 100).toFixed(0)}
          </span>
        )}
        <span className="text-3xl font-bold text-id8-orange font-mono">
          {product.priceDisplay}
        </span>
        {product.duration && (
          <span className="text-sm text-[var(--text-tertiary)] ml-2">
            / {product.duration}
          </span>
        )}
      </div>

      <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
        {product.description}
      </p>

      <ul className="space-y-3 mb-8 flex-grow">
        {product.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-[var(--text-secondary)]"
          >
            <span className="text-id8-orange flex-shrink-0 mt-1">
              <CheckIcon className="w-4 h-4" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      {/* For booking products with Cal.com, use data attributes for modal */}
      {product.purchaseType === 'booking' && product.calEventTypeSlug ? (
        <button
          data-cal-link={`id8labs/${product.calEventTypeSlug}`}
          data-cal-config='{"layout":"month_view"}'
          className="btn btn-primary w-full text-center group inline-flex items-center justify-center gap-2"
        >
          {getButtonText()}
          <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      ) : (
        <button
          onClick={handleClick}
          disabled={isLoading}
          className="btn btn-primary w-full text-center group inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {getButtonText()}
              <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      )}
    </div>
  )
}

export default ServiceCard
