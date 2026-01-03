'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { m } from '@/components/motion'
import { useMotionValue, useTransform, animate } from 'framer-motion'
import { type ClaudeStats } from '@/lib/supabase'

interface StatsPanelProps {
  onLiveStatusChange?: (isLive: boolean) => void
}

// Count-up animation hook
function useCountUp(target: number, duration: number = 2, delay: number = 0) {
  const [value, setValue] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return

    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic for satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(startValue + (target - startValue) * eased))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [target, duration, hasStarted])

  return value
}

// Animated stat display with hover glow
function AnimatedStat({
  value,
  label,
  format = 'number',
  delay = 0
}: {
  value: number
  label: string
  format?: 'number' | 'compact'
  delay?: number
}) {
  const animatedValue = useCountUp(value, 1.5, delay)
  const [isHovered, setIsHovered] = useState(false)

  const formatValue = (n: number) => {
    if (format === 'compact') {
      if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
      if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
    }
    return n.toLocaleString()
  }

  return (
    <m.div
      className="group p-2 rounded transition-all cursor-default relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 107, 53, 0.1)' }}
    >
      {/* Pulse glow on hover */}
      <m.div
        className="absolute inset-0 bg-[#ff6b35]/20 rounded"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <m.div
        className="text-[#ff6b35] text-xl font-bold relative z-10"
        animate={{
          textShadow: isHovered
            ? '0 0 10px rgba(255, 107, 53, 0.5)'
            : '0 0 0px rgba(255, 107, 53, 0)'
        }}
      >
        {formatValue(animatedValue)}
      </m.div>
      <div className="text-[#808080] text-xs relative z-10">{label}</div>
    </m.div>
  )
}

// Animated tool bar with count-up
function AnimatedToolBar({
  name,
  count,
  maxCount,
  color,
  delay,
  formatNumber
}: {
  name: string
  count: number
  maxCount: number
  color: string
  delay: number
  formatNumber: (n: number) => string
}) {
  const animatedCount = useCountUp(count, 1.2, delay)

  return (
    <m.div
      className="flex items-center gap-2 p-1 rounded cursor-default"
      whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
    >
      <span className="text-[#808080] w-12 text-xs">{name}</span>
      <div className="flex-1 h-2 bg-[#1e1e1e] rounded-full overflow-hidden">
        <m.div
          initial={{ width: 0 }}
          animate={{ width: `${(count / maxCount) * 100}%` }}
          transition={{ duration: 0.8, delay }}
          className={`h-full ${color} rounded-full`}
          whileHover={{ boxShadow: `0 0 8px currentColor` }}
        />
      </div>
      <span className="text-[#606060] text-xs w-12 text-right font-mono">
        {formatNumber(animatedCount)}
      </span>
    </m.div>
  )
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
                <m.div
                  key={dayIndex}
                  className={`w-[12px] h-[12px] rounded-sm ${getIntensity(day)} cursor-pointer relative`}
                  title={day === 0 ? 'No contributions' : `${day} contributions`}
                  whileHover={{
                    scale: 1.5,
                    boxShadow: day > 0 ? '0 0 10px rgba(255, 107, 53, 0.7)' : 'none',
                    zIndex: 10
                  }}
                  transition={{ duration: 0.12, ease: 'easeOut' }}
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
          <AnimatedStat
            value={stats.commits_together}
            label="commits together"
            delay={0}
          />
          <AnimatedStat
            value={stats.lines_of_code}
            label="lines of code"
            format="compact"
            delay={0.1}
          />
          <AnimatedStat
            value={stats.projects_shipped}
            label="projects shipped"
            delay={0.2}
          />
          <AnimatedStat
            value={derivedStats.monthsBuilding}
            label="months building"
            delay={0.3}
          />
        </div>
      </div>

      {/* Tool Usage */}
      <div className="bg-[#252525] rounded-lg p-4 border border-[#3d3d3d] mb-4">
        <div className="text-[#27c93f] text-xs mb-3">{'> '}<span className="text-[#808080]">tool_usage</span></div>
        <div className="space-y-2">
          <AnimatedToolBar name="Bash" count={stats.tool_bash} maxCount={stats.tool_read} color="bg-green-500" delay={0.4} formatNumber={formatNumber} />
          <AnimatedToolBar name="Read" count={stats.tool_read} maxCount={stats.tool_read} color="bg-blue-500" delay={0.5} formatNumber={formatNumber} />
          <AnimatedToolBar name="Edit" count={stats.tool_edit} maxCount={stats.tool_read} color="bg-purple-500" delay={0.6} formatNumber={formatNumber} />
          <AnimatedToolBar name="Write" count={stats.tool_write} maxCount={stats.tool_read} color="bg-orange-500" delay={0.7} formatNumber={formatNumber} />
        </div>
      </div>

      {/* Languages */}
      <div className="bg-[#252525] rounded-lg p-4 border border-[#3d3d3d] mb-4">
        <div className="text-[#27c93f] text-xs mb-3">{'> '}<span className="text-[#808080]">languages</span></div>
        <div className="flex flex-wrap gap-2">
          {languageStats.map((lang, index) => (
            <m.div
              key={lang.lang}
              className="px-2 py-1 bg-[#1e1e1e] rounded text-xs border border-[#3d3d3d] cursor-default"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{
                scale: 1.05,
                borderColor: 'rgba(255, 107, 53, 0.5)',
                boxShadow: '0 0 8px rgba(255, 107, 53, 0.3)'
              }}
            >
              <span className="text-[#e0e0e0]">{lang.lang}</span>
              <span className="text-[#ff6b35] ml-1">{lang.percentage}%</span>
            </m.div>
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
