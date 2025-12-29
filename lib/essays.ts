import { getMdxEssays, type MdxEssay } from './mdx-essays'

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
    slug: 'why-i-built-milo',
    title: 'Why I Built MILO: A Signal-Based Approach to Task Management',
    subtitle: 'Developing Jobs/Musk-level signal-to-noise ratio for shipping at scale',
    date: '2025-12-28',
    category: 'essay',
    readTime: '7 min read',
    excerpt: 'Todo lists are fundamentally broken. They show you everything at once, treating a quick email reply the same as a project that will define your quarter. MILO applies signal-to-noise filtering to help you ship like Jobs and Musk.',
    content: `# Why I Built MILO: A Signal-Based Approach to Task Management

**Author:** Eddie Belaval, Founder @ ID8Labs
**Published:** December 28, 2025

---

## The Problem Nobody Talks About

Todo lists are fundamentally broken.

Not because they don't work—they do, technically. The problem is they work *too well* at one thing: making you feel overwhelmed. Every productivity app I've used has the same fatal flaw: they show you everything at once, treating a quick email reply the same as a project that will define your quarter.

After 20 years in TV production—managing shows where a missed deadline means blown budgets and angry networks—I realized that the tools we use for personal productivity have learned nothing from how professionals actually work under pressure.

## The Signal-to-Noise Revelation

In audio engineering, there's a concept called the Signal-to-Noise Ratio (S/N). It measures how much useful signal exists compared to background noise. The higher the ratio, the cleaner the transmission.

Steve Jobs and Elon Musk are legendary for this exact skill—ruthlessly filtering signal from noise at scale. Jobs killed hundreds of products to focus on four. Musk runs five companies by ignoring everything that doesn't move the mission forward. Their superpower isn't working harder—it's filtering better. MILO helps you develop that same Jobs/Musk-level signal-to-noise ratio, so you can ship at scale without drowning in noise.

I started thinking: what if we applied this to task management?

**Signal** = Actions that directly advance your goals
**Noise** = Everything else fighting for your attention

Most todo apps are noise amplifiers. They dutifully collect every task, every idea, every "I should probably..." thought—and then dump them all in front of you. The result? Paralysis. You spend more time organizing tasks than doing them.

## Enter MILO: Mission Intelligence Life Operator

MILO is the task manager I wished existed. It operates on a simple principle: **show only what matters right now.**

### The Signal Queue

Instead of endless lists, MILO surfaces your top 5 priorities. That's it. In-progress tasks first, then the highest priority pending items. Everything else goes to the backlog—organized, accessible, but out of your immediate attention.

This isn't about having fewer tasks. It's about seeing fewer tasks *at once*.

### Categories as Projects

Tasks don't exist in isolation. They belong to projects, life areas, goals. MILO's category system lets you group related work with custom colors and drag-to-reorder organization. But here's the key: categories help you *organize*, not *overwhelm*.

### Work Tracking for Multi-Day Tasks

Real work rarely fits in a single session. MILO tracks estimated days vs. actual days worked, giving you honest feedback about how long things really take—not how long you *think* they take.

## Why Claude Code Integration Changed Everything

Here's where MILO becomes something special.

As a developer, I live in my terminal. Switching to a GUI to manage tasks breaks flow. So I built an MCP (Model Context Protocol) server that lets Claude Code manage MILO directly:

\\\`\\\`\\\`
"Create a task called 'Refactor auth module' with priority 1"
"Show me my signal queue"
"Mark the database migration task complete"
\\\`\\\`\\\`

17 tools. Natural language. Zero context switching.

When I'm deep in code and remember something I need to do, I tell Claude. Task created. Back to coding. The friction disappeared.

## The Technical Details (For Fellow Builders)

MILO is built with:
- **Electron + React + TypeScript** for the desktop app
- **SQLite via better-sqlite3** for local-first data
- **@modelcontextprotocol/sdk** for Claude Code integration
- **TailwindCSS + Zod** for clean UI and validation

The MCP server exposes:
- 11 task management tools (CRUD, lifecycle, signal queue, work tracking)
- 6 category management tools (projects, organization, reordering)
- 4 read-only resources (signal queue, backlog, categories, today's tasks)

Both the Electron app and MCP server share the same SQLite database. Changes from either appear instantly in both.

## What's Next

MILO is just getting started. On the roadmap:
- **Activity monitoring** - MILO will know when you've drifted off-task
- **Smart nudges** - Gentle reminders that respect your flow
- **Time blocking integration** - Connect signal queue to your calendar
- **Goal tracking** - Tasks roll up into objectives, objectives into milestones

The vision is a system that doesn't just store your tasks—it actively helps you stay on mission.

## The Philosophy

Every productivity tool promises to help you do more. MILO is different. It's designed to help you do *what matters*.

The goal isn't to check more boxes. It's to check the right boxes.

That's the signal.

---

## Get MILO

MILO is open source and free. Clone it, build it, use it.

### Quick Start

\\\`\\\`\\\`bash
# Clone the repo
git clone https://github.com/eddiebe147/milo.git
cd milo

# Install dependencies
npm install

# Build and run
npm run build
npm start
\\\`\\\`\\\`

### Claude Code Integration

Add MILO as an MCP server in your Claude Code config:

\\\`\\\`\\\`json
{
  "mcpServers": {
    "milo": {
      "command": "node",
      "args": ["/path/to/milo/mcp-server/dist/index.js"]
    }
  }
}
\\\`\\\`\\\`

Then just talk to Claude: "Show my signal queue" or "Create a task for..."

---

**GitHub:** [eddiebe147/milo](https://github.com/eddiebe147/milo)

---

*Eddie Belaval is the founder of ID8Labs, building professional tools for the AI era. Previously a producer on 90 Day Fiancé and other reality TV series.*`
  },
  {
    slug: 'ai-conversation-fundamentals-free-course',
    title: 'We Just Shipped a Free Course on Talking to AI',
    subtitle: 'AI Conversation Fundamentals: 45 minutes to transform how you work with AI',
    date: '2025-12-27',
    category: 'essay',
    readTime: '5 min read',
    excerpt: 'Most people are still prompting AI like they\'re typing into a search bar. That\'s leaving 90% of the value on the table. So we built a free course that teaches the mental models that actually work.',
    content: `# We Just Shipped a Free Course on Talking to AI

Most people are still prompting AI like they're typing into a search bar.

"Write me a bio."
"Help me with this email."
"Make this better."

Then they wonder why AI feels inconsistent. Why it sometimes gives brilliant responses and sometimes gives garbage. Why it requires so much back-and-forth to get anything useful.

The problem isn't the AI. The problem is the conversation.

---

## Why We Built This

Last week, I wrote about how Claude Code isn't just for coders. That article resonated because it hit on something people are starting to realize: AI tools are powerful, but most people don't know how to use them well.

Not because they're not smart. Because nobody taught them the fundamentals.

Think about it. We spend years learning how to communicate with humans—in school, at work, through a thousand awkward conversations. But AI is a new kind of collaborator. It processes language differently. It has different strengths and limitations. It needs different things from you to do its best work.

Yet we just... expect people to figure it out?

That's insane.

So we built a course. Free. 45 minutes. Six modules that cover everything from the mental model shift to the practical toolkit to putting it all together.

---

## What's Inside

### Module 1: The Mental Model Shift

The single biggest thing holding people back isn't technique—it's how they think about AI. They treat it like a search engine (ask question, get answer) or a magic box (type something, hope for the best).

Module 1 reframes the relationship. AI is a brilliant intern with perfect memory but no context about your specific situation. Your job isn't to ask questions. It's to delegate effectively.

### Module 2: The Core Toolkit

Four elements that work in any AI interaction:
- **Context**: What does the AI need to know?
- **Task**: What exactly are you asking for?
- **Constraints**: What should it avoid?
- **Format**: What should the output look like?

Before/after examples showing the difference between prompts that fail and prompts that work.

### Module 3: The Iteration Loop

AI isn't one-shot. The power is in the back-and-forth. This module covers how to give feedback that actually improves outputs, when to start over versus iterate, and the "zoom in, zoom out" technique.

### Module 4: The Attention Budget

Every response is a choice about where AI focuses. This module teaches you to direct that attention intentionally—what to include, what to leave out, and how to structure complex requests.

### Module 5: Putting It Together

A complete example from vague idea to finished output, showing how all the concepts connect in a real workflow.

### Module 6: What's Next

Where to go from here. Links to Claude Code for Knowledge Workers (our paid course), community resources, and next steps for serious learners.

---

## Why Free?

Because the fundamentals should be accessible.

We have a paid course—Claude Code for Knowledge Workers—that goes deep on specific workflows. That's for people who want to transform their professional toolkit.

But the mental models? The basic techniques that make every AI interaction better? Those shouldn't be behind a paywall.

If you've ever been frustrated by AI, if you've ever wondered why some people seem to get better results, if you've ever thought "I should probably learn how to use these tools properly"—this course is for you.

---

## The Bigger Picture

We're at an inflection point. AI tools are becoming genuinely useful, but most people aren't getting that value.

The gap between people who know how to work with AI and people who don't is going to grow. Fast.

This course is our small contribution to closing that gap. Forty-five minutes of fundamentals that will change how you think about AI forever.

[Start the free course →](/courses/ai-conversation-fundamentals)

---

*AI Conversation Fundamentals is available now at id8labs.app. It's free, it's practical, and it's designed for people who want to work better with AI.*`
  },
  {
    slug: 'claude-code-isnt-for-coders',
    title: 'Claude Code Isn\'t For Coders',
    subtitle: 'How I use an AI "coding tool" to run a production company and an LLC - without writing code',
    date: '2025-12-26',
    category: 'essay',
    readTime: '7 min read',
    excerpt: 'I run two businesses. One produces reality television. The other builds AI tools for developers. Neither requires me to write code daily. But Claude Code has become the most important tool in both.',
    content: `# Claude Code Isn't For Coders

I run two businesses. One produces reality television. The other builds AI tools for developers.

Neither requires me to write code daily. But Claude Code has become the most important tool in both.

If you've dismissed Claude Code because of its name, you're missing the point entirely.

---

## The Junk Drawer That Changed Everything

I had an iCloud folder with over 10 years of files. Screenshots, voice memos, PDFs, random documents—everything I'd ever thought was worth saving but never organized. A digital junk drawer I'd been meaning to clean up since 2015.

One afternoon, I pointed Claude Code at it.

"Go through this folder. Build me an intake system. Categorize everything."

What happened next shifted how I think about AI.

Claude didn't just sort files into folders. It *understood* them. It read documents, parsed images, identified patterns. It built a categorization system based on what the files actually contained—not just file types or dates.

Hours later, I had structure. Contracts in one place. Creative assets in another. Research organized by topic. Voice memos transcribed and tagged.

But here's what hit me: none of it was junk. Every file I'd saved over a decade, I'd saved for a reason. It was treasure—I just needed someone to help me see it.

That's when I realized: Claude Code isn't a coding tool. It's a thinking partner that happens to run on your computer.

---

## What I Actually Do With It

### Reality TV Production

I work on productions for major networks. The work involves:

- **Interview questions** - Generating thoughtful questions for cast members based on their backgrounds, storylines, and what we need to capture
- **Logistics and scheduling** - Grinding through operational details to find the most effective time management across complex shoots
- **Research** - Web searches for cast backgrounds, location scouting, fact-checking storylines

Before Claude Code, this was days of work. Document creation, legwork, research rabbit holes.

Now it compresses into hours.

The time savings matter, but that's not the real win. The real win is *bandwidth*. When you're not bogged down by document creation and research logistics, you have space for higher-level creative decisions. You can actually *think* about the story instead of drowning in the mechanics of capturing it.

I use Perplexity and Firecrawl integrations to search the web, pull backgrounds, scout locations. Claude processes everything and surfaces what matters.

### LLC Operations

I've built a team of AI agents to help me run ID8Labs. Not metaphorically—literally a team with different roles:

- Compliance monitoring
- Tax strategy
- Expense categorization
- Document generation

I've also built a media pipeline that generates marketing assets. Social content, graphics, promotional materials—systematized and consistent.

This is the part that sounds like "coding work" but isn't. I'm not writing the code. I'm *directing* the work. "Build me a system that does X." "Create a workflow for Y." "When Z happens, do this."

The difference between asking ChatGPT for help and using Claude Code is the difference between texting a friend for advice and having an employee who can actually *do the work*.

---

## The Mental Model Shift

Here's what most people get wrong about Claude Code:

**They think it's for developers.**

It's not. It's for anyone with files, folders, and work that involves processing information.

**They think you need to write code.**

You don't. You describe what you want in plain English. Claude figures out how to do it.

**They think it's just a better chatbot.**

It's not a chatbot at all. It's an agent running locally on your computer with access to your files, the ability to run for hours, and tools to interact with the world.

The shift is from *assistance* to *delegation*.

- **Assistance**: "Help me write interview questions"
- **Delegation**: "Here are the cast files. Generate interview questions for each person based on their background and what we discussed in the story meeting. Save them to the prep folder."

One gives you suggestions. The other gives you deliverables.

---

## Who This Is Actually For

If you're a developer, you already know about Claude Code. This isn't for you.

This is for:

**Writers** - Voice memos to organized outlines to polished drafts. Research synthesis. Multi-platform content repurposing.

**Researchers** - Competitive analysis. Interview transcript synthesis. Pattern recognition across hundreds of documents.

**Operators** - File organization. Invoice processing. Recurring workflows. The operational grunt work that eats your day.

**Producers** - Anyone managing complex projects with lots of moving pieces, documents, and logistics.

If your work involves processing information and you're still using AI as a chatbot, you're leaving 80% of the value on the table.

---

## Getting Started

The technical barrier is lower than you think:

1. Open Terminal (Command + Space, type "Terminal" on Mac)
2. Run: \`curl -fsSL https://claude.ai/install.sh | bash\`
3. Type: \`claude\`

That's it. You're in.

Start with something low-stakes. Point it at your Downloads folder. "Organize this. Show me what's here. Find duplicates."

Watch it work. See what it finds.

Then try something real. A folder of invoices. Research documents. Voice memos from last month.

The moment it clicks—the moment you realize this isn't a chatbot but an *operator*—everything changes.

---

## The Bigger Picture

We're in a weird transition period where the most powerful AI tools are marketed to developers, but their real value is for everyone.

Claude Code's name is a liability. It scares away exactly the people who would benefit most.

But that's also an opportunity. If you're a knowledge worker who figures this out now, you have a massive advantage over everyone still copy-pasting from ChatGPT.

The future of work isn't humans asking AI questions. It's humans delegating to AI agents.

Claude Code is the first real taste of that future. And it's available right now, for free.

Stop asking. Start delegating.

---

*I'm building a course on Claude Code for non-technical knowledge workers. If you want early access, [join the waitlist](/courses/claude-for-knowledge-workers).*`
  },
  {
    slug: 'ive-filmed-a-thousand-fights',
    title: 'I\'ve Filmed a Thousand Fights. Here\'s What I Learned.',
    subtitle: 'Why I built Pause—a communication translator for conflict',
    date: '2025-12-22',
    category: 'essay',
    readTime: '8 min read',
    excerpt: 'For twenty years, I\'ve pointed a camera at people in conflict. After a while, you start to see it: they\'re saying the same thing. They just can\'t hear each other.',
    content: `# I've Filmed a Thousand Fights. Here's What I Learned.

*By Eddie Belaval*
*Founder, Pause*

---

For twenty years, I've pointed a camera at people in conflict.

Teenagers screaming at their parents. Couples on the edge of divorce. Business partners dissolving decades of friendship over money. Strangers forced into proximity, grinding against each other until something breaks.

I've worked on shows you've seen. *90 Day Fiancé*—which is, let's be honest, nothing but fighting. *The First 48*—where the stakes are life and death. *Teen Mom*—where kids are raising kids and nobody taught anyone how to talk. Documentary after documentary, reality show after reality show. Always conflict. Always the same patterns underneath.

After a while, you start to see it.

---

## The Pattern

Here's what happens in almost every fight I've ever filmed:

**Person A says something.**

They're trying to express a feeling. A need. A fear. Something real and vulnerable underneath.

**Person B hears something else entirely.**

Not what was said. What they *think* was said. Filtered through their own history, their own triggers, their own defenses.

**Then it escalates.**

Attack. Defend. Counterattack. Withdraw. The same loop, over and over, until someone shuts down or someone walks away or—in the worst cases—someone gets hurt.

And the whole time, I'm behind the camera thinking: *They're saying the same thing. They just can't hear each other.*

---

## The Space Between

There's a gap between what you say and what they hear.

That gap is where relationships go to die. Not because people don't love each other. Not because they don't want to work it out. But because the noise—the history, the hurt, the patterns—drowns out the signal.

I've watched it happen hundreds of times. And I've lived it myself.

My own relationship has dynamics that don't allow for constructive communication. We love each other, but when things get heated, we can't hear each other. We need someone to stand in the middle. A translator. Not a therapist—we're not broken. Not a judge—nobody needs to be right. Just someone to catch what I'm actually trying to say and deliver it in a way she can actually hear.

That person doesn't exist.

Or didn't.

---

## Why I Built Pause

I built Pause because I've spent two decades watching people fail to communicate—and I finally understood why.

It's not that people are bad at talking. It's that conflict creates noise. Emotional static. And the more you care, the louder the static gets.

What people need in that moment isn't advice. It's not someone telling them what they're doing wrong. It's not a quiz or a prompt or a daily relationship tip.

What they need is a translator.

Someone to receive the raw, messy, emotional thing they're trying to say—and find the signal underneath. The actual feeling. The actual need. The actual request.

Then confirm it: *"Is this what you mean?"*

And only then—only when the speaker says yes—deliver it to the other person in a form they can actually hear.

That's Pause.

---

## Not Therapy. Not Judgment. Translation.

I want to be clear about what this is and isn't.

Pause is not therapy. I'm not a therapist. The app doesn't diagnose or treat or heal. If you need therapy, you should get therapy—and Pause will help you find it.

Pause is not a judge. It doesn't decide who's right. It doesn't take sides. It doesn't have opinions about your relationship.

Pause is a translator.

It sits in the space between what you said and what they heard. It cleans the signal. It slows things down. And it makes sure that if your relationship fails, it won't be because you couldn't understand each other.

---

## Who This Is For

This is for me.

It's for the version of me who's in the middle of a fight with someone I love, and I can feel myself being misunderstood, and I can feel myself misunderstanding, and I just want someone to help us *hear each other* before it's too late.

It's for every person who's ever said something and watched it land wrong.

Every person who's ever been accused of saying something they didn't say.

Every person who's ever walked away from a conversation thinking: *Why can't they just understand what I'm trying to tell them?*

It's for couples. But also friends. Business partners. Families. Anyone who needs to say something important and needs to be heard.

---

## The Name

We called it Pause because that's the whole intervention.

Not speed. Not efficiency. Not "communicate better in 5 minutes a day."

A pause.

The space to breathe. The space to be understood before you respond. The space between what you said and what they heard.

That's where we live.

---

## What Happens Next

I'm building this now. The landing page is up at [justpause.partners](https://justpause.partners). The product requirements are written. The technical design is done. The research is solid—built on Gottman's Four Horsemen, Marshall Rosenberg's Nonviolent Communication, and the same ethical standards professional mediators use.

Now I ship.

If you've ever felt unheard—if you've ever watched a conversation spiral because nobody could find the signal underneath the noise—I'm building this for you.

Get on the waitlist. Be one of the first to try it.

Because everyone deserves to be heard.

---

*Eddie Belaval is a documentary filmmaker, cinematographer, and the founder of ID8Labs. He's spent 20+ years working on shows including 90 Day Fiancé, The First 48, High on the Hog (Netflix), Teen Mom, and MTV productions. Pause is his first product.*

---

**[justpause.partners](https://justpause.partners)**

*Slower is the point.*`
  },
  {
    slug: 'building-llc-ops',
    title: 'Building LLC Ops: How We Created a 9-Agent AI Operations Team',
    subtitle: 'A case study in building domain-specific AI agents that actually work',
    date: '2025-12-21',
    category: 'essay',
    readTime: '12 min read',
    excerpt: 'Running an LLC without overhead means no CFO, no CPA on retainer, no compliance team. You\'re wearing all the hats while building the business. So I built a 9-agent AI operations team that provides PhD-level guidance across tax strategy, compliance, asset protection, and financial management.',
    content: `# Building LLC Ops: How We Created a 9-Agent AI Operations Team

*A case study in building domain-specific AI agents that actually work*

---

## The Problem: Running a Business While Building One

When I decided to form ID8Labs LLC as a Florida single-member LLC, I faced the same dilemma every founder encounters: you need expert knowledge across multiple domains (tax strategy, compliance, legal, finance) but you can't afford—or don't want—the overhead of hiring specialists.

The traditional options:
- **CPA on retainer**: $2,000-5,000/year for someone who doesn't know your specific business
- **DIY learning**: Weeks of research with high risk of missing critical details
- **Wing it**: Hope nothing important slips through the cracks

None of these felt right. I wanted something that combined:
- Expert-level knowledge (not junior accountant level)
- Always available (not waiting for appointments)
- Knows my specific situation (not generic advice)
- Proactive (surfaces issues before they become problems)
- Teaching-oriented (builds my proficiency over time)

So I built it.

---

## What We Built: 9 Expert AI Agents

Not a chatbot. Not a search wrapper. A purpose-built operations platform with nine specialized agents, each trained to provide PhD-level guidance in their domain:

| Agent | Role | What They Actually Do |
|-------|------|----------------------|
| **Sentinel** | Compliance Radar | Tracks every deadline 90 days out, flags urgency levels, tells you exactly what to do |
| **Ledger** | Accounting Strategist | Categorizes expenses for maximum deductions, thinks like a tax manager |
| **Filer** | Procedures Expert | Walks through every filing step-by-step with exact URLs, costs, and what to expect |
| **Advisor** | Legal/Tax Counsel | Answers LLC questions with confidence levels and clear "when to call a CPA" guidance |
| **Strategist** | Tax Optimizer | S-Corp analysis, QBI deductions, retirement accounts, R&D credits—the advanced stuff |
| **Guardian** | Risk & Protection | Insurance adequacy, contract risks, asset protection, audit exposure |
| **Comptroller** | Financial Officer | Cash flow, reserves, banking optimization, capital allocation |
| **Monitor** | Regulatory Tracker | Watches for law changes, new requirements, Florida-specific updates |
| **Mentor** | Teaching Partner | Builds your proficiency over time with 4-level learning track |

---

## How We Built It: The Technical Architecture

### Claude Code Skills

The system lives as a Claude Code skill at \`~/.claude/skills/llc-ops/\`. This means the agents are available globally—in any terminal session, any project, anywhere Claude Code runs.

\`\`\`
~/.claude/skills/llc-ops/
├── SKILL.md (25KB)      # Agent definitions, dispatch rules, behaviors
├── CLAUDE.md (9KB)      # Entity info, operating principles
└── references/          # Deep knowledge base
    ├── florida-llc-compliance.md
    ├── expense-categories.md
    ├── filing-procedures.md
    ├── tax-optimization-strategies.md
    ├── asset-protection-guide.md
    ├── financial-management.md
    ├── form-library.md
    └── audit-defense.md
\`\`\`

**Total: ~128KB of structured expert knowledge.**

### Agent Design Principles

Each agent follows a consistent pattern:

1. **Clear Scope**: One job, done extremely well
2. **Defined Behavior**: Explicit steps for how they respond
3. **Expertise Level**: Not junior—senior practitioner level
4. **Confidence Signals**: They tell you when they're uncertain
5. **Action Orientation**: Every response leads to what to do next

---

## Why 9 Agents, Not 1?

### The Evolution

We started with 4 agents: Sentinel, Ledger, Filer, Advisor. Basic compliance tracking.

But gap analysis revealed the system was **reactive**—it tracked what happened but didn't help you think ahead. Missing:

- **Proactive tax planning** (save thousands with the right strategy)
- **Risk anticipation** (prevent problems, don't just react)
- **Financial health monitoring** (CFO-level oversight)
- **Regulatory tracking** (don't miss changes in the law)
- **Learning acceleration** (build expertise over time)

So we added Strategist, Guardian, Comptroller, Monitor, and Mentor.

### Why Specialization Matters

A generalist agent that "knows about LLCs" gives you:
> "You should keep good records and file your taxes on time."

The Strategist agent gives you:
> "Your S-Corp break-even is approximately $50,000 in net income after paying yourself reasonable salary. At your projected income of $80,000, electing S-Corp would save you approximately $4,590 in self-employment taxes. However, you'll add ~$500/year in payroll complexity. Net benefit: ~$4,000/year. Recommendation: Worth it if income stays above $60k consistently."

That's the difference between a search result and an expert consultation.

---

## The Notion Integration: Live Operations Hub

The agents needed a place to store and track operational data. We built an LLC Ops Hub in Notion with 5 interconnected pages:

### 1. LLC Vitals
Entity information, registered agent details, banking, key contacts.

### 2. Compliance Calendar
All critical deadlines with costs and consequences, 2025/2026 calendars with checkboxes, reminder settings.

### 3. Expense Tracker
Categories matching tax deduction rules, monthly logs with running totals, quarterly and year-end checklists.

### 4. Document Vault
Formation documents tracking, financial documents, operating agreement provisions.

### 5. Agent Prompts
Portable prompts for each agent, usable anywhere.

The Notion MCP integration allows Claude to read and write directly to these pages, making the agents live participants in operations.

---

## What Makes This Different

### vs. Generic AI

| Generic AI | LLC Ops Agents |
|------------|----------------|
| "I can help with tax questions" | Specific calculations with your numbers |
| "Keep good records" | Exactly what to keep, organized by category |
| "File on time" | 90-day advance warning with action steps |
| "Consult a professional" | Expert guidance with clear "call CPA now" flags |

### vs. Hiring Professionals

| Traditional | LLC Ops |
|-------------|---------|
| $2-5k/year CPA retainer | $0 additional (Claude subscription) |
| Wait for appointments | Instant, 24/7 |
| They don't know your business | Knows entity details, patterns, history |
| Reactive (you ask) | Proactive (surfaces issues) |

---

## The Bottom Line

Running a solo LLC doesn't mean running it alone. With the right AI architecture—specialized agents, deep knowledge, proactive monitoring, and live integration—you can have an operations team that would cost $50k+/year in human salaries.

The real question isn't whether AI can help run a business. It's whether you've built the system that lets it help effectively.

We built that system. And now it runs ID8Labs.

---

*Built with Claude Code. December 2024.*

*ID8Labs LLC — Professional tools for the AI era.*`
  },
  {
    slug: 'building-pipeline-cli',
    title: 'Building Pipeline CLI: A Visual Dashboard for Idea Lifecycle Management',
    subtitle: 'When your project portfolio needs a control room, not a spreadsheet',
    date: '2025-12-21',
    category: 'release',
    readTime: '6 min read',
    excerpt: 'I had 12 projects in various states of decay. Markdown files everywhere. No visibility into what needed attention. So I built a terminal dashboard that makes the invisible visible—decay bars, sparklines, health indicators, all updating live.',
    content: `# Building Pipeline CLI: A Visual Dashboard for Idea Lifecycle Management

*When your project portfolio needs a control room, not a spreadsheet.*

---

I had 12 projects in various states of decay. Some were thriving. Some were dying. Most were somewhere in between, and I had no idea which was which.

The data existed—markdown files with YAML frontmatter tracking state, activity, blockers. But opening files one by one? That's not visibility. That's archaeology.

I needed a dashboard. Not a web app. A terminal tool I could run from anywhere, glance at in two seconds, and know exactly what needed attention.

So I built Pipeline CLI.

---

## The Problem with Project Tracking

Most project management tools optimize for the wrong things:

- **Spreadsheets** give you data but no insight
- **Kanban boards** show movement but not momentum
- **To-do apps** track tasks but miss the bigger picture

What I needed was something that treated my project portfolio like a living system—one where projects decay without attention, where some stages move faster than others, and where the visual display tells me what matters before I ask.

---

## What Pipeline CLI Does

Run \`id8\` from anywhere. Get this:

\`\`\`
╭─────────────────────────── ID8 PIPELINE ───────────────────────────╮
│                                                                     │
│  ╭──── Health ────╮  ╭──────────── Alerts ──────────────╮          │
│  │ 🟢 3 Healthy   │  │ 🔴 deepstack: 85% decay          │          │
│  │ 🟡 1 Warning   │  │ 🟡 composer: blocked on API key  │          │
│  │ 🔴 1 Critical  │  ╰──────────────────────────────────╯          │
│  │ ❄️ 2 Ice       │                                                │
│  ╰────────────────╯                                                 │
│                                                                     │
│  ╭───────────────── Active Projects ─────────────────────╮         │
│  │ PROJECT    │ STATE    │ DECAY        │ HEALTH │ DAYS  │         │
│  ├────────────┼──────────┼──────────────┼────────┼───────┤         │
│  │ Composer   │ BUILDING │ ████░░░░ 45% │ 🟢     │  23   │         │
│  │ DeepStack  │ GROWING  │ ███████░ 85% │ 🔴     │  12   │         │
│  │ Pipeline   │ OPERATING│ ─────────    │ 🟢     │  45   │         │
│  ╰────────────────────────────────────────────────────────╯         │
│                                                                     │
│  ╭─── Stage Distribution ───╮  ╭──── Activity (7d) ────╮           │
│  │ CAPTURED    ░░░░░░░░ 0   │  │ ▁▂▄▆█▇▅▃ 23 actions   │           │
│  │ VALIDATING  ██░░░░░░ 1   │  │                       │           │
│  │ BUILDING    ████░░░░ 2   │  │ Most: Composer (12)   │           │
│  │ OPERATING   ██░░░░░░ 1   │  │ Stalled: Lexicon (0)  │           │
│  ╰──────────────────────────╯  ╰───────────────────────╯           │
╰─────────────────────────────────────────────────────────────────────╯
\`\`\`

One glance. Full picture. No clicking through tabs.

---

## The Core Concepts

### Decay Mechanics

Every project decays. Not because it's dying—because attention is finite.

Different stages have different decay windows:
- **CAPTURED** (raw ideas): 14 days before they rot
- **VALIDATING**: 7 days to prove or kill
- **BUILDING**: 90 days of active development
- **OPERATING**: 365 days of runway

The decay bar shows you where each project stands. Green means healthy. Yellow means pay attention. Red means act now or accept the loss.

### Health Indicators

Visual at a glance:
- 🟢 Healthy: 0-50% decay
- 🟡 Warning: 50-85% decay
- 🔴 Critical: 85-100% decay
- ❄️ Ice: Frozen (intentionally paused)

### Sparklines

Activity over time, compressed into a single line: \`▁▂▄▆█▇▅\`

You can see momentum at a glance. Rising activity? Project's alive. Flatline? Something's wrong.

---

## The Technical Stack

**Python + Rich**. That's it.

Rich handles the terminal UI—tables, panels, colors, live updating. It's the library that makes terminal apps look like they belong in a control room.

**Click** for the CLI framework. Clean command structure, help text, argument parsing.

**Pydantic** for data models. Type-safe, validated, with sensible defaults.

**python-frontmatter** for parsing the markdown files where project data lives.

The whole thing is ~1500 lines of Python. Installs globally with \`pip install id8-cli\`. Works on any terminal.

---

## The Commands

| Command | What it does |
|---------|--------------|
| \`id8\` | Live dashboard (default) |
| \`id8 pulse\` | Quick 2-minute check |
| \`id8 list\` | Simple table view |
| \`id8 show <slug>\` | Deep dive on one project |
| \`id8 new <slug> <name>\` | Create project |
| \`id8 log <slug> <note>\` | Log activity |
| \`id8 update <slug> <STATE>\` | Transition state |
| \`id8 ice <slug>\` | Freeze project |
| \`id8 thaw <slug>\` | Unfreeze project |
| \`id8 kill <slug>\` | Kill project |

The live dashboard updates every 5 seconds. Press 'q' to quit. That's the interface.

---

## Why Terminal?

Three reasons:

**1. Speed.** No browser tabs. No loading spinners. Run \`id8\`, see everything, move on.

**2. Availability.** Works over SSH. Works in tmux. Works while you're debugging something else. The dashboard is always one command away.

**3. Focus.** Terminals don't have notifications, sidebars, or suggested content. You look at your projects. That's it.

Web dashboards are great for collaboration. But this is a solo builder's tool. Different constraints.

---

## What I Learned Building It

**Build for the actual problem.** I didn't need project management. I needed visibility. The dashboard is read-heavy, write-light. That's intentional.

**Decay mechanics change behavior.** When you see a project at 85% decay, you make a decision. Work on it or kill it. The visual pressure prevents the slow death of neglect.

**Sparklines are magic.** Seven characters can show you a week of momentum. More information-dense than any chart.

**Rich is incredible.** Seriously. If you're building anything terminal-based, start there.

---

## The Data Model

Projects live in \`~/.id8labs/projects/\` as markdown files:

\`\`\`yaml
---
slug: composer
name: ID8 Composer
state: BUILDING
created: 2024-09-15
last_activity: 2025-12-20
---

# One-liner
AI-assisted writing with selective knowledge base management.

# Blockers
- None

# Activity Log
- 2025-12-20: Shipped v0.8.1
- 2025-12-19: Fixed auth bug
\`\`\`

Simple. Portable. Version-controllable. No database required.

---

## What's Next

The current version works. But there's obvious room:

- **Git integration**: Auto-log commits as activity
- **Notifications**: Alert when projects hit critical decay
- **Team mode**: Aggregate multiple portfolios
- **API**: Pipe data into other tools

But those are features. Right now, Pipeline CLI is a tool that solves a specific problem I have today.

---

## Build Something Like This?

Here's the thing: every workflow has invisible friction. Stuff you click through. Tabs you switch between. Mental overhead you've normalized.

Pipeline CLI exists because I was tired of not knowing what needed attention across a dozen projects. The solution is a visual dashboard with decay mechanics and live updating.

Your problem is different. Your solution will be too.

**But the pattern is the same: take something invisible and make it visible. Take something scattered and centralize it. Take something manual and automate it.**

CLI dashboards. AI orchestration. Production tools. Browser automation. If you've got a workflow that's held together by duct tape and browser tabs, I can probably build something better.

**Reach out on [X @eddiebe](https://x.com/eddiebe) and let's talk.**

---

*Stack: Python 3.10+, Rich, Click, Pydantic*
*Install: \`pip install id8-cli\`*
*Platform: macOS, Linux, Windows*
*Built with: Claude Code*

---

*Published December 21, 2025*`
  },
  {
    slug: 'deepstack-v2-5-release',
    title: 'DeepStack v2.5: AI-Native Trading Research Platform',
    subtitle: 'Your biggest market risk is you',
    date: '2025-12-17',
    category: 'release',
    readTime: '4 min read',
    excerpt: 'Most trading tools assume the problem is information—more data, faster charts, better signals. DeepStack starts from a different premise: the patterns that blow up portfolios aren\'t in the market. They\'re in the trader.',
    content: `# DeepStack v2.5: AI-Native Trading Research Platform

*Your biggest market risk is you.*

---

Most trading tools assume the problem is information—more data, faster charts, better signals. DeepStack starts from a different premise.

The patterns that blow up portfolios aren't in the market. They're in the trader.

---

## The Core Idea

DeepStack wraps institutional-grade trading infrastructure around what we call the **Emotional Firewall**—a system that recognizes destructive patterns (revenge trading after losses, overtrading during streaks, late-night decisions) and intervenes before damage happens.

The platform doesn't just block bad trades. It learns your specific patterns—when you win, when you lose, what emotional states correlate with which outcomes—then surfaces that intelligence when it matters.

---

## What's Inside

### Thesis-Driven Trading
Every position ties back to a documented hypothesis with real-time validation scoring. No more trading on vibes. Write down what you believe and why, then see if you were right.

### 6 AI Personas
From Value Investor to Risk Manager, each with distinct analytical frameworks. Ask your question from multiple perspectives, get different insights.

### Full Options Chain
Greeks, Black-Scholes pricing, and a 12-template strategy builder. Professional-grade options analysis without the Bloomberg terminal price tag.

### Paper Trading → IBKR Integration
Prove the thesis before real capital. Start with paper trading, graduate to Interactive Brokers when you're ready.

---

## The Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind
- **Backend**: FastAPI, Python
- **Database**: Supabase (PostgreSQL)
- **AI**: Claude-powered analysis with 30+ tools
- **Market Data**: Alpaca, Polygon

50k+ lines. 262 tests. Production-ready.

---

## What It's Not

DeepStack won't execute trades for you. It won't tell you what to buy. It won't pretend it knows the future.

It's a research tool that respects the fact that you're a human being making decisions under uncertainty—and that your biggest edge might be knowing when *not* to act.

---

## Try It

[deepstack.trade](https://deepstack.trade)

Free tier available. Prove it's valuable before you pay.

---

*Released December 17, 2025*`
  },
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
    heroImage: '/essays/memmon-hero.webp',
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

/**
 * Get all essays - merges inline essays with MDX file-based essays
 * MDX essays take precedence (newer content model)
 */
function getMergedEssays(): Essay[] {
  const mdxEssays = getMdxEssays()
  const mdxSlugs = new Set(mdxEssays.map(e => e.slug))

  // Filter out inline essays that have MDX versions (MDX takes precedence)
  const uniqueInlineEssays = essays.filter(e => !mdxSlugs.has(e.slug))

  // Merge and sort by date
  const allEssays = [...mdxEssays, ...uniqueInlineEssays]
  return allEssays.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getEssayBySlug(slug: string): Essay | undefined {
  return getMergedEssays().find(essay => essay.slug === slug)
}

export function getEssaysByCategory(category: Essay['category']): Essay[] {
  return getMergedEssays().filter(essay => essay.category === category)
}

export function getAllEssays(): Essay[] {
  return getMergedEssays()
}
