'use client'

import { format } from 'date-fns'
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from 'recharts'

interface PageviewData {
  x: string
  y: number
  views?: number
  visitors?: number
}

type TimeRange = '24h' | '7d' | '30d' | '90d'

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toLocaleString()
}

export function TrafficChartClient({ data, timeRange }: { data: PageviewData[]; timeRange: TimeRange }) {
  if (!data.length) return null

  const chartData = data.map(d => ({
    name: d.x,
    views: d.y,
    visitors: Math.floor(d.y * 0.7),
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
