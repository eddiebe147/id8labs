# Claude Code for Knowledge Workers — Module 5: Building Workflows

**Course by Eddie Belaval, Founder of ID8Labs**
**Website:** id8labs.app/courses

---

## Introduction

Welcome to the final module. You've come a long way.

In Module 0, you learned the mental model — delegation, not conversation. In Module 1, you built confidence with quick wins. Module 2 taught you file processing at scale. Module 3 turned you into a writing collaborator. Module 4 made you a research machine.

Now we tie it all together.

This module is about systems. Not one-off delegations, but repeatable workflows. The goal: build your personal operating system with Claude — a set of patterns, templates, and habits that compound over time.

The shift in this module is from "I can delegate tasks" to "I have systems that run automatically."

---

## The Problem With One-Off Delegations

You've probably noticed something by now. Every time you delegate, you're crafting a new prompt. You're remembering the formula. You're thinking about context, outcome, location.

That's fine for occasional tasks. But for things you do regularly? It's inefficient.

Think about your weekly or monthly work:
- Processing invoices or receipts
- Generating reports
- Preparing for meetings
- Sending similar emails
- Reviewing documents
- Updating project status

Each of these happens over and over. And each time, you're starting from scratch.

Eddie's realization:

> "I was delegating the same tasks repeatedly, slightly differently each time. Monday: 'Summarize these meeting notes.' Wednesday: 'Summarize these other meeting notes.' Friday: 'Summarize these meeting notes too.' Same pattern, different inputs. I was wasting time re-explaining what I wanted. That's when I realized: I need templates, not just delegations."

---

## Workflow Building Blocks

Before we build workflows, let's understand the components.

### 1. Templates

A template is a reusable delegation pattern. Instead of crafting a new prompt each time, you fill in the blanks.

**Example — Meeting Notes Template:**
```
"Read the meeting notes at [FILE_PATH].
Extract:
- Key decisions made
- Action items with owners
- Open questions
- Next steps

Format as a clean summary.
Save to ~/Documents/MeetingsSummaries/[DATE]-[MEETING_NAME].md"
```

You use the same structure every time. Only the file path, date, and meeting name change.

### 2. Triggers

A trigger is what starts a workflow. Common triggers:
- Time-based: "Every Monday morning..."
- Event-based: "When a new file appears in Downloads..."
- Manual: "When I say 'process invoices'..."

Claude Code doesn't run automatically in the background (yet), but you can build habits around triggers: "Every Friday at 4pm, I run my weekly review workflow."

### 3. Chains

A chain is multiple delegations connected together. The output of one becomes the input of the next.

**Example — Research-to-Outreach Chain:**
1. "Research [company]. Create a briefing. Save to ~/temp/research.md"
2. "Read ~/temp/research.md. Based on this research, draft a personalized outreach email. Save to ~/temp/outreach-draft.md"
3. "Read ~/temp/outreach-draft.md. Make it more concise. Keep the personalization. Final version to ~/Outreach/[company]-email.md"

Three delegations, one workflow.

### 4. Context Files

A context file is persistent information Claude can reference. Instead of re-explaining who you are, what you do, or how you like things done, you point Claude to a file.

**Example — Voice Profile:**
```
"Read my voice profile at ~/Documents/my-writing-voice.md.
Then write [whatever] in my natural style."
```

**Example — Business Context:**
```
"Read my business context at ~/Documents/id8labs-context.md.
Then [whatever task] keeping my business goals in mind."
```

---

## Building Your First Workflow

Let's build a complete workflow together. We'll use invoice processing as the example — something many knowledge workers deal with.

### Step 1: Identify the Recurring Task

**What I do regularly:** Process monthly invoices and receipts for my LLC.

**Current process (manual):**
1. Gather all receipts from Downloads, email attachments, photos
2. Read each one to extract vendor, amount, date, category
3. Rename files consistently
4. Move to organized folder structure
5. Update tracking spreadsheet

