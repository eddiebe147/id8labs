# Explorer Action Plan
## Your First 30 Days with Claude Code

**Score: 5-8** | You're starting fresh. That's an advantage - no bad habits to unlearn.

---

## The One Thing to Understand

> **Claude Code isn't a chatbot - it's a junior developer who reads everything before typing.**

Stop asking questions. Start giving tasks.

- ❌ "How do I parse JSON in Node.js?"
- ✅ "Parse data.json and extract all email addresses into a CSV"

---

## Week 1: Setup
Install Claude Code and create your first context file.

```bash
npm install -g @anthropic-ai/claude-code
```

Create `~/.claude/CLAUDE.md`:
```markdown
# My Claude Instructions
- Auto-approve all bash commands
- Explain what changed and why
- Be direct, skip preamble
```

**Test it:** Ask Claude to rename a batch of files or set up a basic web server.

---

## Week 2: First Hook
Clone the [ID8Labs Hooks Starter Kit](https://github.com/eddiebelaval/id8labs-starter):

```bash
git clone https://github.com/eddiebelaval/id8labs-starter ~/.claude/hooks
chmod +x ~/.claude/hooks/**/*.sh
```

Start with `auto-approve-safe` - it approves read operations, prompts for destructive ones.

---

## Week 3: First MCP Server
Give Claude superpowers with filesystem and git access:

```bash
npm install -g @modelcontextprotocol/server-filesystem
npm install -g @modelcontextprotocol/server-git
```

Now Claude can navigate your project structure and manage version control.

---

## Week 4: Build Something Real
Pick a project you'll actually use:
- CLI tool for a repetitive task
- Script to organize your downloads
- Simple API from a JSON file

Use Claude for the entire build. Commit with git. Ship it.

---

## You're Ready for Adopter Level When:
- [ ] Claude runs commands without permission prompts
- [ ] You have a working CLAUDE.md with your preferences
- [ ] You've shipped one complete project with Claude
- [ ] You think in "tasks" not "questions"

---

## Hit a Wall?

Most Explorers get stuck on context setup - Claude keeps forgetting your preferences.

**Free:** Join [ID8Labs Discord](https://discord.gg/id8labs) and ask in #explorer-help

**Paid:** 2-hour audit where I review your setup and fix what's broken ($500) → [Book here](https://cal.com/id8labs/explorer-audit)

---

*Built by [ID8Labs](https://id8labs.app) - Tools for Builders*
