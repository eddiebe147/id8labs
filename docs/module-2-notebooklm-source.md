# Claude Code for Knowledge Workers — Module 2: Working With Your Files

**Course by Eddie Belaval, Founder of ID8Labs**
**Website:** id8labs.app/courses

---

## Introduction

Welcome back. You've built confidence with quick wins in Module 1. You've run delegations, handled Claude's questions, and started building the reflex to delegate instead of doing everything manually.

Now we're going deeper. This module is about processing files at scale—the kind of work that used to take hours and now takes minutes. Summarizing 50 PDFs. Extracting data from contracts. Organizing a year of invoices for tax time. This is where Claude Code stops being a novelty and starts saving you serious hours.

---

## What Claude Can Actually See

Before we process files, you need to understand what Claude can access. This matters because it affects what you can delegate.

**Claude can see and read:**
- Your entire user folder (Documents, Downloads, Desktop, Pictures, etc.)
- Text files, PDFs, Word documents, spreadsheets
- Images (it can describe what's in them)
- Code files, config files, markdown files
- Anything in folders you've granted access to

**Claude cannot see:**
- System files (protected by your OS)
- Files in folders you haven't granted permission for
- Content inside apps (like your email inbox or browser tabs)
- Cloud files that aren't synced locally

**The permission check:** If Claude says "I don't have permission to access that folder," go to System Preferences (Mac) → Privacy & Security → Files and Folders, and grant access to your terminal.

Eddie's advice:

> "I keep everything I want Claude to work with in my Documents folder. It's my 'Claude workspace.' If I download something I want processed, I move it there first. Clean boundaries = fewer permission headaches."

---

## Document Processing Power

Here's where things get exciting. Claude doesn't just move files around—it reads them, understands them, and can extract exactly what you need.

### Reading and Summarizing

**The delegation:**
> "Look at all the PDFs in ~/Documents/Contracts/. For each one, extract: the parties involved, the key dates, and any financial terms. Create a summary table in contracts-summary.md."

**What happens:** Claude opens each PDF, reads the content, finds the relevant information, and compiles it into a structured summary. Twenty contracts that would take you 2 hours to review? Done in 3 minutes.

### Extracting Specific Information

**The delegation:**
> "Look at the invoices in ~/Documents/2024-Invoices/. Extract the vendor name, invoice number, date, and total amount from each one. Create a spreadsheet called invoice-log.csv."

**What happens:** Claude reads each invoice (PDF, image, or document), pulls out the specific fields you asked for, and creates a clean CSV you can open in Excel or Google Sheets.

### Batch Renaming with Content Awareness

**The delegation:**
> "Look at the contracts in ~/Documents/Unsigned/. Rename each file to: YYYY-MM-DD_VendorName_ContractType.pdf using the information inside the document."

**What happens:** Claude reads each contract, extracts the date, vendor name, and contract type from the content itself, and renames the file accordingly. No more "Contract_Final_v2_SIGNED.pdf" chaos.

Eddie's real example:

> "I produce a reality TV show. Before each shoot, I need briefings on cast members. I used to spend hours Googling names, copying bios, organizing notes. Now I tell Claude: 'Research these 10 cast members. For each one, find: social media presence, any news coverage, relationship history, and potential storylines. Create a briefing document for each person, saved to ~/Documents/CastBriefings/.'
>
> Ten detailed briefings in 15 minutes. That used to be half a day's work."

---

## Invoice & Receipt Organization

Let's get specific about a task almost everyone needs: organizing financial documents for taxes or bookkeeping.

### The Monthly Receipt Dump

Every month, you accumulate receipts—email attachments, photos of paper receipts, downloaded invoices. Tax time becomes a nightmare of searching through folders.

**The delegation:**
> "Look at ~/Downloads/. Find all files that look like receipts or invoices (PDFs, images of receipts, anything with dollar amounts). For each one, extract the date, vendor, and amount. Rename the file to YYYY-MM-DD_VendorName_$Amount.pdf. Move them all to ~/Documents/2024-Receipts/. Create a log file showing what you moved."

**What happens:** Claude scans your Downloads, identifies financial documents, reads each one to extract the key info, renames them consistently, organizes them into one folder, and gives you a log of everything it did.

### Eddie's LLC Workflow

> "I run ID8Labs as an LLC. Every month, I have 30-50 receipts scattered across email, Downloads, and my phone's photo roll. My old process: open each one, figure out what it is, rename it, file it. Two hours, minimum.
>
> My new process: I dump everything into a 'To Process' folder. Then: 'Look at ~/Documents/LLC/ToProcess/. These are business expenses. Extract vendor, date, amount, and category (software, equipment, services, travel, meals). Rename each file. Move to ~/Documents/LLC/2024-Expenses/ organized by category. Create an expense-log.csv with all the data.'
>
> Forty-seven receipts. Three minutes. The CSV goes straight to my bookkeeper."

### The Tax Season Sprint

**The delegation:**
> "Look at ~/Documents/2024-Expenses/. Create a summary by category: total spent on Software, Equipment, Services, Travel, Meals, and Other. Format as a table. Also list any expenses over $500 individually."

**What happens:** Claude analyzes your organized expenses and creates exactly the summary your accountant needs. Or you need for quarterly estimates.

---

## Finding Things (Semantic Search)

This is one of Claude's superpowers that most people don't realize: you can search your files by meaning, not just filename.

### Beyond Filename Search

Spotlight and Finder search by filename and maybe file contents. Claude searches by understanding.

**The delegation:**
> "Find any files in ~/Documents/ that mention the 'Johnson project' or anything related to their website redesign from 2024."

**What happens:** Claude doesn't just look for files named "Johnson"—it reads through your documents and finds anything relevant to that project, even if the filename is "website-notes.md" or "Q2-client-work.pdf."

### Finding Forgotten Work

**The delegation:**
> "Look through ~/Documents/. Find any files related to presentations or pitch decks I created in 2023. List them with a one-sentence description of what each one contains."

**What happens:** Claude finds presentations you forgot you made, reads them, and tells you what's in each one. Perfect for reusing old work.

### The "I Know I Wrote This Somewhere" Problem

**The delegation:**
> "Search my Documents folder for anything where I wrote about pricing strategies or how to price consulting services. Show me the relevant excerpts."

**What happens:** Claude finds your old notes, blog drafts, client proposals—anywhere you discussed pricing—and shows you exactly what you wrote. No more recreating insights you already captured.

Eddie's example:

> "I write a lot. Essays, notes, client proposals, scripts. When I start a new project, I often remember 'I wrote something about this before.' Used to mean 30 minutes of searching. Now: 'Find anything I've written about AI tools for non-programmers.' Claude surfaces 8 files I'd forgotten about, including a draft that became the foundation for this course."

---

## Space Analysis & Cleanup

Your computer accumulates cruft. Old projects, duplicate downloads, forgotten caches. Claude can help you understand what's taking up space and clean it responsibly.

### The Deep Space Audit

**The delegation:**
> "Analyze my entire Documents folder. Show me: the 20 largest files, the 10 largest folders, any duplicate files, and any files not modified in over 3 years. Format as a report with sizes in GB or MB."

**What happens:** You get a complete picture of where your storage is going. The 4GB video file from 2019 you forgot about. The three copies of the same presentation in different folders.

### The Safe Cleanup

**The delegation:**
> "Look at ~/Documents/OldProjects/. List everything that hasn't been modified since 2022. Show me the total size. Don't delete anything—just show me what's there so I can decide."

**What happens:** Claude does the tedious inventory work. You make the decisions about what to keep.

### The Cache Purge

**The delegation:**
> "Find all cache folders, temporary files, and .DS_Store files in my Documents folder. Tell me how much space they're using. If it's over 100MB, list the biggest offenders."

**What happens:** You discover the hidden bloat that accumulates over years.

Eddie's storage reclaim story:

> "I was running low on disk space. Didn't want to buy a new drive. Told Claude: 'Audit my entire user folder. Find everything over 500MB that I haven't touched in a year. Find all duplicate files. Find any video files outside my Videos folder.'
>
> The report showed 90GB of recoverable space. Old iOS backups. Duplicate downloads. Video exports I'd already uploaded elsewhere. Took 20 minutes to review and delete. Saved $200 on a new drive."

---

## Your Challenge: The Invoice Cleanup

This week, process real financial documents. Here's your challenge:

**Take 10-20 receipts or invoices** (from the last month, or whatever you have sitting in Downloads) and:

1. **Move them to a processing folder:** Create ~/Documents/ExpenseTest/
2. **Run this delegation:**
   > "Look at ~/Documents/ExpenseTest/. These are business expenses. For each file, extract: date, vendor, amount, and category (guess the category based on the vendor—software, travel, meals, services, equipment, or other). Rename each file to YYYY-MM-DD_Vendor_$Amount.pdf. Create an expense-summary.csv with all the data."
3. **Review the results:** Check that Claude extracted the information correctly. Note any errors.
4. **Refine if needed:** If categories are wrong, re-delegate with more specific instructions.

**Success looks like:**
- Your expenses are renamed consistently
- You have a CSV that could go to a bookkeeper
- You understand how Claude reads and extracts from documents
- You spent minutes instead of an hour

---

## Key Takeaways

1. **Claude reads documents.** Not just filenames—actual content. PDFs, images, Word docs.

2. **Batch processing is the superpower.** One delegation can process 50 files. Same formula: Context + Outcome + Location.

3. **Semantic search beats keyword search.** "Find anything about the Johnson project" works better than hoping you named files well.

4. **Financial documents are a perfect use case.** Receipts, invoices, expense reports—tedious, repetitive, perfect for delegation.

5. **Start with reports, then act.** "Show me what's there" before "delete everything old."

---

## What's Next

You can now process files at scale. Documents, invoices, contracts—Claude handles the tedious reading and extracting while you make decisions.

In **Module 3: Writing With Claude**, we'll apply delegation to creative work. Turning voice notes into drafts. Editing for clarity. Developing your writing voice with AI assistance. This is where Claude becomes a thinking partner, not just a file processor.

Find all course materials at **id8labs.app/courses**.

---

## Quick Reference

### Document Processing Patterns

| Task | Delegation Pattern |
|------|-------------------|
| Summarize multiple files | "Read all [files] in [folder]. Extract [specific info]. Create summary in [output file]." |
| Batch rename with content | "Rename files in [folder] using [pattern] based on information inside each file." |
| Extract to spreadsheet | "Extract [fields] from each file in [folder]. Create [filename].csv with the data." |
| Find by meaning | "Find files in [folder] related to [topic/project/concept]." |

### Invoice Organization Template

```
"Look at [folder]. These are business expenses.
For each file, extract: date, vendor, amount, category.
Rename to: YYYY-MM-DD_Vendor_$Amount.pdf
Move to: [destination folder]
Create: expense-log.csv with all data."
```

### Space Analysis Template

```
"Analyze [folder]. Show me:
- The [N] largest files
- The [N] largest folders
- Any duplicate files
- Files not modified in [timeframe]
Format as a report. Don't delete anything."
```
