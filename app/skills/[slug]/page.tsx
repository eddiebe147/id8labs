import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft, ExternalLink, Github, Calendar, User } from 'lucide-react'
import { getSkillBySlug, getAllSkills } from '@/lib/skills'
import { SkillInstallButton } from '@/components/skills/SkillInstallButton'
import {
  TrustBadges,
  VerifiedBadge,
  ComplexityBadge,
  QualityTierBadge,
} from '@/components/skills/TrustBadges'
import { CategoryBadge } from '@/components/skills/CategoryTabs'
import { SkillCard } from '@/components/skills/SkillCard'
import { SkillViewTracker } from './SkillViewTracker'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const skill = await getSkillBySlug(slug)

    if (!skill) {
      return {
        title: 'Skill Not Found',
      }
    }

    return {
      title: skill.name,
      description: skill.description,
      openGraph: {
        title: `${skill.name} | StackShack`,
        description: skill.description,
        type: 'article',
      },
    }
  } catch (error) {
    console.error('[generateMetadata] Error:', error)
    return {
      title: 'Skill',
    }
  }
}

export async function generateStaticParams() {
  // In development, cookies() isn't available during static generation
  // Return empty array to fall back to dynamic rendering
  try {
    const skills = await getAllSkills({ limit: 100 })
    return skills.map((skill) => ({
      slug: skill.slug,
    }))
  } catch {
    // Fall back to dynamic rendering if static generation fails
    return []
  }
}

export default async function SkillDetailPage({ params }: PageProps) {
  let skill
  let filteredRelated: Awaited<ReturnType<typeof getAllSkills>> = []
  
  try {
    const { slug } = await params
    skill = await getSkillBySlug(slug)

    if (!skill) {
      notFound()
    }

    // Get related skills from the same category
    const relatedSkills = await getAllSkills({
      category: skill.category_id || undefined,
      limit: 4,
    })
    filteredRelated = relatedSkills.filter((s) => s.id !== skill!.id).slice(0, 3)
  } catch (error) {
    console.error('[SkillDetailPage] Error loading skill:', error)
    notFound()
  }
  
  if (!skill) {
    notFound()
  }

  return (
    <main className="pb-20">
      {/* Track view client-side */}
      <SkillViewTracker skillId={skill.id} />

      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="container py-6">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--id8-orange)] mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Skills
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {/* Skill Info */}
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                {/* Category emoji */}
                <span className="text-5xl">
                  {skill.category?.emoji || '📦'}
                </span>

                <div className="flex-1">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {skill.verified && <VerifiedBadge />}
                    <ComplexityBadge complexity={skill.complexity} />
                    {skill.quality_tier && (
                      <QualityTierBadge tier={skill.quality_tier} />
                    )}
                    {skill.category && (
                      <CategoryBadge
                        categoryId={skill.category.id}
                        categoryName={skill.category.name}
                      />
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {skill.name}
                  </h1>

                  {/* Description */}
                  <p className="text-lg text-[var(--text-secondary)]">
                    {skill.description}
                  </p>
                </div>
              </div>

              {/* Trust badges */}
              <TrustBadges
                verified={skill.verified}
                installCount={skill.install_count}
                rating={skill.avg_rating}
                reviewCount={skill.review_count}
                className="mt-4"
              />
            </div>

            {/* Install Card */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl">
                <SkillInstallButton skill={skill} variant="primary" />

                <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">Version</span>
                    <span className="font-mono">{skill.version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">Author</span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {skill.author}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">License</span>
                    <span>{skill.license}</span>
                  </div>
                  {skill.published_at && (
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Published</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(skill.published_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {skill.repo_url && (
                    <a
                      href={skill.repo_url}
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
            {/* Triggers */}
            {skill.triggers && skill.triggers.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-bold mb-4">Trigger Phrases</h2>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Use these phrases to activate this skill in Claude Code:
                </p>
                <div className="flex flex-wrap gap-2">
                  {skill.triggers.map((trigger) => (
                    <code
                      key={trigger}
                      className="px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm font-mono"
                    >
                      {trigger}
                    </code>
                  ))}
                </div>
              </section>
            )}

            {/* Commands */}
            {skill.commands && skill.commands.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-bold mb-4">Commands</h2>
                <div className="flex flex-wrap gap-2">
                  {skill.commands.map((command) => (
                    <code
                      key={command}
                      className="px-3 py-1.5 bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] rounded-lg text-sm font-mono"
                    >
                      /{command}
                    </code>
                  ))}
                </div>
              </section>
            )}

            {/* Skill Content */}
            {skill.content && (
              <section className="mb-10">
                <h2 className="text-xl font-bold mb-4">Skill Content</h2>
                <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                  <pre className="whitespace-pre-wrap text-sm font-mono text-[var(--text-secondary)] overflow-x-auto">
                    {skill.content}
                  </pre>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Tags */}
            {skill.tags && skill.tags.length > 0 && (
              <section className="mb-8">
                <h3 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/skills/search?q=${encodeURIComponent(tag)}`}
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
                    {skill.install_count.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Views</span>
                  <span className="font-semibold">
                    {skill.view_count.toLocaleString()}
                  </span>
                </div>
                {skill.avg_rating > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Rating</span>
                    <span className="font-semibold">
                      ⭐ {skill.avg_rating.toFixed(1)} ({skill.review_count})
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Related Skills */}
        {filteredRelated.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[var(--border)]">
            <h2 className="text-2xl font-bold mb-6">Related Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredRelated.map((related) => (
                <SkillCard key={related.id} skill={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
