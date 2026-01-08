import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Terminal, Download, CheckCircle, Plus, ArrowLeft, Copy, ExternalLink } from 'lucide-react'
import { getCommand, getAllCommands } from '@/lib/commands'
import { AddToStackButton } from '@/components/commands/AddToStackButton'

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const commands = await getAllCommands()
  return commands.map((command) => ({
    slug: command.slug,
  }))
}

export default async function CommandDetailPage({ params }: PageProps) {
  const { slug } = await params
  const command = await getCommand(slug)

  if (!command) {
    notFound()
  }

  const CATEGORY_EMOJI: Record<string, string> = {
    git: '🔄',
    testing: '🧪',
    deployment: '🚀',
    setup: '⚡',
    quality: '✨',
  }

  const emoji = CATEGORY_EMOJI[command.category] || '⚡'

  return (
    <main className="relative">
      {/* Back Button */}
      <section className="py-8 border-b border-[var(--border)]">
        <div className="container">
          <Link
            href="/commands"
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--id8-orange)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Commands
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-4xl">
            {/* Icon and Badges */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">{emoji}</span>
              <div className="flex flex-wrap gap-2">
                {command.verified && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                )}
                <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] border border-[var(--id8-orange)]/20">
                  {command.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border)] rounded-full">
                  <Download className="w-4 h-4" />
                  {command.install_count.toLocaleString()} installs
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{command.name}</h1>

            {/* Description */}
            <p className="text-xl text-[var(--text-secondary)] mb-8">{command.description}</p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <AddToStackButton command={command} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Command */}
              <div className="card">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Terminal className="w-6 h-6 text-[var(--id8-orange)]" />
                  Command
                </h2>
                <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <code className="text-sm font-mono text-[var(--text-primary)] break-all">
                    {command.command}
                  </code>
                </div>
              </div>

              {/* Installation */}
              <div className="card">
                <h2 className="text-2xl font-bold mb-4">Installation</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">
                      Via StackShack CLI
                    </h3>
                    <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                      <code className="text-sm font-mono text-[var(--id8-orange)]">
                        npx stackshack install {command.slug}
                      </code>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">
                      Manual Installation
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-2">
                      Copy and run the command in your terminal:
                    </p>
                    <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                      <code className="text-sm font-mono text-[var(--text-primary)] break-all">
                        {command.command}
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              {command.prerequisites && command.prerequisites.length > 0 && (
                <div className="card">
                  <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                  <div className="flex flex-wrap gap-2">
                    {command.prerequisites.map((prereq) => (
                      <span
                        key={prereq}
                        className="px-3 py-1.5 text-sm bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border)] rounded-lg font-medium"
                      >
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {command.tags && command.tags.length > 0 && (
                <div className="card">
                  <h2 className="text-2xl font-bold mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {command.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-sm bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border)] rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="card">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <AddToStackButton command={command} fullWidth />
                  <Link
                    href="/commands"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg hover:border-[var(--id8-orange)] transition-colors"
                  >
                    Browse All Commands
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="card">
                <h3 className="font-semibold mb-4">Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">Installs</span>
                    <span className="font-semibold">{command.install_count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">Category</span>
                    <span className="font-semibold capitalize">{command.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">Status</span>
                    <span className="font-semibold capitalize text-emerald-500">
                      {command.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Help */}
              <div className="card bg-[var(--bg-secondary)] border-[var(--id8-orange)]/20">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Check our documentation or reach out to the community.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm text-[var(--id8-orange)] hover:underline"
                >
                  Get Support
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Commands Section */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">More {command.category} Commands</h2>
          <div className="text-center py-8">
            <Link
              href={`/commands?category=${command.category}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--id8-orange)] text-white rounded-lg hover:bg-[var(--id8-orange-hover)] transition-colors"
            >
              Browse {command.category} Commands
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
