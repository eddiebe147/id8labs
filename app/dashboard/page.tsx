'use client'

import { useEffect, useState, useCallback } from 'react'
import { subDays, format, startOfDay, endOfDay } from 'date-fns'

interface Stats {
  pageviews: { value: number }
  visitors: { value: number }
  visits: { value: number }
  bounces: { value: number }
  totaltime: { value: number }
  comparison: {
    pageviews: { value: number }
    visitors: { value: number }
    visits: { value: number }
    bounces: { value: number }
    totaltime: { value: number }
  }
}

interface PageviewData {
  x: string
  y: number
}

interface MetricItem {
  x: string
  y: number
}

type TimeRange = '24h' | '7d' | '30d' | '90d'

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: '24h', label: '24H' },
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '90d', label: '90D' },
]

function getDateRange(range: TimeRange) {
  const now = new Date()
  const end = endOfDay(now)
  let start: Date
  let unit: string

  switch (range) {
    case '24h':
      start = subDays(now, 1)
      unit = 'hour'
      break
    case '7d':
      start = startOfDay(subDays(now, 7))
      unit = 'day'
      break
    case '30d':
      start = startOfDay(subDays(now, 30))
      unit = 'day'
      break
    case '90d':
      start = startOfDay(subDays(now, 90))
      unit = 'day'
      break
  }

  return {
    startAt: start.getTime().toString(),
    endAt: end.getTime().toString(),
    unit,
  }
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`
  const mins = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60)
  return `${mins}m ${secs}s`
}

function calculateChange(current: number, previous: number): { value: number; positive: boolean } {
  if (previous === 0) return { value: current > 0 ? 100 : 0, positive: current >= 0 }
  const change = ((current - previous) / previous) * 100
  return { value: Math.abs(change), positive: change >= 0 }
}

// Terminal-style stat card
function StatCard({
  label,
  value,
  previousValue,
  format: formatFn = formatNumber,
  invertChange = false,
}: {
  label: string
  value: number
  previousValue?: number
  format?: (n: number) => string
  invertChange?: boolean
}) {
  const change = previousValue !== undefined ? calculateChange(value, previousValue) : null
  const isPositive = invertChange ? !change?.positive : change?.positive

  return (
    <div className="bg-black/80 border border-[#FF6B35]/30 rounded-lg p-4 font-mono">
      <div className="text-[#FF6B35]/60 text-xs uppercase tracking-wider mb-1">{label}</div>
      <div className="text-2xl font-bold text-[#FF6B35]">{formatFn(value)}</div>
      {change && (
        <div className={`text-xs mt-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '▲' : '▼'} {change.value.toFixed(1)}%
        </div>
      )}
    </div>
  )
}

