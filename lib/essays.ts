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
    slug: 'id8factory-missing-orchestration-layer',
    title: 'ID8Factory: The Missing Layer Between AI Tools and Finished Work',
    subtitle: 'The AI tools are incredible. Using them together is a mess.',
    date: '2025-12-17',
    category: 'essay',
    readTime: '4 min read',
    excerpt: 'I was spending more time on logistics than creativity. Midjourney, Grok, Gemini—incredible tools, but using them together is just tab-switching and forgetting which prompt made which image. So I built the orchestration that was missing.',
    content: `# ID8Factory: The Missing Layer Between AI Tools and Finished Work

*The AI tools are incredible. Using them together is a mess.*

---

Every campaign needs visuals, and every visual needs iterations. That means logging into Midjourney, writing a prompt, waiting three minutes, downloading, then doing the same in Grok, then Gemini, then organizing everything into folders you'll never find again.

I was spending more time on logistics than creativity.

Midjourney produces stuff I couldn't have imagined five years ago. Grok is fast. Gemini is weirdly good at photorealism. But using them together? That's just tab-switching and copy-pasting and forgetting which prompt made which image.

So I built the orchestration that was missing.

---

## What ID8Factory Actually Does

I didn't build another AI image generator. I built the orchestration layer that makes the existing ones usable at scale.

It's a pipeline. You tell it what you need—"generate ad creatives for DeepStack"—and it handles the tedious parts:

- **Research** → Pulls brand guidelines, analyzes competitors, builds a moodboard
- **Brief** → Synthesizes direction into platform-specific prompts
- **Generate** → Automates the browsers, runs prompts across multiple AI platforms
- **Iterate** → Tracks what worked, suggests variations
- **Deploy** → Packages assets with full metadata, pushes to GitHub

The AI handles logistics. You handle taste.

---

## The Browser Automation Problem

Most people don't realize: these AI image platforms don't have APIs. Or the APIs are limited, expensive, or waitlisted.

So Factory automates the browser.

It navigates to Midjourney's web interface, finds the prompt box, types your prompt, waits for generation, clicks upscale on the best result, downloads it, saves it with metadata tracking which prompt produced what. Then it does the same on Grok. Then Gemini. All while you do something else.

The trick is using accessibility snapshots instead of CSS selectors. "Find the textbox labeled 'What will you imagine?'" survives UI updates. CSS selectors don't.

---

## Human Gates

Not everything should be automated. Factory has explicit decision points where the AI stops and waits:

- After the brief: Does this creative direction actually match what you want?
- After generation: Which of these images should we iterate on?
- Before deploy: Ready to push to production?

The system presents options. You decide. Then it continues.

---

## First Real Test

I built this for our DeepStack campaign. Results: 5 production-ready images. Under 10 minutes of my attention.

What I learned about the platforms: Midjourney for style. Gemini for speed. Grok for surprises.

And the state tracking turned out to be essential. A week later, I needed to know exactly which prompt produced the image we used. It was all there—prompt, platform, timestamp, generation time, file path.

You will forget what made what. The system won't.

---

## The Bigger Picture

The person who figures out how to chain these tools together has a massive advantage over the person clicking through tabs.

We're in a weird moment. AI tools are incredibly powerful but require manual orchestration. Factory is my answer for creative production—research to deployment, tracked and repeatable.

The tools exist. The orchestration didn't. Now it does.

---

*Currently in field testing at ID8Labs.*`
  },
  {
    slug: 'building-deepstack-emotional-firewall',
    title: 'I Built an AI Trading Research Platform with an Emotional Firewall',
    subtitle: 'Your biggest edge might be knowing when not to act',
    date: '2025-12-12',
    category: 'essay',
    readTime: '5 min read',
    excerpt: 'Most retail traders don\'t lose because they can\'t read a chart. They lose because they can\'t read themselves. FOMO hits. Fear takes over. Revenge trading kicks in. So I built a tool that treats discipline as a feature.',
    content: `# I Built an AI Trading Research Platform with an Emotional Firewall

I've spent 20+ years in television production, building systems that track complex narratives across hundreds of hours of footage. Pattern recognition is the job — figuring out what's actually happening beneath the surface of what people say and do.

Turns out that skillset transfers to markets. Understanding them, anyway. Trading them profitably? Different story.

Most retail traders don't lose because they can't read a chart. They lose because they can't read themselves. FOMO hits. Fear takes over. Revenge trading kicks in. The analysis was right, but you didn't follow it because something *felt* different in the moment.

I've been there enough times to know I needed a different approach.

So I built Deepstack — a research platform that treats your emotional state as seriously as your technical analysis.

## The Core Idea: An Emotional Firewall

This is the part that actually matters. The system tracks your journal entries, your trade logs, the patterns in how you describe your mental state over time. When it detects you're operating from a high-emotion place — based on *your own* historical patterns — it activates.

The AI doesn't lock you out. It just gets more careful. Asks harder questions. Slows things down before you do something you'll be staring at the ceiling about at 2am.

## What Else It Does

**Research assistant with full context** — Ask it anything about your positions, your theses, sector analysis. It knows what you're tracking and why.

**Thesis engine** — Document your investment hypotheses with specific entry and exit conditions. Stop trading on vibes. Write down what you believe and why, then see if you were right.

**Trade journal** — Log every trade, but more importantly, log how you felt making it. Fearful? Overconfident? Bored? Over time, you start seeing which emotional states predict your worst decisions.

**Market data and prediction markets** — Charts, watchlists, options chains via Alpaca. Polymarket and Kalshi integration so you can see what the crowd thinks about macro events that might move your positions.

## What It's Not

It won't execute trades for you. It won't tell you what to buy. It won't pretend it knows the future.

It's a research tool that respects the fact that you're a human being making decisions under uncertainty — and that your biggest edge might be knowing when *not* to act.

## Why I Built It

Eight months ago I couldn't write a line of code. I learned by building things I actually needed.

I needed something that would protect me from myself. The best traders I've studied aren't the ones with the most sophisticated analysis — they're the ones with the most discipline. So I built a tool that treats discipline as a feature, not an afterthought.

## Try It

[deepstack.trade](https://deepstack.trade)

It's free to try. If you've ever made a trading decision you regretted five minutes later, this might be useful.

I'm building based on what real traders actually need, so feedback is welcome.

---

*Originally published on X, December 12, 2025*`
  },
  {
    slug: 'whats-next-north-star-and-scene-builder',
    title: 'What\'s Next: North Star and Scene Builder',
    subtitle: 'The two features that make switching impossible',
    date: '2025-11-18',
    category: 'essay',
    readTime: '8 min read',
    excerpt: 'We\'re an A-. Production-ready. Zero critical issues. 98% test coverage. Now we build the shit that makes switching impossible. North Star and Scene Builder aren\'t polish. They\'re the moat.',
    content: `# What's Next: North Star and Scene Builder

We're an A-. Production-ready. Zero critical issues. 98% test coverage.

Now we build the shit that makes switching impossible.

## The Two Features That Matter

North Star and Scene Builder aren't polish. They're the moat.

Everything else in the MVP proves we can execute. These two prove we're building something nobody else can copy.

## North Star: From Tourist to Native (With a Plan)

Right now, Knowledge Base gives Claude access to your world. Characters, conflicts, themes – it's all there.

North Star makes Claude **understand** it. And helps you actually finish what you're building.

Think about someone who memorized facts about your hometown versus someone who grew up there. Facts versus understanding. That's the difference.

### What It Actually Does

When you're on Episode 47, North Star tracks:

- **Relationship arcs** - Not just "Sarah and Mike are dating" but where they are in the full trajectory
- **Character momentum** - Who's building toward crisis, who's ready for growth, who needs space
- **Thematic threads** - Which themes are ready to pay off, which are still building
- **Story structure** - What beats are climaxing, what's setup for later

This isn't better memory. It's comprehension.

### Plan Mode: The Deadline Keeper

But understanding your universe doesn't help if you never finish.

That's where Plan Mode comes in.

**Plan Mode lets you:**
- Set goal posts for your project (finish Act 1 by Friday, deliver Episode 3 by end of month)
- Build a structured to-do list that breaks big goals into actual work
- Get North Star to help you stay on task and hit your deadlines
- Track progress against real production schedules

It's for the writer who knows exactly what they need to build but needs help staying disciplined. Or the one who's never had a deadline and needs to give themselves one.

You tell North Star "I need to deliver three episodes by December 1st" and it helps you backwards-plan the work. What needs to happen this week. What beats need outlining. What scenes need drafting.

It's not just project management. It's project management that understands story structure.

### Why It's a Moat

Once Claude understands your universe this deeply AND keeps you on track to finish, switching means losing a creative partner who knows your world as well as you do and keeps you honest about shipping.

You're not locked in by contracts. You're locked in by value.

## Scene Builder: Structure Before Prose

Even with perfect context and a solid plan, creators still face the blank page.

You know your world. You know your characters. You know what you need to finish today. You still don't know what happens **next**.

Scene Builder solves that.

### The Real Problem

Most AI tools assume you already know what you want:
- "Just describe the scene"
- "Tell me what happens"
- "Give me the beats"

But creators don't start with answers. They start with questions:
- What if Sarah confronts Mike now instead of later?
- What if this happens at the wedding instead of the office?
- What if we flip who has power?

They need to **explore** before they **commit**.

### How It Works

Eight exploration methods. Four-phase workflow:

**Phase 1 - Discovery**: Generate possibilities with Story Spark, What-If Engine, Conflict Matrix. Not writing yet. Just exploring.

**Phase 2 - Structure**: Pick the best direction. Break it into beats.

**Phase 3 - Refinement**: Define objectives, emotional turns, power shifts for each beat. Understand mechanics before writing dialogue.

**Phase 4 - Composition**: Now you write. But you're executing structure you've already tested, not inventing from nothing.

### Why It Changes Everything

You're not waiting for inspiration. You're systematically exploring your story space.

You're not writing into corners. You're testing structure before committing.

You're not in revision hell. You're refining at the beat level where changes are cheap.

It's architecture instead of prayer.

## Why This Order

North Star first, then Scene Builder.

Context enables structure.

Scene Builder's exploration works exponentially better when Claude deeply understands your universe. What-If Engine generates better alternatives when it knows your themes. Conflict Matrix finds richer tensions when it understands your dynamics.

And Plan Mode keeps you shipping while you're exploring possibilities.

They compound.

## What Users Get

Right now: Escape session hell, compose in dual-panel, never lose context.

With these two:
- Creative partner who structurally understands your universe
- Deadline tracking that understands story structure
- Systematic discovery instead of waiting for lightning to strike
- Tools that get smarter as you use them
- Real switching costs from accumulated value, not lock-in

## What We Get

Category creation.

Nobody else is building persistent story universe understanding. Nobody else combines project management with story comprehension. Nobody else separates discovery from writing. Nobody else treats narrative like a world to explore instead of text to generate.

This isn't iterating on "AI writing assistant." This is building the world-building platform for storytellers.

You build your universe once. North Star helps you plan the work and stay on deadline. Scene Builder helps you discover and structure what you're building. Then you compose.

That's not a feature. That's a moat.

## The Work

**North Star needs:**
- Relationship tracking across episodes
- Character arc analysis
- Thematic thread ID
- Story momentum assessment
- KB integration
- UI that surfaces insights when they matter
- Plan Mode: Goal setting, to-do lists, deadline tracking
- Plan Mode: Progress tracking against story structure

**Scene Builder needs:**
- Eight exploration methods refined
- Four-phase workflow
- Beat-level editing
- North Star integration
- Transport controls at beat level
- Structure-to-prose flow

6-8 weeks. Maybe 10 with unknowns.

But we're not guessing anymore. The A- MVP proved the foundation works. Now we build on solid ground.

## Why Now

We could polish the MVP. Refactor large files. Optimize bundle size. Clear those 46 TODOs.

That's maintenance pretending to be progress.

North Star and Scene Builder are what make users say "I can't go back" instead of "this is nice."

The A- earned us the right to be ambitious.

Now we use it.`
  },
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