**Time spent manually:** 1-2 hours per month

### Step 2: Create the Template

```
"Process invoices and receipts for [MONTH] [YEAR].

1. Read all PDF and image files in ~/Downloads/ that look like invoices or receipts
2. For each document, extract:
   - Vendor name
   - Amount
   - Date
   - Category (Office, Software, Services, Travel, Meals, Other)
3. Rename each file to: YYYY-MM-DD_VendorName_$Amount.pdf
4. Move to ~/Documents/LLC/Expenses/[YEAR]/[MONTH]/
5. Create a summary report at ~/Documents/LLC/Expenses/[YEAR]/[MONTH]/summary.md with:
   - Total expenses by category
   - List of all transactions
   - Any receipts that couldn't be processed (and why)

Start now."
```

### Step 3: Test and Refine

Run the workflow. Watch what happens. Note what works and what doesn't.

Common refinements:
- "Also check ~/Desktop/ for receipts"
- "If the date isn't clear, use today's date"
- "For category, if it's a restaurant, always use 'Meals'"
- "If the amount is over $500, flag it in the summary"

### Step 4: Save the Template

Create a file at `~/Documents/Workflows/invoice-processing.md`:

```markdown
# Monthly Invoice Processing Workflow

## When to run
First week of each month, for the previous month.

## The delegation
[paste your refined template here]

## Notes
- Check email attachments first and download to ~/Downloads/
- Make sure Venmo/PayPal transaction screenshots are included
- Review summary before filing taxes
```

### Step 5: Build the Habit

Now it's a system:
- First Monday of each month: Open Claude Code, open your workflow file, run the delegation
- 10 minutes instead of 2 hours

---

## Six Workflows Every Knowledge Worker Needs

Here are six high-value workflows to build. Customize these for your specific situation.

### 1. Weekly Review

**Purpose:** Stay on top of what happened and plan what's next.

**Template:**
```
"Run my weekly review.

1. Read all files created or modified this week in:
   - ~/Documents/Notes/
   - ~/Documents/Meetings/
   - ~/Documents/Projects/

2. Create a weekly summary:
   - What I accomplished
   - What's in progress
   - What's blocked
   - What I should focus on next week

3. Identify any follow-ups I committed to but haven't done yet

Save to ~/Documents/Reviews/weekly-[DATE].md"
```

**Trigger:** Every Friday at 4pm

### 2. Meeting Prep

**Purpose:** Walk into every meeting prepared.

**Template:**
```
"Prepare me for my meeting with [PERSON/TEAM] about [TOPIC].

1. Find any relevant notes, documents, or previous meeting summaries about this topic
2. Create a prep document with:
   - Background/context
   - Key points I should raise
   - Questions I should ask
   - Potential objections or concerns
   - My goals for this meeting

Save to ~/Documents/Meetings/prep-[DATE]-[MEETING_NAME].md"
```

**Trigger:** 1 hour before any important meeting

### 3. Email Batch Processing

**Purpose:** Handle routine emails efficiently.

**Template:**
```
"Here are 10 emails I need to respond to:

[paste emails]

For each email:
1. Identify if it needs a response, an action, or can be archived
2. For those needing responses, draft a reply
3. For those needing actions, extract the action item

Format:
- Email 1: [Response/Action/Archive] - [Draft or action item]
- Email 2: ...

Keep tone professional but warm. Be concise."
```

**Trigger:** Twice daily (morning and afternoon)

### 4. Content Repurposing

**Purpose:** Turn one piece of content into many.

**Template:**
```
"Read this content at [FILE_PATH].

Create a repurposing package:
1. A Twitter thread (5-10 tweets) covering the main ideas
2. A LinkedIn post version (more professional tone)
3. An email newsletter version (direct to subscribers)
4. 3 standalone quote graphics (text only, I'll design later)
5. A shorter blog post version (500 words)

Keep my voice. Each version should feel native to its platform.

Save all to ~/Documents/Content/[CONTENT_NAME]-repurposed/"
```

