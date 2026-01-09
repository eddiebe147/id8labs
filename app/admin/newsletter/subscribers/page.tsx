'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface Subscriber {
  id: string
  email: string
  status: 'active' | 'unsubscribed'
  source: string
  subscribed_at: string
  unsubscribed_at: string | null
  is_academy_member: boolean
}

interface SubscriberResponse {
  subscribers: Subscriber[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export default function SubscribersPage() {
  const [data, setData] = useState<SubscriberResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)

  const fetchSubscribers = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        status: statusFilter,
        ...(search && { search }),
      })

      const response = await fetch(`/api/admin/newsletter/subscribers?${params}`)
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      console.error('Failed to fetch subscribers:', error)
    } finally {
      setLoading(false)
    }
  }, [page, statusFilter, search])

  useEffect(() => {
    fetchSubscribers()
  }, [fetchSubscribers])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/newsletter"
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Subscribers</h1>
            <p className="text-[var(--text-secondary)]">
              {data ? `${data.total} total subscribers` : 'Loading...'}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            setPage(1)
          }}
          className="px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)]"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="unsubscribed">Unsubscribed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[var(--bg-primary)]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                Source
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                Subscribed
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                Academy
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[var(--text-secondary)]">
                  Loading...
                </td>
              </tr>
            ) : data?.subscribers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[var(--text-secondary)]">
                  No subscribers found
                </td>
              </tr>
            ) : (
              data?.subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-[var(--bg-primary)]/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-[var(--text-primary)]">{subscriber.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        subscriber.status === 'active'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-gray-500/10 text-gray-500'
                      }`}
                    >
                      {subscriber.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[var(--text-secondary)]">
                      {subscriber.source || 'website'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[var(--text-secondary)]">
                      {formatDate(subscriber.subscribed_at)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {subscriber.is_academy_member ? (
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] rounded-full">
                        Member
                      </span>
                    ) : (
                      <span className="text-sm text-[var(--text-tertiary)]">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-[var(--text-secondary)]">
            Showing {((data.page - 1) * data.limit) + 1} to{' '}
            {Math.min(data.page * data.limit, data.total)} of {data.total}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm border border-[var(--border)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--bg-secondary)] transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              disabled={page === data.totalPages}
              className="px-4 py-2 text-sm border border-[var(--border)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--bg-secondary)] transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
