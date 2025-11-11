import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Products - ID8Labs',
  description: 'Category-defining professional tools built from 20 years in production.',
}

interface Product {
  name: string
  status: 'active' | 'coming-soon'
  tagline: string
  description: string
  link?: string
  external?: boolean
}

const products: Product[] = [
  {
    name: 'ID8Composer',
    status: 'active',
    tagline: 'Timeline-based AI story development platform',
    description:
      'Built for writers, directors, and producers who think visually and work non-linearly. ID8Composer treats story development like the messy, iterative process it actually is—not a linear outline that pretends your creative process is orderly. Work with AI as a collaborative partner, not a replacement.',
    link: 'https://id8composer.app',
    external: true,
  },
  {
    name: 'Lexicon',
    status: 'coming-soon',
    tagline: 'Wikipedia for your story universe',
    description:
      "When you're 100 episodes deep, find any character, relationship, or plot thread instantly. Graph-powered search that understands your narrative universe—from character connections to timeline conflicts to thematic patterns.",
    link: '/products/lexicon',
  },
  {
    name: 'Clear',
    status: 'coming-soon',
    tagline: 'Remove background music from video clips',
    description:
      'AI-powered audio separation for production environments. Clean up interviews, isolate dialogue, remove music from archival footage. What used to take expensive post-production now happens on set. Simple. Fast. Production-ready.',
    link: '/products/clear',
  },
  {
    name: '[Classified]',
    status: 'coming-soon',
    tagline: 'Something revolutionary brewing…',
    description:
      "We're building a tool that solves a problem every creative team has but doesn't know how to articulate. It's ambitious. It's different. It's battle-tested in our own production work. We'll talk about it when it's ready.",
  },
]

function ProductCard({ product }: { product: Product }) {
  const card = (
    <div className="group p-8 border border-[var(--border)] bg-[var(--bg-primary)] hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <span className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
          {product.status === 'active' ? '● Active' : '◐ Coming Soon'}
        </span>
      </div>

      <p className="text-xl mb-4 text-[var(--text-secondary)]">{product.tagline}</p>

      <p className="text-base leading-relaxed mb-6">{product.description}</p>

      {product.link && (
        <div className="flex items-center gap-2 text-sm group-hover:translate-x-1 transition-transform">
          Learn more
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      )}
    </div>
  )

  if (!product.link) {
    return card
  }

  if (product.external) {
    return (
      <a href={product.link} target="_blank" rel="noopener noreferrer" className="block">
        {card}
      </a>
    )
  }

  return <Link href={product.link}>{card}</Link>
}

export default function ProductsPage() {
  return (
    <div className="container py-24">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-12 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to home
      </Link>

      {/* Header */}
      <header className="max-w-3xl mb-16">
        <h1 className="mb-6">Products</h1>
        <p className="text-xl text-[var(--text-secondary)]">
          Category-defining tools built from 20 years in production.
          Each one solves a real problem we faced daily.
        </p>
      </header>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  )
}
