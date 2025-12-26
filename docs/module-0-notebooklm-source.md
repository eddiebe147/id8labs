# Claude Code for Knowledge Workers — Module 0: The Mental Model Shift

**Course by Eddie Belaval, Founder of ID8Labs**
**Website:** id8labs.app/courses

---

## Introduction

Welcome. I'm Eddie Belaval. I run two businesses — one produces reality television for networks like TLC and MTV, the other builds AI tools for developers at ID8Labs.

Neither requires me to write code every day. But Claude Code has become the most important tool in both.

If you've dismissed Claude Code because of its name, you're missing the point entirely. This module will show you what it actually is — and give you your first win in under 10 minutes.

By the end of this module, you'll have installed Claude Code and completed your first real delegation. Not a practice exercise. Actual work on your actual computer.

---

## The Naming Problem

Let's get this out of the way. "Claude Code" is a terrible name.

When you hear "Code" you think: developers, programming, syntax, not for me.

Here's what Claude Code actually is: **Claude running locally on your computer with superpowers.**

Think of it as:
- Claude Local
- Claude Agent
- Claude with File Access
- Claude that can actually DO things

The "Code" part is just how it was built. It doesn't describe what it does for you.

### What Makes It Different

Regular Claude (the website) is like talking to someone through a window. You can have a conversation, but they can't touch anything in your world.

Claude Code is like inviting that person into your office. They can see your files. Open your documents. Organize your folders. Do actual work.

| Web Claude | Claude Code |
|------------|-------------|
| Can only see what you paste | Can see your entire computer |
| Forgets when you close the tab | Maintains context for hours |
| Sandboxed, limited | Can install external tools |
| Gives you suggestions | Gives you deliverables |

---

## The Three Superpowers

Claude Code gives you three capabilities that web Claude simply cannot provide.

### Superpower 1: File System Access

Web Claude can only see what you paste into the chat. Claude Code can see your entire computer. Every folder. Every document.

**Example delegation:**
> "Show me all PDFs in my Documents folder from the last month."

That takes 2 seconds. Doing that manually? Five minutes minimum — and that's if you know where to look.

Claude Code can:
- Read any file on your computer
- Write new files and save them anywhere
- Organize, rename, and move files
- Search across thousands of documents by content, not just filename

### Superpower 2: Long-Running Sessions

Web Claude forgets everything when you close the tab. Claude Code remembers. It can work for hours. It maintains context across a complex project.

This means you can say: "Now do the same thing for the next folder" — and it knows exactly what "the same thing" means.

### Superpower 3: Tool Integration

Web Claude is sandboxed. Claude Code can connect to external tools:
- **Perplexity and Firecrawl** for web search and research
- **Browser automation** for scraping and testing
- **Database connections** for querying your data
- **Custom tools** for specialized workflows

I use web search integrations to research cast members, pull backgrounds, scout locations. Claude processes everything and surfaces what matters.

---

## The Mental Model Shift

Here's the shift that changes everything.

**Old mental model:** "Help me with X"
**New mental model:** "Do X"

**Old:** "What should I write?"
**New:** "Write it and save to this folder"

**Old:** "How do I organize these?"
**New:** "Organize these"

The shift is from **assistance** to **delegation**.

### The Delegation Formula

Every effective delegation has three parts:

**Context + Outcome + Location**

- **Context:** What Claude needs to know to do the work
- **Outcome:** What you want delivered (be specific)
- **Location:** Where to save the result

**Example — Old Way (Assistance):**
> "Help me write interview questions for a podcast guest"

Claude gives you suggestions. You copy them. You edit them. You format them. You save them.

**Example — New Way (Delegation):**
> "Here's the guest's bio and our previous episode topics. Generate 15 interview questions that build on what we've covered. Save them to ~/Documents/Podcast/Prep/GuestName.md"

Claude does all of it. You review the output.

One gives you suggestions. The other gives you deliverables.

### Eddie's Mindset Rule

