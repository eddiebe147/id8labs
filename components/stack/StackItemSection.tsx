import Link from 'next/link'

interface StackItem {
  id: string
  name: string
  description: string
  slug?: string
  type: string
}

interface StackItemSectionProps {
  title: string
  emoji: string
  items: StackItem[]
  linkPrefix?: string
}

export function StackItemSection({ title, emoji, items, linkPrefix }: StackItemSectionProps): React.ReactElement | null {
  if (items.length === 0) return null

  const content = items.map((item) => {
    const itemContent = (
      <>
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
          {item.description}
        </p>
      </>
    )

    if (linkPrefix && item.slug) {
      return (
        <Link
          key={item.id}
          href={`${linkPrefix}${item.slug}`}
          className="block p-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg hover:border-[var(--id8-orange)] transition-colors"
        >
          {itemContent}
        </Link>
      )
    }

    return (
      <div
        key={item.id}
        className="p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg"
      >
        {itemContent}
      </div>
    )
  })

  const containerClass = linkPrefix
    ? 'p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl'
    : 'card'

  return (
    <div className={containerClass}>
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <span className="text-2xl">{emoji}</span>
        {title} ({items.length})
      </h3>
      <div className="space-y-2">{content}</div>
    </div>
  )
}
