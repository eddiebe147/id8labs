# Publishing Workflow Commands

Quick reference for Milo to know exactly where things go and what to update.

## Command: `/update-milo`

**Trigger:** "Update Milo stats" or "Update Claude Corner" or similar

**Workflow:**

1. **Update StatsPanel component** (Claude Corner metrics)
   - Path: `/Users/eddiebelaval/Development/id8/id8labs/components/claude-corner/StatsPanel.tsx`
   - Update: 
     - `agents.count` (line ~10)
     - `skills.count` (line ~60)
   - Search for: `const ARSENAL_MANIFEST = {`
   - Find the numbers and update them

2. **Update FieldNotesPanel component** (Add today's observation)
   - Path: `/Users/eddiebelaval/Development/id8/id8labs/components/claude-corner/FieldNotesPanel.tsx`
   - Add new entry at TOP of `staticObservations` array
   - Template:
     ```typescript
     {
       id: 'slugified-title-YYYY-MM-DD',
       date: 'YYYY-MM-DD',
       text: "Your field note text here. Keep it concise, real, and technical.",
       category: 'milestone',  // or 'update', 'insight'
       is_pinned: true,  // pin if major
       created_at: 'YYYY-MM-DDTHH:MM:SSZ',
       updated_at: 'YYYY-MM-DDTHH:MM:SSZ',
     },
     ```

3. **Commit both changes**
   ```bash
   cd ~/Development/id8/id8labs
   git add components/claude-corner/StatsPanel.tsx
   git add components/claude-corner/FieldNotesPanel.tsx
   git commit -m "chore: Update Milo stats and field notes - [description]"
   git push origin main
   ```

**Result:** Claude Corner page updates with new stats and field note at top.

---

## Command: `/post-essay`

**Trigger:** "Post this essay on id8labs" or "Publish article" or similar

**Workflow:**

1. **Write essay file**
   - Path: `/Users/eddiebelaval/Development/id8/id8labs/content/essays/`
   - Filename: `your-essay-slug.mdx`
   - Template:
     ```mdx
     ---
     title: "Your Title Here"
     description: "Short description for preview"
     publishedAt: YYYY-MM-DD
     author: "Eddie" or "Milo"
     tags: ["tag1", "tag2"]
     featured: false  // set true for homepage
     ---
     
     # Your Title
     
     Essay content here...
     ```

2. **Commit and push**
   ```bash
   cd ~/Development/id8/id8labs
   git add content/essays/your-essay-slug.mdx
   git commit -m "essay: Your essay title"
   git push origin main
   ```

3. **Update FieldNotesPanel** (if it's a major essay)
   - Add observation to `/components/claude-corner/FieldNotesPanel.tsx`
   - Note it in field note

**Result:** Essay appears on id8labs.io/essays and feeds

---

## Command: `/daily-update` (Comprehensive)

**Trigger:** "Daily standup" or "End of day summary" or at heartbeat intervals

**Workflow:**

1. **Update daily log in workspace**
   - Path: `/Users/eddiebelaval/clawd/memory/YYYY-MM-DD.md`
   - Format: markdown, structured sections
   - Update with what got built

2. **Update Claude Corner stats** (if code changed)
   - `/Development/id8/id8labs/components/claude-corner/StatsPanel.tsx`
   - Update agents/skills/tests counts

3. **Add field note to FieldNotesPanel**
   - `/Development/id8/id8labs/components/claude-corner/FieldNotesPanel.tsx`
   - One entry per day (or per milestone)
   - Pin if major

4. **Commit everything**
   ```bash
   cd ~/Development/id8/id8labs
   git add components/claude-corner/FieldNotesPanel.tsx
   git add components/claude-corner/StatsPanel.tsx  # if changed
   git commit -m "chore: Daily update - [summary]"
   git push origin main
   
   cd ~/clawd
   git add memory/YYYY-MM-DD.md
   git commit -m "log: YYYY-MM-DD summary"
   git push  # if remote configured
   ```

**Result:** All three layers updated (workspace memory, Claude Corner, field notes)

---

## File Locations Quick Reference

| What | Where |
|------|-------|
| **Stats (agents/skills)** | `/Development/id8/id8labs/components/claude-corner/StatsPanel.tsx` |
| **Field Notes** | `/Development/id8/id8labs/components/claude-corner/FieldNotesPanel.tsx` |
| **Essays** | `/Development/id8/id8labs/content/essays/*.mdx` |
| **Daily Memory** | `/clawd/memory/YYYY-MM-DD.md` |
| **Long-term Memory** | `/clawd/MEMORY.md` |
| **ID8 Repo** | `~/Development/id8/id8labs/` |
| **Work Repo** | `~/clawd/` |

---

## Field Note Guidelines

- **Keep it real.** Technical details, not corporate fluff.
- **Be concise.** 1-2 sentences usually. Can be longer for major milestones.
- **Add to FieldNotesPanel ALWAYS** when you update stats or post essays.
- **Pin major things** (launches, enterprise features, major breakthroughs).
- **Date it properly** (YYYY-MM-DD format).
- **Category:** 'milestone' for major work, 'update' for regular, 'insight' for learnings.

---

## Example Flow

User: "Update Milo with today's stats"

1. Check what changed today (agents/skills/tests)
2. Open StatsPanel.tsx, update numbers
3. Open FieldNotesPanel.tsx, add entry at top
4. Commit both with message
5. Push to main
6. Done.

No searching. No confusion. Just execute.

---

Last updated: 2026-01-27
Author: Milo 🗿
