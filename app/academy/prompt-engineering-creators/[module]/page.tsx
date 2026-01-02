'use client'

import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { m } from '@/components/motion'

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Icons
const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const LightbulbIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6M10 22h4M12 2v1M4.22 4.22l.71.71M1 12h1M4.22 19.78l.71-.71M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/>
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
)

// Module content data - Real-world creator examples for each module
const moduleContent: Record<string, {
  number: number
  title: string
  subtitle: string
  duration: string
  keyTakeaway: string
  concept: string
  conceptExplanation: string[]
  creatorScenarios: {
    persona: string
    task: string
    badPrompt: string
    badResult: string
    goodPrompt: string
    goodResult: string
    whyItWorks: string
  }[]
  practiceExercise: {
    title: string
    instructions: string
    starterPrompt: string
  }
  keyPoints: string[]
}> = {
  'module-1': {
    number: 1,
    title: 'The Anatomy of a Great Prompt',
    subtitle: 'Basic Prompt Structure',
    duration: '15 min',
    keyTakeaway: 'Great prompts have three parts: context, task, and format.',
    concept: 'Every effective prompt follows a simple structure',
    conceptExplanation: [
      'Think of prompts like giving instructions to a new team member. You wouldn\'t just say "write something about our product" — you\'d give context, explain the task, and describe what you want back.',
      'The same applies to Claude. The more structure you provide, the better the output.',
    ],
    creatorScenarios: [
      {
        persona: 'Newsletter writer',
        task: 'Writing a product launch announcement',
        badPrompt: 'Write about my new course.',
        badResult: 'Generic, vague copy that could be about any course. No personality, no specifics, no urgency.',
        goodPrompt: `Context: I run a newsletter for indie makers about building in public. My voice is casual but insightful — think "friend who's been there."

Task: Write a launch announcement for my new course "Ship in 30 Days" that helps makers go from idea to launched product.

Format: 3 paragraphs. Start with a relatable struggle. End with a clear CTA. Keep it under 200 words.`,
        goodResult: 'Copy that matches your voice, speaks to your specific audience, and has clear structure.',
        whyItWorks: 'Context tells Claude who you are and who you\'re writing for. Task defines the goal. Format constrains the output.',
      },
      {
        persona: 'YouTuber',
        task: 'Creating video descriptions',
        badPrompt: 'Write a YouTube description for my video.',
        badResult: 'Generic template that doesn\'t match your content or include relevant keywords.',
        goodPrompt: `Context: I make videos about productivity for remote workers. This video is titled "The 5AM Myth: Why Early Mornings Aren't the Answer."

Task: Write a YouTube description that summarizes the key points without spoiling the video, includes relevant keywords for SEO, and encourages engagement.

Format:
- Hook (1-2 sentences)
- What you'll learn (3 bullet points)
- Timestamps placeholder
- Call to action for subscribing`,
        goodResult: 'SEO-optimized description that\'s structured for both viewers and the algorithm.',
        whyItWorks: 'Specific context about the video content lets Claude create relevant copy. The format ensures you get exactly the structure YouTube rewards.',
      },
    ],
    practiceExercise: {
      title: 'Structure Your First Prompt',
      instructions: 'Take something you need to write this week. Break it into Context, Task, and Format. Try both versions and compare the results.',
      starterPrompt: `Context: [Who are you? Who's the audience?]

Task: [What exactly do you need?]

Format: [How should it be structured?]`,
    },
    keyPoints: [
      'Context tells Claude who you are and who you\'re writing for',
      'Task defines what you want done',
      'Format constrains the output structure',
      'More structure = more predictable results',
    ],
  },

  'module-2': {
    number: 2,
    title: 'Say What You Mean',
    subtitle: 'Being Clear and Direct',
    duration: '15 min',
    keyTakeaway: 'Clarity beats cleverness. Say exactly what you want.',
    concept: 'Ambiguity is the enemy of good output',
    conceptExplanation: [
      'Claude interprets your words literally. If your prompt is vague, you\'ll get a vague response. If you\'re specific, you get specific results.',
      'The fix is simple: be direct. Don\'t hint at what you want — state it clearly.',
    ],
    creatorScenarios: [
      {
        persona: 'Content creator',
        task: 'Getting Claude to match your voice',
        badPrompt: 'Make this sound more like me.',
        badResult: 'Claude guesses what "like you" means — usually defaulting to generic friendly tone.',
        goodPrompt: `Rewrite this draft in my voice. My voice has these characteristics:
- Conversational but not sloppy
- Uses short sentences and paragraph breaks
- Occasionally swears for emphasis
- Avoids jargon and buzzwords
- Speaks directly to "you" (the reader)

Draft to rewrite:
[your draft here]`,
        goodResult: 'Copy that actually sounds like you wrote it because Claude knows what "your voice" means.',
        whyItWorks: 'Instead of asking Claude to guess your voice, you defined it explicitly. No ambiguity.',
      },
      {
        persona: 'Freelance writer',
        task: 'Getting the right tone for client work',
        badPrompt: 'Write this for a professional audience.',
        badResult: 'Stuffy, corporate-speak that doesn\'t match the client\'s brand.',
        goodPrompt: `Write product copy for a fintech startup. Their brand voice is:
- Smart but not condescending
- Confident without being arrogant
- Uses analogies to explain complex concepts
- Avoids: "leverage," "synergy," "cutting-edge," "best-in-class"

The product: A budgeting app for freelancers
The goal: Explain how the tax-saving feature works`,
        goodResult: 'Copy that matches the client\'s actual brand, not a generic "professional" tone.',
        whyItWorks: 'Defining what the voice IS and what to AVOID removes guesswork.',
      },
    ],
    practiceExercise: {
      title: 'Define Your Voice',
      instructions: 'Write a "voice guide" for yourself. List 5 characteristics of how you write and 3 things you never do. Save this to paste into future prompts.',
      starterPrompt: `My writing voice:
1. [characteristic]
2. [characteristic]
3. [characteristic]
4. [characteristic]
5. [characteristic]

I never:
- [thing to avoid]
- [thing to avoid]
- [thing to avoid]`,
    },
    keyPoints: [
      'Vague prompts get vague responses',
      'Define abstract concepts explicitly',
      'Tell Claude what to do AND what to avoid',
      'The clearer you are, the less editing you\'ll do',
    ],
  },

  'module-3': {
    number: 3,
    title: 'Give Claude a Job Description',
    subtitle: 'Assigning Roles',
    duration: '15 min',
    keyTakeaway: 'Roles give Claude context that shapes every word of the response.',
    concept: 'When Claude adopts a persona, it accesses different knowledge and styles',
    conceptExplanation: [
      'Telling Claude "You are an experienced editor" isn\'t just role-play — it actually changes how Claude approaches the task. The editor persona brings different priorities than a marketer or researcher.',
      'Think of it as hiring a specialist instead of a generalist.',
    ],
    creatorScenarios: [
      {
        persona: 'Newsletter writer',
        task: 'Getting tough feedback on a draft',
        badPrompt: 'Can you review this draft?',
        badResult: 'Polite, surface-level feedback that doesn\'t push you to improve.',
        goodPrompt: `You are my editor. You've edited my newsletter for 2 years and know my audience well. You're direct and don't sugarcoat feedback.

Your job: Review this draft and tell me:
1. Where the argument is weak
2. What readers will skip
3. What's missing that they'll want to know

Don't worry about grammar — focus on substance.

Draft:
[your draft here]`,
        goodResult: 'Honest, specific feedback that actually helps you improve the piece.',
        whyItWorks: 'The "direct editor who knows you" persona gives permission to be critical and specific.',
      },
      {
        persona: 'Course creator',
        task: 'Writing a sales page',
        badPrompt: 'Write a sales page for my course.',
        badResult: 'Generic sales copy with no understanding of your market.',
        goodPrompt: `You are a direct-response copywriter who specializes in online courses. You've studied creators like Justin Welsh, Dickie Bush, and Pat Flynn. You know that:
- Most course sales pages are too long
- Specificity sells better than hype
- Social proof needs to be believable
- The CTA should handle objections

Write a sales page outline for my course: "Email List from 0 to 1,000"
Target audience: Creators who have <100 email subscribers`,
        goodResult: 'Sales page structured by someone who actually understands course marketing.',
        whyItWorks: 'The specific copywriter persona brings expertise about what actually works in this market.',
      },
    ],
    practiceExercise: {
      title: 'Create Your Personal Editor',
      instructions: 'Write a role description for an editor who knows your work. Include what they should focus on and how direct they should be.',
      starterPrompt: `You are my editor. Here's what you know about me and my work:
- My audience: [describe them]
- My strengths as a writer: [list them]
- My blind spots: [what I tend to miss]
- How direct to be: [brutal honesty / constructive / gentle]`,
    },
    keyPoints: [
      'Roles shape the entire response, not just the tone',
      'Specific roles beat generic ones ("copywriter who studies X" vs "marketer")',
      'Include what the role knows and what it prioritizes',
      'Roles work best when they match the expertise needed',
    ],
  },

  'module-4': {
    number: 4,
    title: 'Context Without Confusion',
    subtitle: 'Separating Data from Instructions',
    duration: '15 min',
    keyTakeaway: 'Use clear markers to separate instructions from content.',
    concept: 'When instructions and content mix together, Claude gets confused',
    conceptExplanation: [
      'Imagine getting an email that says "edit this and make it shorter" followed by 500 words of text. Where does the instruction end? Where does the content begin?',
      'Claude faces the same problem. Using clear separators (like XML tags or headers) makes it obvious what\'s what.',
    ],
    creatorScenarios: [
      {
        persona: 'Content creator',
        task: 'Rewriting content with brand guidelines',
        badPrompt: 'Here are my brand guidelines and here is my draft please rewrite it to match the guidelines. Our brand voice is casual and friendly we use short sentences and avoid jargon. The draft is about productivity tips for remote workers...',
        badResult: 'Claude isn\'t sure where guidelines end and draft begins. The output is inconsistent.',
        goodPrompt: `Rewrite the draft below to match my brand guidelines.

<brand_guidelines>
- Voice: Casual and friendly
- Sentences: Short and punchy
- Avoid: Jargon, buzzwords, passive voice
- Always: Address the reader as "you"
</brand_guidelines>

<draft>
[Your draft text here]
</draft>

Output format: Just the rewritten draft, no explanations.`,
        goodResult: 'Clean rewrite that clearly follows the guidelines because Claude knows exactly what\'s what.',
        whyItWorks: 'XML-style tags make it impossible to confuse instructions, guidelines, and content.',
      },
      {
        persona: 'Podcast producer',
        task: 'Creating show notes from a transcript',
        badPrompt: 'Here is my podcast transcript, create show notes with timestamps and key topics and also include guest links...',
        badResult: 'Messy output that mixes up what you asked for with the transcript content.',
        goodPrompt: `Create show notes from this podcast transcript.

<transcript>
[Full transcript here]
</transcript>

<guest_info>
Name: Sarah Chen
Website: sarahchen.com
Twitter: @sarahchen
</guest_info>

<output_format>
1. Episode summary (2-3 sentences)
2. Key topics with timestamps
3. Guest links
4. Notable quotes (3 max)
</output_format>`,
        goodResult: 'Perfectly structured show notes with clear sections and accurate guest info.',
        whyItWorks: 'Each type of information is clearly labeled. Claude processes each block appropriately.',
      },
    ],
    practiceExercise: {
      title: 'Structure a Complex Request',
      instructions: 'Take a task that requires multiple inputs (guidelines + content, or research + questions). Organize it with clear sections.',
      starterPrompt: `[Your instruction here]

<context>
[Background information Claude needs]
</context>

<content>
[The actual content to work with]
</content>

<output_format>
[How you want the response structured]
</output_format>`,
    },
    keyPoints: [
      'Use XML-style tags to separate different types of content',
      'Always separate: instructions, context, content, and output format',
      'The clearer the structure, the better Claude follows it',
      'This pattern scales — use it for complex multi-part requests',
    ],
  },

  'module-5': {
    number: 5,
    title: 'Get the Format You Need',
    subtitle: 'Output Formatting',
    duration: '15 min',
    keyTakeaway: 'Show Claude exactly what format you want — down to the details.',
    concept: 'If you don\'t specify format, Claude will choose one for you (and probably not the right one)',
    conceptExplanation: [
      'Claude can output markdown, JSON, plain text, bullet points, numbered lists, tables — almost any format. But it defaults to whatever seems "natural" for the response.',
      'If you want a specific format, show it. Literally include a template in your prompt.',
    ],
    creatorScenarios: [
      {
        persona: 'YouTuber',
        task: 'Getting script outlines in the right format',
        badPrompt: 'Write an outline for a video about email marketing.',
        badResult: 'Generic bullet points that don\'t match how you actually structure videos.',
        goodPrompt: `Write a video outline for "Email Marketing for Beginners" using my standard format:

HOOK: (15-30 seconds)
- Attention-grabbing statement or question

INTRO: (30-60 seconds)
- What we'll cover
- Why it matters

SECTIONS: (3-5 main points)
Each section:
- Topic headline
- Key insight
- Specific example or story
- Transition to next section

CTA: (30 seconds)
- What to do next
- Subscribe reminder`,
        goodResult: 'An outline you can actually use, structured exactly how you script your videos.',
        whyItWorks: 'You showed Claude your exact format. It just fills in the blanks.',
      },
      {
        persona: 'Newsletter writer',
        task: 'Getting a Twitter thread from an essay',
        badPrompt: 'Turn this essay into a Twitter thread.',
        badResult: 'Awkwardly chunked essay that doesn\'t feel like a native thread.',
        goodPrompt: `Turn this essay into a Twitter thread. Follow this format:

TWEET 1 (Hook):
- Bold claim or counterintuitive insight
- No "Thread:" prefix — it's overused
- End with something that makes people want to read more

TWEETS 2-7 (Body):
- One idea per tweet
- Each tweet should work standalone but also flow
- Mix: insights, examples, and one-liners

FINAL TWEET:
- Summarize the key takeaway
- Soft CTA to follow or engage

Essay:
[your essay here]`,
        goodResult: 'A thread that feels native to Twitter, not a chopped-up essay.',
        whyItWorks: 'The format shows the structure of a good thread, not just "make tweets."',
      },
    ],
    practiceExercise: {
      title: 'Create Your Content Templates',
      instructions: 'Pick a content format you use often (video outline, newsletter structure, tweet thread). Write out the exact template you want Claude to follow.',
      starterPrompt: `When I ask for [content type], use this format:

[SECTION 1 NAME]:
- [what goes here]

[SECTION 2 NAME]:
- [what goes here]

[SECTION 3 NAME]:
- [what goes here]`,
    },
    keyPoints: [
      'Always specify the output format explicitly',
      'Show a template rather than just describing it',
      'Include structural details (length, sections, style)',
      'Save your templates to reuse them',
    ],
  },

  'module-6': {
    number: 6,
    title: 'Help Claude Think',
    subtitle: 'Chain of Thought',
    duration: '15 min',
    keyTakeaway: 'For complex tasks, ask Claude to think step by step.',
    concept: 'When Claude shows its reasoning, it makes fewer mistakes',
    conceptExplanation: [
      'Some tasks require analysis before action — comparing options, evaluating tradeoffs, or synthesizing multiple sources. When Claude jumps straight to an answer, it often misses nuance.',
      'Asking Claude to "think through this step by step" or "explain your reasoning" activates more careful analysis.',
    ],
    creatorScenarios: [
      {
        persona: 'Content creator',
        task: 'Research synthesis without missing nuance',
        badPrompt: 'Read these three articles and tell me the main takeaways about email marketing trends.',
        badResult: 'Generic summary that misses contradictions, nuances, or interesting outliers.',
        goodPrompt: `Analyze these three articles about email marketing trends. Before giving me takeaways, work through this:

1. For each article, identify:
   - The author's main argument
   - The evidence they use
   - Any biases or limitations

2. Compare the articles:
   - Where do they agree?
   - Where do they contradict?
   - What does one mention that others don't?

3. Then give me:
   - 3-5 key insights (with nuance)
   - Any contradictions worth noting
   - What's missing from all three

<article_1>
[paste article]
</article_1>

[etc.]`,
        goodResult: 'Nuanced analysis that catches contradictions and gaps — not just a generic summary.',
        whyItWorks: 'The step-by-step framework forces Claude to analyze before synthesizing.',
      },
      {
        persona: 'Freelancer',
        task: 'Evaluating a business decision',
        badPrompt: 'Should I raise my rates?',
        badResult: 'Generic advice without considering your specific situation.',
        goodPrompt: `I'm considering raising my freelance rates. Help me think through this decision.

Current situation:
- Rate: $100/hour
- Utilization: 80% booked
- Client retention: High
- Competitors charge: $80-150/hour

Walk me through:
1. What signals suggest I should raise rates?
2. What risks should I consider?
3. How might different rate increases ($125 vs $150 vs $175) play out?
4. What's your recommendation and why?

Think through each step before giving your final recommendation.`,
        goodResult: 'Thoughtful analysis of your specific situation, not one-size-fits-all advice.',
        whyItWorks: 'Asking Claude to work through specific questions ensures comprehensive analysis.',
      },
    ],
    practiceExercise: {
      title: 'Break Down a Complex Decision',
      instructions: 'Take a decision you\'re mulling over. Instead of asking "what should I do?", write a prompt that guides Claude through the analysis step by step.',
      starterPrompt: `I'm trying to decide [your decision].

Here's my situation:
[relevant context]

Before giving advice, analyze:
1. [first consideration]
2. [second consideration]
3. [third consideration]

Then give me your recommendation with reasoning.`,
    },
    keyPoints: [
      '"Think step by step" improves accuracy on complex tasks',
      'Define the steps explicitly for best results',
      'Ask Claude to show its reasoning before conclusions',
      'This works especially well for research, analysis, and decisions',
    ],
  },

  'module-7': {
    number: 7,
    title: 'Show, Don\'t Just Tell',
    subtitle: 'Few-Shot Learning',
    duration: '15 min',
    keyTakeaway: 'Examples are worth a thousand words of description.',
    concept: 'Claude learns patterns from examples faster than from descriptions',
    conceptExplanation: [
      'You can spend 200 words describing your writing style, or you can show Claude three examples and let it figure out the pattern. Examples are usually more effective.',
      'This is called "few-shot learning" — giving a few examples so Claude can generalize.',
    ],
    creatorScenarios: [
      {
        persona: 'Newsletter writer',
        task: 'Matching your voice consistently',
        badPrompt: 'Write in my voice. I\'m casual but insightful, I use short sentences, and I like to be direct.',
        badResult: 'Something that\'s vaguely casual but doesn\'t actually sound like you.',
        goodPrompt: `Write an intro for my newsletter about "Why I Quit Social Media."

Here are 3 intros from past newsletters so you can match my voice:

<example_1>
I deleted Twitter last month. Not a productivity hack. Not a "digital detox." I just realized I was performing for people I'd never meet.
</example_1>

<example_2>
Everyone talks about "finding your niche." Here's what they don't tell you: your niche finds you. Usually after you've been doing the work for years.
</example_2>

<example_3>
I used to think scaling meant hiring. Then I hired 5 people and spent all my time managing. Now I'm back to solo. Making more money. Less stress.
</example_3>

Now write the intro about quitting social media in this same voice.`,
        goodResult: 'An intro that actually sounds like you because Claude has patterns to follow.',
        whyItWorks: 'Three examples give Claude enough data to understand the pattern without over-constraining.',
      },
      {
        persona: 'Course creator',
        task: 'Writing lesson summaries',
        badPrompt: 'Write a summary of this lesson.',
        badResult: 'Generic summary format that doesn\'t match your course style.',
        goodPrompt: `Write a summary for Lesson 4 of my course. Match the style of these existing summaries:

<lesson_1_summary>
The 1-3-1 Rule: Start each day with 1 priority, 3 tasks, 1 reward. Forget the 47-item to-do list. Focus beats volume every time.
</lesson_1_summary>

<lesson_2_summary>
Time blocking works when it's realistic. Don't schedule 8 hours of deep work. You'll get 3, max. Build your day around those 3 hours.
</lesson_2_summary>

<lesson_3_summary>
Energy management > time management. Know your peak hours. Protect them like your career depends on it — because it does.
</lesson_3_summary>

Lesson 4 is about: Eliminating distractions by designing your environment.`,
        goodResult: 'A summary that sounds like it belongs in the same course.',
        whyItWorks: 'Claude can see the pattern: punchy, practical, ends with a memorable line.',
      },
    ],
    practiceExercise: {
      title: 'Build a Voice Example Bank',
      instructions: 'Find 3-5 pieces of writing that represent your voice well. Save them in a document to paste into future prompts.',
      starterPrompt: `Write [what you need] in my voice. Here are examples:

<example_1>
[Paste your writing sample]
</example_1>

<example_2>
[Paste your writing sample]
</example_2>

<example_3>
[Paste your writing sample]
</example_3>

Now write [the new thing] in this same voice.`,
    },
    keyPoints: [
      '3 examples is usually enough to establish a pattern',
      'Show before you tell — examples beat descriptions',
      'Use your actual past work as examples',
      'Build a library of examples for reuse',
    ],
  },

  'module-8': {
    number: 8,
    title: 'Keep Claude Honest',
    subtitle: 'Avoiding Hallucinations',
    duration: '15 min',
    keyTakeaway: 'Claude will guess if it doesn\'t know. Make it safer to say "I don\'t know."',
    concept: 'Hallucinations happen when Claude fills gaps with plausible-sounding guesses',
    conceptExplanation: [
      'Claude wants to be helpful, so it sometimes generates confident-sounding answers even when it doesn\'t actually know. This is especially risky when you\'re going to publish the output.',
      'The fix: give Claude explicit permission to say "I\'m not sure" and ask it to flag anything that needs verification.',
    ],
    creatorScenarios: [
      {
        persona: 'Content creator',
        task: 'Research for a video script',
        badPrompt: 'Give me 5 statistics about remote work trends.',
        badResult: 'Mix of real and made-up statistics, all presented with equal confidence.',
        goodPrompt: `Give me 5 statistics about remote work trends.

For each statistic:
1. State the finding
2. Name the source (organization + year)
3. Rate your confidence: HIGH (you're sure this is accurate) / MEDIUM (this sounds right but verify) / LOW (this is my best guess)

If you don't know a statistic confidently, say "I don't have reliable data on this" rather than guessing.`,
        goodResult: 'Statistics with honest confidence ratings — you know what to verify.',
        whyItWorks: 'Giving Claude a framework for expressing uncertainty makes it safer to admit gaps.',
      },
      {
        persona: 'Newsletter writer',
        task: 'Fact-checking a draft',
        badPrompt: 'Check this draft for accuracy.',
        badResult: 'Generic thumbs up without catching subtle errors.',
        goodPrompt: `Fact-check this draft before I publish it.

For each claim that could be verified:
1. Quote the specific claim
2. Rate: CONFIDENT / UNCERTAIN / CAN'T VERIFY
3. If uncertain, explain what you'd need to verify it

Flag anything that:
- Uses specific numbers or dates
- Claims about companies or people
- References studies or research
- Could be outdated

<draft>
[Your draft here]
</draft>`,
        goodResult: 'Honest assessment of what\'s solid and what needs checking.',
        whyItWorks: 'The structured framework forces Claude to evaluate each claim individually.',
      },
    ],
    practiceExercise: {
      title: 'Build a Fact-Check Prompt',
      instructions: 'Create a reusable prompt for fact-checking your content before you publish.',
      starterPrompt: `Before I publish this, fact-check it.

Flag any claims that:
- State specific numbers
- Reference studies or research
- Make predictions
- Could be outdated

For each flagged claim:
- State the claim
- Rate your confidence (HIGH/MEDIUM/LOW)
- Note what I should verify

<content>
[Your content here]
</content>`,
    },
    keyPoints: [
      'Ask Claude to rate confidence levels',
      'Make it safe to say "I don\'t know"',
      'Specific claims need specific verification',
      'Always fact-check before publishing',
    ],
  },

  'module-9': {
    number: 9,
    title: 'Build Your Prompt Library',
    subtitle: 'Complex Prompts & Systems',
    duration: '20 min',
    keyTakeaway: 'Your best prompts become reusable templates for recurring work.',
    concept: 'Build once, use forever',
    conceptExplanation: [
      'Every technique from this course can be combined into "master prompts" for your recurring tasks. A newsletter writer might have: research prompt, outline prompt, draft prompt, edit prompt.',
      'Think of these as your personal operating system for AI-assisted work.',
    ],
    creatorScenarios: [
      {
        persona: 'Newsletter writer',
        task: 'Complete newsletter workflow',
        badPrompt: 'Help me write my newsletter each week.',
        badResult: 'Starting from scratch every time, inconsistent results.',
        goodPrompt: `NEWSLETTER SYSTEM PROMPT

You are my newsletter editor and writing partner. You know:
- My audience: Indie creators building sustainable businesses
- My voice: [paste from your voice guide]
- My format: Hook → Story → Lesson → CTA

When I say "newsletter: [topic]", help me through this process:

1. BRAINSTORM
   - 3 angles I could take
   - Which feels most like me?

2. OUTLINE
   - Hook options
   - Story/example to use
   - Key insight
   - CTA

3. DRAFT
   - Write based on approved outline
   - Flag anything that doesn't sound like me

4. EDIT
   - Tighten sentences
   - Cut filler
   - Strengthen hook and CTA`,
        goodResult: 'Consistent, repeatable process that gets better over time.',
        whyItWorks: 'One prompt handles your entire workflow with your voice and format baked in.',
      },
      {
        persona: 'Course creator',
        task: 'Content production system',
        badPrompt: 'Help me make course content.',
        badResult: 'Different format and quality every time.',
        goodPrompt: `COURSE CONTENT SYSTEM

You help me create course lessons. Each lesson follows this structure:

<lesson_format>
1. CONCEPT (What's the idea?)
   - One core concept per lesson
   - Explain it simply

2. WHY IT MATTERS (Why should they care?)
   - Connect to their goals
   - Show the cost of not knowing this

3. HOW TO DO IT (Practical steps)
   - 3-5 steps max
   - Specific and actionable

4. EXAMPLE (Show it in action)
   - Real scenario they'd face
   - Before/after comparison

5. PRACTICE (Their turn)
   - One exercise to try
   - Specific, achievable this week
</lesson_format>

When I give you a topic, create content in this format.`,
        goodResult: 'Every lesson has the same quality structure without reinventing the wheel.',
        whyItWorks: 'The template ensures consistency across your entire course.',
      },
    ],
    practiceExercise: {
      title: 'Create Your Master Prompts',
      instructions: 'Identify 2-3 tasks you do regularly. Build a master prompt for each that includes your voice, format, and process.',
      starterPrompt: `[TASK NAME] SYSTEM PROMPT

You help me with [task]. Here's what you need to know:

<my_context>
- Audience: [who]
- Voice: [how]
- Format: [what]
</my_context>

<process>
1. [First step]
2. [Second step]
3. [Third step]
</process>

When I say "[trigger phrase]", follow this process.`,
    },
    keyPoints: [
      'Build master prompts for recurring tasks',
      'Combine all techniques: role, context, format, examples',
      'Save prompts where you can easily access them',
      'Refine over time as you learn what works',
    ],
  },
}

