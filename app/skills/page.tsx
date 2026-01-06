import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight, Sparkles, TrendingUp, Clock, Package } from 'lucide-react'
import {
  getAllSkills,
  getAllCategories,
  getAllCollections,
  getSkillCounts,
} from '@/lib/skills'
import { SkillCard } from '@/components/skills/SkillCard'
import { SkillSearchBar } from '@/components/skills/SkillSearchBar'
import { CategoryTabs } from '@/components/skills/CategoryTabs'
import { SkillStarterKits } from '@/components/skills/SkillStarterKits'
import { StackShackLogo } from '@/components/StackShackLogo'

export const revalidate = 3600 // Revalidate every hour

export default async function SkillsMarketplacePage() {
  const [
    featuredSkills,
    newSkills,
    categories,
    collections,
    counts,
  ] = await Promise.all([
    getAllSkills({ featured: true, limit: 6 }),
    getAllSkills({ sortBy: 'newest', limit: 8 }),
    getAllCategories(),
    getAllCollections(true), // Official collections only
    getSkillCounts(),
  ])

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] rounded-full text-sm font-medium">
              <Package className="w-4 h-4" />
              {counts.published}+ Skills & Agents
            </div>

            {/* StackShack Logo */}
            <h1 className="mb-6">
              <StackShackLogo size="xl" />
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
              Free skills & agents for Claude Code. Build your stack.
            </p>

            {/* Search Bar */}
            <div className="flex justify-center mb-8">
              <Suspense fallback={<SearchBarSkeleton />}>
                <SkillSearchBar
                  placeholder={`Search ${counts.published}+ skills & agents...`}
                  autoFocus
                />
              </Suspense>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--text-secondary)]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                {categories.length} Categories
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--id8-orange)] rounded-full" />
                100% Free
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                ID8Labs Verified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-6 border-y border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="container">
          <CategoryTabs categories={categories} variant="pills" />
        </div>
      </section>

      {/* Featured Skills */}
      {featuredSkills.length > 0 && (
        <section className="section-spacing-sm">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Featured Skills
                </h2>
              </div>
              <Link
                href="/skills?featured=true"
                className="hidden md:flex items-center gap-1 text-sm text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)] font-medium"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Starter Kits */}
      {collections.length > 0 && (
        <section className="section-spacing-sm bg-[var(--bg-secondary)]">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Starter Kits
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Curated skill bundles for common workflows
                  </p>
                </div>
              </div>
              <Link
                href="/skills/starter-kits"
                className="hidden md:flex items-center gap-1 text-sm text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)] font-medium"
              >
                View all kits <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <SkillStarterKits collections={collections} variant="carousel" />
          </div>
        </section>
      )}

      {/* Recently Added */}
      {newSkills.length > 0 && (
        <section className="section-spacing-sm">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Recently Added
                </h2>
              </div>
              <Link
                href="/skills?sort=newest"
                className="hidden md:flex items-center gap-1 text-sm text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)] font-medium"
              >
                View all new <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse by Category */}
      <section className="section-spacing-sm bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Browse by Category
            </h2>
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
      href={`/skills/categories/${category.id}`}
      className="group flex flex-col items-center p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl hover:border-[var(--id8-orange)]/50 hover:shadow-lg transition-all"
    >
      <span className="text-4xl mb-3">{category.emoji || '📦'}</span>
      <span className="font-semibold text-center group-hover:text-[var(--id8-orange)] transition-colors">
        {category.name}
      </span>
      <span className="text-sm text-[var(--text-tertiary)] mt-1">
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
