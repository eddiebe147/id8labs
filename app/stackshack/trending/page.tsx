import Link from 'next/link'
import { Metadata } from 'next'
import { TrendingUp, Sparkles, Rocket, Trophy, Zap, Terminal, Settings, Puzzle, ArrowRight, Star, Download, Eye, Shield, CheckCircle } from 'lucide-react'
import { getTrendingItems, getFeaturedItems, getRisingStars, getLeaderboard, type TrendingItem, type TrendingItemType } from '@/lib/trending'
import { StackShackLogo } from '@/components/StackShackLogo'
import { StackBuilder } from '@/components/stack/StackBuilder'
import { TrendingItemCard } from './TrendingItemCard'

export const metadata: Metadata = {
  title: 'Trending | StackShack',
  description: 'Discover the most popular skills, commands, settings, and plugins for Claude Code.',
}

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  searchParams: Promise<{ type?: TrendingItemType | 'all' }>
}

const TYPE_CONFIG = {
  all: { label: 'All', icon: TrendingUp, color: 'var(--id8-orange)' },
  skill: { label: 'Skills', icon: Zap, color: '#3b82f6' },
  command: { label: 'Commands', icon: Terminal, color: '#22c55e' },
  setting: { label: 'Settings', icon: Settings, color: '#a855f7' },
  plugin: { label: 'Plugins', icon: Puzzle, color: '#f59e0b' },
}

export default async function TrendingPage({ searchParams }: PageProps) {
  const params = await searchParams
  const activeType = params?.type || 'all'

  // Fetch data in parallel
  const [featured, trending, risingStars, skillLeaders, commandLeaders, settingLeaders, pluginLeaders] = await Promise.all([
    getFeaturedItems(6),
    getTrendingItems({ type: activeType, limit: 24 }),
    getRisingStars(8),
    getLeaderboard('skill', 5),
    getLeaderboard('command', 5),
    getLeaderboard('setting', 5),
    getLeaderboard('plugin', 5),
  ])

  return (
    <main className="relative">
      <StackBuilder />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-[var(--bg-secondary)]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[var(--id8-orange)]/5 blur-[100px] pointer-events-none rounded-full" />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-[var(--bg-primary)] text-[var(--id8-orange)] rounded-full text-sm font-semibold border border-[var(--id8-orange)]/20 shadow-lg shadow-[var(--id8-orange)]/10">
              <TrendingUp className="w-4 h-4" />
              <span>Popular Tools</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Trending on <StackShackLogo size="lg" />
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Discover what the community is using. The most popular tools for Claude Code, all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      {featured.length > 0 && (
        <section className="py-12 border-b border-[var(--border)]">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Star className="w-5 h-5 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold">Featured</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((item) => (
                <TrendingItemCard key={`${item.type}-${item.id}`} item={item} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Type Filter Tabs */}
      <section className="sticky top-0 z-30 bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border)]">
        <div className="container">
          <nav className="flex items-center justify-center gap-1 overflow-x-auto scrollbar-hide py-2">
            {Object.entries(TYPE_CONFIG).map(([type, config]) => {
              const isActive = activeType === type
              const Icon = config.icon
              const href = type === 'all' ? '/stackshack/trending' : `/stackshack/trending?type=${type}`

              return (
                <Link
                  key={type}
                  href={href}
                  className={
                    'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ' +
                    (isActive
                      ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] border border-[var(--id8-orange)]/30'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]')
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{config.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </section>

      {/* Main Trending Section */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-[var(--id8-orange)]/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-[var(--id8-orange)]" />
            </div>
            <h2 className="text-2xl font-bold">
              {activeType === 'all' ? 'Trending Now' : `Trending ${TYPE_CONFIG[activeType].label}`}
            </h2>
          </div>
          {trending.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trending.map((item) => (
                <TrendingItemCard key={`${item.type}-${item.id}`} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[var(--text-secondary)]">
              No trending items found.
            </div>
          )}
        </div>
      </section>

      {/* Rising Stars */}
      {risingStars.length > 0 && (
        <section className="py-12 bg-[var(--bg-secondary)]">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Rocket className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Rising Stars</h2>
                <p className="text-sm text-[var(--text-secondary)]">New tools gaining traction in the last 30 days</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {risingStars.map((item) => (
                <TrendingItemCard key={`${item.type}-${item.id}`} item={item} showBadge="new" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leaderboards */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Trophy className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold">Leaderboards</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Skills Leaderboard */}
            <LeaderboardCard
              title="Top Skills"
              icon={Zap}
              color="#3b82f6"
              items={skillLeaders}
              href="/stackshack?tab=skills"
            />

            {/* Commands Leaderboard */}
            <LeaderboardCard
              title="Top Commands"
              icon={Terminal}
              color="#22c55e"
              items={commandLeaders}
              href="/stackshack?tab=commands"
            />

            {/* Settings Leaderboard */}
            <LeaderboardCard
              title="Top Settings"
              icon={Settings}
              color="#a855f7"
              items={settingLeaders}
              href="/stackshack?tab=settings"
            />

            {/* Plugins Leaderboard */}
            <LeaderboardCard
              title="Top Plugins"
              icon={Puzzle}
              color="#f59e0b"
              items={pluginLeaders}
              href="/stackshack?tab=plugins"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Build your stack. Ship faster.
            </h2>
            <p className="text-xl text-[var(--text-secondary)] mb-8">
              All tools are 100% free. Add trending tools to your stack and install in seconds.
            </p>
            <Link href="/stackshack" className="btn btn-primary">
              <Sparkles className="w-5 h-5" />
              Browse All Tools
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

// Leaderboard Card Component
function LeaderboardCard({
  title,
  icon: Icon,
  color,
  items,
  href,
}: {
  title: string
  icon: React.ElementType
  color: string
  items: TrendingItem[]
  href: string
}) {
  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] overflow-hidden">
      <div className="p-4 border-b border-[var(--border)] flex items-center gap-2">
        <Icon className="w-5 h-5" style={{ color }} />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={getItemHref(item)}
            className="flex items-center gap-3 p-3 hover:bg-[var(--bg-primary)] transition-colors"
          >
            <span
              className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
              style={{
                backgroundColor: index === 0 ? '#fbbf24' : index === 1 ? '#9ca3af' : index === 2 ? '#cd7f32' : 'var(--bg-primary)',
                color: index < 3 ? 'white' : 'var(--text-secondary)',
              }}
            >
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.name}</p>
              <p className="text-xs text-[var(--text-tertiary)]">
                {item.install_count.toLocaleString()} installs
              </p>
            </div>
            {item.official && <Shield className="w-4 h-4 text-amber-500" />}
            {item.verified && !item.official && <CheckCircle className="w-3 h-3 text-emerald-500" />}
          </Link>
        ))}
      </div>
      <Link
        href={href}
        className="block p-3 text-center text-sm font-medium text-[var(--id8-orange)] hover:bg-[var(--bg-primary)] transition-colors border-t border-[var(--border)]"
      >
        View All <ArrowRight className="w-4 h-4 inline ml-1" />
      </Link>
    </div>
  )
}

function getItemHref(item: TrendingItem): string {
  switch (item.type) {
    case 'skill':
      return `/stackshack/${item.slug}`
    case 'command':
      return `/stackshack?tab=commands`
    case 'setting':
      return `/stackshack?tab=settings`
    case 'plugin':
      return `/stackshack/plugins/${item.slug}`
    default:
      return '/stackshack'
  }
}