// ASCII-style bar chart
function BarChart({ data, height = 120 }: { data: PageviewData[]; height?: number }) {
  if (!data.length) return null

  const maxValue = Math.max(...data.map((d) => d.y), 1)
  const barWidth = Math.max(4, Math.floor(100 / data.length))

  return (
    <div className="bg-black/80 border border-[#FF6B35]/30 rounded-lg p-4 font-mono">
      <div className="text-[#FF6B35]/60 text-xs uppercase tracking-wider mb-4">Traffic Over Time</div>
      <div className="flex items-end gap-1" style={{ height }}>
        {data.map((item, i) => {
          const barHeight = Math.max(4, (item.y / maxValue) * height)
          return (
            <div
              key={i}
              className="bg-[#FF6B35] hover:bg-[#FF8B55] transition-colors cursor-pointer group relative"
              style={{ width: `${barWidth}%`, height: barHeight }}
              title={`${item.x}: ${item.y}`}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-[#FF6B35]/50 px-2 py-1 text-xs text-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {item.y}
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex justify-between text-[#FF6B35]/40 text-xs mt-2">
        <span>{data[0]?.x}</span>
        <span>{data[data.length - 1]?.x}</span>
      </div>
    </div>
  )
}

// Top items list with terminal styling
function TopList({
  title,
  data,
  icon,
}: {
  title: string
  data: MetricItem[]
  icon: string
}) {
  const maxValue = Math.max(...data.map((d) => d.y), 1)

  return (
    <div className="bg-black/80 border border-[#FF6B35]/30 rounded-lg p-4 font-mono">
      <div className="text-[#FF6B35]/60 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
        <span>{icon}</span> {title}
      </div>
      <div className="space-y-2">
        {data.slice(0, 8).map((item, i) => (
          <div key={i} className="relative">
            <div
              className="absolute inset-0 bg-[#FF6B35]/10 rounded"
              style={{ width: `${(item.y / maxValue) * 100}%` }}
            />
            <div className="relative flex justify-between items-center py-1 px-2">
              <span className="text-gray-300 text-sm truncate max-w-[70%]">
                {item.x || '(direct)'}
              </span>
              <span className="text-[#FF6B35] text-sm font-bold">{formatNumber(item.y)}</span>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-gray-500 text-sm">No data yet</div>
        )}
      </div>
    </div>
  )
}

// Real-time indicator
function RealtimeIndicator({ count }: { count: number }) {
  return (
    <div className="bg-black/80 border border-green-500/30 rounded-lg p-4 font-mono">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-green-400 text-sm">LIVE</span>
      </div>
      <div className="text-3xl font-bold text-green-400 mt-2">{count}</div>
      <div className="text-green-400/60 text-xs">active visitors</div>
    </div>
  )
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d')
  const [stats, setStats] = useState<Stats | null>(null)
  const [pageviews, setPageviews] = useState<PageviewData[]>([])
  const [pages, setPages] = useState<MetricItem[]>([])
  const [referrers, setReferrers] = useState<MetricItem[]>([])
  const [countries, setCountries] = useState<MetricItem[]>([])
  const [browsers, setBrowsers] = useState<MetricItem[]>([])
  const [activeVisitors, setActiveVisitors] = useState(0)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    const { startAt, endAt, unit } = getDateRange(timeRange)

    try {
      // Fetch all data in parallel
      const [statsRes, pageviewsRes, pagesRes, referrersRes, countriesRes, browsersRes, activeRes] =
        await Promise.all([
          fetch(`/api/analytics?endpoint=stats&startAt=${startAt}&endAt=${endAt}`),
          fetch(`/api/analytics?endpoint=pageviews&startAt=${startAt}&endAt=${endAt}&unit=${unit}`),
          fetch(`/api/analytics?endpoint=metrics&type=path&startAt=${startAt}&endAt=${endAt}`),
          fetch(`/api/analytics?endpoint=metrics&type=referrer&startAt=${startAt}&endAt=${endAt}`),
          fetch(`/api/analytics?endpoint=metrics&type=country&startAt=${startAt}&endAt=${endAt}`),
          fetch(`/api/analytics?endpoint=metrics&type=browser&startAt=${startAt}&endAt=${endAt}`),
          fetch(`/api/analytics?endpoint=active`),
        ])

      if (statsRes.ok) {
        const data = await statsRes.json()
        setStats(data)
      }

      if (pageviewsRes.ok) {
        const data = await pageviewsRes.json()
        // Transform pageview data for chart
        const chartData = (data.pageviews || []).map((item: { x: string; y: number }) => ({
          x: format(new Date(item.x), timeRange === '24h' ? 'HH:mm' : 'MMM d'),
          y: item.y,
        }))
        setPageviews(chartData)
      }

      if (pagesRes.ok) {
        const data = await pagesRes.json()
        setPages(data)
      }

      if (referrersRes.ok) {
        const data = await referrersRes.json()
        setReferrers(data)
      }

      if (countriesRes.ok) {
        const data = await countriesRes.json()
        setCountries(data)
      }

      if (browsersRes.ok) {
        const data = await browsersRes.json()
        setBrowsers(data)
      }

      if (activeRes.ok) {
        const data = await activeRes.json()
        setActiveVisitors(data[0]?.x || 0)
      }

      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }, [timeRange])

  useEffect(() => {
    fetchData()

    // Refresh every 60 seconds
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [fetchData])

  const bounceRate = stats
    ? stats.visits.value > 0
      ? (stats.bounces.value / stats.visits.value) * 100
      : 0
    : 0
  const prevBounceRate = stats?.comparison
    ? stats.comparison.visits.value > 0
      ? (stats.comparison.bounces.value / stats.comparison.visits.value) * 100
      : 0
    : 0
  const avgDuration = stats
    ? stats.visits.value > 0
      ? stats.totaltime.value / stats.visits.value
      : 0
    : 0
  const prevAvgDuration = stats?.comparison
    ? stats.comparison.visits.value > 0
      ? stats.comparison.totaltime.value / stats.comparison.visits.value
      : 0
    : 0

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-mono font-bold text-[#FF6B35]">
              {'>'} ID8LABS_ANALYTICS
            </h1>
            <p className="text-gray-500 text-sm font-mono mt-1">
              {lastUpdated && `Last updated: ${format(lastUpdated, 'HH:mm:ss')}`}
            </p>
          </div>

          {/* Time range selector */}
          <div className="flex gap-2 font-mono">
            {TIME_RANGES.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-3 py-1 rounded border transition-colors ${
                  timeRange === range.value
                    ? 'bg-[#FF6B35] border-[#FF6B35] text-black'
                    : 'border-[#FF6B35]/30 text-[#FF6B35]/60 hover:border-[#FF6B35] hover:text-[#FF6B35]'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-[#FF6B35] font-mono animate-pulse">Loading...</div>
          </div>
        ) : (
          <>
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <RealtimeIndicator count={activeVisitors} />
              <StatCard
                label="Visitors"
                value={stats?.visitors.value || 0}
                previousValue={stats?.comparison?.visitors.value}
              />
              <StatCard
                label="Page Views"
                value={stats?.pageviews.value || 0}
                previousValue={stats?.comparison?.pageviews.value}
              />
              <StatCard
                label="Sessions"
                value={stats?.visits.value || 0}
                previousValue={stats?.comparison?.visits.value}
              />
              <StatCard
                label="Bounce Rate"
                value={bounceRate}
                previousValue={prevBounceRate}
                format={(n) => `${n.toFixed(1)}%`}
                invertChange
              />
              <StatCard
                label="Avg Duration"
                value={avgDuration}
                previousValue={prevAvgDuration}
                format={formatDuration}
              />
            </div>

            {/* Traffic chart */}
            <div className="mb-8">
              <BarChart data={pageviews} height={150} />
            </div>

            {/* Metrics grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <TopList title="Top Pages" data={pages} icon="📄" />
              <TopList title="Referrers" data={referrers} icon="🔗" />
              <TopList title="Countries" data={countries} icon="🌍" />
              <TopList title="Browsers" data={browsers} icon="🌐" />
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-600 font-mono text-xs">
              Powered by{' '}
              <a
                href="https://umami.is"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6B35]/60 hover:text-[#FF6B35]"
              >
                Umami
              </a>
              {' '}• Privacy-focused analytics
            </div>
          </>
        )}
      </div>
    </div>
  )
}