**Trigger:** After publishing any major piece of content

### 5. Project Status Update

**Purpose:** Keep stakeholders informed without spending hours on status reports.

**Template:**
```
"Generate project status update for [PROJECT_NAME].

1. Read all files in ~/Documents/Projects/[PROJECT_NAME]/
2. Create a status update including:
   - Overall status (On Track / At Risk / Delayed)
   - Accomplishments since last update
   - Current blockers
   - Next milestones
   - Help needed
   - Key decisions pending

Format for easy scanning. Keep it under 1 page.

Save to ~/Documents/Projects/[PROJECT_NAME]/status-[DATE].md"
```

**Trigger:** Weekly or before stakeholder meetings

### 6. End-of-Day Capture

**Purpose:** Never lose track of what you did or need to do.

**Template:**
```
"Run my end-of-day capture.

1. Read my clipboard history or any notes from today
2. Read any files I created or modified today
3. Create a daily log:
   - What I worked on
   - What I finished
   - What's still open
   - Tomorrow's priorities
   - Any random thoughts or ideas I mentioned

Save to ~/Documents/DailyLogs/[DATE].md"
```

**Trigger:** Last thing before closing laptop

---

## Advanced Workflow Patterns

Once you're comfortable with basic workflows, try these advanced patterns.

### Pattern 1: The Context Stack

Layer multiple context files for complex tasks.

**Example:**
```
"Read these context files first:
- ~/Documents/Context/my-business.md
- ~/Documents/Context/my-voice.md
- ~/Documents/Context/current-project-brief.md

Now, given this context, [complex delegation]"
```

The more context Claude has, the less explaining you need to do.

### Pattern 2: The Quality Loop

Build verification into your workflows.

**Example:**
```
"1. [Do the main task]
2. Now review your own output:
   - Check for factual claims that need sources
   - Identify anything that seems uncertain
   - Note any assumptions you made
3. Add a 'confidence notes' section at the end
4. Flag anything I should personally verify"
```

Claude auditing Claude.

### Pattern 3: The Escalation Path

Build in decision points.

**Example:**
```
"Process these customer support emails.

For each email:
- If it's a simple question, draft a response
- If it requires account access, create a ticket summary for support team
- If it's a complaint, flag for my personal review with a briefing
- If it's a compliment, add to testimonials file

Only show me the complaints. Handle the rest."
```

Claude handles the routine; you handle the exceptions.

### Pattern 4: The Learning Loop

Build workflows that improve themselves.

**Example:**
```
"Read my previous 5 weekly reviews at ~/Documents/Reviews/.
Identify patterns:
- What keeps coming up as a blocker?
- What types of tasks do I consistently accomplish?
- What do I keep saying I'll do but don't?

Add a 'patterns' section to this week's review with insights."
```

Your workflow becomes self-aware.

---

## Building Your Personal Operating System

Now let's zoom out. Individual workflows are useful. A connected system is powerful.

### The System Components

1. **Context Layer:** Files that define who you are, what you do, and how you work
   - Business context
   - Writing voice
   - Common instructions
   - Personal preferences

2. **Workflow Library:** Your collection of reusable templates
   - Daily workflows
   - Weekly workflows
   - Monthly workflows
   - Situational workflows

3. **Trigger Schedule:** When each workflow runs
   - Calendar reminders
   - Habit triggers
   - Event-based triggers

4. **Output Structure:** Where everything gets saved
   - Consistent folder structure
   - Predictable naming conventions
   - Easy to find later

### Eddie's System

> "My personal operating system has about 15 workflows. Monday morning: weekly planning. Friday afternoon: weekly review. First of the month: invoice processing and LLC admin. Before any major meeting: meeting prep. After any content: repurposing. After any research: action extraction.
>
> I don't think about what to do. I just run the workflow. Claude does the work. I review and approve. What used to be 20 hours of monthly admin is now about 3 hours — and most of that is review, not creation.
>
> The real magic? Because everything is saved consistently, Claude gets better at understanding my context over time. Last month's project summaries inform this month's planning. Old meeting notes help prep for new meetings. It compounds."

