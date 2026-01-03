'use client'

import { useState, useEffect, useMemo } from 'react'
import { m } from '@/components/motion'
import { type ClaudeStats } from '@/lib/supabase'

interface StatsPanelProps {
  onLiveStatusChange?: (isLive: boolean) => void
}

// Fallback stats (used when API isn't available)
const fallbackStats: ClaudeStats = {
  id: 'fallback',
  commits_together: 1085,
  lines_added: 4620000,
  lines_removed: 0,
  lines_of_code: 4620000,
  projects_shipped: 6,
  milestones_hit: 14,
  first_commit_date: '2025-10-13',
  last_commit_date: '2025-12-28',
  tool_bash: 2720,
  tool_read: 3850,
  tool_edit: 2450,
  tool_write: 960,
  languages: { TypeScript: 65, Python: 20, CSS: 8, MDX: 7 },
  last_synced_at: '2025-12-28T22:00:00Z',
  created_at: '2025-12-21T12:00:00Z',
  updated_at: '2025-12-28T22:00:00Z',
}

// Activity data for GitHub-style heatmap
const activityData = [
  [0, 2, 1, 0, 0, 0, 0],
  [0, 7, 15, 47, 99, 88, 6],
  [3, 60, 15, 43, 30, 57, 23],
  [2, 26, 50, 14, 32, 17, 10],
  [11, 18, 6, 20, 25, 27, 1],
  [4, 23, 19, 3, 0, 0, 0],
  [0, 3, 1, 1, 0, 0, 0],
  [30, 0, 2, 11, 2, 5, 5],
  [16, 27, 26, 40, 41, 20, 0],
  [31, 24, 28, 88, 39, 21, 0],
  [31, 24, 18, 15, 42, 28, 0],
  [35, 0, 0, 0, 0, 0, 0],
]

function useStats() {
  const [stats, setStats] = useState<ClaudeStats>(fallbackStats)
  const [isLive, setIsLive] = useState(false)
  const [lastSynced, setLastSynced] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/claude-stats')
        if (!response.ok) throw new Error('Failed to fetch stats')

        const data = await response.json()
        if (data.stats) {
          setStats(data.stats)
          setIsLive(true)
          setLastSynced(data.stats.last_synced_at)
        }
      } catch (err) {
        console.log('Using fallback stats:', err)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const derivedStats = useMemo(() => {
    const firstCommit = stats.first_commit_date
      ? new Date(stats.first_commit_date)
      : new Date('2025-10-13')
    const now = new Date()

    const monthsBuilding = Math.ceil(
      (now.getTime() - firstCommit.getTime()) / (1000 * 60 * 60 * 24 * 30)
    )

    return { monthsBuilding }
  }, [stats.first_commit_date])

  return { stats, isLive, lastSynced, derivedStats }
}

function ActivityHeatmap() {
  const getIntensity = (value: number) => {
    if (value === 0) return 'bg-[#161b22]'
    if (value <= 8) return 'bg-[#ff6b35]/25'
    if (value <= 20) return 'bg-[#ff6b35]/45'
    if (value <= 40) return 'bg-[#ff6b35]/70'
    return 'bg-[#ff6b35]'
  }

  return (
    <a
      href="https://github.com/eddiebe147"
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-[#0d1117] rounded-lg border border-[#30363d] p-3 hover:border-[#ff6b35]/50 transition-all group"
    >
      <div className="flex mb-1.5 text-[9px] text-[#848d97]/80 font-mono uppercase tracking-wider">
        <div className="w-6 flex-shrink-0" />
        <div className="flex-1 flex justify-between px-1">
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </div>

      <div className="flex gap-1">
        <div className="flex flex-col w-6 flex-shrink-0 text-[8px] text-[#848d97]/70 font-mono justify-around">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        <div className="flex-1 flex justify-between">
          {activityData.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px]">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`w-[12px] h-[12px] rounded-sm ${getIntensity(day)} transition-all hover:scale-110`}
                  title={day === 0 ? 'No contributions' : `${day} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#30363d]/50">
        <span className="text-[9px] text-[#848d97]/70 group-hover:text-[#ff6b35] transition-colors font-mono">
          View on GitHub →
        </span>
        <div className="flex items-center gap-[2px] text-[8px] text-[#848d97]/60 font-mono">
          <span className="mr-1">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-[8px] h-[8px] rounded-sm ${
                level === 0 ? 'bg-[#161b22]' :
                level === 1 ? 'bg-[#ff6b35]/25' :
                level === 2 ? 'bg-[#ff6b35]/45' :
                level === 3 ? 'bg-[#ff6b35]/70' :
                'bg-[#ff6b35]'
              }`}
            />
          ))}
          <span className="ml-1">More</span>
        </div>
      </div>
    </a>
  )
}

