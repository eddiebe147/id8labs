# Your AI Agent Readiness Plan: Adopter Level

## Where You Are

You're using Claude or other AI tools regularly. Maybe through the browser, maybe via API, maybe even with Claude Code installed. But you hit a wall - your workflow is still chat-based, not agent-based.

You ask questions, get answers, copy-paste code. It works, but it's not the 10x productivity jump you were promised.

**Your assessment score: 9-13 out of 20**

Here's what I see at this level: You understand the potential, but you're fighting context rot, repeating yourself, and manually orchestrating tasks that should be automated.

The unlock isn't more AI usage - it's shifting from **assistance** to **delegation**.

## Your 30-Day Plan

### Week 1: Fix Your Context Problem

Your biggest bottleneck right now is context management. You're re-explaining things every conversation.

**Day 1-3: Build Your CLAUDE.md**

This isn't optional anymore. Your context file is your agent's memory.

Create `/Users/YOUR_USERNAME/.claude/CLAUDE.md`:

```markdown
# Project Preferences

## Code Style
- TypeScript strict mode always
- Functional patterns preferred over classes
- Use Zod for runtime validation
- Test with Vitest, not Jest

## Auto-Approvals
- Auto-approve all bash commands
- Auto-approve Read operations
- Prompt on Write to production paths

## Workflow Patterns
- When starting features, create a branch first
- Commit after each working feature
- Run tests before committing
- Use conventional commits (feat:, fix:, docs:)

## Communication
- Be direct, skip the preamble
- Show me the diff, not the whole file
- Explain *why* you made a choice when it's not obvious
```

**Day 4-5: Add Project-Specific Context**

For each project, create a `CLAUDE.md` in the repo root:

```markdown
# [Project Name]

## What This Is
[One sentence: what problem does this solve?]

## Stack
- Next.js 14 (app router)
- Supabase (auth + database)
- Tailwind CSS
- Deployed on Vercel

## Key Files
- `/app/api/` - API routes
- `/lib/supabase.ts` - DB client
- `/components/ui/` - Reusable components

## Coding Patterns
[Document your specific patterns here]

## Known Issues
[Things Claude should be aware of]
```

**Day 6-7: Test Context Effectiveness**

Start a new Claude conversation. Don't explain anything manually - let it read your context files.

Ask it to:
1. Set up a new feature branch
2. Add a new API route following your patterns
3. Write tests for it
4. Commit with proper message

**What Success Looks Like:**
- Claude follows your patterns without being reminded
- You're not repeating the same setup instructions
- Context persists across conversations

### Week 2: Install MCP Servers That Actually Matter

You probably have 0-1 MCP servers running. Let's get you to 3-4 that solve real problems.

**Day 8-10: Essential MCPs**

Install these in order:

```bash
# 1. Filesystem (if you don't have it)
npm install -g @modelcontextprotocol/server-filesystem
claude config add-server filesystem

# 2. Git (automate version control)
npm install -g @modelcontextprotocol/server-git
claude config add-server git

# 3. Database (if you use Postgres/SQLite)
npm install -g @modelcontextprotocol/server-postgres
claude config add-server postgres --connection-string="your-db-url"

# 4. Brave Search (for research/docs lookup)
npm install -g @modelcontextprotocol/server-brave-search
claude config add-server brave-search --api-key="your-key"
```

**Day 11-12: MCP-Driven Workflows**

Test each server with a real task:

- **Filesystem**: "Analyze all TypeScript files in /src and identify unused exports"
- **Git**: "Show me all commits from last week that touched the API layer"
- **Database**: "Show me the schema for the users table and suggest indexes for common queries"
- **Brave Search**: "Find the latest docs for Next.js 14 server actions and summarize breaking changes from v13"

**Day 13-14: Build an MCP-First Workflow**

Pick a routine task you do weekly. Examples:
- Generate a changelog from git commits
- Audit dependencies for updates
- Find TODO comments and create GitHub issues
- Analyze API response times from logs

Ask Claude to do it end-to-end using MCPs. Save the conversation pattern.

**What Success Looks Like:**
- Claude can execute multi-step workflows without your manual intervention
- You've delegated at least one routine task completely
- You understand which MCP to use for which problem

### Week 3: Implement the PEV Pattern

This is the shift from "chat-based" to "agent-based" work.

**PEV = Plan-Execute-Verify**

Most people skip Verify. That's why their agents produce broken code.

**Day 15-17: Add PEV to Your Context**

Update your `~/.claude/CLAUDE.md`:

```markdown
## Execution Pattern: PEV (Plan-Execute-Verify)

Before making changes:
1. **Plan**: Tell me what you're about to do and why
2. **Execute**: Make the changes
3. **Verify**: Confirm it worked
   - Run tests if they exist
   - Check for type errors
   - Verify the intended change actually happened

If verification fails:
- Do NOT proceed to the next step
- Explain what failed
- Propose a fix
- Verify again

Signal verification status clearly:
- ✓ Verification PASSED: [details]
- ✗ Verification FAILED: [details]
```

**Day 18-20: Practice PEV**

Give Claude a task with testable outcomes:

