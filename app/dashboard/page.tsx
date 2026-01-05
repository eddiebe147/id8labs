'use client'

import { useEffect, useState, useCallback } from 'react'
import { subDays, format, startOfDay, endOfDay } from 'date-fns'
import dynamic from 'next/dynamic'
// Dynamically import charts to avoid SSR issues
const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false })
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false })
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false })
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false })
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false })
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false })
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false })
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false })
const ComposedChart = dynamic(() => import('recharts').then(mod => mod.ComposedChart), { ssr: false })
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false })

// Dynamically import react-simple-maps to avoid SSR issues
const ComposableMap = dynamic(() => import('react-simple-maps').then(mod => mod.ComposableMap), { ssr: false })
const Geographies = dynamic(() => import('react-simple-maps').then(mod => mod.Geographies), { ssr: false })
const Geography = dynamic(() => import('react-simple-maps').then(mod => mod.Geography), { ssr: false })
const Marker = dynamic(() => import('react-simple-maps').then(mod => mod.Marker), { ssr: false })

interface Stats {
  pageviews: number
  visitors: number
  visits: number
  bounces: number
  totaltime: number
  comparison: {
    pageviews: number
    visitors: number
    visits: number
    bounces: number
    totaltime: number
  }
}

// Extract number from API response - handles both { value: 128 } and raw 128
const num = (v: unknown): number =>
  typeof v === 'number' ? v : (v as { value?: number })?.value ?? 0

// Normalize Umami API response to consistent shape
function normalizeStats(raw: Record<string, unknown>): Stats | null {
  if (!raw) return null
  const c = raw.comparison as Record<string, unknown> | undefined
  return {
    pageviews: num(raw.pageviews),
    visitors: num(raw.visitors),
    visits: num(raw.visits),
    bounces: num(raw.bounces),
    totaltime: num(raw.totaltime),
    comparison: {
      pageviews: num(c?.pageviews),
      visitors: num(c?.visitors),
      visits: num(c?.visits),
      bounces: num(c?.bounces),
      totaltime: num(c?.totaltime),
    }
  }
}

