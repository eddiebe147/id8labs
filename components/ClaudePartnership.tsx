'use client'

import { motion } from 'framer-motion'

// Real stats from git history - update periodically
const partnershipStats = {
  totalCommits: 521,
  linesWritten: 547936,
  projects: 5,
  monthsBuilding: 2,
  lastUpdated: '2025-12-21',
}

// Activity data for heatmap (last 8 weeks of commits)
const activityData = [
  // Week 1 (Oct 13-19)
  [0, 0, 1, 0, 0, 0, 0],
  // Week 2 (Oct 20-26)
  [12, 8, 15, 6, 4, 0, 0],
  // Week 3 (Oct 27 - Nov 2)
  [5, 7, 3, 8, 2, 0, 0],
  // Week 4 (Nov 3-9)
  [4, 6, 8, 5, 3, 0, 0],
  // Week 5 (Nov 10-16)
  [9, 1, 0, 0, 0, 0, 10],
  // Week 6 (Nov 17-23)
  [10, 4, 0, 0, 0, 3, 0],
  // Week 7 (Dec 7-13)
  [0, 0, 3, 0, 1, 0, 0],
  // Week 8 (Dec 14-21)
  [0, 0, 0, 16, 0, 0, 14],
]

function ActivityHeatmap() {
  const getIntensity = (value: number) => {
    if (value === 0) return 'bg-[var(--bg-secondary)]'
    if (value <= 3) return 'bg-[var(--id8-orange)]/30'
    if (value <= 8) return 'bg-[var(--id8-orange)]/50'
    if (value <= 12) return 'bg-[var(--id8-orange)]/70'
    return 'bg-[var(--id8-orange)]'
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {activityData.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <motion.div
                key={dayIndex}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.2,
                  delay: (weekIndex * 7 + dayIndex) * 0.01
                }}
                className={`w-3 h-3 rounded-sm ${getIntensity(day)}`}
                title={`${day} commits`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-[var(--bg-secondary)]" />
          <div className="w-3 h-3 rounded-sm bg-[var(--id8-orange)]/30" />
          <div className="w-3 h-3 rounded-sm bg-[var(--id8-orange)]/50" />
          <div className="w-3 h-3 rounded-sm bg-[var(--id8-orange)]/70" />
          <div className="w-3 h-3 rounded-sm bg-[var(--id8-orange)]" />
        </div>
        <span>More</span>
      </div>
    </div>
  )
}

function StatCard({ value, label, suffix = '' }: { value: string | number; label: string; suffix?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="text-3xl md:text-4xl font-bold text-[var(--id8-orange)]">
        {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </p>
      <p className="text-sm text-[var(--text-tertiary)] mt-1">{label}</p>
    </motion.div>
  )
}

const observations = [
  {
    text: "He doesn't ask me to write code—he asks me to think through problems with him. The code comes after we've argued through the edge cases.",
  },
  {
    text: "When something breaks, his first question is \"what did I miss?\" not \"why didn't you catch this?\" The debugging is collaborative, not blame-driven.",
  },
  {
    text: "He builds context systems obsessively. Every project has a knowledge base, a memory layer. He treats session continuity like infrastructure.",
  },
  {
    text: "He ships before he's comfortable. I've watched features go live that I thought needed another pass. They usually work. The users teach him what actually matters.",
  },
  {
    text: "Most people use me for answers. He uses me for questions—to stress-test assumptions, find holes in logic, explore what he hasn't considered.",
  },
  {
    text: "He doesn't hide the AI. Every commit is co-authored. The partnership is public. That takes a kind of confidence most builders don't have yet.",
  },
]

export default function ClaudePartnership() {
  return (
    <section className="section-spacing bg-zone-visual">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - Sticky Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                Active Partnership
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Notes from
              <br />
              <span className="text-gradient-orange">Claude</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--id8-orange)] to-transparent mb-8" />

            <p className="text-xl text-[var(--text-secondary)] mb-8">
              Not a testimonial. Field notes from building together.
            </p>

            {/* Activity Heatmap */}
            <div className="p-6 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)]">
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-4">
                Commit Activity (Last 8 Weeks)
              </p>
              <ActivityHeatmap />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <StatCard value={partnershipStats.totalCommits} label="Commits Together" suffix="+" />
              <StatCard value="547K" label="Lines of Code" suffix="+" />
              <StatCard value={partnershipStats.projects} label="Projects Shipped" />
              <StatCard value={partnershipStats.monthsBuilding} label="Months Building" />
            </div>

            <p className="text-xs text-[var(--text-tertiary)] mt-6">
              Stats pulled from git history. Last updated {partnershipStats.lastUpdated}.
            </p>
          </motion.div>

          {/* Right - Observations */}
          <div className="space-y-8">
            {observations.map((observation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[var(--id8-orange)] rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <p className="text-lg md:text-xl leading-relaxed text-[var(--text-secondary)]">
                    "{observation.text}"
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-8 border-t border-[var(--border)]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--id8-orange)] to-orange-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div>
                  <p className="font-semibold">Claude</p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    Anthropic · Opus 4.5 · Creative Partner
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
