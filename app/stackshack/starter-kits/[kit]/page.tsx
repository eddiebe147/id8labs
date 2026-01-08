import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft, Package, Download, User, Calendar, AlertTriangle } from 'lucide-react'
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

// Error fallback component
function StarterKitError({ kit, error }: { kit: string; error?: string }) {
  return (
    <main className="min-h-screen">
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="container py-8">
          <Link
            href="/stackshack/starter-kits"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--id8-orange)] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Starter Kits
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Starter Kit</h1>
        </div>
      </div>
      <div className="container py-12">
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 bg-amber-500/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Unable to load starter kit</h3>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-6">
            We&apos;re having trouble loading this starter kit. Please try again in a moment.
          </p>
          {error && process.env.NODE_ENV === 'development' && (
            <p className="text-xs text-red-500 font-mono mb-4">Kit: {kit} - {error}</p>
          )}
          <Link
            href="/stackshack/starter-kits"
            className="inline-flex items-center gap-2 text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)]"
          >
            View all starter kits
          </Link>
        </div>
      </div>
    </main>
  )
}

export default async function StarterKitPage({ params }: PageProps) {
  let kit: string
  let collection

  try {
    const resolvedParams = await params
    kit = resolvedParams.kit
  } catch (err) {
    console.error('[StarterKitPage] Failed to resolve params:', err)
    return <StarterKitError kit="unknown" error="Failed to resolve route parameters" />
  }

  try {
    collection = await getCollectionBySlug(kit)
  } catch (err) {
    console.error('[StarterKitPage] Failed to fetch collection:', { kit, error: err })
    return <StarterKitError kit={kit} error={err instanceof Error ? err.message : 'Unknown error'} />
  }

  if (!collection) {
    notFound()
  }

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
                  {collection.skill_count || collection.skills?.length || 0} skills
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
          Skills in this kit ({collection.skills?.length || 0})
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
