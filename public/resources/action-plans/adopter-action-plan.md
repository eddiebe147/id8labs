# Adopter Action Plan
## From Chat-Based to Agent-Based

**Score: 9-13** | You use AI daily, but it's still ask-answer-copy-paste. Time to delegate.

---

## The One Thing to Understand

> **The shift from assistance to delegation is the shift from "help me with X" to "do X and show me the result."**

You're still the middleman. Stop orchestrating manually.

---

## Week 1: Fix Context Rot
Your biggest problem: re-explaining everything every conversation.

Create project-specific `CLAUDE.md` files:

```markdown
# [Project Name]

## Stack
- Next.js 14, Supabase, Tailwind, Vercel

## Key Files
- /app/api/ - API routes
- /lib/supabase.ts - DB client

## Patterns
- Zod for validation
- Conventional commits (feat:, fix:, docs:)
```

**Test:** Start fresh conversation. Don't explain anything. Does Claude follow your patterns?

---

## Week 2: Install MCPs That Matter
You need 3-4 servers, not 15. Priority order:

1. **Filesystem** - File operations
2. **Git** - Version control
3. **Database** - Postgres or SQLite
4. **Brave Search** - Research/docs lookup

**Test each one with a real task:**
- "Find all TODO comments and create a summary"
- "Show commits from last week that touched /api"

---

## Week 3: The PEV Pattern
**Plan → Execute → Verify**

Most people skip Verify. That's why agents ship bugs.

Add to your CLAUDE.md:

```markdown
## Execution Pattern
Before changes: Tell me what and why
After changes: Verify it worked
- Run tests
- Check for type errors
- Confirm the change happened

If verification fails: Stop. Explain. Fix. Verify again.
```

---

## Week 4: Basic Governance
Start tracking what agents do.

Create `AGENT_LOG.md` in your project:
- What you asked for
- What tools were used
- Outcome (success/partial/failed)
- Time saved

Review weekly. Double down on what works.

---

## You're Ready for Practitioner Level When:
- [ ] Context files are comprehensive and maintained
- [ ] You delegate entire workflows, not individual tasks
- [ ] PEV is automatic in your workflow
- [ ] You can show concrete time savings

---

## Hit a Wall?

Most Adopters struggle with context rot (outdated CLAUDE.md) or over-trusting without verification.

**Free:** [Agentic Architecture Patterns](https://id8labs.app/resources/agentic-patterns) - deep dive on PEV

**Paid:** Workflow audit + optimization ($500, 2 hours) → [Book here](https://cal.com/id8labs/adopter-audit)

---

*Built by [ID8Labs](https://id8labs.app) - Tools for Builders*
