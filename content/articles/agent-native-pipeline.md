# We Were Already Building Agent-Native (We Just Didn't Have the Words)

*How reading Dan Shipper's article revealed we were on the same wavelength—and helped us reinforce what we were already doing*

---

**TL;DR:** We read Dan Shipper and Claude's "Agent-native Architectures" article, then looked at our own work on Deepstack, MILO, and Lexicon. The realization: we were already building this way. We just hadn't named it. Dan's framework gave us the vocabulary to articulate what we were doing—and the structure to reinforce it. That's the beauty of building in public. We share knowledge that empowers each other.

---

## The Question That Started It All

When we started building ID8Composer, one question drove every decision:

> **"Can the AI do what I can do, so that all I have to do is ask?"**

That's it. That's the whole philosophy.

If I can create a document, can the AI create a document? If I can search my notes, can the AI search my notes? If I can compose a workflow from multiple tools, can the AI compose that same workflow?

The answer had to be yes. Otherwise, what's the point?

That question shaped everything we built at ID8Labs. MILO, Lexicon, Deepstack, Pause—each one designed so the agent could achieve anything the user could achieve. We just never had a name for it.

## The Recognition

Then we read Dan Shipper and Claude's article on agent-native architectures. And something clicked.

> "The surprising discovery: A really good coding agent is actually a really good general-purpose agent."

We weren't learning something new. We were recognizing something familiar.

Looking back at Deepstack—the poker AI that reasons through hands—we'd been designing for agent autonomy all along. The agent doesn't just respond to prompts. It queries the knowledge graph, weighs evidence, synthesizes insights, and knows when to stop.

MILO was the same story. We built it so the agent could compose actions, access system state, and achieve outcomes we never explicitly coded for.

We were on the same wavelength. Dan just gave us the vocabulary.

## From Intuition to Framework

The difference between intuition and framework is rigor.

We were building agent-native apps, but inconsistently. Some features had full agent parity. Others didn't. Some tools were atomic primitives. Others bundled too much logic.

Dan's article gave us the language to audit ourselves:

- **Parity** — Could an agent do everything the UI could?
- **Granularity** — Were our tools atomic enough?
- **CRUD Completeness** — Could agents fully manage every entity?
- **Completion Signals** — Did agents know when they were done?
- **Context Injection** — Did agents know what they were working with?

We had most of this. But we had gaps. And now we had a framework to find them.

## Reinforcing What We Already Had

The article defines five core principles. Here's how they mapped to what we were already doing—and where they helped us tighten up:

### 1. Parity
*"Whatever the user can do through the UI, the agent should be able to achieve through tools."*

**What we already had:** This was our founding question—"Can the AI do what I can do?" In Deepstack, agents could query hands, analyze ranges, and save insights. In Lexicon, agents could create and query entities.

**What we formalized:** PARITY_MAP.md—a living document that explicitly tracks every UI action and its corresponding agent capability. No more hoping we have parity. Now we audit it.

### 2. Granularity
*"Tools should be atomic primitives. Features are outcomes achieved by an agent operating in a loop."*

**What we already had:** Our tools were generally atomic. `read_file()`, `search_graph()`, `create_entity()`. We'd learned the hard way that bundled tools limit agent creativity.

**What we formalized:** An explicit design principle during Stage 3 (Architecture). No more `analyze_and_organize()`. Keep tools atomic. Let agents compose.

### 3. CRUD Completeness
*"For every entity in your system, verify the agent has full Create, Read, Update, Delete capability."*

**What we already had:** Most entities had full CRUD. But we'd never audited systematically.

**What we formalized:** Stage 5 now includes a CRUD checklist. Before a feature is "complete," we verify all four operations exist for every entity.

### 4. Completion Signals
*"Agents need an explicit way to say 'I'm done.'"*

**What we already had:** Our agents returned structured responses with success indicators.

**What we formalized:** Explicit `{ success, output, shouldContinue }` return signatures. No more detecting completion via heuristics.

### 5. Context Injection
*"The agent needs to know what it's working with."*

**What we already had:** Agents received session context, user preferences, and system state.

**What we formalized:** A standardized context.md file for each project that tracks everything an agent needs to know—what exists, what the user has done, what the guidelines are.

## How We Integrated It Into the Pipeline

We didn't create a new pipeline. We enhanced the existing one.

### Pattern 6: Agent-Native Design

We added a sixth agentic pattern to our existing five (Reflection, PEV, Metacognitive, Tree of Thoughts, Ensemble):

```markdown
## Pattern 6: Agent-Native Design

When building features that agents will use, ensure:

1. **Parity** - Agent can achieve anything the UI can do
2. **Granularity** - Tools are atomic primitives
3. **CRUD Completeness** - Every entity has full agent access
4. **Completion Signals** - Agents explicitly signal "done"
5. **Context Injection** - Agents know what exists

Signal to user: "Agent-native check: [PASS/FAIL] - [what's missing]"
```

### Stage Enhancements

Each relevant stage got agent-native additions:

**Stage 2 (Scope Fence):**
- Identify which features will have agent capabilities
- Define what outcomes agents should achieve

**Stage 3 (Architecture Sketch):**
- Create PARITY_MAP.md with all planned UI actions
- Design tool architecture (atomic primitives)
- Plan context.md structure

