import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight, Sparkles, TrendingUp, Clock, Package, CheckCircle } from 'lucide-react'
import {
  getAllSkills,
  getAllCategories,
  getAllCollections,
  getSkillCounts,
} from '@/lib/skills'
import { getAllCommands, getCommandCategories } from '@/lib/commands'
import { getAllSettings, getSettingCategories } from '@/lib/settings'
import { getPublicStacks } from '@/lib/stacks-db'
import { SkillCard } from '@/components/skills/SkillCard'
import { CommandCard } from '@/components/commands/CommandCard'
import { SettingCard } from '@/components/settings/SettingCard'
import { GalleryStackCard } from '@/components/gallery/GalleryStackCard'
import { SkillSearchBar } from '@/components/skills/SkillSearchBar'
import { StackShackLogo } from '@/components/StackShackLogo'
import { ServerSidebar } from '@/components/skills/ServerSidebar'
import { ServerSkillsGrid } from '@/components/skills/ServerSkillsGrid'
import { StackBuilder } from '@/components/stack/StackBuilder'
import { MarketplaceTabs, type MarketplaceTab } from '@/components/stackshack/MarketplaceTabs'

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  searchParams: Promise<{ tab?: MarketplaceTab; type?: string; category?: string }>
}

export default async function StackShackMarketplacePage({ searchParams }: PageProps) {
  const params = await searchParams
  const activeTab = params?.tab || 'skills'
  const typeFilter = params?.type || 'all'
  const categoryFilter = params?.category || null

  // Fetch data for all tabs in parallel
  const [
    allSkills,
    categories,
    collections,
    skillCounts,
    allCommands,
    commandCategories,
    allSettings,
    settingCategories,
    publicStacks,
  ] = await Promise.all([
    getAllSkills(),
    getAllCategories(),
    getAllCollections(true),
    getSkillCounts(),
    getAllCommands(),
    getCommandCategories(),
    getAllSettings(),
    getSettingCategories(),
    getPublicStacks(50),
  ])

  // Tab counts for badges
  const tabCounts = {
    skills: skillCounts.published,
    commands: allCommands.length,
    settings: allSettings.length,
    stacks: publicStacks.length,
  }

  // Skills filtering
  let filteredSkills = allSkills
  if (typeFilter === 'skills') {
    filteredSkills = filteredSkills.filter((s) => !s.tags?.includes('agent'))
  } else if (typeFilter === 'agents') {
    filteredSkills = filteredSkills.filter((s) => s.tags?.includes('agent'))
  }
  if (categoryFilter && activeTab === 'skills') {
    filteredSkills = filteredSkills.filter((s) => s.category_id === categoryFilter)
  }

  // Commands filtering
  let filteredCommands = allCommands
  if (categoryFilter && activeTab === 'commands') {
    filteredCommands = allCommands.filter((c) => c.category === categoryFilter)
  }

  // Settings filtering
  let filteredSettings = allSettings
  if (categoryFilter && activeTab === 'settings') {
    filteredSettings = allSettings.filter((s) => s.category === categoryFilter)
  }

  const skillsCount = allSkills.filter((s) => !s.tags?.includes('agent')).length
  const agentsCount = allSkills.filter((s) => s.tags?.includes('agent')).length

  return (
    <main className="relative">
      {/* Stack Builder */}
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
              <Package className="w-4 h-4" />
              <span>{tabCounts.skills + tabCounts.commands + tabCounts.settings}+ Tools</span>
            </div>

            <h1 className="mb-4">
              <StackShackLogo size="xl" />
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Free skills, commands, and settings for{' '}
              <span className="font-semibold text-[var(--text-primary)]">Claude Code</span>.
              Build your stack, ship faster.
            </p>

            <div className="flex justify-center mb-8">
              <div className="w-full max-w-xl">
                <Suspense fallback={<div className="h-14 bg-[var(--bg-secondary)] rounded-xl animate-pulse" />}>
                  <SkillSearchBar placeholder="Search all tools..." />
                </Suspense>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-sm font-medium">
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-full border border-[var(--border)]">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-full border border-[var(--border)]">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <Suspense fallback={null}>
        <MarketplaceTabs counts={tabCounts} />
      </Suspense>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container">
          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="flex gap-8">
              <ServerSidebar
                categories={categories}
                collections={collections}
                counts={{
                  total: skillCounts.published,
                  skills: skillsCount,
                  agents: agentsCount,
                  byCategory: skillCounts.byCategory,
                }}
                currentType={typeFilter}
                currentCategory={categoryFilter}
              />
              <div className="flex-1 min-w-0">
                <ServerSkillsGrid skills={filteredSkills} totalCount={skillCounts.published} />
              </div>
            </div>
          )}

          {/* Commands Tab */}
          {activeTab === 'commands' && (
            <div>
              {/* Category Filters */}
              <div className="mb-8">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href="/stackshack?tab=commands"
                    className={'px-4 py-2 rounded-full text-sm font-medium transition-colors ' +
                      (!categoryFilter
                        ? 'bg-[var(--id8-orange)] text-white'
                        : 'bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--id8-orange)]')}
                  >
                    All ({allCommands.length})
                  </Link>
                  {Object.entries(commandCategories).sort().map(([cat, count]) => (
                    <Link
                      key={cat}
                      href={'/stackshack?tab=commands&category=' + cat}
                      className={'px-4 py-2 rounded-full text-sm font-medium transition-colors ' +
                        (categoryFilter === cat
                          ? 'bg-[var(--id8-orange)] text-white'
                          : 'bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--id8-orange)]')}
                    >
                      {cat} ({count})
                    </Link>
                  ))}
                </div>
              </div>

              {/* Commands Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCommands.map((command) => (
                  <CommandCard key={command.id} command={command} />
                ))}
              </div>

              {filteredCommands.length === 0 && (
                <div className="text-center py-12 text-[var(--text-secondary)]">
                  No commands found in this category.
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              {/* Category Filters */}
              <div className="mb-8">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href="/stackshack?tab=settings"
                    className={'px-4 py-2 rounded-full text-sm font-medium transition-colors ' +
                      (!categoryFilter
                        ? 'bg-[var(--id8-orange)] text-white'
                        : 'bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--id8-orange)]')}
                  >
                    All ({allSettings.length})
                  </Link>
                  {Object.entries(settingCategories).sort().map(([cat, count]) => (
                    <Link
                      key={cat}
                      href={'/stackshack?tab=settings&category=' + cat}
                      className={'px-4 py-2 rounded-full text-sm font-medium transition-colors ' +
                        (categoryFilter === cat
                          ? 'bg-[var(--id8-orange)] text-white'
                          : 'bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--id8-orange)]')}
                    >
                      {cat} ({count})
                    </Link>
                  ))}
                </div>
              </div>

              {/* Settings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSettings.map((setting) => (
                  <SettingCard key={setting.id} setting={setting} />
                ))}
              </div>

              {filteredSettings.length === 0 && (
                <div className="text-center py-12 text-[var(--text-secondary)]">
                  No settings found in this category.
                </div>
              )}
            </div>
          )}

          {/* Stacks Tab */}
          {activeTab === 'stacks' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Community Stacks</h2>
                <p className="text-[var(--text-secondary)]">
                  Discover and fork stacks shared by the community
                </p>
              </div>

              {publicStacks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {publicStacks.map((stack) => (
                    <GalleryStackCard key={stack.id} stack={stack} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto mb-4 text-[var(--text-secondary)]" />
                  <h3 className="text-xl font-semibold mb-2">No Public Stacks Yet</h3>
                  <p className="text-[var(--text-secondary)]">
                    Be the first to share a stack with the community!
                  </p>
                </div>
              )}
            </div>
          )}
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
              All tools are 100% free. Add to your stack and install in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/stackshack/starter-kits" className="btn btn-primary">
                <Package className="w-5 h-5" />
                Browse Starter Kits
              </Link>
              <Link href="/stackshack?tab=skills" className="btn btn-secondary">
                <TrendingUp className="w-5 h-5" />
                View All Skills
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
