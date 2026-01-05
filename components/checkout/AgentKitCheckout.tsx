'use client'

import { useState, useEffect } from 'react'
import { X, Github, Loader2, AlertCircle, Check, Package, ExternalLink, LogIn } from 'lucide-react'
import { AnimatePresence, m } from '@/components/motion'
import { getProduct } from '@/lib/products'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

interface AgentKitCheckoutProps {
  productId: string
  isOpen: boolean
  onClose: () => void
}

export default function AgentKitCheckout({
  productId,
  isOpen,
  onClose,
}: AgentKitCheckoutProps) {
  const [githubUsername, setGithubUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isValid, setIsValid] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  const product = getProduct(productId)

  // Check auth state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsCheckingAuth(true)
      supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user)
        setIsCheckingAuth(false)
      })
    }
  }, [isOpen, supabase.auth])

  // Validate GitHub username format
  useEffect(() => {
    if (!githubUsername) {
      setIsValid(false)
      return
    }
    // GitHub usernames: 1-39 chars, alphanumeric + hyphens, can't start/end with hyphen
    const pattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/
    setIsValid(pattern.test(githubUsername))
  }, [githubUsername])

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setGithubUsername('')
      setError(null)
      setIsLoading(false)
      setIsCheckingAuth(true)
    }
  }, [isOpen])

  function handleSignIn() {
    // Redirect to sign-in with return URL
    const returnUrl = `/products/agent-kits?checkout=${productId}`
    router.push(`/sign-in?redirect=${encodeURIComponent(returnUrl)}`)
    onClose()
  }

  async function handleCheckout() {
    if (!isValid || !product) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          githubUsername: githubUsername.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsLoading(false)
    }
  }

  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
          />

          {/* Modal */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-md"
          >
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{product.name}</h2>
                      <p className="text-sm text-zinc-400">Agent Kit</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Loading Auth State */}
                {isCheckingAuth ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 text-[var(--id8-orange)] animate-spin" />
                  </div>
                ) : !user ? (
                  /* Sign In Required */
                  <>
                    <div className="text-center py-4">
                      <div className="mx-auto w-16 h-16 rounded-2xl bg-[var(--id8-orange)]/10 flex items-center justify-center mb-4">
                        <LogIn className="w-8 h-8 text-[var(--id8-orange)]" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Sign in to continue</h3>
                      <p className="text-zinc-400 text-sm">
                        Create an account or sign in to purchase {product.name}
                      </p>
                    </div>

                    {/* Price Preview */}
                    <div className="flex items-baseline justify-center gap-2 py-4 border-y border-white/10">
                      <span className="text-3xl font-bold text-white">{product.priceDisplay}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-zinc-500 line-through">
                          ${(product.originalPrice / 100).toFixed(0)}
                        </span>
                      )}
                    </div>

                    {/* What's Included */}
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">What you get</p>
                      <ul className="space-y-2">
                        {product.features.slice(0, 4).map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-zinc-300">
                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={handleSignIn}
                      className="w-full py-3.5 px-4 rounded-xl bg-[var(--id8-orange)] text-white font-semibold hover:bg-[var(--id8-orange)]/90 transition-all flex items-center justify-center gap-2"
                    >
                      <LogIn className="w-5 h-5" />
                      Sign In to Purchase
                    </button>
                    <p className="text-center text-xs text-zinc-500">
                      You'll be redirected back here after signing in
                    </p>
                  </>
                ) : (
                  /* Authenticated - Show Checkout Form */
                  <>
                    {/* Price */}
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-3xl font-bold text-white">{product.priceDisplay}</span>
                        {product.originalPrice && (
                          <span className="ml-2 text-lg text-zinc-500 line-through">
                            ${(product.originalPrice / 100).toFixed(0)}
                          </span>
                        )}
                      </div>
                      {productId === 'agent-kit-bundle' && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Save $66
                        </span>
                      )}
                    </div>

                    {/* GitHub Username Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-zinc-300">
                        Your GitHub Username
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                          <Github className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          value={githubUsername}
                          onChange={(e) => setGithubUsername(e.target.value)}
                          placeholder="username"
                          className="w-full pl-11 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[var(--id8-orange)]/50 focus:ring-1 focus:ring-[var(--id8-orange)]/50 transition-all"
                        />
                        {githubUsername && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {isValid ? (
                              <Check className="w-5 h-5 text-emerald-500" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-amber-500" />
                            )}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500">
                        We'll add you as a collaborator to access the kit repo
                      </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-400">{error}</p>
                      </div>
                    )}

                    {/* What's Included */}
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">What you get</p>
                      <ul className="space-y-2">
                        {product.features.slice(0, 4).map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-zinc-300">
                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>

              {/* Footer - Only show checkout button when authenticated */}
              {!isCheckingAuth && user && (
                <div className="p-6 border-t border-white/10 bg-white/[0.02]">
                  <button
                    onClick={handleCheckout}
                    disabled={!isValid || isLoading}
                    className="w-full py-3.5 px-4 rounded-xl bg-[var(--id8-orange)] text-white font-semibold hover:bg-[var(--id8-orange)]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Continue to Payment
                        <ExternalLink className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-zinc-500 mt-3">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              )}
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
