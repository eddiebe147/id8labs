'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface AvailableIssue {
  issueNumber: number
  date: string
  subject: string
}

export default function ComposePage() {
  const [issues, setIssues] = useState<AvailableIssue[]>([])
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null)
  const [audienceFilter, setAudienceFilter] = useState<'all' | 'academy' | 'free'>('all')
  const [sending, setSending] = useState(false)
  const [testEmail, setTestEmail] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await fetch('/api/newsletter/send')
        if (response.ok) {
          const data = await response.json()
          setIssues(data.availableIssues)
          if (data.availableIssues.length > 0) {
            setSelectedIssue(data.availableIssues[0].issueNumber)
          }
        }
      } catch (error) {
        console.error('Failed to fetch issues:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchIssues()
  }, [])

  const handleTestSend = async () => {
    if (!testEmail || !selectedIssue) {
      setMessage({ type: 'error', text: 'Please select an issue and enter a test email' })
      return
    }

    setSending(true)
    setMessage(null)

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET || ''}`,
        },
        body: JSON.stringify({
          issueNumber: selectedIssue,
          testEmail,
          audienceFilter,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send test email')
      }

      setMessage({ type: 'success', text: `Test email sent to ${testEmail}` })
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to send test email',
      })
    } finally {
      setSending(false)
    }
  }

  const handleSendToAll = async () => {
    if (!selectedIssue) {
      setMessage({ type: 'error', text: 'Please select an issue to send' })
      return
    }

    const selectedIssueData = issues.find(i => i.issueNumber === selectedIssue)
    const confirmed = window.confirm(
      `Are you sure you want to send Issue #${selectedIssue} "${selectedIssueData?.subject}" to ${audienceFilter === 'all' ? 'ALL' : audienceFilter} subscribers? This cannot be undone.`
    )

    if (!confirmed) return

    setSending(true)
    setMessage(null)

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET || ''}`,
        },
        body: JSON.stringify({
          issueNumber: selectedIssue,
          audienceFilter,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send newsletter')
      }

      setMessage({
        type: 'success',
        text: data.message || `Newsletter sent successfully!`,
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to send newsletter',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/newsletter"
          className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Compose Newsletter</h1>
          <p className="text-[var(--text-secondary)]">Write and send The Innovation Brief</p>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      <div className="space-y-6">
        {/* Issue Selection */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Select Issue to Send
          </label>
          {loading ? (
            <div className="p-4 text-center text-[var(--text-secondary)]">Loading issues...</div>
          ) : issues.length === 0 ? (
            <div className="p-4 text-center text-[var(--text-secondary)] border border-dashed border-[var(--border)] rounded-lg">
              No issues available. Add issues in the newsletter template file.
            </div>
          ) : (
            <div className="space-y-3">
              {issues.map((issue) => (
                <label
                  key={issue.issueNumber}
                  className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedIssue === issue.issueNumber
                      ? 'border-[var(--id8-orange)] bg-[var(--id8-orange)]/5'
                      : 'border-[var(--border)] hover:border-[var(--id8-orange)]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="issue"
                    value={issue.issueNumber}
                    checked={selectedIssue === issue.issueNumber}
                    onChange={() => setSelectedIssue(issue.issueNumber)}
                    className="mt-1"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[var(--id8-orange)]">
                        Issue #{issue.issueNumber}
                      </span>
                      <span className="text-sm text-[var(--text-tertiary)]">{issue.date}</span>
                    </div>
                    <p className="text-[var(--text-primary)] font-medium">{issue.subject}</p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Audience Filter */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Audience
          </label>
          <div className="flex gap-4">
            {[
              { value: 'all', label: 'All Subscribers' },
              { value: 'academy', label: 'Academy Members Only' },
              { value: 'free', label: 'Free Subscribers Only' },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                  audienceFilter === option.value
                    ? 'border-[var(--id8-orange)] bg-[var(--id8-orange)]/5'
                    : 'border-[var(--border)] hover:border-[var(--id8-orange)]/50'
                }`}
              >
                <input
                  type="radio"
                  name="audience"
                  value={option.value}
                  checked={audienceFilter === option.value}
                  onChange={() => setAudienceFilter(option.value as 'all' | 'academy' | 'free')}
                />
                <span className="text-sm text-[var(--text-primary)]">{option.label}</span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-sm text-[var(--text-tertiary)]">
            Academy members receive exclusive content sections. Free subscribers see upgrade CTAs.
          </p>
        </div>

        {/* Test Send */}
        <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
          <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">Send Test Email</h3>
          <div className="flex gap-3">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]"
            />
            <button
              onClick={handleTestSend}
              disabled={sending}
              className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--bg-primary)] transition-colors disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send Test'}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-[var(--border)]">
          <button
            onClick={handleSendToAll}
            disabled={sending || !selectedIssue}
            className="btn btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? 'Sending...' : `Send to ${audienceFilter === 'all' ? 'All' : audienceFilter} Subscribers`}
          </button>
          <Link
            href="/admin/newsletter"
            className="px-6 py-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>

      {/* Note */}
      <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
        <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
          Adding New Issues
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">
          To add new newsletter issues, update the <code className="px-1 py-0.5 bg-[var(--bg-primary)] rounded">lib/email/templates/newsletter-template.ts</code> file
          with a new NewsletterIssue object. This ensures consistent formatting with Big Idea, Framework, Case Study,
          and automatic Academy member differentiation.
        </p>
      </div>
    </div>
  )
}
