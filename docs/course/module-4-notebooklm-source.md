# Claude Code for Knowledge Workers — Module 4: Research & Analysis

**Course by Eddie Belaval, Founder of ID8Labs**
**Website:** id8labs.app/courses

---

## Introduction

Welcome back. You've learned to process files at scale in Module 2 and write with Claude as a partner in Module 3. You can organize invoices, turn voice notes into drafts, and edit with precision.

Now we're tackling research — one of the most time-consuming parts of knowledge work.

Think about how you research today. You open a dozen browser tabs. You skim articles, copy quotes into notes, lose track of where you found things. You spend hours gathering information, then more hours trying to make sense of it all.

Claude Code changes this fundamentally. It doesn't just help you find information — it helps you synthesize it. The shift is from "help me search" to "research this topic and give me actionable insights."

The delegation formula still applies: Context + Outcome + Location. But with research, context means what you're trying to understand, outcome means the format you need, and location is where Claude should save the results.

---

## What Claude Can Research

Before we dive into workflows, let's be clear about Claude's research capabilities.

### Web Research

Claude Code can search the web, read websites, and synthesize information from multiple sources. When connected to tools like Perplexity or Firecrawl, it becomes even more powerful.

What it does well:
- Finding current information on companies, people, and topics
- Comparing products, services, or approaches
- Gathering data from multiple sources into one place
- Fact-checking and verification
- Tracking down specific information you vaguely remember

