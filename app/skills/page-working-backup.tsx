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
import { CategoryTabs } from '@/components/skills/CategoryTabs'
import { SkillStarterKits } from '@/components/skills/SkillStarterKits'
import { StackShackLogo } from '@/components/StackShackLogo'
import { ItemTypeFilter } from '@/components/skills/ItemTypeFilter'
import { HowToUseSection } from '@/components/skills/HowToUseSection'

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
      <section className="relative py-20 md:py-32 overflow-hidden bg-[var(--bg-secondary)]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
             style={{
               backgroundImage: `radial-gradient(var(--text-primary) 1px, transparent 1px)`,
               backgroundSize: '32px 32px'
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
              Free skills & agents for <span className="font-semibold text-[var(--text-primary)]">Claude Code</span>. 
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

      {/* Category Tabs & Item Type Filter */}
      <section className="sticky top-16 md:top-20 z-40 py-4 border-y border-[var(--border)] bg-[var(--bg-secondary)]/95 backdrop-blur-xl shadow-sm">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CategoryTabs categories={categories} variant="pills" />
            <ItemTypeFilter />
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <HowToUseSection />

      {/* Featured Skills */}
      {featuredSkills.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[var(--bg-secondary)] text-[var(--id8-orange)] rounded-xl border border-[var(--id8-orange)]/20 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Featured
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
        <section className="py-12 md:py-16 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-500/10 text-purple-500 rounded-xl border border-purple-500/20">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Starter Kits
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                    Curated bundles for common workflows
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
      href={`/stackshack/categories/${category.id}`}
      className="card group flex flex-col items-center p-6 hover-lift hover:border-[var(--id8-orange)]/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--id8-orange)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{category.emoji || '📦'}</span>
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