> "I treat Claude Code like a capable new assistant on their first day. They're smart, they're eager, but they don't know my preferences yet. So I'm specific. I don't say 'organize my files.' I say 'organize my files by date, put invoices in a folder called Expenses, and create a summary of what you did.' The more specific I am, the better the result."

---

## Installation Walkthrough

Let's get Claude Code installed. This takes about 2 minutes.

### Step 1: Open Terminal

On Mac: Press Command + Space, type "Terminal", press Enter.

Don't be intimidated by the terminal. It's just a text-based way to talk to your computer. You won't need to learn commands — Claude will handle that.

### Step 2: Install Claude Code

Copy and paste this command:

```
npm install -g @anthropic-ai/claude-code
```

If you don't have npm installed, you can use:

```
curl -fsSL https://claude.ai/install.sh | bash
```

Wait for the installation to complete. You'll see some text scroll by — that's normal.

### Step 3: Start Claude Code

Type `claude` and press Enter.

That's it. You're in.

You should see a prompt waiting for your input. This is where you'll type your delegations.

### Step 4: Authenticate

The first time you run Claude Code, it will ask you to authenticate with your Anthropic account. Follow the prompts — it only takes a minute.

### Troubleshooting

**"Command not found"**
Close Terminal and reopen it, then try `claude` again.

**"Permission denied"**
You may need to prefix the install command with `sudo` (this asks for your password).

**Other issues**
Visit anthropic.com/claude-code for the official documentation.

---

## Your First Delegation: Downloads Cleanup

Now let's prove this works with a real task. We're going to clean up your Downloads folder — something everyone needs to do but nobody enjoys.

### Why Downloads?

Your Downloads folder is the perfect first target:
- It's definitely messy (everyone's is)
- There's no risk — we're just analyzing, not deleting
- It's satisfying to see the chaos organized
- It takes Claude about 30 seconds

### The Delegation

Type this into Claude Code:

```
"Analyze my Downloads folder at ~/Downloads/.

1. List all files grouped by type (PDFs, images, documents, etc.)
2. Identify any duplicates
3. Find files that are over 6 months old
4. Calculate total space used by category
5. Create a cleanup recommendation

Save a summary report to ~/Desktop/downloads-analysis.md"
```

### What Happens

Watch Claude work. It will:
1. Read through your Downloads folder
2. Analyze each file
3. Group and categorize everything
4. Identify problems (duplicates, old files)
5. Write a clean summary
6. Save it to your Desktop

This would take you 20-30 minutes manually. Claude does it in under a minute.

### Review the Output

Open the file on your Desktop. You'll see:
- A breakdown of what's in your Downloads
- Files you probably forgot about
- Duplicates wasting space
- Recommendations for what to clean up

**You just completed your first delegation.**

---

## The Moment It Clicked For Me

Let me tell you when this clicked for me.

I had an iCloud folder with over 10 years of files. Screenshots, voice memos, PDFs, random documents. A digital junk drawer I'd been meaning to clean up since 2015.

One afternoon, I pointed Claude Code at it.

> "Go through this folder. Build me an intake system. Categorize everything."

What happened next shifted how I think about AI.

Claude didn't just sort files into folders. It understood them. It read documents, parsed images, identified patterns. It built a categorization system based on what the files actually contained.

Hours later, I had structure. Contracts in one place. Creative assets in another. Research organized by topic. Voice memos transcribed and tagged.

But here's what hit me: **none of it was junk**. Every file I'd saved over a decade, I'd saved for a reason. It was treasure. I just needed someone to help me see it.

That's when I realized: Claude Code isn't a coding tool. It's a thinking partner that happens to run on your computer.

---

## Common First-Timer Mistakes

Let me save you some frustration. Here are the mistakes everyone makes at first.

### Mistake 1: Being Too Vague

**Wrong:** "Organize my files"
**Right:** "Organize files in ~/Downloads by type. Create folders for PDFs, Images, and Documents. Move each file to the appropriate folder. Give me a summary of what you did."

