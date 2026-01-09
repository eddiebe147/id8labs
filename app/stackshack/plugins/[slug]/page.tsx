import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft, ExternalLink, Github, Calendar, User, Shield, CheckCircle, Copy, Check, Puzzle, Download, Eye } from 'lucide-react'
import { getPlugin, getAllPlugins, getPluginsByCategory } from '@/lib/plugins'
import { PLUGIN_CATEGORY_EMOJI } from '@/lib/plugin-types'
import { PluginCard } from '@/components/plugins/PluginCard'
import { PluginViewTracker } from './PluginViewTracker'
import { PluginInstallButton } from './PluginInstallButton'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const plugin = await getPlugin(slug)

    if (!plugin) {
      return {
        title: 'Plugin Not Found',
      }
    }

    return {
      title: `${plugin.name} | Claude Code Plugin`,
      description: plugin.description,
      openGraph: {
        title: `${plugin.name} | StackShack`,
        description: plugin.description,
        type: 'article',
      },
    }
  } catch (error) {
    console.error('[generateMetadata] Error:', error)
    return {
      title: 'Plugin',
    }
  }
}

export async function generateStaticParams() {
  try {
    const plugins = await getAllPlugins()
    return plugins.map((plugin) => ({
      slug: plugin.slug,
    }))
  } catch {
    return []
  }
}

export default async function PluginDetailPage({ params }: PageProps) {
  const { slug } = await params
  const plugin = await getPlugin(slug)

  if (!plugin) {
    notFound()
  }

  // Get related plugins from the same category
  const relatedPlugins = await getPluginsByCategory(plugin.category)
  const filteredRelated = relatedPlugins.filter((p) => p.id !== plugin.id).slice(0, 3)

  const emoji = PLUGIN_CATEGORY_EMOJI[plugin.category] || '\ud83d\udd0c'
  const categoryDisplay = plugin.category.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return (
    <main className="pb-20">
      {/* Track view client-side */}
      <PluginViewTracker pluginId={plugin.id} />

      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        {/* Official banner */}
        {plugin.official && (
          <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border-b border-amber-500/30">
            <div className="container py-2 flex items-center justify-center gap-2 text-sm text-amber-600 dark:text-amber-400">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Official Anthropic Plugin</span>
            </div>
          </div>
        )}

        <div className="container py-6">
          <Link
            href="/stackshack?tab=plugins"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--id8-orange)] mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Plugins
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {/* Plugin Info */}
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                {/* Category emoji */}
                <span className="text-5xl">{emoji}</span>

                <div className="flex-1">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {plugin.official && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/30">
                        <Shield className="w-3.5 h-3.5" />
                        Official
                      </span>
                    )}
                    {plugin.verified && !plugin.official && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    )}
                    {plugin.featured && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/30">
                        Featured
                      </span>
                    )}
                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]">
                      {categoryDisplay}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {plugin.name}
                  </h1>

                  {/* Description */}
                  <p className="text-lg text-[var(--text-secondary)]">
                    {plugin.description}
                  </p>
                </div>
              </div>

              {/* Stats badges */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                  <Download className="w-4 h-4" />
                  <span>{plugin.install_count.toLocaleString()} installs</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                  <Eye className="w-4 h-4" />
                  <span>{plugin.view_count.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            {/* Install Card */}
            <div className="lg:w-80 flex-shrink-0">
              <div className={`p-6 bg-[var(--bg-primary)] border rounded-2xl ${plugin.official ? 'border-amber-500/30' : 'border-[var(--border)]'}`}>
                <PluginInstallButton plugin={plugin} />

                <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">Author</span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {plugin.author}
                    </span>
                  </div>
                  {plugin.original_author && plugin.original_author !== plugin.author && (
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Original Author</span>
                      <span>{plugin.original_author}</span>
                    </div>
                  )}
                  {plugin.author_org && (
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Organization</span>
                      <span className={plugin.author_org === 'Anthropic' ? 'text-amber-500 font-medium' : ''}>
                        {plugin.author_org}
                      </span>
                    </div>
                  )}
                  {plugin.created_at && (
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Added</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(plugin.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {plugin.github_repo && (
                    <a
                      href={`https://github.com/${plugin.github_repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full mt-4 py-2 border border-[var(--border)] rounded-lg text-sm hover:border-[var(--id8-orange)] hover:text-[var(--id8-orange)] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Install Command */}
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4">Installation</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Run this command in your Claude Code terminal to install the plugin:
              </p>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl font-mono text-sm">
                <code className="text-[var(--id8-orange)]">{plugin.install_command}</code>
              </div>
              {plugin.slash_command && plugin.slash_command !== plugin.install_command && (
                <div className="mt-4">
                  <p className="text-sm text-[var(--text-secondary)] mb-2">Or use the slash command:</p>
                  <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl font-mono text-sm">
                    <code className="text-purple-500">{plugin.slash_command}</code>
                  </div>
                </div>
              )}
            </section>

            {/* Use Cases */}
            {plugin.use_cases && plugin.use_cases.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-bold mb-4">Use Cases</h2>
                <ul className="space-y-3">
                  {plugin.use_cases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--text-secondary)]">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Tags */}
            {plugin.tags && plugin.tags.length > 0 && (
              <section className="mb-8">
                <h3 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {plugin.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/stackshack/search?q=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-md text-sm hover:bg-[var(--bg-tertiary)] transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Quick Stats */}
            <section className="mb-8 p-4 bg-[var(--bg-secondary)] rounded-xl">
              <h3 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-4">
                Statistics
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Installs</span>
                  <span className="font-semibold">
                    {plugin.install_count.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Views</span>
                  <span className="font-semibold">
                    {plugin.view_count.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Category</span>
                  <span className="font-semibold">{categoryDisplay}</span>
                </div>
              </div>
            </section>

            {/* Plugin Type Info */}
            <section className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-3">
                <Puzzle className="w-5 h-5 text-[var(--id8-orange)]" />
                <h3 className="font-semibold">About Plugins</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                Plugins extend Claude Code with new capabilities. They can add agents,
                commands, hooks, and more. Install plugins to customize your workflow.
              </p>
            </section>
          </div>
        </div>

        {/* Related Plugins */}
        {filteredRelated.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[var(--border)]">
            <h2 className="text-2xl font-bold mb-6">Related Plugins</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredRelated.map((related) => (
                <PluginCard key={related.id} plugin={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
