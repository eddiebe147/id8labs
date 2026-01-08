import { Suspense } from 'react'
import { Terminal, Search } from 'lucide-react'
import { getAllCommands, getCommandCategories } from '@/lib/commands'
import { CommandCard } from '@/components/commands/CommandCard'

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function CommandsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const categoryFilter = params.category || null

  const [allCommands, categories] = await Promise.all([
    getAllCommands(),
    getCommandCategories(),
  ])

  // Filter by category if specified
  const filteredCommands = categoryFilter
    ? allCommands.filter((cmd) => cmd.category === categoryFilter)
    : allCommands

  const categoryNames = Object.keys(categories).sort()

  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[var(--bg-secondary)]">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(var(--text-primary) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-[var(--bg-primary)] text-[var(--id8-orange)] rounded-full text-sm font-semibold border border-[var(--id8-orange)]/20 shadow-lg">
              <Terminal className="w-4 h-4" />
              <span>{allCommands.length} Workflow Commands</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Workflow Commands
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
              Automate your development workflow with one-click commands
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          {/* Category Filters */}
          <div className="mb-8">
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href="/commands"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !categoryFilter
                    ? 'bg-[var(--id8-orange)] text-white'
                    : 'bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--id8-orange)]'
                }`}
              >
                All ({allCommands.length})
              </a>
              {categoryNames.map((category) => (
                <a
                  key={category}
                  href={`/commands?category=${category}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    categoryFilter === category
                      ? 'bg-[var(--id8-orange)] text-white'
                      : 'bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--id8-orange)]'
                  }`}
                >
                  {category} ({categories[category]})
                </a>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-[var(--text-secondary)]">
            {filteredCommands.length === allCommands.length
              ? `Showing all ${allCommands.length} commands`
              : `Showing ${filteredCommands.length} ${categoryFilter} commands`}
          </div>

          {/* Commands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommands.map((command) => (
              <CommandCard key={command.id} command={command} />
            ))}
          </div>

          {/* Empty State */}
          {filteredCommands.length === 0 && (
            <div className="text-center py-12">
              <Terminal className="w-16 h-16 mx-auto mb-4 text-[var(--text-secondary)]" />
              <h3 className="text-xl font-semibold mb-2">No commands found</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                Try a different category or view all commands
              </p>
              <a
                href="/commands"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--id8-orange)] text-white rounded-lg hover:bg-[var(--id8-orange-hover)] transition-colors"
              >
                View All Commands
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Install with StackShack CLI
            </h2>
            <p className="text-xl text-[var(--text-secondary)] mb-8">
              All commands available via our CLI tool
            </p>
            <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl text-left">
              <code className="text-sm font-mono text-[var(--id8-orange)]">
                npx stackshack install git-smart-commit
              </code>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
