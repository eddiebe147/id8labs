'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Stats {
  totalSubscribers: number
  activeSubscribers: number
  recentSignups: number
  totalSends: number
}

export default function NewsletterDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalSubscribers: 0,
    activeSubscribers: 0,
    recentSignups: 0,
    totalSends: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/admin/newsletter/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    {
      label: 'Total Subscribers',
      value: stats.totalSubscribers,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Active Subscribers',
      value: stats.activeSubscribers,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'New This Week',
      value: stats.recentSignups,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: 'text-[var(--id8-orange)]',
      bgColor: 'bg-[var(--id8-orange)]/10',
    },
    {
      label: 'Total Sends',
      value: stats.totalSends,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Newsletter</h1>
          <p className="text-[var(--text-secondary)]">Manage The Innovation Brief</p>
        </div>
        <Link
          href="/admin/newsletter/compose"
          className="btn btn-primary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Issue
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text-primary)]">
                  {loading ? '...' : stat.value.toLocaleString()}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          href="/admin/newsletter/compose"
          className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl hover:border-[var(--id8-orange)]/50 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[var(--id8-orange)]/10 rounded-lg text-[var(--id8-orange)]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--id8-orange)] transition-colors">
                Compose Issue
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">Write and send a new newsletter</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/newsletter/subscribers"
          className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl hover:border-[var(--id8-orange)]/50 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--id8-orange)] transition-colors">
                Subscribers
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">View and manage your audience</p>
            </div>
          </div>
        </Link>

        <Link
          href="/newsletter"
          className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl hover:border-[var(--id8-orange)]/50 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--id8-orange)] transition-colors">
                View Archive
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">See public newsletter page</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Info Note */}
      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">CLI Access Available</p>
            <p className="text-sm text-[var(--text-secondary)]">
              Use the Newsletter MCP server to manage subscribers and send newsletters from Claude Code.
              Run <code className="px-1 py-0.5 bg-[var(--bg-primary)] rounded">newsletter_stats</code> to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
