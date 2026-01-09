import Link from 'next/link'
import { getAllCategories, getSkillCounts } from '@/lib/skills'

export const revalidate = 3600

export default async function CategoriesPage(): Promise<React.JSX.Element> {
  const [categories, counts] = await Promise.all([
    getAllCategories(),
    getSkillCounts(),
  ])

  return (
    <main className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Browse by Category</h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Explore {counts.published}+ skills organized by use case
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category) => {
            const count = counts.byCategory[category.id] || 0

            return (
              <Link
                key={category.id}
                href={`/stackshack/categories/${category.id}`}
                className="group p-8 bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl hover:border-[var(--id8-orange)]/50 hover:shadow-xl transition-all"
              >
                <span className="text-5xl mb-4 block">{category.emoji || '📦'}</span>
                <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--id8-orange)] transition-colors">
                  {category.name}
                </h2>
                {category.description && (
                  <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                    {category.description}
                  </p>
                )}
                <p className="text-sm text-[var(--text-tertiary)]">
                  {count} skill{count !== 1 ? 's' : ''}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