interface PageviewData {
  x: string
  y: number
  views?: number
  visitors?: number
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
  return num.toLocaleString()
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`
  const mins = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60)
  if (mins >= 60) {
    const hours = Math.floor(mins / 60)
    const remainingMins = mins % 60
    return `${hours}h ${remainingMins}m`
  }
  return `${mins}m ${secs}s`
}

function calculateChange(current: number, previous: number): { value: number; positive: boolean } {
  if (previous === 0) return { value: current > 0 ? 100 : 0, positive: current >= 0 }
  const change = ((current - previous) / previous) * 100
  return { value: Math.abs(change), positive: change >= 0 }
}

// Animated counter component
function AnimatedNumber({ value, format: formatFn = formatNumber }: { value: number; format?: (n: number) => string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1000
    const steps = 30
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return <span>{formatFn(displayValue)}</span>
}

// Premium stat card with sparkline
function StatCard({
  label,
  value,
  previousValue,
  format: formatFn = formatNumber,
  invertChange = false,
  icon,
  sparklineData = [],
}: {
  label: string
  value: number
  previousValue?: number
  format?: (n: number) => string
  invertChange?: boolean
  icon?: React.ReactNode
  sparklineData?: number[]
}) {
  const change = previousValue !== undefined ? calculateChange(value, previousValue) : null
  const isPositive = invertChange ? !change?.positive : change?.positive

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-black/90 border border-[#FF6B35]/20 rounded-xl p-5 font-mono backdrop-blur-sm group hover:border-[#FF6B35]/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#FF6B35]/10 transition-all duration-300">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-300 text-xs uppercase tracking-wider flex items-center gap-2">
            {icon}
            {label}
          </div>
          {change && (
            <div className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
              isPositive
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              <span className="text-[10px]">{isPositive ? '▲' : '▼'}</span>
              {change.value.toFixed(1)}%
            </div>
          )}
        </div>

        <div className="text-3xl font-bold text-white mb-3">
          <AnimatedNumber value={value} format={formatFn} />
        </div>

        {/* Mini sparkline */}
        {sparklineData.length > 0 && (
          <div className="h-8 flex items-end gap-0.5">
            {sparklineData.slice(-12).map((val, i) => {
              const max = Math.max(...sparklineData.slice(-12), 1)
              const height = Math.max(4, (val / max) * 32)
              return (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#FF6B35]/60 to-[#FF6B35] rounded-t transition-all duration-300"
                  style={{ height }}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// Real-time pulse indicator
function RealtimeIndicator({ count }: { count: number }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#FF6B35]/20 to-black/90 border-2 border-[#FF6B35]/50 rounded-xl p-5 font-mono backdrop-blur-sm shadow-lg shadow-[#FF6B35]/10">
      {/* Animated pulse rings */}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <div className="w-3 h-3 bg-[#FF6B35] rounded-full animate-pulse" />
          <div className="absolute inset-0 w-3 h-3 bg-[#FF6B35] rounded-full animate-ping opacity-75" />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#FF6B35] text-xs font-bold tracking-widest">● LIVE</span>
      </div>
      <div className="text-4xl font-bold text-[#FF6B35] mb-1">
        <AnimatedNumber value={count} />
      </div>
      <div className="text-[#FF6B35]/60 text-xs uppercase tracking-wide">active now</div>
    </div>
  )
}

// World Map URL for react-simple-maps
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// Country code to coordinates mapping for markers
const countryCoordinates: Record<string, [number, number]> = {
  'US': [-95.7, 37.1], 'United States': [-95.7, 37.1],
  'GB': [-3.4, 55.4], 'United Kingdom': [-3.4, 55.4],
  'DE': [10.5, 51.2], 'Germany': [10.5, 51.2],
  'FR': [2.2, 46.2], 'France': [2.2, 46.2],
  'CA': [-106.3, 56.1], 'Canada': [-106.3, 56.1],
  'AU': [133.8, -25.3], 'Australia': [133.8, -25.3],
  'IN': [78.9, 20.6], 'India': [78.9, 20.6],
  'BR': [-51.9, -14.2], 'Brazil': [-51.9, -14.2],
  'JP': [138.3, 36.2], 'Japan': [138.3, 36.2],
  'NL': [5.3, 52.1], 'Netherlands': [5.3, 52.1],
  'ES': [-3.7, 40.5], 'Spain': [-3.7, 40.5],
  'IT': [12.6, 42.5], 'Italy': [12.6, 42.5],
  'PL': [19.1, 51.9], 'Poland': [19.1, 51.9],
  'SE': [18.6, 60.1], 'Sweden': [18.6, 60.1],
  'MX': [-102.6, 23.6], 'Mexico': [-102.6, 23.6],
  'CN': [104.2, 35.9], 'China': [104.2, 35.9],
  'RU': [105.3, 61.5], 'Russia': [105.3, 61.5],
  'KR': [128.0, 35.9], 'South Korea': [128.0, 35.9],
  'SG': [103.8, 1.4], 'Singapore': [103.8, 1.4],
  'ID': [113.9, -0.8], 'Indonesia': [113.9, -0.8],
  'AR': [-63.6, -38.4], 'Argentina': [-63.6, -38.4],
  'ZA': [22.9, -30.6], 'South Africa': [22.9, -30.6],
  'TR': [35.2, 38.9], 'Turkey': [35.2, 38.9],
  'TH': [100.5, 15.9], 'Thailand': [100.5, 15.9],
  'VN': [108.3, 14.1], 'Vietnam': [108.3, 14.1],
  'PH': [121.8, 12.9], 'Philippines': [121.8, 12.9],
  'PK': [69.3, 30.4], 'Pakistan': [69.3, 30.4],
  'BD': [90.4, 23.7], 'Bangladesh': [90.4, 23.7],
  'NG': [8.7, 9.1], 'Nigeria': [8.7, 9.1],
  'EG': [30.8, 26.8], 'Egypt': [30.8, 26.8],
  'UA': [31.2, 48.4], 'Ukraine': [31.2, 48.4],
  'IL': [34.9, 31.0], 'Israel': [34.9, 31.0],
  'AE': [53.8, 23.4], 'UAE': [53.8, 23.4],
  'SA': [45.1, 23.9], 'Saudi Arabia': [45.1, 23.9],
  'IE': [-8.2, 53.1], 'Ireland': [-8.2, 53.1],
  'PT': [-8.2, 39.4], 'Portugal': [-8.2, 39.4],
  'BE': [4.5, 50.5], 'Belgium': [4.5, 50.5],
  'AT': [14.6, 47.5], 'Austria': [14.6, 47.5],
  'CH': [8.2, 46.8], 'Switzerland': [8.2, 46.8],
  'NO': [8.5, 60.5], 'Norway': [8.5, 60.5],
  'DK': [9.5, 56.3], 'Denmark': [9.5, 56.3],
  'FI': [25.7, 61.9], 'Finland': [25.7, 61.9],
  'NZ': [174.9, -40.9], 'New Zealand': [174.9, -40.9],
  'CL': [-71.5, -35.7], 'Chile': [-71.5, -35.7],
  'CO': [-74.3, 4.6], 'Colombia': [-74.3, 4.6],
  'PE': [-77.0, -9.2], 'Peru': [-77.0, -9.2],
  'VE': [-66.6, 6.4], 'Venezuela': [-66.6, 6.4],
  'MY': [101.7, 4.2], 'Malaysia': [101.7, 4.2],
  'TW': [121.0, 23.7], 'Taiwan': [121.0, 23.7],
  'HK': [114.2, 22.3], 'Hong Kong': [114.2, 22.3],
}

// Real world map with react-simple-maps
function WorldMapVisualization({ data }: { data: MetricItem[] }) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const maxValue = Math.max(...data.map(d => d.y), 1)

  // Build lookup for country traffic
  const trafficByCountry = data.reduce((acc, item) => {
    acc[item.x] = item.y
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="relative flex flex-col h-full bg-gradient-to-br from-gray-900/90 to-black/90 border border-[#FF6B35]/20 rounded-xl p-5 font-mono backdrop-blur-sm overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[#FF6B35] text-sm font-bold tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          GLOBAL TRAFFIC
        </h3>
        <span className="text-gray-500 text-xs">{data.length} countries</span>
      </div>

      {/* Real World Map - fills panel */}
      <div className="relative flex-1 min-h-[200px] bg-gray-900/50 rounded-lg overflow-hidden">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 155,
            center: [10, 20]
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1a1a1a"
                  stroke="#FF6B35"
                  strokeWidth={0.3}
                  style={{
                    default: { outline: 'none', opacity: 0.8 },
                    hover: { outline: 'none', fill: '#2a2a2a', opacity: 1 },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Traffic markers */}
          {data.slice(0, 20).map((country, i) => {
            const coords = countryCoordinates[country.x]
            if (!coords) return null

            const intensity = country.y / maxValue
            const baseRadius = 3 + intensity * 8

            return (
              <Marker
                key={i}
                coordinates={coords}
                onMouseEnter={() => setHoveredCountry(country.x)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                {/* Glow ring */}
                <circle
                  r={baseRadius + 4}
                  fill="#FF6B35"
                  opacity={0.2}
                  className="animate-pulse"
                />
                {/* Main dot */}
                <circle
                  r={baseRadius}
                  fill="#FF6B35"
                  opacity={0.7 + intensity * 0.3}
                  stroke="#FF6B35"
                  strokeWidth={1}
                  style={{ cursor: 'pointer' }}
                />
                {/* Bright center */}
                <circle
                  r={baseRadius * 0.4}
                  fill="#fff"
                  opacity={0.8}
                />
              </Marker>
            )
          })}
        </ComposableMap>

        {/* Hover tooltip */}
        {hoveredCountry && trafficByCountry[hoveredCountry] && (
          <div className="absolute top-2 right-2 bg-black/95 border border-[#FF6B35]/50 px-3 py-2 rounded-lg text-xs text-white shadow-xl z-10">
            <div className="text-[#FF6B35] font-bold">{hoveredCountry}</div>
            <div className="text-gray-300">{formatNumber(trafficByCountry[hoveredCountry])} visitors</div>
          </div>
        )}
      </div>

      {/* Top countries list */}
      <div className="mt-4 space-y-2">
        {data.slice(0, 5).map((country, i) => (
          <div key={i} className="flex items-center gap-3 group hover:bg-gray-800/30 p-1.5 rounded-lg transition-colors -mx-1.5">
            <span className="text-gray-500 text-xs w-5 text-center font-bold">{i + 1}</span>
            <div className="w-2 h-2 rounded-full bg-[#FF6B35]" style={{ opacity: 0.5 + ((5 - i) / 5) * 0.5 }} />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-300 text-sm truncate group-hover:text-white transition-colors">{country.x || 'Unknown'}</span>
                <span className="text-[#FF6B35] text-sm font-bold">{formatNumber(country.y)} <span className="text-gray-500 font-normal">visitors</span></span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FF8B55] rounded-full transition-all duration-500"
                  style={{ width: `${(country.y / maxValue) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Premium traffic chart with gradient area
function TrafficChart({ data, timeRange }: { data: PageviewData[]; timeRange: TimeRange }) {
  if (!data.length) return null

  const chartData = data.map(d => ({
    name: d.x,
    views: d.y,
    visitors: Math.floor(d.y * 0.7), // Simulated visitor data based on views
  }))

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-[#FF6B35]/20 rounded-xl p-5 font-mono backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#FF6B35] text-sm font-bold tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          TRAFFIC OVER TIME
        </h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#FF6B35] rounded-full" />
            <span className="text-gray-400">Page Views</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#FF6B35]/50 rounded-full" />
            <span className="text-gray-400">Visitors</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#FF6B35" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#FF6B35" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 10 }}
              tickFormatter={(val) => formatNumber(val)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.95)',
                border: '1px solid rgba(255,107,53,0.4)',
                borderRadius: '8px',
                padding: '12px 16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              }}
              labelStyle={{ color: '#FF6B35', fontWeight: 'bold', marginBottom: '8px', fontSize: '12px' }}
              itemStyle={{ color: '#fff', fontSize: '13px' }}
              formatter={(value, name) => {
                const label = name === 'views' ? 'Page Views' : name === 'visitors' ? 'Unique Visitors' : String(name)
                return [`${formatNumber(Number(value) || 0)} ${label.toLowerCase()}`, '']
              }}
              labelFormatter={(label) => `${label}`}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#FF6B35"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorViews)"
              name="Page Views"
            />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="#FF6B35"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
              name="Visitors"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// Top items with horizontal bars
function TopList({
  title,
  data,
  icon,
}: {
  title: string
  data: MetricItem[]
  icon: React.ReactNode
}) {
  const maxValue = Math.max(...data.map((d) => d.y), 1)

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-[#FF6B35]/20 rounded-xl p-5 font-mono backdrop-blur-sm">
      <h3 className="text-[#FF6B35] text-sm font-bold tracking-wider mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h3>

      <div className="space-y-3">
        {data.slice(0, 8).map((item, i) => (
          <div key={i} className="group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-300 text-sm truncate max-w-[70%] group-hover:text-white transition-colors">
                {item.x || '(direct)'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[#FF6B35] text-sm font-bold">{formatNumber(item.y)}</span>
                <span className="text-gray-500 text-xs">
                  {((item.y / maxValue) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF6B35]/80 to-[#FF6B35] rounded-full transition-all duration-500 group-hover:from-[#FF6B35] group-hover:to-[#FF8B55]"
                style={{ width: `${(item.y / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-center py-10 border border-dashed border-gray-800 rounded-lg">
            <div className="text-gray-600 font-mono text-sm mb-2">[ NO DATA ]</div>
            <p className="text-gray-500 text-xs">Waiting for traffic...</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Browser/Device pie chart alternative - horizontal bars
function DeviceBreakdown({ browsers, title }: { browsers: MetricItem[]; title: string }) {
  const colors = ['#FF6B35', '#FF8B55', '#FFAb75', '#FFCB95', '#FFEBB5']
  const total = browsers.reduce((sum, b) => sum + b.y, 0)

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-[#FF6B35]/20 rounded-xl p-5 font-mono backdrop-blur-sm">
      <h3 className="text-[#FF6B35] text-sm font-bold tracking-wider mb-4 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        {title}
      </h3>

      {/* Stacked bar */}
      <div className="h-4 flex rounded-full overflow-hidden mb-4">
        {browsers.slice(0, 5).map((browser, i) => (
          <div
            key={i}
            className="h-full transition-all duration-300 hover:opacity-80"
            style={{
              width: `${(browser.y / total) * 100}%`,
              backgroundColor: colors[i % colors.length]
            }}
            title={`${browser.x}: ${formatNumber(browser.y)}`}
          />
        ))}
      </div>

      <div className="space-y-2">
        {browsers.slice(0, 5).map((browser, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            <span className="text-gray-300 text-sm flex-1 truncate">{browser.x}</span>
            <span className="text-gray-400 text-xs">{((browser.y / total) * 100).toFixed(1)}%</span>
            <span className="text-[#FF6B35] text-sm font-bold">{formatNumber(browser.y)}</span>
          </div>
        ))}
        {browsers.length === 0 && (
          <div className="text-center py-8 border border-dashed border-gray-800 rounded-lg">
            <div className="text-gray-600 font-mono text-sm mb-2">[ NO DATA ]</div>
            <p className="text-gray-500 text-xs">No browser data yet</p>
          </div>
        )}
      </div>
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
        setStats(normalizeStats(data))
      }

      if (pageviewsRes.ok) {
        const data = await pageviewsRes.json()
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
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [fetchData])

  const bounceRate = stats
    ? stats.visits > 0
      ? (stats.bounces / stats.visits) * 100
      : 0
    : 0
  const prevBounceRate = stats?.comparison
    ? stats.comparison.visits > 0
      ? (stats.comparison.bounces / stats.comparison.visits) * 100
      : 0
    : 0
  const avgDuration = stats
    ? stats.visits > 0
      ? stats.totaltime / stats.visits
      : 0
    : 0
  const prevAvgDuration = stats?.comparison
    ? stats.comparison.visits > 0
      ? stats.comparison.totaltime / stats.comparison.visits
      : 0
    : 0

  // Generate sparkline data from pageviews
  const sparklineData = pageviews.map(p => p.y)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMTA3LDUzLDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-mono font-bold text-white flex items-center gap-3">
                <span className="text-[#FF6B35]">▸</span>
                id8labs analytics
                <span className="text-xs bg-[#FF6B35]/20 text-[#FF6B35] px-2 py-1 rounded-full font-normal">
                  BETA
                </span>
              </h1>
              <p className="text-gray-400 text-sm font-mono mt-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse" />
                {lastUpdated && `Last synced ${format(lastUpdated, 'HH:mm:ss')}`}
              </p>
            </div>

            {/* Time range selector */}
            <div className="flex gap-1 font-mono bg-gray-900/50 p-1 rounded-lg border border-gray-800">
              {TIME_RANGES.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 focus:ring-offset-black ${
                    timeRange === range.value
                      ? 'bg-[#FF6B35] text-black shadow-lg shadow-[#FF6B35]/25 hover:bg-[#FF8B55]'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/80'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#FF6B35] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-3 h-3 bg-[#FF6B35] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-3 h-3 bg-[#FF6B35] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <p className="text-gray-500 font-mono text-sm animate-pulse">Loading analytics...</p>
            </div>
          ) : (
            <>
              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <RealtimeIndicator count={activeVisitors} />
                <StatCard
                  label="Visitors"
                  value={stats?.visitors || 0}
                  previousValue={stats?.comparison?.visitors}
                  sparklineData={sparklineData}
                  icon={
                    <svg className="w-4 h-4 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  }
                />
                <StatCard
                  label="Page Views"
                  value={stats?.pageviews || 0}
                  previousValue={stats?.comparison?.pageviews}
                  sparklineData={sparklineData}
                  icon={
                    <svg className="w-4 h-4 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  }
                />
                <StatCard
                  label="Sessions"
                  value={stats?.visits || 0}
                  previousValue={stats?.comparison?.visits}
                  sparklineData={sparklineData}
                  icon={
                    <svg className="w-4 h-4 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                />
                <StatCard
                  label="Bounce Rate"
                  value={bounceRate}
                  previousValue={prevBounceRate}
                  format={(n) => `${n.toFixed(1)}%`}
                  invertChange
                  icon={
                    <svg className="w-4 h-4 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                    </svg>
                  }
                />
                <StatCard
                  label="Avg Duration"
                  value={avgDuration}
                  previousValue={prevAvgDuration}
                  format={formatDuration}
                  icon={
                    <svg className="w-4 h-4 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
              </div>

              {/* Traffic chart */}
              <div className="mb-8">
                <TrafficChart data={pageviews} timeRange={timeRange} />
              </div>

              {/* World map and devices row */}
              <div className="grid lg:grid-cols-2 gap-4 mb-8">
                <WorldMapVisualization data={countries} />
                <DeviceBreakdown browsers={browsers} title="BROWSERS" />
              </div>

              {/* Metrics grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <TopList
                  title="TOP PAGES"
                  data={pages}
                  icon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  }
                />
                <TopList
                  title="TRAFFIC SOURCES"
                  data={referrers}
                  icon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  }
                />
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-gray-800/50 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-[#FF6B35]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  <span className="text-gray-500 font-mono text-xs">id8labs dashboard</span>
                </div>
                <p className="text-gray-600 font-mono text-xs">
                  Powered by{' '}
                  <a
                    href="https://umami.is"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF6B35]/60 hover:text-[#FF6B35] transition-colors"
                  >
                    Umami
                  </a>
                  {' '}• Privacy-first analytics • No cookies required
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
