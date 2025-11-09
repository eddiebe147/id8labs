import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service - ID8Labs',
  description: 'ID8Labs terms of service and usage policies.',
}

export default function TermsPage() {
  return (
    <div className="container py-24">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-12 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to home
        </Link>

        <h1 className="mb-12">Terms of Service</h1>

        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            <strong>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
          </p>

          <p>
            Welcome to ID8Labs. By accessing our website and using our products, you agree to
            comply with and be bound by the following terms and conditions.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6">Use of Services</h2>
          <p>
            Our products are intended for professional use in creative production environments.
            You agree to use our services in compliance with all applicable laws and regulations.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6">Intellectual Property</h2>
          <p>
            All content, features, and functionality on our website and in our products are owned
            by ID8Labs and are protected by international copyright, trademark, and other
            intellectual property laws.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6">Limitation of Liability</h2>
          <p>
            ID8Labs products are provided "as is" without warranties of any kind. We are not
            liable for any damages arising from your use of our products or services.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of our services
            constitutes acceptance of updated terms.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6">Contact Us</h2>
          <p>
            Questions about these Terms? Contact us at{' '}
            <a
              href="mailto:hello@id8labs.com"
              className="border-b-2 border-[var(--text-primary)] hover:opacity-70 transition-opacity"
            >
              hello@id8labs.com
            </a>
          </p>
        </div>
      </article>
    </div>
  )
}
