import Link from 'next/link'
import { Filter, Package, HelpCircle, ChevronDown } from 'lucide-react'
import type { SkillCategory, SkillCollection } from '@/lib/skill-types'

// Keep categories in sync with FilterSection
const CATEGORY_EMOJI: Record<string, string> = {
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

interface ServerSidebarProps {
    categories: SkillCategory[]
    collections: SkillCollection[]
    counts: {
        total: number
        skills: number
        agents: number
        byCategory: Record<string, number>
    }
    currentType: string
    currentCategory: string | null
}

/**
 * Server-rendered sidebar using URL-based filtering.
 * No client state - fully compatible with Server Components.
 */
export function ServerSidebar({
    categories,
    collections,
    counts,
    currentType,
    currentCategory,
}: ServerSidebarProps) {
    // Build URL with preserved filters
    const buildFilterUrl = (type?: string, category?: string | null) => {
        const params = new URLSearchParams()
        const targetType = type ?? currentType
        const targetCategory = category === undefined ? currentCategory : category

        if (targetType && targetType !== 'all') {
            params.set('type', targetType)
        }
        if (targetCategory) {
            params.set('category', targetCategory)
        }

        const queryString = params.toString()
        return `/skills${queryString ? `?${queryString}` : ''}`
    }

    const hasActiveFilters = currentType !== 'all' || currentCategory !== null

    return (
        <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
                {/* Filters Section */}
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-[var(--text-secondary)]" />
                            <h3 className="font-semibold text-sm uppercase tracking-wide text-[var(--text-secondary)]">
                                Filters
                            </h3>
                        </div>
                        {hasActiveFilters && (
                            <Link
                                href="/skills"
                                className="text-xs text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)] flex items-center gap-1"
                            >
                                Clear
                            </Link>
                        )}
                    </div>

                    {/* Type Filter */}
                    <div>
                        <h4 className="text-sm font-medium mb-3">Type</h4>
                        <div className="space-y-1">
                            <Link
                                href={buildFilterUrl('all', currentCategory)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${currentType === 'all'
                                    ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]'
                                    : 'hover:bg-[var(--bg-secondary)]'
                                    }`}
                            >
                                <span className="text-sm flex-1">All Items</span>
                                <span className="text-xs text-[var(--text-tertiary)] font-medium">
                                    {counts.total}
                                </span>
                            </Link>

                            <Link
                                href={buildFilterUrl('skills', currentCategory)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${currentType === 'skills'
                                    ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]'
                                    : 'hover:bg-[var(--bg-secondary)]'
                                    }`}
                            >
                                <span className="text-sm flex-1">Skills</span>
                                <span className="text-xs text-[var(--text-tertiary)] font-medium">
                                    {counts.skills}
                                </span>
                            </Link>

                            <Link
                                href={buildFilterUrl('agents', currentCategory)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${currentType === 'agents'
                                    ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]'
                                    : 'hover:bg-[var(--bg-secondary)]'
                                    }`}
                            >
                                <span className="text-sm flex-1">Agents</span>
                                <span className="text-xs text-[var(--text-tertiary)] font-medium">
                                    {counts.agents}
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[var(--border)]" />

                    {/* Category Filter */}
                    <div>
                        <h4 className="text-sm font-medium mb-3">Categories</h4>
                        <div className="space-y-1 max-h-64 overflow-y-auto scrollbar-thin">
                            {categories
                                .filter(cat => (counts.byCategory[cat.id] || 0) > 0)
                                .map((category) => {
                                    const emoji = CATEGORY_EMOJI[category.id] || '📦'
                                    const count = counts.byCategory[category.id] || 0
                                    const isSelected = currentCategory === category.id

                                    return (
                                        <Link
                                            key={category.id}
                                            href={
                                                isSelected
                                                    ? buildFilterUrl(currentType, null) // Clear if already selected
                                                    : buildFilterUrl(currentType, category.id)
                                            }
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isSelected
                                                ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]'
                                                : 'hover:bg-[var(--bg-secondary)]'
                                                }`}
                                        >
                                            <span className="text-lg">{emoji}</span>
                                            <span className="text-sm flex-1 truncate">{category.name}</span>
                                            <span className="text-xs text-[var(--text-tertiary)] font-medium">
                                                {count}
                                            </span>
                                        </Link>
                                    )
                                })}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[var(--border)]" />

                {/* Starter Kits Widget */}
                {collections.length > 0 && (
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
                                    href={`/skills/starter-kits#${collection.id}`}
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
                            href="/skills/starter-kits"
                            className="block mt-3 text-sm text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)] font-medium"
                        >
                            Browse all kits →
                        </Link>
                    </div>
                )}

                {/* Divider */}
                <div className="border-t border-[var(--border)]" />

                {/* Help Section */}
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
                                <p>1. Click any skill to view details</p>
                                <p>2. Copy the install command</p>
                                <p>3. Run in your Claude Code project</p>
                            </div>
                        </details>
                        <details className="group">
                            <summary className="cursor-pointer flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors">
                                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                                Skills vs Agents
                            </summary>
                            <div className="mt-2 ml-6 text-xs space-y-2 text-[var(--text-tertiary)]">
                                <p>
                                    <strong>Skills:</strong> Single-purpose tools for specific tasks
                                </p>
                                <p>
                                    <strong>Agents:</strong> Multi-step workflows with decision-making
                                </p>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </aside>
    )
}

/**
 * Mobile filter button (minimal client interactivity via CSS)
 */
export function MobileFilterButton({
    currentType,
    currentCategory,
}: {
    currentType: string
    currentCategory: string | null
}) {
    const activeCount = (currentType !== 'all' ? 1 : 0) + (currentCategory ? 1 : 0)

    return (
        <Link
            href="/skills" // Could link to a mobile filter page or use CSS-only modal
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
        >
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters</span>
            {activeCount > 0 && (
                <span className="px-2 py-0.5 bg-[var(--id8-orange)] text-white text-xs rounded-full">
                    {activeCount}
                </span>
            )}
        </Link>
    )
}
