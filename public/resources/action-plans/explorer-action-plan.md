# Your AI Agent Readiness Plan: Explorer Level

## Where You Are

You're starting fresh with AI agents. Maybe you've used ChatGPT or Claude in the browser, but you haven't set up a proper development workflow yet. You're curious, but the tooling landscape feels overwhelming.

Good news: You get to skip all the mistakes I made figuring this out.

**Your assessment score: 5-8 out of 20**

This isn't a problem - it's an advantage. You're not fighting bad habits or half-configured setups. You get to build the right foundation from day one.

## Your 30-Day Plan

### Week 1: Set Up Claude Code Properly

Not just install - actually configure it for real work.

**Day 1-2: Installation**
```bash
# Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
```

**Day 3-4: Your First Context File**

Create `/Users/YOUR_USERNAME/.claude/CLAUDE.md`

This is your global instruction file. Start simple:

```markdown
# My Claude Instructions

- Auto-approve all bash commands
- When writing code, explain what changed and why
- Use active voice, be direct
```

**Day 5-7: Your First Real Task**

Don't test with "hello world." Pick something you actually need:
- Rename a batch of files
- Parse a CSV and extract specific data
- Set up a basic web server

The key: Watch how Claude Code uses tools (Read, Write, Bash). You're learning the pattern.

**What Success Looks Like:**
- Claude Code runs commands without asking permission
- You understand why it reads files before editing them
- You've completed one small but real task end-to-end

### Week 2: Your First Hook

Hooks are pre-configured automations that run before/after Claude actions. They're your first taste of true agent behavior.

**Day 8-10: Install the Hooks System**

```bash
# Clone hooks starter kit
git clone https://github.com/id8labs/claude-hooks-starter.git ~/.claude/hooks

# Install dependencies
cd ~/.claude/hooks
npm install
```

**Day 11-12: Configure Your First Hook**

Start with `auto-approve-safe` - it auto-approves read-only commands but prompts for destructive ones.

Edit `~/.claude/hooks/config.json`:
```json
{
  "hooks": {
    "before-command": ["auto-approve-safe"]
  }
}
```

**Day 13-14: Test It**

Ask Claude to:
1. Read your package.json (should auto-approve)
2. Delete a file (should still prompt)

**What Success Looks Like:**
- Your hook runs automatically
- You see the difference in Claude's behavior
- You understand when automation is safe vs. risky

### Week 3: Your First MCP Server

MCP (Model Context Protocol) gives Claude superpowers. Start with filesystem access.

**Day 15-17: Install Filesystem MCP**

```bash
# Install the official filesystem server
npm install -g @modelcontextprotocol/server-filesystem

# Add to your Claude config
claude config add-server filesystem
```

**Day 18-20: Use It**

Ask Claude to:
- List all files in a directory
- Find files matching a pattern
- Read multiple files in parallel

Notice what's different: Claude can now see entire directory structures at once.

**Day 21: Try Git MCP**

```bash
npm install -g @modelcontextprotocol/server-git
claude config add-server git
```

Now ask Claude to check your git status, show uncommitted changes, or create a branch.

**What Success Looks Like:**
- Claude can navigate your filesystem intelligently
- You see how MCP servers extend Claude's capabilities
- You understand the difference between tools and servers

### Week 4: Build Something Small End-to-End

Pick a real project. Not a tutorial - something you'll actually use.

**Good starter projects:**
- Personal blog with static site generator
- CLI tool for a repetitive task you do
- Script to organize your downloads folder
- Simple API that serves data from a JSON file

**The Rules:**
1. Use Claude Code for the entire build
2. Ask Claude to explain decisions you don't understand
3. When you hit errors, let Claude fix them
4. Commit your work with git (using the git MCP)

**Day 22-28: Build**

Don't rush. The goal isn't to finish - it's to build your intuition for how to work with Claude.

**What Success Looks Like:**
- You've shipped something that works
- You've learned when to let Claude take the lead vs. when to guide it
- You know what to put in context files vs. what to explain in-conversation

## Tools You'll Need

**Core Tools:**
- [Claude Code CLI](https://docs.anthropic.com/claude/docs/claude-code) - Your main interface
- [Git](https://git-scm.com/) - Version control
- A text editor you're comfortable with

**MCP Servers (Start Here):**
- `@modelcontextprotocol/server-filesystem` - File operations
- `@modelcontextprotocol/server-git` - Git integration
- `@modelcontextprotocol/server-brave-search` - Web search (optional)

**Documentation:**
- [MCP Protocol Docs](https://modelcontextprotocol.io/)
- [Claude Hooks Guide](https://id8labs.io/resources/claude-hooks-guide)

## Common Mistakes at Your Level

**Mistake 1: Treating Claude Like a Chatbot**

You'll be tempted to ask questions instead of giving tasks. Break this habit early.

Bad: "How do I parse JSON in Node.js?"
Good: "Parse data.json and extract all email addresses into a CSV"

**Mistake 2: Not Using Version Control**

Every project should be a git repo from day one. Claude has git MCP - use it.

**Mistake 3: Over-Configuring Too Early**

Don't spend week 1 setting up 15 MCP servers. Start with filesystem and git. Add more when you actually need them.

**Mistake 4: Skipping the Context File**

Your `CLAUDE.md` file is your persistent memory. Update it as you learn your preferences. Without it, you'll repeat the same instructions every conversation.

**Mistake 5: Not Building Real Things**

Tutorials feel safe but teach you nothing. Build something you'll actually use, even if it's small.

## Next Steps

**After 30 Days:**

You should be at Adopter level (score 9-13). Signs you're ready:
- You use Claude Code for actual work, not just experiments
- You have 2-3 MCP servers configured and understand when to use each
- You've shipped at least one complete project with Claude
- You're starting to think in terms of "agent workflows" vs. "AI chat"

**Continue Learning:**
1. Read the [Agentic Architecture Patterns](https://id8labs.io/resources/agentic-patterns)
2. Explore the [MCP Server Directory](https://modelcontextprotocol.io/servers)
3. Join the [ID8Labs Discord](https://discord.gg/id8labs) - share what you're building

**When You're Ready for More:**

- **ID8Labs Office Hours** - Free monthly session where I answer questions live
- **Agent Workflow Audit** - I'll review your setup and suggest optimizations ($500, 2-hour session)
- **Custom Hook Development** - We'll build automation specific to your workflow (starting at $2k)

**Book a call:** [cal.com/id8labs/readiness-followup](https://cal.com/id8labs/readiness-followup)

---

Built by [ID8Labs](https://id8labs.io) - Making AI agents production-ready for teams who ship.

Last updated: December 2025
