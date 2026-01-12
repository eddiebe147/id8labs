import Link from 'next/link'
import { Filter, Package, HelpCircle, ChevronDown, Terminal, Settings, Layers, Puzzle, Zap } from 'lucide-react'
import type { SkillCategory, SkillCollection } from '@/lib/skill-types'
import type { MarketplaceTab } from './MarketplaceTabs'

const SKILL_CATEGORY_EMOJI: Record<string, string> = {
  documents: '📄',
  communication: '📬',
  research: '🔍',
  writing: '✍️',
  design: '🎨',
  code: '💻',
  project: '📋',
  business: '💼',
  domain: '🏢',
  personal: '👤',
  meta: '⚙️',
}

const COMMAND_CATEGORY_EMOJI: Record<string, string> = {
  git: '🔄',
  setup: '⚡',
  testing: '🧪',
  deployment: '🚀',
  database: '🗄️',
  development: '💻',
}

const SETTING_CATEGORY_EMOJI: Record<string, string> = {
  editor: '📝',
  formatting: '✨',
  linting: '🔍',
  typescript: '📘',
  styling: '🎨',
  git: '🔄',
  testing: '🧪',
  deployment: '🚀',
  model: '🤖',
  permissions: '🔐',
  context: '📚',
  budget: '💰',
  optimization: '⚡',
  safety: '🛡️',
}

const PLUGIN_CATEGORY_EMOJI: Record<string, string> = {
  'code-quality': '✨',
  automation: '🔄',
  development: '💻',
  productivity: '⚡',
  'output-style': '📝',
  lsp: '🔧',
  integration: '🔗',
  framework: '📦',
  testing: '🧪',
}

interface MarketplaceSidebarProps {
  activeTab: MarketplaceTab
  skillCategories?: SkillCategory[]
  collections?: SkillCollection[]
  skillCounts?: {
    total: number
    skills: number
    agents: number
    byCategory: Record<string, number>
  }
  commandCategories?: Record<string, number>
  settingCategories?: Record<string, number>
  pluginCategories?: Record<string, number>
  kitsCount?: number
  currentType?: string
  currentCategory?: string | null
}

