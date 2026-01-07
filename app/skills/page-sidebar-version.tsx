import { Suspense } from 'react'
import { Package, CheckCircle } from 'lucide-react'
import {
  getAllSkills,
  getAllCategories,
  getAllCollections,
  getSkillCounts,
} from '@/lib/skills'
import { SkillSearchBar } from '@/components/skills/SkillSearchBar'
import { StackShackLogo } from '@/components/StackShackLogo'
import { SkillsPageContent } from '@/components/skills/SkillsPageContent'

export const revalidate = 3600 // Revalidate every hour

export default async function SkillsMarketplacePage() {
  // Get ALL skills and let client-side handle filtering
  const [allSkills, categories, collections, counts] = await Promise.all([
    getAllSkills(), // Get all skills
    getAllCategories(),
    getAllCollections(true), // Official collections only
    getSkillCounts(),
  ])

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]">
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-[var(--bg-primary)] text-[var(--id8-orange)] rounded-full text-sm font-semibold border border-[var(--id8-orange)]/20 shadow-lg shadow-[var(--id8-orange)]/10">
              <Package className="w-4 h-4" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--id8-orange)] to-[var(--id8-orange-dark)]">
                {counts.published}+ Skills & Agents
              </span>
            </div>

            {/* StackShack Logo */}
            <h1 className="mb-6">
              <StackShackLogo size="xl" />
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Free skills & agents for{' '}
              <span className="font-semibold text-[var(--text-primary)]">
                Claude Code
              </span>
              .
              <br className="hidden md:block" />
              Build your stack, ship faster.
            </p>

            {/* Search Bar */}
            <div className="flex justify-center mb-10 relative z-20">
              <div className="w-full max-w-2xl">
                <Suspense fallback={<SearchBarSkeleton />}>
                  <SkillSearchBar
                    placeholder={`Search ${counts.published}+ skills & agents...`}
                  />
                </Suspense>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-sm font-medium">
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-full border border-[var(--border)] shadow-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>{categories.length} Categories</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-full border border-[var(--border)] shadow-sm">
                <span className="w-2 h-2 bg-[var(--id8-orange)] rounded-full" />
                <span className="font-bold">100% Free</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-full border border-[var(--border)] shadow-sm">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span>ID8Labs Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sidebar + Grid Content */}
      <SkillsPageContent
        skills={allSkills}
        categories={categories}
        collections={collections}
        counts={{
          total: counts.published,
          skills: allSkills.filter((s) => !s.tags?.includes('agent')).length,
          agents: allSkills.filter((s) => s.tags?.includes('agent')).length,
          byCategory: counts.byCategory,
        }}
      />
    </main>
  )
}

// Search bar skeleton
function SearchBarSkeleton() {
  return (
    <div className="w-full max-w-2xl h-14 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl animate-pulse flex items-center px-4">
      <div className="w-5 h-5 bg-[var(--text-tertiary)]/20 rounded-full mr-3" />
      <div className="h-4 bg-[var(--text-tertiary)]/20 rounded w-1/3" />
    </div>
  )
}