**Stage 5 (Feature Blocks):**
- CRUD Complete: Can agent Create, Read, Update, Delete this entity?
- Completion Signals: Does tool return `shouldContinue`?
- Parity: Update PARITY_MAP.md with implemented tools
- Approval Flow: Classify by stakes/reversibility

**Stage 6 (Integration Pass):**
- Agent-to-UI events standardized
- context.md updates on all significant actions
- No silent agent actions

**Stage 7 (Test Coverage):**
- Parity tests: For each UI action, test agent can achieve same outcome
- CRUD tests: Every entity has agent tests

**Stage 11 (Listen & Iterate):**
- Log agent requests that succeed (signal)
- Log agent requests that fail (reveals gaps)
- Weekly review: What are users asking agents to do?

### New Commands

We added three new commands for quick audits:

- `parity check` → Audit PARITY_MAP.md, report gaps
- `crud audit` → Check all entities have full CRUD
- `agent-native status` → Report Pattern 6 compliance

## The Pilot: Lexicon

We ran the first audit on Lexicon, our graph-powered knowledge platform for story universes.

### What We Found

**The Good News:** 95% parity already achieved.

| Entity | CRUD Status |
|--------|-------------|
| Entity | 4/4 |
| Relationship | 4/4 |
| Storyline | 4/4 |
| Conversation | 3/4 (missing Update) |
| Notification | 4/4 |
| Preferences | 2/2 |

Total: 40/42 UI actions have agent parity.

**The Gaps:**
- Conversation title editing (no PUT endpoint)
- Bulk update/delete (individual operations only)
- Data export (import exists, export doesn't)

### The PARITY_MAP.md

We created a formal parity map that documents every UI action and its corresponding API:

```markdown
## Entity: Entity

| User Action | Agent Tool / API | Status |
|-------------|-----------------|--------|
| Create Entity | POST /api/entities | Complete |
| Read Entity | GET /api/entities/[id] | Complete |
| Update Entity | PUT /api/entities/[id] | Complete |
| Delete Entity | DELETE /api/entities/[id] | Complete |
```

### The context.md

We created a context file that gives agents awareness of the system:

```markdown
## What Exists

- ~50 entities in Neo4j
- ~30 relationships
- 3+ storylines
- 42 API endpoints

## My Guidelines

1. Prioritize graph data over web search
2. Always include citations
3. Express confidence levels
```

## Approval Flow Matrix

One insight from the article we particularly liked: classify actions by stakes and reversibility.

| Stakes | Reversibility | Pattern | Example |
|--------|--------------|---------|---------|
| Low | Easy | Auto-apply | Create entity |
| Low | Hard | Quick confirm | Publish content |
| High | Easy | Suggest + apply | Code changes |
| High | Hard | Explicit approval | Delete entity |

This is now part of Stage 5. Every agent action gets classified.

## The Ultimate Test

The article proposes a simple test:

> "Describe an outcome to the agent that's within your application's domain but that you didn't build a specific feature for. Can it figure out how to accomplish it?"

For Lexicon, we tried: "Find all characters who have a rivalry relationship and summarize their conflicts."

The agent:
1. Used the search API to find entities
2. Queried relationships filtered by type
3. Synthesized an answer with citations

It worked. No dedicated "find rivalries" feature exists—the agent composed primitives to achieve the outcome.

## What's Next

This is version 1.0 of our agent-native pipeline. We're planning:

1. **Automated audits** - A skill that scans projects for PARITY_MAP.md and reports compliance
2. **Latent demand discovery** - Logging what users ask agents to do to discover feature gaps
3. **Completion signal standardization** - Moving from HTTP status codes to explicit `shouldContinue` in tool responses

## Key Takeaways

1. **Start with the question.** "Can the AI do what I can do, so all I have to do is ask?" If you're asking this, you're already thinking agent-native.

2. **You might already be building this way.** Look at your existing work. You may have the intuition without the framework.

3. **Frameworks turn intuition into rigor.** We had the instincts. Dan's article gave us the structure to audit and reinforce them.

4. **Document what you formalize.** PARITY_MAP.md and context.md make implicit knowledge explicit.

5. **The ultimate test is simple.** Can an agent accomplish something you didn't explicitly build for?

## The Beauty of Building in Public

This is why building in public matters.

Dan and Claude published their thinking. We read it, recognized ourselves in it, and used their framework to strengthen what we were already doing. Now we're sharing how we applied it.

Someone else will read this. Maybe they'll recognize their own work. Maybe they'll take what we've done and push it further. That's how knowledge compounds.

We're all working on the same problem: making AI that can truly do what we can do, so we can focus on what matters. The more we share, the faster we all get there.

---

*Inspired by "Agent-native Architectures" by Dan Shipper and Claude, published on Every. We didn't adopt their framework—we discovered we were already on the same wavelength, then used their language to reinforce our own.*

---

## Resources

- [Agent-native Architectures (Every)](https://every.to/chain-of-thought/agent-native-architectures)
- [Our PARITY_MAP.md template](/.claude/templates/PARITY_MAP.md.template)
- [Our context.md template](/.claude/templates/context.md.template)