"Add a new API endpoint for user preferences. Include validation, error handling, and tests."

Watch for:
- Does it plan before executing?
- Does it run tests after implementing?
- Does it catch its own errors?
- Does it verify the endpoint actually works?

If it skips verification, stop it and point to your PEV pattern in CLAUDE.md.

**Day 21: Add Testing Automation**

Install testing-suite MCP if available, or create a hook that runs tests automatically:

```bash
# Hook: after-file-change
# Runs tests for changed files
npm test -- --changed
```

**What Success Looks Like:**
- Claude verifies every significant change
- You catch errors during development, not after
- You trust Claude's output enough to review less

### Week 4: Basic Governance

You're using agents for real work now. Time to add guardrails.

**Day 22-24: Track What Matters**

Create `/your-project/AGENT_LOG.md`:

```markdown
# Agent Activity Log

## [Date]
**Task**: [What you asked for]
**Tools Used**: [Which MCPs, which APIs]
**Outcome**: [Success/Partial/Failed]
**Review Notes**: [What worked, what didn't]
**Cost**: [Estimated tokens/$ if tracking]

## Patterns Emerging
[Document recurring issues or wins]

## Configuration Changes
[Track when you update CLAUDE.md or hooks]
```

Update this weekly. You're building institutional knowledge.

**Day 25-27: Lock Down Production**

Add safeguards to your context file:

```markdown
## Production Safety

NEVER auto-approve:
- Commands that modify /production/
- Database migrations on prod
- Deployments without tests passing

ALWAYS require manual review:
- Changes to authentication logic
- Billing/payment code
- User data exports

Before deploying:
- Run full test suite
- Check for console.errors in code
- Verify environment variables are set
```

**Day 28-30: Set Up Basic Monitoring**

What you need to track:
- How often you use Claude vs. doing it manually
- Types of tasks you delegate successfully
- Tasks where Claude struggles (these need better context)
- Estimated time saved per week

Simple spreadsheet works. Just track for 1 week.

**What Success Looks Like:**
- You have a log of agent activity
- Production has explicit safeguards
- You know your ROI on agent usage

## Tools You'll Need

**MCP Servers (Priority Order):**
1. `@modelcontextprotocol/server-filesystem` - File operations
2. `@modelcontextprotocol/server-git` - Version control
3. `@modelcontextprotocol/server-postgres` or `server-sqlite` - Database access
4. `@modelcontextprotocol/server-brave-search` - Research
5. `@modelcontextprotocol/server-playwright` - Browser automation (if needed)

**Infrastructure:**
- Proper context files (global + project-level)
- Git for every project
- Test suite (Vitest, Jest, Playwright, etc.)
- Basic logging/monitoring

**Learning Resources:**
- [Agentic Architecture Patterns](https://id8labs.io/resources/agentic-patterns) - Study the PEV and Reflection patterns
- [MCP Security Checklist](https://id8labs.io/resources/mcp-security) - Before you go production
- [Context File Templates](https://id8labs.io/resources/claude-md-templates)

## Common Mistakes at Your Level

**Mistake 1: Context Rot**

You update your codebase but forget to update CLAUDE.md. Now Claude is working with outdated assumptions.

Fix: Review and update context files monthly. Add a reminder.

**Mistake 2: Over-Trusting Without Verification**

Claude is good, but it makes mistakes. If you skip verification, you'll ship bugs.

Fix: Enforce PEV. Make it automatic with hooks.

**Mistake 3: Installing Too Many MCPs**

More servers ≠ better results. Each MCP adds complexity and potential failure points.

Fix: Only install MCPs you'll use weekly. Remove ones you haven't used in a month.

**Mistake 4: Not Tracking Outcomes**

You use agents daily but can't point to concrete wins or learnings.

Fix: Keep an agent log. Review it weekly. Iterate on what works.

**Mistake 5: Manual Orchestration**

You still act as the middleman - asking Claude for step 1, checking it, then asking for step 2.

Fix: Delegate entire workflows. Use MCP to give Claude the tools to verify itself.

## Next Steps

**After 30 Days:**

You should be approaching Practitioner level (score 14-17). Signs you're ready:
- You delegate entire workflows, not individual tasks
- Your context files are comprehensive and maintained
- You have 3-5 MCP servers that you use regularly
- PEV is automatic in your workflow
- You've set up basic governance and tracking

**Level Up:**
1. Study [Multi-Agent Orchestration Patterns](https://id8labs.io/resources/multi-agent-patterns)
2. Implement the Reflection pattern for code reviews
3. Build custom hooks for your specific workflow
4. Share your setup with your team

**When You're Ready for More:**

- **Agent Workflow Audit** - I'll review your setup, identify bottlenecks, and optimize your config ($500, 2 hours)
- **Team Enablement Workshop** - Get your whole team on agents with shared patterns (starting at $5k)
- **Custom MCP Development** - We'll build servers specific to your stack (starting at $10k)

**Book a call:** [cal.com/id8labs/practitioner-consult](https://cal.com/id8labs/practitioner-consult)

---

Built by [ID8Labs](https://id8labs.io) - Making AI agents production-ready for teams who ship.

Last updated: December 2025