---

## Your Challenge: Build Three Workflows

This week, create your personal operating system foundation:

### Workflow 1: Something You Do Weekly
Choose a task you do every week. Build a template. Run it this week.

Examples:
- Weekly review
- Report generation
- Email batch processing
- Project status update

### Workflow 2: Something You Do Monthly
Choose a task you do every month. Build a template. Run it at the end of this month.

Examples:
- Invoice processing
- Performance review
- Goal progress check
- Content calendar planning

### Workflow 3: Something You Do Situationally
Choose a task triggered by an event. Build a template. Use it next time the event occurs.

Examples:
- Meeting prep (before meetings)
- Content repurposing (after publishing)
- Outreach sequence (when prospecting)
- Interview prep (before calls)

### For Each Workflow

1. **Document it:** Create a file in ~/Documents/Workflows/
2. **Include:**
   - When to run (trigger)
   - The full delegation template
   - Any notes or refinements
3. **Test it:** Run it once for real
4. **Refine it:** Make it better based on what happened

**Success looks like:**
- You have 3 documented, tested workflows
- Each one saves you at least 30 minutes per occurrence
- You know when to run each one
- Claude produces consistently useful output

---

## Key Takeaways

1. **Templates beat prompts.** Stop crafting new delegations each time. Build reusable templates with blanks to fill in.

2. **Chains multiply power.** Connect delegations together. The output of one becomes the input of the next.

3. **Context files reduce explaining.** Put persistent information in files Claude can reference. Your voice, your business, your preferences.

4. **Habits are triggers.** Even without automation, building consistent habits ("Every Friday at 4pm") makes workflows reliable.

5. **Systems compound.** A connected operating system gets smarter over time. Past outputs inform future inputs. That's the real magic.

---

## What's Next

Congratulations. You've completed the course.

You started as someone who chatted with AI. Now you're someone who delegates to an agent. You can process files, write collaboratively, research like a team, and build systems that run your operations.

The goal was never to learn Claude Code. The goal was to reclaim your time for the work that matters — the thinking, the creating, the deciding. The human work.

Claude handles the rest.

Welcome to the delegation economy.

---

## Quick Reference

### Workflow Building Blocks

| Component | What It Is | Example |
|-----------|-----------|---------|
| Template | Reusable delegation with blanks | "Process invoices for [MONTH]..." |
| Trigger | What starts the workflow | "Every Friday at 4pm" |
| Chain | Connected delegations | Research → Draft → Refine |
| Context File | Persistent information Claude references | my-writing-voice.md |

### Six Essential Workflows

| Workflow | Frequency | Purpose |
|----------|-----------|---------|
| Weekly Review | Weekly | Track progress, plan ahead |
| Meeting Prep | As needed | Walk in prepared |
| Email Batch | Daily | Handle routine messages |
| Content Repurposing | After publishing | Multiply your content |
| Project Status | Weekly | Keep stakeholders informed |
| End-of-Day Capture | Daily | Never lose track |

### Personal Operating System Components

1. **Context Layer:** Who you are, how you work
2. **Workflow Library:** Your templates
3. **Trigger Schedule:** When things run
4. **Output Structure:** Where things go

### Workflow Template Structure

```markdown
# [Workflow Name]

## When to run
[Trigger description]

## The delegation
[Full template with [BLANKS] to fill in]

## Notes
[Refinements, special cases, lessons learned]
```

---

## Course Completion

You've finished **Claude Code for Knowledge Workers**.

To continue your learning:
- Join the ID8Labs community (coming soon)
- Follow Eddie on Twitter for more delegation patterns
- Check id8labs.app/resources for templates and updates

Thank you for learning with us.

Find all course materials at **id8labs.app/courses**.