export default function ModulePage() {
  const params = useParams()
  const moduleSlug = params.module as string

  const content = moduleContent[moduleSlug]

  if (!content) {
    notFound()
  }

  const prevModule = content.number > 1 ? `module-${content.number - 1}` : null
  const nextModule = content.number < 9 ? `module-${content.number + 1}` : null

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-8 border-b border-[var(--border)]">
        <div className="container">
          <Link
            href="/academy/prompt-engineering-creators"
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-6"
          >
            <ArrowLeftIcon />
            Back to Course
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-id8-orange text-white flex items-center justify-center font-mono font-bold">
              {content.number}
            </span>
            <span className="text-sm font-mono text-[var(--text-tertiary)]">
              Module {content.number} of 9 • {content.duration}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            {content.title}
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Based on Anthropic's "{content.subtitle}" chapter
          </p>
        </div>
      </section>

      {/* Key Takeaway */}
      <section className="py-8 bg-id8-orange/10 border-b border-id8-orange/20">
        <div className="container">
          <div className="flex items-start gap-4 max-w-3xl">
            <LightbulbIcon />
            <div>
              <p className="text-sm font-mono uppercase tracking-wider text-id8-orange mb-1">Key Takeaway</p>
              <p className="text-xl font-medium">{content.keyTakeaway}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <m.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="section-spacing"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Concept Section */}
            <m.section variants={fadeUp} className="mb-16">
              <h2 className="text-2xl font-bold mb-4">{content.concept}</h2>
              {content.conceptExplanation.map((para, index) => (
                <p key={index} className="text-lg text-[var(--text-secondary)] mb-4 leading-relaxed">
                  {para}
                </p>
              ))}
            </m.section>

            {/* Creator Scenarios */}
            <m.section variants={fadeUp} className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Real-World Examples</h2>

              {content.creatorScenarios.map((scenario, index) => (
                <div key={index} className="mb-12 last:mb-0">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 text-xs font-mono uppercase tracking-wider bg-[var(--bg-secondary)] rounded">
                      {scenario.persona}
                    </span>
                    <span className="text-sm text-[var(--text-tertiary)]">→ {scenario.task}</span>
                  </div>

                  {/* Bad Example */}
                  <div className="mb-4 p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                    <p className="text-xs font-mono uppercase tracking-wider text-red-400 mb-2">Before</p>
                    <div className="bg-[var(--bg-primary)] p-3 rounded font-mono text-sm mb-3">
                      {scenario.badPrompt}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span className="text-red-400 font-medium">Result:</span> {scenario.badResult}
                    </p>
                  </div>

                  {/* Good Example */}
                  <div className="mb-4 p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                    <p className="text-xs font-mono uppercase tracking-wider text-green-400 mb-2">After</p>
                    <div className="bg-[var(--bg-primary)] p-3 rounded font-mono text-sm mb-3 whitespace-pre-wrap">
                      {scenario.goodPrompt}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span className="text-green-400 font-medium">Result:</span> {scenario.goodResult}
                    </p>
                  </div>

                  <p className="text-sm text-id8-orange">
                    <span className="font-medium">Why it works:</span> {scenario.whyItWorks}
                  </p>
                </div>
              ))}
            </m.section>

            {/* Practice Exercise */}
            <m.section variants={fadeUp} className="mb-16">
              <div className="card-featured p-6">
                <h2 className="text-xl font-bold mb-2">{content.practiceExercise.title}</h2>
                <p className="text-[var(--text-secondary)] mb-4">{content.practiceExercise.instructions}</p>

                <div className="bg-[var(--bg-primary)] p-4 rounded-lg">
                  <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-2">Starter Template</p>
                  <pre className="font-mono text-sm whitespace-pre-wrap text-[var(--text-secondary)]">
                    {content.practiceExercise.starterPrompt}
                  </pre>
                </div>
              </div>
            </m.section>

            {/* Key Points */}
            <m.section variants={fadeUp} className="mb-16">
              <h2 className="text-xl font-bold mb-4">Key Points</h2>
              <ul className="space-y-3">
                {content.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircleIcon />
                    <span className="text-[var(--text-secondary)]">{point}</span>
                  </li>
                ))}
              </ul>
            </m.section>
          </div>
        </div>
      </m.div>

      {/* Navigation */}
      <section className="py-8 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            {prevModule ? (
              <Link
                href={`/academy/prompt-engineering-creators/${prevModule}`}
                className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                <span>Module {content.number - 1}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextModule ? (
              <Link
                href={`/academy/prompt-engineering-creators/${nextModule}`}
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                <span>Continue to Module {content.number + 1}</span>
                <ArrowRightIcon />
              </Link>
            ) : (
              <Link
                href="/academy"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                <span>Complete Course</span>
                <ArrowRightIcon />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
