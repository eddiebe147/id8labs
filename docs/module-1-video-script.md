# Module 1: Your First Delegation

## The Problem

You just installed Claude Code. Now what?

Most people open the terminal, type `claude`, stare at the blinking cursor, and freeze. They don't know what to ask. Or worse—they treat it like ChatGPT, typing questions and getting answers they could have Googled.

Here's the thing: Claude Code isn't for asking questions. It's for delegating work.

But nobody teaches you how to delegate to AI. We're trained to "prompt engineer" or "ask the right questions." That's backwards. The skill isn't asking—it's *telling*.

The first time I used Claude Code, I typed: "Help me organize my files." Claude asked clarifying questions. We went back and forth. It was... fine. But I was still doing the thinking.

Then I tried something different.

## The Insight

There's a formula that makes delegation work every time. I call it **Context + Outcome + Location**.

- **Context:** What Claude can see or needs to know
- **Outcome:** What "done" looks like
- **Location:** Where the result should go

Watch the difference:

**Bad delegation:** "Help me organize my Downloads folder."

**Good delegation:** "Look at my Downloads folder. Group files by type into subfolders (PDFs, Images, Documents, Other). Delete anything older than 6 months. Put a summary of what you did in ~/Desktop/cleanup-log.txt."

Same intent. Completely different result.

The first one starts a conversation. The second one starts *work*.

## How It Works

### Step 1: Installation (2 minutes)

Open your terminal and paste this:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

That's it. Claude Code installs itself.

Now type:

```bash
claude
```

You're in. No signup flow. No account creation. Just a blinking cursor waiting for instructions.

### Step 2: Pick a Low-Risk Target

For your first delegation, pick something that:
- You've been meaning to do
- Won't break anything if it goes wrong
- Has a clear "done" state

Perfect candidates:
- Downloads folder cleanup
- Screenshot renaming
- Finding duplicate files
- Summarizing a folder of documents

**Don't start with:** Your production database, client files, or anything irreplaceable.

### Step 3: Apply the Formula

Let's walk through a real delegation.

**Context:** "My Downloads folder has 3 years of accumulated files."

**Outcome:** "Organize into subfolders by file type, rename files with dates where possible, and list any files over 100MB."

**Location:** "Work in ~/Downloads and put the summary in ~/Desktop/downloads-audit.md."

Combined:

> "My Downloads folder has 3 years of accumulated files. Organize them into subfolders by file type (PDFs, Images, Documents, Spreadsheets, Other). Rename files to include their modification date where it's not already in the name. List any files over 100MB in ~/Desktop/downloads-audit.md so I can decide what to archive."

That's a delegation. Not a question. Claude will now *do* this, not just *explain* how to do it.

### Step 4: Watch It Work

Claude shows you what it's about to do. You'll see it:
- List the files
- Create the folder structure
- Move files one by one
- Generate the summary

You can interrupt at any point. Just type "stop" or "wait."

### Step 5: Verify the Result

Check three things:
1. Did the files move correctly?
2. Does the summary exist?
3. Did anything unexpected happen?

If something's wrong, just tell Claude: "Undo the last thing you did" or "Move X back to Y."

## Real Example: The Junk Drawer Story

I had 10 years of iCloud documents. Just... chaos. Random screenshots, receipts, contracts, photos people texted me, old resumes, half-finished projects.

I'd been "meaning to organize it" for years.

One afternoon, I opened Claude Code and typed:

> "I have about 10 years of accumulated files in ~/Documents/iCloud. Please analyze what's in there, identify the main categories of content, create a sensible folder structure, and move everything. Keep a log of what you did so I can find things that moved."

Two hours later, I had:
- `/Personal/Finance/` with all my receipts and statements
- `/Work/Contracts/` with client agreements
- `/Photos/Screenshots/` organized by year
- `/Projects/` with old work grouped by what it was
- A 40-page log file showing exactly where everything went

Ten years of procrastination, solved in one afternoon. And I didn't sort a single file myself.

That's delegation.

## Real Example: The Downloads Audit

Every month, my Downloads folder turns into a disaster. PDFs from everywhere, screenshots, random images, zip files I downloaded once.

Now I run this:

> "Audit my Downloads folder. Delete anything older than 30 days that isn't a PDF or document. Organize the rest by type. Tell me how much space you freed up."

Takes about 2 minutes. Usually frees 5-10GB.

I don't even watch it anymore. I just check the summary.

## Real Example: Screenshot Naming

macOS names screenshots like `Screenshot 2024-01-15 at 3.42.17 PM.png`. Useless for finding anything.

I had hundreds of these. So I asked Claude:

> "Rename all screenshots in ~/Desktop to include what's visible in them. Use the format 'YYYY-MM-DD - [description].png'. Skip any that already have meaningful names."

Claude opened each image, described what was in it, and renamed accordingly.

`Screenshot 2024-01-15 at 3.42.17 PM.png` became `2024-01-15 - Slack conversation with Mike about pricing.png`.

Now I can actually find things.

## When Things Go Wrong

They will. And that's fine.

**"Permission denied"** - Claude can't access certain folders. It'll tell you. Either grant access or pick a different folder.

**"I can't see the file"** - Usually means Claude doesn't have file access enabled. Check your terminal permissions.

**"I moved something I shouldn't have"** - Tell Claude "Undo that" or manually move it back. No damage done.

**"It's taking forever"** - Large folders take time. Let it run. Or type "How many files are left?" to check progress.

The beautiful thing about file operations: they're almost always reversible. Move something wrong? Move it back. Delete something? It's probably in Trash.

Start with low-stakes targets and build confidence.

## Try It Yourself

Your challenge for this module: **The Downloads Audit**

Open Claude Code and run this exact delegation:

> "Look at my Downloads folder. Tell me how many files are in there, how much space they're using, and what the oldest file is. Then organize everything into subfolders by file type. Delete anything that's over 6 months old unless it's a document or PDF. Put a summary of everything you did in ~/Desktop/downloads-cleanup.md."

When you're done, you should have:
- A clean Downloads folder with organized subfolders
- A summary file on your Desktop
- The satisfying feeling of delegating instead of doing

## Key Takeaways

1. **The formula is Context + Outcome + Location.** Apply it every time.

2. **Tell, don't ask.** Say what you want done, not what you're wondering about.

3. **Start low-stakes.** Downloads folder, screenshots, duplicates. Build confidence before touching important files.

4. **Watch the first few times.** See how Claude thinks. You'll learn to delegate better.

5. **Mistakes are reversible.** Files can be moved back. Nothing is permanent.

The mental shift happens fast. Within a week, you'll stop thinking "How do I do this?" and start thinking "How do I delegate this?"

That's when Claude Code stops being a tool and starts being a teammate.

---

*Next module: Working With Your Files — document processing, invoice organization, and finding things across your file system.*
