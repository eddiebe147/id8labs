'use client'

import { m } from '@/components/motion'
import {
  FileText,
  Package,
  Beaker,
  Calendar,
  type LucideIcon,
} from 'lucide-react'

interface Metric {
  label: string
  value: string
  icon: LucideIcon
}

const metrics: Metric[] = [
  {
    label: 'Essays Published',
    value: '41',
    icon: FileText,
  },
  {
    label: 'Products Shipping',
    value: '4',
    icon: Package,
  },
  {
    label: 'Active Projects',
    value: '9',
    icon: Beaker,
  },
  {
    label: 'Building in Public Since',
    value: '2024',
    icon: Calendar,
  },
]

export default function SocialProofStrip() {
  return (
    <section className="bg-zone-nav border-y border-[var(--border)]">
      <div className="container py-6">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6 lg:gap-12">
          {metrics.map((metric, index) => (
            <m.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <metric.icon className="w-5 h-5 text-[var(--id8-orange)]" strokeWidth={1.5} />
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--text-primary)]">
                  {metric.value}
                </span>
                <span className="text-sm text-[var(--text-secondary)]">
                  {metric.label}
                </span>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
