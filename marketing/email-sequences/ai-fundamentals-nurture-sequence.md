# AI Conversation Fundamentals - 3-Day Nurture Sequence

**Trigger:** User subscribes via email capture on:
- Course landing page (`source: ai-conversation-fundamentals-landing`)
- Module 6 completion (`source: ai-conversation-fundamentals-module-6`)

**Goal:** Convert free course completers to paid Claude for Knowledge Workers course ($99)

---

## Email 1: Day 1 (Immediate or +4 hours)

**Subject Lines (A/B Test):**
- A: The one thing that changes everything
- B: You're already ahead of 90% of AI users
- C: Quick tip from the course

**From:** Eddie @ ID8Labs

**Body:**

Hey,

Thanks for checking out AI Conversation Fundamentals.

Here's a quick tip that didn't make it into the course:

**The 10-Second Reset**

When AI output misses the mark, most people immediately start rewriting their prompt.

Don't.

Instead, take 10 seconds to ask: "What did the AI think I wanted?"

Read the output as a *diagnosis*. It's showing you exactly how your request was interpreted.

Usually, you'll spot the gap instantly:
- You asked for "professional" but got "corporate buzzword soup"
- You asked for "detailed" but got a 2,000-word wall of text
- You asked for "creative" but got clichés

The fix is almost never "better prompting." It's clearer constraints.

Try it on your next AI conversation. You'll be surprised how often the problem becomes obvious.

Talk soon,
Eddie

P.S. If you haven't finished the course yet, Module 3 (The Iteration Loop) goes deeper on this exact skill.

[Continue the Course →](https://id8labs.app/courses/ai-conversation-fundamentals)

---

## Email 2: Day 2 (+24 hours)

**Subject Lines (A/B Test):**
- A: From 3 hours to 20 minutes
- B: "I finally get it now"
- C: What happened when Sarah tried the framework

**From:** Eddie @ ID8Labs

**Body:**

Hey,

Quick story from someone who went through the fundamentals course:

Sarah runs content for a B2B SaaS company. She was spending 3+ hours per blog post—even with AI help.

The problem? She'd prompt, get mediocre output, tweak the prompt, get different mediocre output, and repeat until she gave up and just wrote it herself.

Sound familiar?

After the course, she changed one thing:

**She started giving Claude her actual quality bar.**

Not "write a good blog post."

This: "Write like our best-performing posts. Conversational but credible. Short paragraphs. No corporate jargon. Include a specific example in every section."

Same AI. Same topic. Completely different output.

Her new workflow: 20 minutes for a first draft she actually wants to edit.

That's the shift the fundamentals course teaches. AI isn't magic—it's a conversation. And you now know how to have that conversation.

---

**Ready for the next level?**

The fundamentals gave you the mental models.

But there's a ceiling to what you can do in a chat interface.

**Claude for Knowledge Workers** teaches you to break through it:

- Process entire folders of files
- Automate recurring workflows
- Delegate real tasks (not just writing)
- Build systems that run without you

It's 5 hands-on modules. You'll build real automations by the end of Module 1.

[**Get the Full Course — $99**](https://id8labs.app/courses/claude-for-knowledge-workers)

Launch pricing. Won't last forever.

Eddie

---

## Email 3: Day 3 (+48 hours)

**Subject Lines (A/B Test):**
- A: Chat vs. Code (the real difference)
- B: What you can't do in ChatGPT
- C: The ceiling you're about to hit

**From:** Eddie @ ID8Labs

**Body:**

Hey,

Let me be direct:

The AI Conversation Fundamentals course taught you *how to think*.

But there's a hard limit to what you can do in a chat window.

**What you CAN'T do in ChatGPT or Claude.ai:**

- Process 50 files at once
- Run code and see actual results
- Build workflows that trigger automatically
- Have AI read your screen and take action
- Create systems that work while you sleep

This isn't a prompting problem. It's an *interface* problem.

**Claude Code changes the equation.**

Same AI. But now it can:
- Read files on your computer
- Execute commands
- Take real action on your behalf

The fundamentals you learned? They transfer directly. The mental models are the same.

But the capabilities? Completely different league.

---

**Claude for Knowledge Workers** is the bridge.

5 modules. Hands-on. You'll have a working automation by the end of the first lesson.

Here's what's inside:

**Module 0:** Install Claude Code + clean your Downloads folder (free preview)
**Module 1:** Your first real delegation
**Module 2:** File processing at scale
**Module 3:** Research workflows
**Module 4:** Data transformation
**Module 5:** Building your personal AI system

[**Get Instant Access — $99**](https://id8labs.app/courses/claude-for-knowledge-workers)

This is the skillset that's going to separate "AI curious" from "AI fluent" over the next 2-3 years.

You've got the foundation. Time to build on it.

Eddie

P.S. Already tried Module 0? Reply and tell me what you automated. I read every response.

---

## Sequence Technical Notes

### Timing
- Email 1: Immediate (or 4 hours if signup is late evening)
- Email 2: +24 hours from Email 1
- Email 3: +48 hours from Email 1 (24 hours after Email 2)

### Segmentation Rules
- If user purchases course → Remove from sequence immediately
- If user clicks course link in Email 2 but doesn't purchase → Send Email 3
- If user doesn't open Email 1 → Resend with different subject line after 24 hours

### Tracking
- UTM parameters on all links: `?utm_source=email&utm_medium=nurture&utm_campaign=ai-fundamentals&utm_content=day-{1|2|3}`
- Track: Opens, clicks, course page visits, purchases

### Follow-up Sequence (Optional - Day 7)
If no purchase after Day 3:
- Send "Last chance" email with urgency angle
- Or: Invite to Discord community as soft touch
- Or: Share new essay/resource to maintain relationship

---

## Implementation Notes

### Recommended Tools
- **Resend** (already integrated for transactional email)
- **Loops.so** or **ConvertKit** for sequences
- **Supabase** to track subscriber journey

### Integration Points
1. Email capture components already submit to `/api/subscribe`
2. Need to add sequence trigger after successful subscription
3. Consider webhook to email provider on signup

### Copy Variations to Test
- Day 1: Tip-focused vs. story-focused
- Day 2: Social proof vs. direct value
- Day 3: Urgency vs. FOMO vs. logical progression
