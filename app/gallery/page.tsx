import Link from 'next/link'
import { Package, Users, ArrowRight } from 'lucide-react'
import { getPublicStacks } from '@/lib/stacks-db'
import { GalleryStackCard } from '@/components/gallery/GalleryStackCard'

export const revalidate = 300

export default async function GalleryPage() {
  const publicStacks = await getPublicStacks(50)

  return (
    <main className="relative">
      <section className="relative py-20 md:py-32 overflow-hidden bg-[var(--bg-secondary)]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(var(--text-primary) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-[var(--bg-primary)] text-[var(--id8-orange)] rounded-full text-sm font-semibold border border-[var(--id8-orange)]/20 shadow-lg">
              <Users className="w-4 h-4" />
              <span>{publicStacks.length} Community Stacks</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Community Stack Gallery
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
              Discover and fork stacks shared by the StackShack community
            </p>
            <Link
              href="/stackshack"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--id8-orange)] text-white rounded-lg hover:bg-[var(--id8-orange-hover)] font-medium transition-colors"
            >
              Build Your Own Stack
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {publicStacks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicStacks.map((stack) => (
                <GalleryStackCard key={stack.id} stack={stack} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Package className="w-16 h-16 mx-auto mb-4 text-[var(--text-secondary)]" />
              <h3 className="text-2xl font-bold mb-2">No Public Stacks Yet</h3>
              <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                Be the first to share a stack with the community!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
