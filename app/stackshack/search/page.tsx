import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { searchSkills, getAllCategories } from '@/lib/skills'
import { SkillCard } from '@/components/skills/SkillCard'
import { SkillSearchBar } from '@/components/skills/SkillSearchBar'
import { SkillFilters } from '@/components/skills/SkillFilters'

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string; complexity?: string }>
}

interface EmptyStateProps {
  title: string
  description: string
  showBrowseLink?: boolean
}

function EmptyState({ title, description, showBrowseLink }: EmptyStateProps): React.JSX.Element {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center">
        <Search className="w-8 h-8 text-[var(--text-tertiary)]" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[var(--text-secondary)] max-w-md mx-auto">{description}</p>
      {showBrowseLink && (
        <Link
          href="/stackshack"
          className="inline-flex items-center gap-2 mt-6 text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)]"
        >
          Browse all skills
        </Link>
      )}
    </div>
  )
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams
  const query = params.q || ''
  const categories = await getAllCategories()

  // Search if we have a query
  const results = query ? await searchSkills(query, 50) : []

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="container py-8">
          <Link
            href="/stackshack"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--id8-orange)] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>

          <h1 className="text-3xl font-bold mb-6">Search Skills</h1>

          <Suspense fallback={<div className="h-14 bg-[var(--bg-tertiary)] rounded-xl animate-pulse" />}>
            <SkillSearchBar
              placeholder="Search skills..."
              autoFocus
              showResultsInline={false}
            />
          </Suspense>
        </div>
      </div>

      {/* Results */}
      <div className="container py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <SkillFilters categories={categories} />
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            {!query && (
              <EmptyState
                title="Search for skills"
                description="Enter a search term above to find skills by name, description, or tags"
              />
            )}

            {query && results.length === 0 && (
              <EmptyState
                title="No skills found"
                description="Try a different search term or browse by category"
                showBrowseLink
              />
            )}

            {query && results.length > 0 && (
              <>
                <p className="text-[var(--text-secondary)] mb-6">
                  {results.length} result{results.length === 1 ? '' : 's'} for{' '}
                  <span className="font-semibold text-[var(--text-primary)]">
                    &quot;{query}&quot;
                  </span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
