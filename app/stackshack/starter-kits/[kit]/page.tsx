import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft, Package, Download, User, Calendar } from 'lucide-react'
import { getCollectionBySlug, getAllCollections } from '@/lib/skills'
import { SkillCard } from '@/components/skills/SkillCard'
import { OfficialBadge } from '@/components/skills/TrustBadges'

interface PageProps {
  params: Promise<{ kit: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { kit } = await params
    const collection = await getCollectionBySlug(kit)

    if (!collection) {
      return { title: 'Starter Kit Not Found' }
    }

    return {
      title: collection.name,
      description:
        collection.description ||
        `${collection.name} starter kit with ${collection.skill_count} skills`,
    }
  } catch (err) {
    console.error('[StarterKitPage:generateMetadata] Error:', err)
    return { title: 'Starter Kit' }
  }
}

export async function generateStaticParams() {
  try {
    const collections = await getAllCollections()
    if (!collections || !Array.isArray(collections)) {
      console.warn('[StarterKitPage:generateStaticParams] Invalid collections response')
      return []
    }
    return collections.map((col) => ({
      kit: col.slug,
    }))
  } catch (err) {
    console.error('[StarterKitPage:generateStaticParams] Error:', err)
    return []
  }
}

export default async function StarterKitPage({ params }: PageProps): Promise<React.JSX.Element> {
  const { kit } = await params
  const collection = await getCollectionBySlug(kit)

  if (!collection) {
    notFound()
  }

  const skillCount = collection.skill_count || collection.skills?.length || 0

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="container py-8">
          <Link
            href="/stackshack/starter-kits"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--id8-orange)] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Starter Kits
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">{collection.emoji || '📦'}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {collection.is_official && <OfficialBadge />}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {collection.name}
                  </h1>
                </div>
              </div>

              {collection.description && (
                <p className="text-lg text-[var(--text-secondary)] mb-4">
                  {collection.description}
                </p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
                <span className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {skillCount} skills
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {collection.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(collection.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Install All Button */}
            <div className="lg:w-64">
              <button className="w-full btn btn-primary">
                <Download className="w-5 h-5" />
                Install All Skills
              </button>
              <p className="text-xs text-[var(--text-tertiary)] text-center mt-2">
                Copies install script to clipboard
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="container py-12">
        <h2 className="text-xl font-bold mb-6">
          Skills in this kit ({skillCount})
        </h2>

        {collection.skills && collection.skills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collection.skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[var(--text-secondary)]">
              No skills in this kit yet.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
