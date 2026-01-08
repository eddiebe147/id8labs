import { Suspense } from 'react'
import { Settings, Search } from 'lucide-react'
import { getAllSettings, getSettingCategories } from '@/lib/settings'
import { SettingCard } from '@/components/settings/SettingCard'

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function SettingsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const categoryFilter = params.category || null

  const [allSettings, categories] = await Promise.all([
    getAllSettings(),
    getSettingCategories(),
  ])

  // Filter by category if specified
  const filteredSettings = categoryFilter
    ? allSettings.filter((setting) => setting.category === categoryFilter)
    : allSettings

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
              <Settings className="w-4 h-4" />
              <span>{allSettings.length} Configuration Settings</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Configuration Settings
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
              Optimize your AI workflow with pre-configured settings
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
                href="/settings"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !categoryFilter
                    ? 'bg-[var(--id8-orange)] text-white'
                    : 'bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--id8-orange)]'
                }`}
              >
                All ({allSettings.length})
              </a>
              {categoryNames.map((category) => (
                <a
                  key={category}
                  href={`/settings?category=${category}`}
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
            {filteredSettings.length === allSettings.length
              ? `Showing all ${allSettings.length} settings`
              : `Showing ${filteredSettings.length} ${categoryFilter} settings`}
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSettings.map((setting) => (
              <SettingCard key={setting.id} setting={setting} />
            ))}
          </div>

          {/* Empty State */}
          {filteredSettings.length === 0 && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 mx-auto mb-4 text-[var(--text-secondary)]" />
              <h3 className="text-xl font-semibold mb-2">No settings found</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                Try a different category or view all settings
              </p>
              <a
                href="/settings"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--id8-orange)] text-white rounded-lg hover:bg-[var(--id8-orange-hover)] transition-colors"
              >
                View All Settings
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
              All settings available via our CLI tool
            </p>
            <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl text-left">
              <code className="text-sm font-mono text-[var(--id8-orange)]">
                npx stackshack install claude-opus-max-quality
              </code>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
