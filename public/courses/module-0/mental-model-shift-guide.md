# Module 0: The Mental Model Shift

## From Chatbot to Operating System

**Duration:** 15 minutes
**Outcome:** Install Claude Code and complete your first real delegation

---

## The Name Is Wrong

Let's get this out of the way: "Claude Code" is a terrible name for what this tool actually does.

When you hear "Code," you think developers. You think syntax and programming languages. You think "not for me."

Here's the truth: **Claude Code is Claude running locally on your computer with superpowers.**

Think of it as:
- "Claude Local"
- "Claude Agent"
- "Claude with File Access"

The "Code" part? That's just how it was built. It doesn't describe what it does for you.

---

## The 3 Superpowers

Claude Code gives you three things that web Claude can't:

### 1. File System Access

Web Claude can only see what you paste into the chat box.

Claude Code can see your entire computer. Every folder. Every document. Every file you've ever saved.

**What this means for you:**
- "Organize my Downloads folder"
- "Find all invoices from 2024"
- "Search my research folder for anything about [topic]"

### 2. Long-Running Sessions

Web Claude forgets everything when you close the tab. You start fresh every time.

Claude Code remembers. It can work for hours. It maintains context across days and weeks.

**What this means for you:**
- Complex projects that span multiple sessions
- Workflows that build on previous work
- A persistent "employee" who knows your systems

### 3. Tool Installation

Web Claude is sandboxed. It can only use the tools Anthropic built in.

Claude Code can install and use external tools. Web search. Browser automation. Database connections. Whatever you need.

**What this means for you:**
- Search the web and summarize results
- Pull data from websites automatically
- Connect to your other tools and services

---

## The Mental Model Shift

Here's the shift that changes everything:

| Old Mental Model | New Mental Model |
|------------------|------------------|
| "Help me with X" | "Do X" |
| "What should I write?" | "Write it and save to this folder" |
| "How do I organize these?" | "Organize these" |
| Assistance | **Delegation** |

**Example - The Old Way:**
> "Help me write interview questions for a podcast guest"
>
> Claude gives you suggestions. You copy them. You edit them. You format them. You save them.

**Example - The New Way:**
> "Here's the guest's bio and our previous episode topics. Generate 15 interview questions that build on what we've covered. Save them to /Podcast/Prep/[Guest Name].md"
>
> Claude does all of it. You review the output.

One gives you **suggestions**. The other gives you **deliverables**.

---

## Your First Delegation

Time to prove this works. Here's exactly what to do:

### Step 1: Open Terminal

- **Mac:** Command + Space, type "Terminal", hit Enter
- **Windows:** Search for "Terminal" or "Command Prompt"

### Step 2: Install Claude Code

Copy and paste this command:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Wait for it to finish (about 30 seconds).

### Step 3: Start Claude Code

Type:

```bash
claude
```

You'll see a prompt. That's it. You're in.

### Step 4: Your First Task

Navigate to your Downloads folder (or any messy folder):

```bash
cd ~/Downloads
```

Now delegate:

> "Show me what's in this folder. Group files by type. Tell me which ones are duplicates. Create a summary of what's taking up the most space."

Watch it work. It will:
1. Scan the folder
2. Analyze file types
3. Find duplicates
4. Report back with a clear summary

**You didn't write any code.** You just asked for what you wanted.

---

## What Just Happened

You delegated a task that would have taken you 20-30 minutes of manual work:
- Opening Finder
- Sorting by type
- Manually checking for duplicates
- Adding up file sizes

Claude Code did it in seconds.

This is the shift. This is what the course teaches you to do with everything:
- Research
- Writing
- File organization
- Document processing
- Workflow automation

---

## What's Next

Module 0 is your proof of concept. You've seen it work.

The full course covers:

1. **Your First Delegation** - Low-risk, high-value file tasks
2. **Working With Your Files** - Document processing, invoices, finding things
3. **The Writer's Workflow** - Voice notes to polished drafts
4. **Research & Analysis** - Competitive research, synthesis, patterns
5. **Personal Operations System** - CLAUDE.md, recurring workflows, automation
6. **Power User Patterns** - MCP servers, long tasks, troubleshooting

Each module builds on the last. By the end, you'll have a personal operating system that handles the work you used to do manually.

---

## Quick Reference

### Installation
```bash
curl -fsSL https://claude.ai/install.sh | bash
claude
```

### Key Commands
- `claude` - Start a new session
- `cd [folder]` - Navigate to a folder before starting
- `/help` - See available commands
- `/clear` - Start fresh

### The Delegation Formula
1. Give context (what files, what folder, what you're trying to do)
2. State the outcome you want (not the steps to get there)
3. Specify where to save the result

### Example Delegations

**File Organization:**
> "Go through my Downloads folder. Move PDFs to Documents/PDFs, images to Pictures, and delete anything older than 6 months that I haven't opened."

**Research:**
> "Search the web for the top 5 competitors to [Company]. For each one, find their pricing, key features, and target market. Save a comparison table to Research/Competitors.md"

**Writing:**
> "Here are my voice memo transcripts from this week. Find the 3 strongest ideas for blog posts. For each, write a one-paragraph outline. Save to Writing/Ideas/[Date].md"

---

## Join the Full Course

This is Module 0 - a taste of what's possible.

The full course goes deeper into each workflow with:
- Video walkthroughs
- Real examples from my work
- Templates and starter files
- Community support

**[Join the Waitlist →](https://id8labs.app/courses/claude-for-knowledge-workers)**

---

*Built by Eddie Belaval at ID8Labs*
*Questions? eb@id8labs.tech*