Vague delegations get vague results.

### Mistake 2: Not Specifying the Location

**Wrong:** "Create a summary of this folder"
**Right:** "Create a summary of this folder. Save it to ~/Desktop/summary.md"

If you don't say where to save it, Claude might just show you the output without saving it.

### Mistake 3: Asking Permission Instead of Delegating

**Wrong:** "Could you maybe help me think about how to organize these?"
**Right:** "Organize these. Here's how I want them organized: [specifics]"

Claude Code isn't a chatbot you're having a conversation with. It's an agent waiting for instructions.

### Mistake 4: Starting With High-Stakes Tasks

Don't start by having Claude reorganize your entire Documents folder or edit important files. Start with analysis tasks — where Claude reads and reports but doesn't modify anything. Build trust first.

---

## What You Can Delegate (A Preview)

This module is just the beginning. Here's what you'll learn to delegate in the rest of the course:

**Module 1: Your First Delegation**
- 10 quick wins to build confidence
- Low-risk delegations you can undo in 30 seconds
- Building the delegation habit

**Module 2: Working With Your Files**
- Processing invoices and receipts at scale
- Extracting data from documents
- Semantic search (finding files by meaning, not filename)
- Space audits and cleanup

**Module 3: Writing With Claude**
- Voice notes to polished drafts
- Editing workflows (clarity, tone, structure)
- Training Claude on your voice
- Email batch processing

**Module 4: Research & Analysis**
- Competitive analysis
- Market research
- Synthesizing long documents
- Fact-checking and verification

**Module 5: Building Workflows**
- Creating reusable templates
- Chaining delegations together
- Building your personal operating system
- Workflows that compound over time

---

## Your Challenge: The Downloads Audit

Before moving to Module 1, complete this challenge:

1. **Install Claude Code** (if you haven't already)
2. **Run the Downloads analysis delegation** (the one we walked through above)
3. **Review the output** — What surprised you? What did Claude find that you forgot about?
4. **Take one action** based on the analysis — delete one duplicate, move one file, or clean up one category

**Success looks like:**
- Claude Code is installed and working
- You have a downloads-analysis.md file on your Desktop
- You understand the difference between assistance and delegation
- You're ready for more

---

## Key Takeaways

1. **Claude Code is misnamed.** It's not for coders — it's an AI agent that runs on your computer with file access, memory, and tools.

2. **The shift is from assistance to delegation.** Stop asking for help. Start asking for deliverables.

3. **The delegation formula: Context + Outcome + Location.** Tell Claude what it needs to know, what you want, and where to save it.

4. **Start with low-risk tasks.** Analysis and reporting before organizing and editing. Build trust first.

5. **Be specific.** Vague delegations get vague results. The more specific you are, the better the output.

---

## What's Next

You've installed Claude Code and completed your first delegation. You've experienced the shift from chatbot to agent.

In **Module 1: Your First Delegation**, we'll give you 10 quick wins — safe, satisfying tasks that build your confidence and your delegation skills. By the end, delegation will feel natural.

Find all course materials at **id8labs.app/courses**.

---

## Quick Reference

### Installation Commands

```bash
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Or use the curl installer
curl -fsSL https://claude.ai/install.sh | bash

# Start Claude Code
claude
```

### The Delegation Formula

```
Context + Outcome + Location

"[What Claude needs to know].
[What you want delivered].
Save to [specific path]."
```

### Downloads Analysis Delegation

```
"Analyze my Downloads folder at ~/Downloads/.

1. List all files grouped by type
2. Identify duplicates
3. Find files over 6 months old
4. Calculate space by category
5. Create cleanup recommendations

Save summary to ~/Desktop/downloads-analysis.md"
```

### Mental Model Comparison

| Old Way (Assistance) | New Way (Delegation) |
|---------------------|---------------------|
| "Help me with X" | "Do X" |
| "What should I write?" | "Write it and save here" |
| "How do I organize these?" | "Organize these this way" |
| Get suggestions | Get deliverables |
