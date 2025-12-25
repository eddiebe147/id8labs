import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy - ID8Labs',
  description: 'ID8Labs privacy policy and data practices.',
}

export default function PrivacyPage() {
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

        <h1 className="mb-12">Privacy Policy</h1>

        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            <strong>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
          </p>

          <p>
            ID8Labs ("we", "our", or "us") is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, and safeguard your information.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6">Information We Collect</h2>
          <p>
            We collect minimal information necessary to provide our services. This may include
            contact information you provide when reaching out to us, and anonymous usage analytics
            to improve our products.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6">How We Use Your Information</h2>
          <p>
            We use collected information solely to communicate with you, improve our services,
            and provide you with updates about our products when you've opted in.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6">Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your information.
            However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6">Contact Us</h2>
          <p>
            Questions about this Privacy Policy? Contact us at{' '}
            <a
              href="mailto:eb@id8labs.tech"
              className="border-b-2 border-[var(--text-primary)] hover:opacity-70 transition-opacity"
            >
              eb@id8labs.tech
            </a>
          </p>
        </div>
      </article>
    </div>
  )
}