export default function StatsPanel({ onLiveStatusChange }: StatsPanelProps) {
  const { stats, isLive, lastSynced, derivedStats } = useStats()

  useEffect(() => {
    onLiveStatusChange?.(isLive)
  }, [isLive, onLiveStatusChange])

  const languageStats = useMemo(() => {
    const langs = stats.languages || {}
    return Object.entries(langs)
      .map(([lang, percentage]) => ({ lang, percentage }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 4)
  }, [stats.languages])

  const lastSyncedFormatted = useMemo(() => {
    if (!lastSynced) return stats.last_synced_at?.split('T')[0] || 'Never'
    return new Date(lastSynced).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }, [lastSynced, stats.last_synced_at])

  const formatNumber = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
    return n.toLocaleString()
  }

  return (
    <div className="font-mono text-sm">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-[#27c93f]">{'> '}<span className="text-[#e0e0e0]">stats_console</span></div>
        <div className="text-[#606060] text-xs">
          synced: {lastSyncedFormatted}
        </div>
      </div>

      {/* Core Stats */}
      <div className="bg-[#252525] rounded-lg p-4 border border-[#3d3d3d] mb-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="group hover:bg-[#2d2d2d] p-2 rounded transition-colors">
            <div className="text-[#ff6b35] text-xl font-bold">
              {stats.commits_together.toLocaleString()}
            </div>
            <div className="text-[#808080] text-xs">commits together</div>
          </div>
          <div className="group hover:bg-[#2d2d2d] p-2 rounded transition-colors">
            <div className="text-[#ff6b35] text-xl font-bold">
              {formatNumber(stats.lines_of_code)}
            </div>
            <div className="text-[#808080] text-xs">lines of code</div>
          </div>
          <div className="group hover:bg-[#2d2d2d] p-2 rounded transition-colors">
            <div className="text-[#ff6b35] text-xl font-bold">
              {stats.projects_shipped}
            </div>
            <div className="text-[#808080] text-xs">projects shipped</div>
          </div>
          <div className="group hover:bg-[#2d2d2d] p-2 rounded transition-colors">
            <div className="text-[#ff6b35] text-xl font-bold">
              {derivedStats.monthsBuilding}
            </div>
            <div className="text-[#808080] text-xs">months building</div>
          </div>
        </div>
      </div>

      {/* Tool Usage */}
      <div className="bg-[#252525] rounded-lg p-4 border border-[#3d3d3d] mb-4">
        <div className="text-[#27c93f] text-xs mb-3">{'> '}<span className="text-[#808080]">tool_usage</span></div>
        <div className="space-y-2">
          {[
            { name: 'Bash', count: stats.tool_bash, color: 'bg-green-500' },
            { name: 'Read', count: stats.tool_read, color: 'bg-blue-500' },
            { name: 'Edit', count: stats.tool_edit, color: 'bg-purple-500' },
            { name: 'Write', count: stats.tool_write, color: 'bg-orange-500' },
          ].map((tool) => (
            <div key={tool.name} className="flex items-center gap-2">
              <span className="text-[#808080] w-12 text-xs">{tool.name}</span>
              <div className="flex-1 h-2 bg-[#1e1e1e] rounded-full overflow-hidden">
                <m.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(tool.count / stats.tool_read) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`h-full ${tool.color} rounded-full`}
                />
              </div>
              <span className="text-[#606060] text-xs w-12 text-right">
                {formatNumber(tool.count)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="bg-[#252525] rounded-lg p-4 border border-[#3d3d3d] mb-4">
        <div className="text-[#27c93f] text-xs mb-3">{'> '}<span className="text-[#808080]">languages</span></div>
        <div className="flex flex-wrap gap-2">
          {languageStats.map((lang) => (
            <div
              key={lang.lang}
              className="px-2 py-1 bg-[#1e1e1e] rounded text-xs border border-[#3d3d3d]"
            >
              <span className="text-[#e0e0e0]">{lang.lang}</span>
              <span className="text-[#ff6b35] ml-1">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="mb-2">
        <div className="text-[#27c93f] text-xs mb-3">{'> '}<span className="text-[#808080]">activity_heatmap</span></div>
        <ActivityHeatmap />
      </div>
    </div>
  )
}
