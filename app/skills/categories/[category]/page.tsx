import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { getAllSkills, getAllCategories } from '@/lib/skills'
import { SkillCard } from '@/components/skills/SkillCard'
import { InlineFilters } from '@/components/skills/SkillFilters'

interface PageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{ sort?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const categories = await getAllCategories()
  const cat = categories.find((c) => c.id === category)

  if (!cat) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${cat.name} Skills`,
    description: cat.description || `Browse ${cat.name} skills in the ID8Labs marketplace`,
  }
}

export async function generateStaticParams() {
  // In development, cookies() isn't available during static generation
  // Return empty array to fall back to dynamic rendering
  try {
    const categories = await getAllCategories()
    return categories.map((cat) => ({
      category: cat.id,
    }))
  } catch {
    // Fall back to dynamic rendering if static generation fails
    return []
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params
  const { sort } = await searchParams

  const categories = await getAllCategories()
  const currentCategory = categories.find((c) => c.id === category)

  if (!currentCategory) {
    notFound()
  }

  const sortBy = (sort as 'newest' | 'popular' | 'rating' | 'installs') || 'popular'
  const skills = await getAllSkills({ category, sortBy })

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="container py-8">
          <Link
            href="/skills/categories"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--id8-orange)] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Categories
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{currentCategory.emoji || '📦'}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {currentCategory.name}
              </h1>
              {currentCategory.description && (
                <p className="text-[var(--text-secondary)] mt-1">
                  {currentCategory.description}
                </p>
              )}
            </div>
          </div>

          <p className="text-sm text-[var(--text-tertiary)]">
            {skills.length} skill{skills.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[var(--text-secondary)]">
            Showing {skills.length} skills
          </p>
          <InlineFilters />
        </div>

        {skills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[var(--text-secondary)]">
              No skills in this category yet.
            </p>
            <Link
              href="/skills"
              className="mt-4 inline-block text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)]"
            >
              Browse all skills
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
