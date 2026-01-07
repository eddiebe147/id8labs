import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight, Sparkles, TrendingUp, Clock, Package, CheckCircle } from 'lucide-react'
import {
  getAllSkills,
  getAllCategories,
  getAllCollections,
  getSkillCounts,
} from '@/lib/skills'
import { SkillCard } from '@/components/skills/SkillCard'
import { SkillSearchBar } from '@/components/skills/SkillSearchBar'
import { StackShackLogo } from '@/components/StackShackLogo'
import { ServerSidebar } from '@/components/skills/ServerSidebar'
import { ServerSkillsGrid } from '@/components/skills/ServerSkillsGrid'

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  searchParams: Promise<{ type?: string; category?: string }>
}

export default async function SkillsMarketplacePage({ searchParams }: PageProps) {
  // Await searchParams for Next.js 15 compatibility
  const params = await searchParams
  const typeFilter = params.type || 'all'
  const categoryFilter = params.category || null

  const [allSkills, categories, collections, counts] = await Promise.all([
    getAllSkills(),
    getAllCategories(),
    getAllCollections(true), // Official collections only
    getSkillCounts(),
  ])

  // Server-side filtering
  let filteredSkills = allSkills

  if (typeFilter === 'skills') {
    filteredSkills = filteredSkills.filter((s) => !s.tags?.includes('agent'))
  } else if (typeFilter === 'agents') {
    filteredSkills = filteredSkills.filter((s) => s.tags?.includes('agent'))
  }

  if (categoryFilter) {
    filteredSkills = filteredSkills.filter((s) => s.category_id === categoryFilter)
  }

  // Calculate counts for sidebar
  const skillsCount = allSkills.filter((s) => !s.tags?.includes('agent')).length
  const agentsCount = allSkills.filter((s) => s.tags?.includes('agent')).length

  // Show browse sections only when no filters applied
  const showBrowseSections = typeFilter === 'all' && !categoryFilter

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[var(--bg-secondary)]">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(var(--text-primary) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[var(--id8-orange)]/5 blur-[100px] pointer-events-none rounded-full" />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-[var(--bg-primary)] text-[var(--id8-orange)] rounded-full text-sm font-semibold border border-[var(--id8-orange)]/20 shadow-lg shadow-[var(--id8-orange)]/10 animate-fade-in-up">
              <Package className="w-4 h-4" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--id8-orange)] to-[var(--id8-orange-dark)]">
                {counts.published}+ Skills & Agents
              </span>
            </div>

            {/* StackShack Logo */}
            <h1 className="mb-6 animate-float">
              <StackShackLogo size="xl" />
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Free skills & agents for{' '}
              <span className="font-semibold text-[var(--text-primary)]">Claude Code</span>.
              <br className="hidden md:block" />
              Build your stack, ship faster.
            </p>

            {/* Search Bar */}
            <div className="flex justify-center mb-10 relative z-20">
              <div className="w-full max-w-2xl transform hover:scale-[1.01] transition-transform duration-200">
                <Suspense fallback={<SearchBarSkeleton />}>
                  <SkillSearchBar
                    placeholder={`Search ${counts.published}+ skills & agents...`}
                    autoFocus
                  />
                </Suspense>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-sm font-medium">
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-full border border-[var(--border)] shadow-sm hover:border-emerald-500/30 transition-colors">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>{categories.length} Categories</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-full border border-[var(--border)] shadow-sm hover:border-[var(--id8-orange)]/30 transition-colors">
                <span className="w-2 h-2 bg-[var(--id8-orange)] rounded-full" />
                <span className="text-gradient-orange font-bold">100% Free</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-full border border-[var(--border)] shadow-sm hover:border-blue-500/30 transition-colors">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span>ID8Labs Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Sidebar + Grid */}
      <section className="py-8 md:py-12">
        <div className="container">
          {/* Mobile Filters */}
          <div className="lg:hidden mb-6">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/skills"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  typeFilter === 'all' && !categoryFilter
                    ? 'bg-[var(--id8-orange)] text-white'
                    : 'bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--id8-orange)]'
                }`}
              >
                All ({counts.published})
              </Link>
              <Link
                href={`/skills?type=skills${categoryFilter ? `&category=${categoryFilter}` : ''}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  typeFilter === 'skills'
                    ? 'bg-[var(--id8-orange)] text-white'
                    : 'bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--id8-orange)]'
                }`}
              >
                Skills ({skillsCount})
              </Link>
              <Link
                href={`/skills?type=agents${categoryFilter ? `&category=${categoryFilter}` : ''}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  typeFilter === 'agents'
                    ? 'bg-[var(--id8-orange)] text-white'
                    : 'bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--id8-orange)]'
                }`}
              >
                Agents ({agentsCount})
              </Link>
            </div>
            {/* Mobile Category Pills - Scrollable */}
            <div className="mt-3 -mx-4 px-4 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 pb-2">
                {categories.filter(cat => (counts.byCategory[cat.id] || 0) > 0).map((category) => (
                  <Link
                    key={category.id}
                    href={
                      categoryFilter === category.id
                        ? `/skills${typeFilter !== 'all' ? `?type=${typeFilter}` : ''}`
                        : `/skills?category=${category.id}${typeFilter !== 'all' ? `&type=${typeFilter}` : ''}`
                    }
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-colors ${
                      categoryFilter === category.id
                        ? 'bg-[var(--id8-orange)]/20 text-[var(--id8-orange)] border border-[var(--id8-orange)]'
                        : 'bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--id8-orange)]'
                    }`}
                  >
                    {category.emoji} {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Server-Rendered Sidebar */}
            <ServerSidebar
              categories={categories}
              collections={collections}
              counts={{
                total: counts.published,
                skills: skillsCount,
                agents: agentsCount,
                byCategory: counts.byCategory,
              }}
              currentType={typeFilter}
              currentCategory={categoryFilter}
            />

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Active Filters Indicator - Desktop only */}
              {(typeFilter !== 'all' || categoryFilter) && (
                <div className="hidden lg:flex mb-6 items-center gap-2 flex-wrap">
                  <span className="text-sm text-[var(--text-secondary)]">Active filters:</span>
                  {typeFilter !== 'all' && (
                    <Link
                      href={categoryFilter ? `/skills?category=${categoryFilter}` : '/skills'}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] rounded-full text-sm hover:bg-[var(--id8-orange)]/20 transition-colors"
                    >
                      {typeFilter === 'skills' ? 'Skills only' : 'Agents only'}
                      <span className="ml-1">×</span>
                    </Link>
                  )}
                  {categoryFilter && (
                    <Link
                      href={typeFilter !== 'all' ? `/skills?type=${typeFilter}` : '/skills'}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] rounded-full text-sm hover:bg-[var(--id8-orange)]/20 transition-colors"
                    >
                      {categories.find((c) => c.id === categoryFilter)?.name || categoryFilter}
                      <span className="ml-1">×</span>
                    </Link>
                  )}
                  <Link
                    href="/skills"
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    Clear all
                  </Link>
                </div>
              )}

              {/* Skills Grid */}
              <ServerSkillsGrid skills={filteredSkills} totalCount={counts.published} />
            </div>
          </div>
        </div>
      </section>

      {/* Browse Sections - Only shown when no filters applied */}
      {showBrowseSections && (
        <>
          {/* Browse by Category */}
          <section className="section-spacing-sm bg-[var(--bg-secondary)]">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Browse by Category</h2>
                <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                  Explore skills organized by use case
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    count={counts.byCategory[category.id] || 0}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="section-spacing">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Build your stack. Ship faster.
                </h2>
                <p className="text-xl text-[var(--text-secondary)] mb-8">
                  All skills and agents are 100% free. Install in seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/skills/starter-kits" className="btn btn-primary">
                    <Package className="w-5 h-5" />
                    Browse Starter Kits
                  </Link>
                  <Link href="/skills?sort=popular" className="btn btn-secondary">
                    <TrendingUp className="w-5 h-5" />
                    View Popular Skills
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  )
}

// Category card component
function CategoryCard({
  category,
  count,
}: {
  category: { id: string; name: string; emoji: string | null }
  count: number
}) {
  return (
    <Link
      href={`/skills?category=${category.id}`}
      className="card group flex flex-col items-center p-6 hover-lift hover:border-[var(--id8-orange)]/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--id8-orange)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {category.emoji || '📦'}
      </span>
      <span className="font-semibold text-center group-hover:text-[var(--id8-orange)] transition-colors relative z-10">
        {category.name}
      </span>
      <span className="text-sm text-[var(--text-secondary)] mt-1 relative z-10 bg-[var(--bg-secondary)] px-2 py-0.5 rounded-full">
        {count} skills
      </span>
    </Link>
  )
}

// Search bar skeleton
function SearchBarSkeleton() {
  return (
    <div className="w-full max-w-2xl h-14 bg-[var(--bg-secondary)] rounded-xl animate-pulse" />
  )
}
