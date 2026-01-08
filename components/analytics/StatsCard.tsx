'use client'

import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  color?: 'orange' | 'blue' | 'green' | 'purple'
}

export function StatsCard({ label, value, icon: Icon, trend, color = 'orange' }: StatsCardProps) {
  const colorClasses = {
    orange: 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]',
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-emerald-500/10 text-emerald-500',
    purple: 'bg-purple-500/10 text-purple-500',
  }

  return (
    <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl hover:border-[var(--id8-orange)]/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div
            className={`text-xs font-medium ${
              trend.value >= 0 ? 'text-emerald-500' : 'text-red-500'
            }`}
          >
            {trend.value >= 0 ? '+' : ''}
            {trend.value}% {trend.label}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-[var(--text-secondary)]">{label}</p>
      </div>
    </div>
  )
}
