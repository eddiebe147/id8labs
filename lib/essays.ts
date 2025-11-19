export interface Essay {
  slug: string
  title: string
  subtitle?: string
  date: string
  category: 'research' | 'release' | 'essay'
  readTime: string
  excerpt: string
  content: string
  heroImage?: string
}

export const essays: Essay[] = [
  {
    slug: 'memmon-making-the-invisible-visible',
    title: 'Memmon: Making the Invisible Visible',
    subtitle: 'Building a RAM monitor for AI development workflows',
    date: '2025-11-18',
    category: 'essay',
    readTime: '6 min read',
    excerpt: 'My computer kept crashing from AI agents consuming all my RAM. Activity Monitor wasn\'t cutting it. So I built Memmon—a simple dashboard with colored bars and a kill button.',
    heroImage: '/essays/memmon-hero.png',
    content: `# Memmon: Making the Invisible Visible

My computer kept crashing.

No warning. No graceful degradation. Just a spinning beachball and the sinking realization that I'd lost work because some process decided to eat all my RAM.

The culprit? AI agents doing exactly what I asked them to do. Working hard. Too hard. Consuming resources until there were none left.

Activity Monitor wasn't cutting it. By the time I'd opened it, sorted by memory, and found the problem, it was too late. I needed to see what was *about to* happen, not what already had.

So I built Memmon.

## What It Is

Memmon is a Next.js dashboard that runs on port 1111 (easy to remember when your system is dying). Four panels. One purpose.

**Memory Usage**: Green, yellow, red. That's it. No percentages to interpret. Green means work. Yellow means pay attention. Red means kill something now.

**Process List**: Top memory consumers, ranked. One-click kill. When you're at 97% and spinning, you don't have time for Activity Monitor's dialog boxes.

**Electron Tracking**: Claude, VS Code, Comet - these Electron apps can consume gigabytes while looking innocent. Memmon watches them specifically.

**Server Monitor**: Shows what's actually running on your dev ports. That Next.js instance you "stopped" at 3pm? Still there. Memmon sees the ghosts.

## Why It Works

You can't fix what you can't see.

Traditional monitors show you the present. Memmon shows you the trajectory. It's the difference between a rearview mirror and a windshield.

The color-coding removes decision paralysis. You don't calculate headroom or interpret graphs. You look at a color and know if action is required. The interface constrains your options to make decisions faster.

And because it lives in a pinned browser tab, you see it constantly. Passive visibility beats active monitoring every time. The information is just... there.

## The Real Benefit

Here's what I didn't expect: Memmon changed my behavior.

When you see resource consumption in real-time, you make different choices. Close Chrome tabs you don't need. Actually quit Slack instead of minimizing it. Stop running three AI assistants simultaneously "just in case."

It's like those home energy monitors. The wattage savings are nice, but the real value is awareness. Awareness changes consumption.

## Three Things I Learned

**1. Build for the actual problem.**
I didn't build a comprehensive monitoring suite with network traffic and CPU temps and disk I/O. I built RAM tracking and process killing for a dev environment where agents go rogue. That's it.

**2. The best tool is the one you use.**
Memmon isn't sophisticated. It's a dashboard with colored bars and a kill button. But I use it every day. That's the entire point.

**3. Simplicity is a feature.**
Port 1111. Green/yellow/red. One-click kills. No configuration, no settings, no complexity. It does one thing well.

## What's Next

The current version works. But there are obvious extensions:

- Historical tracking for patterns
- Alert thresholds with notifications
- Claude Code integration to show which agent is which process
- One-click port management

But those are features. Right now, Memmon is a tool. Tools solve specific problems you have today. Products solve generic problems others might have tomorrow.

I needed a tool. So I built one.

## The Bigger Picture

As AI systems get more capable and autonomous, we need better visibility into what they're doing. Not for control - for collaboration.

When an agent crashes your system, it's not malicious. It's enthusiastic. It's trying to help without understanding the constraints it's operating under.

Our job isn't to limit the enthusiasm. It's to make the constraints visible. To create systems where AI can work hard without killing the machine.

Memmon is my small contribution to that. A simple dashboard that says: "Here's what's happening. Here's what's about to happen. Here's a button if you need to stop it."

---

It's not revolutionary. It's not AI or blockchain or whatever the hype cycle demands.

It's colored bars and a kill button.

But sometimes that's exactly what you need.

---

*Stack: Next.js 14, TypeScript, Tailwind*
*Port: 1111*
*Platform: macOS*
*Built with: Claude Code*`
  },
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
