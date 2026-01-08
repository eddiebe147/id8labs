import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Package, ArrowLeft, Clock } from 'lucide-react'
import { getStackByShareId } from '@/lib/stacks-db'
import { ImportStackButton } from '@/components/stack/ImportStackButton'

interface PageProps {
  params: Promise<{ shareId: string }>
}

export const revalidate = 60 // Revalidate every minute

export default async function GalleryStackDetailPage({ params }: PageProps) {
  const { shareId } = await params
  const stack = await getStackByShareId(shareId)

  if (!stack) {
    notFound()
  }

  // Group items by type
  const skills = stack.items?.filter((item) => item.type === 'skill') || []
  const agents = stack.items?.filter((item) => item.type === 'agent') || []
  const commands = stack.items?.filter((item) => item.type === 'command') || []
  const settings = stack.items?.filter((item) => item.type === 'setting') || []

  const totalItems = (stack.items?.length || 0)
  const formattedDate = new Date(stack.updated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  // Convert DbStack to the format ImportStackButton expects
  const importableStack = {
    id: stack.id,
    name: stack.name,
    description: stack.description || undefined,
    items: stack.items || [],
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
            {/* Icon */}
            <div className="inline-flex p-4 bg-[var(--id8-orange)]/20 rounded-2xl mb-6">
              <Package className="w-12 h-12 text-[var(--id8-orange)]" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{stack.name}</h1>

            {/* Description */}
            {stack.description && (
              <p className="text-xl text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
                {stack.description}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center justify-center gap-4 text-sm text-[var(--text-secondary)] mb-8">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Updated {formattedDate}
              </span>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-[var(--id8-orange)]">
                  {totalItems}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {totalItems === 1 ? 'Item' : 'Items'}
                </div>
              </div>
              {skills.length > 0 && (
                <div>
                  <div className="text-3xl font-bold">{skills.length}</div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {skills.length === 1 ? 'Skill' : 'Skills'}
                  </div>
                </div>
              )}
              {agents.length > 0 && (
                <div>
                  <div className="text-3xl font-bold">{agents.length}</div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {agents.length === 1 ? 'Agent' : 'Agents'}
                  </div>
                </div>
              )}
              {commands.length > 0 && (
                <div>
                  <div className="text-3xl font-bold">{commands.length}</div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {commands.length === 1 ? 'Command' : 'Commands'}
                  </div>
                </div>
              )}
              {settings.length > 0 && (
                <div>
                  <div className="text-3xl font-bold">{settings.length}</div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {settings.length === 1 ? 'Setting' : 'Settings'}
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
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

            {totalItems === 0 ? (
              <div className="text-center py-12 text-[var(--text-secondary)]">
                This stack is empty.
              </div>
            ) : (
              <div className="space-y-6">
                {/* Skills */}
                {skills.length > 0 && (
                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      Skills ({skills.length})
                    </h3>
                    <div className="space-y-2">
                      {skills.map((skill) => (
                        <Link
                          key={skill.id}
                          href={"/skills/" + skill.slug}
                          className="block p-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg hover:border-[var(--id8-orange)] transition-colors"
                        >
                          <h4 className="font-medium">{skill.name}</h4>
                          <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                            {skill.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Agents */}
                {agents.length > 0 && (
                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <span className="text-2xl">🤖</span>
                      Agents ({agents.length})
                    </h3>
                    <div className="space-y-2">
                      {agents.map((agent) => (
                        <Link
                          key={agent.id}
                          href={"/skills/" + agent.slug}
                          className="block p-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg hover:border-[var(--id8-orange)] transition-colors"
                        >
                          <h4 className="font-medium">{agent.name}</h4>
                          <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                            {agent.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Commands */}
                {commands.length > 0 && (
                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <span className="text-2xl">⚡</span>
                      Commands ({commands.length})
                    </h3>
                    <div className="space-y-2">
                      {commands.map((command) => (
                        <Link
                          key={command.id}
                          href={"/commands/" + command.slug}
                          className="block p-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg hover:border-[var(--id8-orange)] transition-colors"
                        >
                          <h4 className="font-medium">{command.name}</h4>
                          <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                            {command.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Settings */}
                {settings.length > 0 && (
                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <span className="text-2xl">⚙️</span>
                      Settings ({settings.length})
                    </h3>
                    <div className="space-y-2">
                      {settings.map((setting) => (
                        <Link
                          key={setting.id}
                          href={"/settings/" + setting.slug}
                          className="block p-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg hover:border-[var(--id8-orange)] transition-colors"
                        >
                          <h4 className="font-medium">{setting.name}</h4>
                          <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                            {setting.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
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
