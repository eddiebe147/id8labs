import { Download, Eye, Star, Package } from 'lucide-react'
import { getAnalyticsSummary } from '@/lib/analytics'
import { StatsCard } from './StatsCard'

export async function AnalyticsSummarySection() {
  const analytics = await getAnalyticsSummary()

  // Format numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">StackShack Analytics</h2>
          <p className="text-[var(--text-secondary)]">
            Real-time metrics from the StackShack marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Total Skills & Agents"
            value={formatNumber(analytics.totalSkills)}
            icon={Package}
            color="orange"
          />
          <StatsCard
            label="Total Installs"
            value={formatNumber(analytics.totalInstalls)}
            icon={Download}
            color="blue"
          />
          <StatsCard
            label="Total Views"
            value={formatNumber(analytics.totalViews)}
            icon={Eye}
            color="purple"
          />
          <StatsCard
            label="Average Rating"
            value={analytics.avgRating > 0 ? analytics.avgRating.toFixed(1) : 'N/A'}
            icon={Star}
            color="green"
          />
        </div>
      </div>
    </section>
  )
}
