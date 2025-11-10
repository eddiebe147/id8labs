export interface Essay {
  slug: string
  title: string
  subtitle?: string
  date: string
  category: 'research' | 'release' | 'essay'
  readTime: string
  excerpt: string
  content: string
}

export const essays: Essay[] = [
  {
    slug: 'inventing-categories-not-improving-tools',
    title: 'Inventing Categories, Not Improving Tools',
    subtitle: 'Why ID8Labs exists and how we think about product development',
    date: '2025-01-15',
    category: 'essay',
    readTime: '8 min read',
    excerpt: 'Every product we build starts with a real problem from 20 years in production. We don\'t improve existing tools. We invent entirely new categories that treat AI as a creative partner, not a replacement.',
    content: `# Inventing Categories, Not Improving Tools

Every product we build starts with a real problem from 20 years in production.

## The Problem with Improvement

The software industry is obsessed with improvement. Better features. Faster performance. Smoother workflows. But improvement assumes the fundamental approach is correct—it just needs refinement.

We take a different view.

## Starting with Real Problems

ID8Labs was founded on a simple observation: the most valuable tools don't improve existing solutions. They create entirely new categories by solving problems in fundamentally different ways.

Take ID8Composer, our timeline-based AI story development platform. We didn't try to make existing screenwriting software better. We recognized that AI changes the entire creative process—from ideation to iteration to collaboration.

## AI as Creative Partner

This is our core philosophy: treat AI as a creative partner, not a replacement.

Traditional tools view AI as automation—a way to speed up existing tasks. But that misses the transformative potential. When you truly partner with AI, you unlock entirely new ways of working that weren't possible before.

## The Lab Stays Focused

Products can have personality. They can be bold, opinionated, even provocative. But the lab—ID8Labs itself—stays focused on the fundamentals:

- Real problems from production experience
- Category-defining solutions
- AI as creative partner
- Professional-grade quality

This is our white paper aesthetic. Clean. Scientific. Credible.

## What's Next

We have three products in active development, each targeting a specific production pain point that's been solved the same way for decades. Each one invents a new category.

Some are public (like ID8Composer). Some aren't ready yet. One is still classified.

But they all start the same way: with a real problem and the question "What if we completely rethought this?"

---

*Published January 15, 2025*`
  },
  {
    slug: 'id8composer-v1-release',
    title: 'ID8Composer v1.0: Timeline-Based AI Story Development',
    date: '2025-01-10',
    category: 'release',
    readTime: '5 min read',
    excerpt: 'Today we\'re launching ID8Composer v1.0, a new category of creative tool that treats AI as a writing partner through timeline-based story development.',
    content: `# ID8Composer v1.0: Timeline-Based AI Story Development

Today we're launching ID8Composer v1.0, a new category of creative tool that treats AI as a writing partner through timeline-based story development.

## What It Does

ID8Composer fundamentally rethinks how writers and AI collaborate on story development. Instead of treating AI as a text generator, we built a timeline interface that treats story creation as a conversation between creative partners.

### Key Features

- **Timeline-based story structure**: Visualize your narrative arc
- **AI conversation system**: Natural dialogue with your creative partner
- **Version tracking**: Every iteration preserved
- **Export to industry formats**: Final Draft, PDF, and more

## Why It Matters

For 20 years, the screenwriting workflow has been essentially the same: write in a specialized text editor, track versions in separate files, collaborate through email attachments.

AI changes everything—but only if we rethink the entire workflow from first principles.

## What's Next

This is v1.0. We're already working on collaborative features, advanced export options, and integrations with production management tools.

Try it at [id8composer.app](https://id8composer.app)

---

*Released January 10, 2025*`
  },
  {
    slug: 'the-case-for-specialized-tools',
    title: 'The Case for Specialized Tools in the AI Era',
    date: '2024-12-20',
    category: 'research',
    readTime: '12 min read',
    excerpt: 'As AI becomes more general-purpose, the need for specialized, domain-specific tools becomes more critical, not less. Here\'s why.',
    content: `# The Case for Specialized Tools in the AI Era

As AI becomes more general-purpose, the need for specialized, domain-specific tools becomes more critical, not less.

## The Generalist Fallacy

There's a prevailing assumption that as AI models become more capable, specialized tools become less necessary. After all, if ChatGPT can write code, design interfaces, and compose music, why do we need specialized tools?

This thinking misses the fundamental difference between capability and workflow.

## Capability vs. Workflow

A general-purpose AI can technically perform specialized tasks. But the interface, context, and workflow matter just as much as raw capability.

Consider professional photographers. Your smartphone has an excellent camera—technically capable of professional-quality photos. Yet professionals still use specialized cameras. Why?

Because professional photography isn't just about image quality. It's about workflow, control, repeatability, and integration with a larger production process.

## Domain-Specific Context

Specialized tools excel because they understand domain-specific context:

- **Industry terminology**: Speak the language of your field
- **Standard workflows**: Match how professionals actually work
- **Quality requirements**: Meet professional standards, not consumer expectations
- **Integration points**: Connect with other tools in your stack

## The AI Multiplier

Here's the key insight: specialized tools become MORE valuable when combined with AI, not less.

AI provides the raw capability. Specialized tools provide:

- Domain-specific constraints and guardrails
- Professional workflow integration
- Quality assurance and validation
- Collaboration and version control
- Export to industry-standard formats

## Our Approach

At ID8Labs, we build specialized tools that treat AI as a creative partner within professional workflows.

We're not trying to replace general-purpose AI tools. We're building the professional infrastructure that makes AI truly useful in production environments.

That's the difference between a demo and a product.

---

*Published December 20, 2024*`
  }
]

export function getEssayBySlug(slug: string): Essay | undefined {
  return essays.find(essay => essay.slug === slug)
}

export function getEssaysByCategory(category: Essay['category']): Essay[] {
  return essays.filter(essay => essay.category === category)
}

export function getAllEssays(): Essay[] {
  return [...essays].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