What it struggles with:
- Paywalled content (it can't log into your subscriptions)
- Very recent news (there can be delays)
- Proprietary databases or internal company information
- Information that simply doesn't exist online

### Document Research

Claude can also research across your own files — something we touched on in Module 2's semantic search section. This is powerful for:
- Finding relevant past work
- Synthesizing notes from multiple meetings
- Extracting insights from interview transcripts
- Reviewing contracts or agreements for specific terms

---

## The Research Briefing Workflow

This is the core research workflow: turning a question into an actionable briefing.

### The Basic Pattern

**The delegation:**
> "Research [topic/company/person]. I need to understand [specific aspects]. Create a briefing that covers: [list of sections]. Include sources for key claims. Save to ~/Documents/Research/[filename].md"

**What happens:** Claude searches, reads, synthesizes, and organizes — delivering a structured document you can actually use.

### Eddie's Real Example: Cast Research

> "I produce reality television. Before filming, I need to understand each cast member — their background, their social media presence, any public controversies, their relationships. Used to take a researcher half a day per person.
>
> Now I give Claude their names and basic info: 'Research these 10 cast members. For each one, find: social media presence and follower counts, any news coverage or articles about them, relationship history if public, potential storylines or drama, and red flags we should know about. Create a briefing for each person. Save to ~/Documents/CastBriefings/.'
>
> Ten detailed briefings in 15 minutes. My team reviews and adds context, but the grunt work is done."

---

## Competitive Analysis

One of the highest-value research applications: understanding your competition.

### The Company Deep Dive

**The delegation:**
> "Research [competitor company]. I want to understand: their product/service offering, their pricing (if public), their target customer, their key differentiators, recent news or announcements, and their apparent strategy. Create a one-page briefing. Include sources."

**What happens:** Claude gathers public information and synthesizes it into something actionable.

### The Landscape Overview

**The delegation:**
> "I'm entering the [industry/market]. Research the top 5-10 players. For each one, give me: company name, what they offer, approximate size/funding, target customer, and one-line positioning. Then give me your analysis: what gaps do you see? What's everyone doing the same? What's underserved?"

**What happens:** Instead of spending a week on market research, you get a structured overview in minutes.

### Eddie's Competitive Analysis Story

> "When I was building ID8Labs, I needed to understand the AI tools landscape. Not just the big players — the niche tools, the emerging competitors, the ones targeting similar customers.
>
> I told Claude: 'Research AI tools for non-technical knowledge workers. Focus on writing assistants, research tools, and automation platforms. For each one, tell me: what it does, who it's for, pricing, and what makes it different. Organize by category. Note any patterns you see.'
>
> Took 20 minutes. Saved me a week of browsing and note-taking. The analysis wasn't perfect — I had to verify some details — but the structure was there. I could think strategically instead of drowning in tabs."

---

## Market Research

Understanding your market, your customers, and trends in your industry.

### The Trend Report

**The delegation:**
> "Research current trends in [industry/topic]. I want to understand: what's changing, what's emerging, what's declining, and what experts are predicting. Focus on the last 12 months. Create a trend report with specific examples and sources."

### The Customer Research

**The delegation:**
> "Research [customer segment]. I want to understand: their typical challenges, what solutions they currently use, what they complain about, what they wish existed, and where they spend time online. Synthesize this into a customer profile."

### The "What Do People Think About X" Query

**The delegation:**
> "Research public sentiment about [product/company/topic]. Look at reviews, social media discussions, forum posts, and articles. Summarize: what do people love, what do they hate, what do they wish was different? Include specific quotes where relevant."

---

## Synthesizing Long Documents

Claude excels at turning long, complex documents into actionable summaries.

### The Contract Review

**The delegation:**
> "Read this contract at [file path]. Extract: key obligations for each party, important dates and deadlines, termination conditions, liability clauses, and anything unusual or concerning. Present as a summary I can review quickly."

### The Report Digest

**The delegation:**
> "Read this 50-page report at [file path]. Give me: the main conclusions, the key data points, the recommendations, and anything surprising or controversial. Keep it under 2 pages."

### The Meeting Notes Synthesis

**The delegation:**
> "Read all files in ~/Documents/MeetingNotes/ProjectX/. These are notes from multiple meetings about the same project. Synthesize them into: key decisions made, action items (and who owns them), open questions, and the current status of the project."

Eddie's document synthesis tip:

> "I get a lot of industry reports. PDFs, 50-100 pages each. Used to sit unread in my Downloads folder. Now I tell Claude: 'Read this report. Give me the 10 things I need to know, and tell me if there's anything that directly affects my business.' Takes 2 minutes. I actually read reports now."

---

## The Research + Action Workflow

Research is only valuable if it leads to action. Here's how to chain research into next steps.

### Research → Recommendations

**The delegation:**
> "Research [topic]. Based on what you find, give me 3-5 specific recommendations for how I should [action]. Explain your reasoning for each."

### Research → Comparison Matrix

**The delegation:**
> "Research these 5 options: [list]. Compare them across these criteria: [list criteria]. Create a comparison table. Then give me your recommendation and why."

### Research → Draft Communication

**The delegation:**
> "Research [company/person]. Based on what you learn, draft an outreach email that references something specific about them and explains why [my offer] would be relevant to them."

---

## Verification and Fact-Checking

Claude can make mistakes. Sources can be wrong. Verification matters.

### The Fact-Check Request

**The delegation:**
> "Here's a claim I found: [claim]. Verify this. Find multiple sources that confirm or contradict it. Tell me how confident I should be in this information."

### The Source Check

**The delegation:**
> "I'm using this statistic in a presentation: [statistic]. Find the original source. Check if it's still current. Find any contradicting data."

### Eddie's Verification Rule

> "I never publish research without verification on key claims. My rule: if a number or fact is going to influence a decision, I tell Claude: 'Find me a second source for this.' If it can't, I'm more cautious. This has saved me from embarrassing mistakes multiple times."

---

## Your Challenge: The Competitive Briefing

This week, complete a real research project:

1. **Pick a research target** — a competitor, a potential partner, a market you're curious about, or a trend in your industry
2. **Craft your delegation:**
   > "Research [target]. I want to understand: [list 3-5 specific aspects]. Create a briefing that's actionable — tell me what I need to know and what I should do with this information. Include sources for key claims. Save to ~/Documents/Research/[filename].md"
3. **Review the output** — What's useful? What needs verification? What's missing?
4. **Add a follow-up** — Ask Claude to go deeper on one aspect, or to turn the research into a specific action item

**Success looks like:**
- You have a structured briefing on something relevant to your work
- You saved hours compared to manual research
- You know which claims need verification
- You can actually use this information

---

## Key Takeaways

1. **Claude researches and synthesizes.** Not just finding information — turning it into actionable briefings. The shift is from "help me search" to "research this and tell me what I need to know."

2. **Competitive analysis in minutes.** Company deep dives, landscape overviews, market positioning — work that used to take days now takes minutes.

3. **Your files are a research database.** Semantic search across your own documents. Meeting notes, contracts, past work — all searchable by meaning.

4. **Research → Action.** Don't stop at information. Ask for recommendations, comparisons, or draft communications based on what Claude finds.

5. **Verification matters.** Claude can be wrong. Sources can be outdated. Build verification into your workflow for anything important.

---

## What's Next

You can now research like a team of analysts. Competitive intelligence, market research, document synthesis — all delegated.

In **Module 5: Building Workflows**, we'll tie everything together. You'll learn to create reusable templates, chain delegations together, and build your personal operating system with Claude.

Find all course materials at **id8labs.app/courses**.

---

## Quick Reference

### Research Briefing Template

```
"Research [topic/company/person].
I want to understand: [specific aspects].
Create a briefing covering: [sections].
Include sources for key claims.
Save to ~/Documents/Research/[filename].md"
```

### Research Patterns

| Research Type | Delegation Pattern |
|--------------|-------------------|
| Competitive analysis | "Research [competitor]. Cover: offering, pricing, target customer, differentiators, recent news. One-page briefing with sources." |
| Market landscape | "Research top players in [market]. For each: what they offer, size, target customer, positioning. Then analyze gaps and patterns." |
| Trend report | "Research trends in [industry]. What's changing, emerging, declining, predicted. Last 12 months. Include examples and sources." |
| Document synthesis | "Read [files]. Extract: main conclusions, key data, recommendations, surprises. Keep under [length]." |
| Fact-checking | "Verify this claim: [claim]. Find multiple sources. Tell me confidence level." |

### Research + Action Patterns

| Goal | Delegation Pattern |
|------|-------------------|
| Recommendations | "Research [topic]. Give me 3-5 specific recommendations for [action]. Explain reasoning." |
| Comparison | "Research [options]. Compare across [criteria]. Create table. Give recommendation." |
| Outreach draft | "Research [target]. Draft outreach referencing something specific. Explain relevance of [offer]." |