export function MarketplaceSidebar({
  activeTab,
  skillCategories = [],
  collections = [],
  skillCounts,
  commandCategories = {},
  settingCategories = {},
  pluginCategories = {},
  kitsCount = 0,
  currentType = 'all',
  currentCategory = null,
}: MarketplaceSidebarProps) {
  const buildFilterUrl = (type?: string, category?: string | null) => {
    const params = new URLSearchParams()
    if (activeTab !== 'skills') {
      params.set('tab', activeTab)
    }
    const targetType = type ?? currentType
    const targetCategory = category === undefined ? currentCategory : category
    if (targetType && targetType !== 'all') {
      params.set('type', targetType)
    }
    if (targetCategory) {
      params.set('category', targetCategory)
    }
    const queryString = params.toString()
    return '/stackshack' + (queryString ? '?' + queryString : '')
  }

  const hasActiveFilters = currentType !== 'all' || currentCategory !== null
  const clearUrl = activeTab === 'skills' ? '/stackshack' : '/stackshack?tab=' + activeTab

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[var(--text-secondary)]" />
              <h3 className="font-semibold text-sm uppercase tracking-wide text-[var(--text-secondary)]">
                Filters
              </h3>
            </div>
            {hasActiveFilters && (
              <Link
                href={clearUrl}
                className="text-xs text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)] flex items-center gap-1"
              >
                Clear
              </Link>
            )}
          </div>

          {activeTab === 'skills' && skillCounts && (
            <>
              <div>
                <h4 className="text-sm font-medium mb-3">Categories</h4>
                <div className="space-y-1">
                  <Link
                    href={buildFilterUrl(currentType, null)}
                    className={'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ' +
                      (!currentCategory
                        ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]'
                        : 'hover:bg-[var(--bg-secondary)]')}
                  >
                    <Zap className="w-4 h-4" />
                    <span className="text-sm flex-1">All Skills</span>
                    <span className="text-xs text-[var(--text-tertiary)] font-medium">{skillCounts.total}</span>
                  </Link>
                  {skillCategories
                    .filter(cat => (skillCounts.byCategory[cat.id] || 0) > 0)
                    .map((category) => {
                      const emoji = SKILL_CATEGORY_EMOJI[category.id] || '📦'
                      const count = skillCounts.byCategory[category.id] || 0
                      const isSelected = currentCategory === category.id
                      return (
                        <Link
                          key={category.id}
                          href={isSelected ? buildFilterUrl(currentType, null) : buildFilterUrl(currentType, category.id)}
                          className={'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ' +
                            (isSelected
                              ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]'
                              : 'hover:bg-[var(--bg-secondary)]')}
                        >
                          <span className="text-lg">{emoji}</span>
                          <span className="text-sm flex-1 truncate">{category.name}</span>
                          <span className="text-xs text-[var(--text-tertiary)] font-medium">{count}</span>
                        </Link>
                      )
                    })}
                </div>
              </div>
              <div className="border-t border-[var(--border)]" />
              <div>
                <h4 className="text-sm font-medium mb-3">Type</h4>
                <div className="space-y-1">
                  <Link
                    href={buildFilterUrl('all', currentCategory)}
                    className={'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ' +
                      (currentType === 'all'
                        ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]'
                        : 'hover:bg-[var(--bg-secondary)]')}
                  >
                    <span className="text-sm flex-1">All Items</span>
                    <span className="text-xs text-[var(--text-tertiary)] font-medium">{skillCounts.total}</span>
                  </Link>
                  <Link
                    href={buildFilterUrl('skills', currentCategory)}
                    className={'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ' +
                      (currentType === 'skills'
                        ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]'
                        : 'hover:bg-[var(--bg-secondary)]')}
                  >
                    <span className="text-sm flex-1">Skills Only</span>
                    <span className="text-xs text-[var(--text-tertiary)] font-medium">{skillCounts.skills}</span>
                  </Link>
                  <Link
                    href={buildFilterUrl('agents', currentCategory)}
                    className={'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ' +
                      (currentType === 'agents'
                        ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]'
                        : 'hover:bg-[var(--bg-secondary)]')}
                  >
                    <span className="text-sm flex-1">Agents Only</span>
                    <span className="text-xs text-[var(--text-tertiary)] font-medium">{skillCounts.agents}</span>
                  </Link>
                </div>
              </div>
            </>
          )}

          {activeTab === 'commands' && (
            <div>
              <h4 className="text-sm font-medium mb-3">Categories</h4>
              <div className="space-y-1">
                <Link
                  href="/stackshack?tab=commands"
                  className={'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ' +
                    (!currentCategory
                      ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]'
                      : 'hover:bg-[var(--bg-secondary)]')}
                >
                  <Terminal className="w-4 h-4" />
                  <span className="text-sm flex-1">All Commands</span>
                  <span className="text-xs text-[var(--text-tertiary)] font-medium">
                    {Object.values(commandCategories).reduce((a, b) => a + b, 0)}
                  </span>
                </Link>
                {Object.entries(commandCategories)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([category, count]) => {
                    const emoji = COMMAND_CATEGORY_EMOJI[category] || '⚡'
                    const isSelected = currentCategory === category
                    return (
                      <Link
                        key={category}
                        href={isSelected ? '/stackshack?tab=commands' : '/stackshack?tab=commands&category=' + category}
                        className={'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ' +
                          (isSelected
                            ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]'
                            : 'hover:bg-[var(--bg-secondary)]')}
                      >
                        <span className="text-lg">{emoji}</span>
                        <span className="text-sm flex-1 capitalize">{category}</span>
                        <span className="text-xs text-[var(--text-tertiary)] font-medium">{count}</span>
                      </Link>
                    )
                  })}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h4 className="text-sm font-medium mb-3">Categories</h4>
              <div className="space-y-1">
                <Link
                  href="/stackshack?tab=settings"
                  className={'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ' +
                    (!currentCategory
                      ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]'
                      : 'hover:bg-[var(--bg-secondary)]')}
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-sm flex-1">All Settings</span>
                  <span className="text-xs text-[var(--text-tertiary)] font-medium">
                    {Object.values(settingCategories).reduce((a, b) => a + b, 0)}
                  </span>
                </Link>
                {Object.entries(settingCategories)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([category, count]) => {
                    const emoji = SETTING_CATEGORY_EMOJI[category] || '⚙️'
                    const isSelected = currentCategory === category
                    return (
                      <Link
                        key={category}
                        href={isSelected ? '/stackshack?tab=settings' : '/stackshack?tab=settings&category=' + category}
                        className={'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ' +
                          (isSelected
                            ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]'
                            : 'hover:bg-[var(--bg-secondary)]')}
                      >
                        <span className="text-lg">{emoji}</span>
                        <span className="text-sm flex-1 capitalize">{category}</span>
                        <span className="text-xs text-[var(--text-tertiary)] font-medium">{count}</span>
                      </Link>
                    )
                  })}
              </div>
            </div>
          )}

          {activeTab === 'plugins' && (
            <div>
              <h4 className="text-sm font-medium mb-3">Categories</h4>
              <div className="space-y-1">
                <Link
                  href="/stackshack?tab=plugins"
                  className={'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ' +
                    (!currentCategory
                      ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]'
                      : 'hover:bg-[var(--bg-secondary)]')}
                >
                  <Puzzle className="w-4 h-4" />
                  <span className="text-sm flex-1">All Plugins</span>
                  <span className="text-xs text-[var(--text-tertiary)] font-medium">
                    {Object.values(pluginCategories).reduce((a, b) => a + b, 0)}
                  </span>
                </Link>
                {Object.entries(pluginCategories)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([category, count]) => {
                    const emoji = PLUGIN_CATEGORY_EMOJI[category] || '🔌'
                    const isSelected = currentCategory === category
                    // Format category name: code-quality -> Code Quality
                    const displayName = category.split('-').map(word =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')
                    return (
                      <Link
                        key={category}
                        href={isSelected ? '/stackshack?tab=plugins' : '/stackshack?tab=plugins&category=' + category}
                        className={'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ' +
                          (isSelected
                            ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]'
                            : 'hover:bg-[var(--bg-secondary)]')}
                      >
                        <span className="text-lg">{emoji}</span>
                        <span className="text-sm flex-1">{displayName}</span>
                        <span className="text-xs text-[var(--text-tertiary)] font-medium">{count}</span>
                      </Link>
                    )
                  })}
              </div>
            </div>
          )}

          {activeTab === 'kits' && (
            <div>
              <h4 className="text-sm font-medium mb-3">Browse</h4>
              <div className="space-y-1">
                <Link
                  href="/stackshack?tab=kits"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]"
                >
                  <Package className="w-4 h-4" />
                  <span className="text-sm flex-1">All Starter Kits</span>
                  <span className="text-xs text-[var(--text-tertiary)] font-medium">{kitsCount}</span>
                </Link>
              </div>
              <p className="mt-4 text-xs text-[var(--text-tertiary)]">
                Pre-configured tool bundles to supercharge your workflow.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-[var(--border)]" />

        {activeTab === 'skills' && collections.length > 0 && (
          <>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-purple-500" />
                <h3 className="font-semibold text-sm uppercase tracking-wide text-[var(--text-secondary)]">
                  Starter Kits
                </h3>
              </div>
              <div className="space-y-2">
                {collections.slice(0, 3).map((collection) => (
                  <Link
                    key={collection.id}
                    href={'/stackshack/starter-kits#' + collection.id}
                    className="block p-3 rounded-lg border border-[var(--border)] hover:border-purple-500/30 hover:bg-purple-500/5 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{collection.emoji || '📦'}</span>
                      <span className="font-medium text-sm group-hover:text-purple-500 transition-colors">
                        {collection.name}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1 line-clamp-1">
                      {collection.skill_count || 0} skills included
                    </p>
                  </Link>
                ))}
              </div>
              <Link
                href="/stackshack/starter-kits"
                className="block mt-3 text-sm text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)] font-medium"
              >
                Browse all kits →
              </Link>
            </div>
            <div className="border-t border-[var(--border)]" />
          </>
        )}

        <div>
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-[var(--text-secondary)]" />
            <h3 className="font-semibold text-sm uppercase tracking-wide text-[var(--text-secondary)]">
              Help
            </h3>
          </div>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <details className="group">
              <summary className="cursor-pointer flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors">
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                How to Install
              </summary>
              <div className="mt-2 ml-6 text-xs space-y-2 text-[var(--text-tertiary)]">
                <p>1. Click any item to view details</p>
                <p>2. Copy the install command</p>
                <p>3. Run in your Claude Code project</p>
              </div>
            </details>
            {activeTab === 'skills' && (
              <details className="group">
                <summary className="cursor-pointer flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors">
                  <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                  Skills vs Agents
                </summary>
                <div className="mt-2 ml-6 text-xs space-y-2 text-[var(--text-tertiary)]">
                  <p><strong>Skills:</strong> Single-purpose tools for specific tasks</p>
                  <p><strong>Agents:</strong> Multi-step workflows with decision-making</p>
                </div>
              </details>
            )}
            {activeTab === 'kits' && (
              <details className="group">
                <summary className="cursor-pointer flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors">
                  <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                  About Starter Kits
                </summary>
                <div className="mt-2 ml-6 text-xs space-y-2 text-[var(--text-tertiary)]">
                  <p><strong>Kits:</strong> Pre-configured tool bundles</p>
                  <p><strong>Install:</strong> Paste prompt into Claude Code</p>
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
