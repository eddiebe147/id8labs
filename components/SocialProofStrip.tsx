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

interface SocialProofStripProps {
  essayCount?: number
  productsShipping?: number
  activeProjects?: number
  startYear?: number
}

const DEFAULT_METRICS = {
  essayCount: 41,
  productsShipping: 4,
  activeProjects: 9,
  startYear: 2024,
}

export default function SocialProofStrip({
  essayCount = DEFAULT_METRICS.essayCount,
  productsShipping = DEFAULT_METRICS.productsShipping,
  activeProjects = DEFAULT_METRICS.activeProjects,
  startYear = DEFAULT_METRICS.startYear,
}: SocialProofStripProps) {
  const metrics: Metric[] = [
    {
      label: 'Essays Published',
      value: String(essayCount),
      icon: FileText,
    },
    {
      label: 'Products Shipping',
      value: String(productsShipping),
      icon: Package,
    },
    {
      label: 'Active Projects',
      value: String(activeProjects),
      icon: Beaker,
    },
    {
      label: 'Building in Public Since',
      value: String(startYear),
      icon: Calendar,
    },
  ]
  return (
    <section className="bg-zone-nav border-y border-[var(--border)]">
      <div className="container py-6">
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center lg:justify-between items-center gap-6 lg:gap-4"
        >
          {metrics.map((metric, index) => (
            <m.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-3 px-4"
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
              {/* Divider - hidden on last item and on mobile */}
              {index < metrics.length - 1 && (
                <div className="hidden lg:block w-px h-8 bg-[var(--border)] ml-4" />
              )}
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  )
}
