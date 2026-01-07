import Link from 'next/link'
import { Package, ArrowLeft, AlertTriangle } from 'lucide-react'
import { getAllCollections } from '@/lib/skills'
import { SkillStarterKits, FeaturedStarterKit } from '@/components/skills/SkillStarterKits'

export const revalidate = 3600

// Error fallback component
function StarterKitsError({ error }: { error?: string }) {
  return (
    <main className="min-h-screen">
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="container py-8">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--id8-orange)] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Starter Kits</h1>
              <p className="text-[var(--text-secondary)] mt-1">
                Curated skill bundles for common workflows
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-12">
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 bg-amber-500/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Unable to load starter kits</h3>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-6">
            We&apos;re having trouble loading the starter kits right now. Please try again in a moment.
          </p>
          {error && process.env.NODE_ENV === 'development' && (
            <p className="text-xs text-red-500 font-mono mb-4">{error}</p>
          )}
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)]"
          >
            Browse all skills instead
          </Link>
        </div>
      </div>
    </main>
  )
}

export default async function StarterKitsPage() {
  let collections
  let error: string | undefined

  try {
    collections = await getAllCollections()
  } catch (err) {
    console.error('[StarterKitsPage] Failed to fetch collections:', err)
    error = err instanceof Error ? err.message : 'Unknown error'
    return <StarterKitsError error={error} />
  }

  // Handle empty or failed response gracefully
  if (!collections || !Array.isArray(collections)) {
    console.warn('[StarterKitsPage] Invalid collections response')
    return <StarterKitsError error="Invalid response from database" />
  }

  const officialCollections = collections.filter((c) => c.is_official)
  const communityCollections = collections.filter((c) => !c.is_official)

  // Get the first official collection for the featured banner
  const featuredCollection = officialCollections[0]

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="container py-8">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--id8-orange)] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Starter Kits</h1>
              <p className="text-[var(--text-secondary)] mt-1">
                Curated skill bundles for common workflows
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        {/* Featured Collection */}
        {featuredCollection && (
          <section className="mb-16">
            <FeaturedStarterKit collection={featuredCollection} />
          </section>
        )}

        {/* Official Collections */}
        {officialCollections.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold">Official Kits</h2>
              <span className="px-2 py-0.5 bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] text-xs font-semibold rounded-full">
                ID8Labs
              </span>
            </div>
            <SkillStarterKits
              collections={officialCollections.slice(1)} // Exclude featured
              variant="grid"
            />
          </section>
        )}

        {/* Community Collections */}
        {communityCollections.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Community Kits</h2>
            <SkillStarterKits collections={communityCollections} variant="grid" />
          </section>
        )}

        {/* Empty State */}
        {collections.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center">
              <Package className="w-8 h-8 text-[var(--text-tertiary)]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No starter kits yet</h3>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto">
              Starter kits are coming soon! In the meantime, browse individual
              skills.
            </p>
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 mt-6 text-[var(--id8-orange)] hover:text-[var(--id8-orange-hover)]"
            >
              Browse all skills
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
