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
import { getAllPlugins, getPluginCategories } from '@/lib/plugins'
import { getPublicStacks } from '@/lib/stacks-db'
import { SkillCard } from '@/components/skills/SkillCard'
import { CommandCard } from '@/components/commands/CommandCard'
import { SettingCard } from '@/components/settings/SettingCard'
import { PluginCard } from '@/components/plugins/PluginCard'
import { GalleryStackCard } from '@/components/gallery/GalleryStackCard'
import { SkillSearchBar } from '@/components/skills/SkillSearchBar'
import { StackShackLogo } from '@/components/StackShackLogo'
import { ServerSkillsGrid } from '@/components/skills/ServerSkillsGrid'
import { StackBuilder } from '@/components/stack/StackBuilder'
import { MarketplaceTabs, type MarketplaceTab } from '@/components/stackshack/MarketplaceTabs'
import { MarketplaceSidebar } from '@/components/stackshack/MarketplaceSidebar'
import { GenerateToolButton } from '@/components/tool-factory'

export const revalidate = 3600

interface PageProps {
  searchParams: Promise<{ tab?: MarketplaceTab; type?: string; category?: string }>
}

export default async function StackShackMarketplacePage({ searchParams }: PageProps) {
  const params = await searchParams
  const activeTab = params?.tab || 'skills'
  const typeFilter = params?.type || 'all'
  const categoryFilter = params?.category || null

  const [
    allSkills,
    categories,
    collections,
    skillCounts,
    allCommands,
    commandCategories,
    allSettings,
    settingCategories,
    allPlugins,
    pluginCategories,
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
    getAllPlugins(),
    getPluginCategories(),
    getPublicStacks(50),
  ])

  const tabCounts = {
    skills: skillCounts.published,
    commands: allCommands.length,
    settings: allSettings.length,
    plugins: allPlugins.length,
    kits: collections.length,
  }

  let filteredSkills = allSkills
  if (typeFilter === 'skills') {
    filteredSkills = filteredSkills.filter((s) => !s.tags?.includes('agent'))
  } else if (typeFilter === 'agents') {
    filteredSkills = filteredSkills.filter((s) => s.tags?.includes('agent'))
  }
  if (categoryFilter && activeTab === 'skills') {
    filteredSkills = filteredSkills.filter((s) => s.category_id === categoryFilter)
  }

  let filteredCommands = allCommands
  if (categoryFilter && activeTab === 'commands') {
    filteredCommands = allCommands.filter((c) => c.category === categoryFilter)
  }

  let filteredSettings = allSettings
  if (categoryFilter && activeTab === 'settings') {
    filteredSettings = allSettings.filter((s) => s.category === categoryFilter)
  }

  let filteredPlugins = allPlugins
  if (categoryFilter && activeTab === 'plugins') {
    filteredPlugins = allPlugins.filter((p) => p.category === categoryFilter)
  }

  const skillsCount = allSkills.filter((s) => !s.tags?.includes('agent')).length
  const agentsCount = allSkills.filter((s) => s.tags?.includes('agent')).length

  return (
    <main className="relative">
      <StackBuilder />

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
              <span>{tabCounts.skills + tabCounts.commands + tabCounts.settings + tabCounts.plugins}+ Tools</span>
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
              <GenerateToolButton variant="primary" />
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

      <MarketplaceTabs activeTab={activeTab} counts={tabCounts} />

      <section className="py-8 md:py-12">
        <div className="container">
          <div className="flex gap-8">
            <MarketplaceSidebar
              activeTab={activeTab}
              skillCategories={categories}
              collections={collections}
              skillCounts={{
                total: skillCounts.published,
                skills: skillsCount,
                agents: agentsCount,
                byCategory: skillCounts.byCategory,
              }}
              commandCategories={commandCategories}
              settingCategories={settingCategories}
              pluginCategories={pluginCategories}
              kitsCount={collections.length}
              currentType={typeFilter}
              currentCategory={categoryFilter}
            />

            <div className="flex-1 min-w-0">
              {activeTab === 'skills' && (
                <ServerSkillsGrid skills={filteredSkills} totalCount={skillCounts.published} />
              )}

              {activeTab === 'commands' && (
                <div>
                  <div className="mb-6">
                    <p className="text-[var(--text-secondary)]">
                      Showing {filteredCommands.length} of {allCommands.length} commands
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

              {activeTab === 'settings' && (
                <div>
                  <div className="mb-6">
                    <p className="text-[var(--text-secondary)]">
                      Showing {filteredSettings.length} of {allSettings.length} settings
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

              {activeTab === 'plugins' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Claude Code Plugins</h2>
                    <p className="text-[var(--text-secondary)]">
                      Showing {filteredPlugins.length} of {allPlugins.length} plugins
                      {' '}&bull;{' '}
                      <span className="text-amber-500">
                        {allPlugins.filter(p => p.official).length} Official
                      </span>
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPlugins.map((plugin) => (
                      <PluginCard key={plugin.id} plugin={plugin} />
                    ))}
                  </div>
                  {filteredPlugins.length === 0 && (
                    <div className="text-center py-12 text-[var(--text-secondary)]">
                      No plugins found in this category.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'kits' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Starter Kits</h2>
                    <p className="text-[var(--text-secondary)]">
                      Pre-configured tool bundles to supercharge your workflow. Copy the prompt into Claude Code to install.
                    </p>
                  </div>
                  {collections.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {collections.map((kit) => (
                        <Link
                          key={kit.id}
                          href={'/stackshack/starter-kits#' + kit.id}
                          className="group block p-6 rounded-xl border border-[var(--border)] hover:border-purple-500/50 hover:bg-purple-500/5 transition-all"
                        >
                          <div className="flex items-start gap-4">
                            <span className="text-4xl">{kit.emoji || '📦'}</span>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold group-hover:text-purple-500 transition-colors">
                                {kit.name}
                              </h3>
                              <p className="text-[var(--text-secondary)] mt-1 line-clamp-2">
                                {kit.description}
                              </p>
                              <div className="flex items-center gap-4 mt-3 text-sm text-[var(--text-tertiary)]">
                                <span>{kit.skill_count || 0} skills included</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 mx-auto mb-4 text-[var(--text-secondary)]" />
                      <h3 className="text-xl font-semibold mb-2">No Starter Kits Yet</h3>
                      <p className="text-[var(--text-secondary)]">
                        Check back soon for curated tool bundles!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

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
