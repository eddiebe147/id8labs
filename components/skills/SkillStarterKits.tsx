'use client'

import Link from 'next/link'
import { ChevronRight, Package, Sparkles, Wrench } from 'lucide-react'
import type { SkillCollection } from '@/lib/skill-types'

// Starter kit emoji and gradient mapping
const KIT_STYLES: Record<string, { emoji: string; gradient: string }> = {
  'frontend-dev': { emoji: '⚛️', gradient: 'from-cyan-500 to-blue-500' },
  'backend-dev': { emoji: '🔧', gradient: 'from-green-500 to-emerald-500' },
  'content-creator': { emoji: '✍️', gradient: 'from-pink-500 to-rose-500' },
  'business-ops': { emoji: '💼', gradient: 'from-amber-500 to-orange-500' },
  'ai-engineer': { emoji: '🤖', gradient: 'from-purple-500 to-violet-500' },
  default: { emoji: '📦', gradient: 'from-gray-500 to-gray-600' },
}

// Shared helpers to reduce duplication
function getKitStyle(slug: string): { emoji: string; gradient: string } {
  return KIT_STYLES[slug] || KIT_STYLES.default
}

function getKitHref(slug: string): string {
  return `/stackshack/starter-kits/${slug}`
}

function getSkillCount(collection: SkillCollection): number {
  return collection.skill_count || collection.skills?.length || 0
}

// Reusable dot pattern background
function DotPatternOverlay({ size = 16, opacity = 0.2 }: { size?: number; opacity?: number }): JSX.Element {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
    />
  )
}

// Official badge component
function OfficialBadge(): JSX.Element {
  return (
    <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] text-xs font-semibold rounded-full">
      <Sparkles className="w-3 h-3" />
      Official
    </span>
  )
}

// Skill preview tags for card view
function SkillPreviewTags({ skills }: { skills: { id: string; name: string }[] }): JSX.Element {
  const visibleSkills = skills.slice(0, 4)
  const remainingCount = skills.length - 4

  return (
    <div className="flex flex-wrap gap-1.5 mb-4">
      {visibleSkills.map((skill) => (
        <span
          key={skill.id}
          className="px-2 py-0.5 bg-[var(--bg-secondary)] text-[var(--text-tertiary)] text-xs rounded-md"
        >
          {skill.name}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="px-2 py-0.5 text-[var(--text-tertiary)] text-xs">
          +{remainingCount} more
        </span>
      )}
    </div>
  )
}

// Content type indicator (configuration vs skills)
function ContentTypeIndicator({
  isConfiguration,
  skillCount,
}: {
  isConfiguration: boolean
  skillCount: number
}): JSX.Element {
  if (isConfiguration) {
    return (
      <span className="flex items-center gap-1.5 text-purple-500">
        <Wrench className="w-4 h-4" />
        Configuration
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
      <Package className="w-4 h-4" />
      {skillCount} skills
    </span>
  )
}

interface SkillStarterKitsProps {
  collections: SkillCollection[]
  variant?: 'grid' | 'carousel' | 'list'
  className?: string
}

export function SkillStarterKits({
  collections,
  variant = 'grid',
  className = '',
}: SkillStarterKitsProps) {
  if (collections.length === 0) {
    return null
  }

  if (variant === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {collections.map((collection) => (
          <StarterKitListItem key={collection.id} collection={collection} />
        ))}
      </div>
    )
  }

  if (variant === 'carousel') {
    return (
      <div className={`relative ${className}`}>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {collections.map((collection) => (
            <div key={collection.id} className="flex-shrink-0 w-80 snap-start">
              <StarterKitCard collection={collection} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default: grid
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {collections.map((collection) => (
        <StarterKitCard key={collection.id} collection={collection} />
      ))}
    </div>
  )
}

function StarterKitCard({ collection }: { collection: SkillCollection }): JSX.Element {
  const style = getKitStyle(collection.slug)
  const emoji = collection.emoji || style.emoji
  const isConfiguration = collection.content_type === 'configuration'
  const skillCount = getSkillCount(collection)
  const showSkillPreview = !isConfiguration && collection.skills && collection.skills.length > 0

  return (
    <Link
      href={getKitHref(collection.slug)}
      className="group relative block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] transition-all hover:shadow-xl hover:-translate-y-1"
    >
      {/* Gradient header */}
      <div className={`h-24 bg-gradient-to-br ${style.gradient} relative overflow-hidden`}>
        <DotPatternOverlay />
        <span className="absolute -bottom-4 -right-4 text-8xl opacity-30">{emoji}</span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-bold text-lg group-hover:text-[var(--id8-orange)] transition-colors">
            {collection.name}
          </h3>
          {collection.is_official && <OfficialBadge />}
        </div>

        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
          {collection.description}
        </p>

        {showSkillPreview && <SkillPreviewTags skills={collection.skills!} />}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm">
          <ContentTypeIndicator isConfiguration={isConfiguration} skillCount={skillCount} />
          <span className="flex items-center gap-1 text-[var(--id8-orange)] font-medium group-hover:gap-2 transition-all">
            View Kit <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function StarterKitListItem({ collection }: { collection: SkillCollection }): JSX.Element {
  const style = getKitStyle(collection.slug)
  const emoji = collection.emoji || style.emoji
  const isConfiguration = collection.content_type === 'configuration'
  const skillCount = getSkillCount(collection)

  return (
    <Link
      href={getKitHref(collection.slug)}
      className="group flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] transition-all"
    >
      <div
        className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${style.gradient} rounded-xl flex items-center justify-center text-2xl`}
      >
        {emoji}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold group-hover:text-[var(--id8-orange)] transition-colors">
            {collection.name}
          </h4>
          {collection.is_official && <span className="text-xs text-[var(--id8-orange)]">✓</span>}
        </div>
        <p className="text-sm text-[var(--text-secondary)] truncate">
          {isConfiguration ? 'Configuration' : `${skillCount} skills`}
        </p>
      </div>

      <ChevronRight className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--id8-orange)] transition-colors" />
    </Link>
  )
}

// Featured collection banner
export function FeaturedStarterKit({
  collection,
  className = '',
}: {
  collection: SkillCollection
  className?: string
}): JSX.Element {
  const style = getKitStyle(collection.slug)
  const emoji = collection.emoji || style.emoji

  return (
    <Link
      href={getKitHref(collection.slug)}
      className={`group relative block overflow-hidden rounded-2xl bg-gradient-to-br ${style.gradient} p-8 transition-all hover:shadow-2xl ${className}`}
    >
      <DotPatternOverlay size={20} opacity={0.1} />
      <span className="absolute -bottom-8 -right-8 text-[200px] opacity-20 select-none">
        {emoji}
      </span>

      <div className="relative z-10 max-w-lg">
        {collection.is_official && (
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">
              <Sparkles className="w-3 h-3" />
              Official Starter Kit
            </span>
          </div>
        )}
        <h3 className="text-3xl font-bold text-white mb-2">{collection.name}</h3>
        <p className="text-white/80 text-lg mb-6">{collection.description}</p>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold group-hover:gap-3 transition-all">
          Get Started <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  )
}

export default SkillStarterKits
