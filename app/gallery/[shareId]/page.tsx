import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Package, ArrowLeft, Clock } from 'lucide-react'
import { getStackByShareId } from '@/lib/stacks-db'
import { ImportStackButton } from '@/components/stack/ImportStackButton'
import { StackStats, buildStackStats, groupItemsByType } from '@/components/stack/StackStats'
import { StackItemSection } from '@/components/stack/StackItemSection'

interface PageProps {
  params: Promise<{ shareId: string }>
}

export const revalidate = 60

export default async function GalleryStackDetailPage({ params }: PageProps): Promise<React.ReactElement> {
  const { shareId } = await params
  const stack = await getStackByShareId(shareId)

  if (!stack) {
    notFound()
  }

  const items = stack.items || []
  const { skills, agents, commands, settings } = groupItemsByType(items)
  const stats = buildStackStats(items)

  const formattedDate = new Date(stack.updated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const importableStack = {
    id: stack.id,
    name: stack.name,
    description: stack.description || undefined,
    items,
    createdAt: stack.created_at,
    updatedAt: stack.updated_at,
  }

  return (
    <main className="relative">
      {/* Back Button */}
      <section className="py-8 border-b border-[var(--border)]">
        <div className="container">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--id8-orange)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-4 bg-[var(--id8-orange)]/20 rounded-2xl mb-6">
              <Package className="w-12 h-12 text-[var(--id8-orange)]" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{stack.name}</h1>

            {stack.description && (
              <p className="text-xl text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
                {stack.description}
              </p>
            )}

            <div className="flex items-center justify-center gap-4 text-sm text-[var(--text-secondary)] mb-8">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Updated {formattedDate}
              </span>
            </div>

            <StackStats stats={stats} />

            <div className="flex flex-wrap items-center justify-center gap-4">
              <ImportStackButton stack={importableStack} />
            </div>
          </div>
        </div>
      </section>

      {/* Stack Contents */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Stack Contents</h2>

            {items.length === 0 ? (
              <div className="text-center py-12 text-[var(--text-secondary)]">
                This stack is empty.
              </div>
            ) : (
              <div className="space-y-6">
                <StackItemSection title="Skills" emoji="🎯" items={skills} linkPrefix="/skills/" />
                <StackItemSection title="Agents" emoji="🤖" items={agents} linkPrefix="/skills/" />
                <StackItemSection title="Commands" emoji="⚡" items={commands} linkPrefix="/commands/" />
                <StackItemSection title="Settings" emoji="⚙️" items={settings} linkPrefix="/settings/" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How to Install */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Install?</h2>
            <p className="text-xl text-[var(--text-secondary)] mb-8">
              Fork this stack to your collection and install everything at once.
            </p>
            <ImportStackButton stack={importableStack} />
          </div>
        </div>
      </section>
    </main>
  )
}
