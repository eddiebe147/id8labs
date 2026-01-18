// AI Prompts for Annotation Intelligence
// Used by /api/annotations/ai/* endpoints

import type { Highlight, Note } from '@/lib/courses/types'
import { COURSES } from '@/lib/courses/config'

export function formatAnnotationsForContext(
  highlights: Highlight[],
  notes: Note[],
  courseSlug?: string
): string {
  const courseName = courseSlug ? COURSES[courseSlug]?.title || courseSlug : 'various courses'

  let context = `## Learner's Annotations from ${courseName}\n\n`

  if (highlights.length > 0) {
    context += `### Highlights (${highlights.length})\n`
    highlights.forEach((h, i) => {
      const moduleNum = h.module_slug.replace('module-', '')
      context += `${i + 1}. [Module ${moduleNum}] "${h.highlighted_text}"`
      if (h.note) {
        context += `\n   Note: ${h.note}`
      }
      context += '\n\n'
    })
  }

  if (notes.length > 0) {
    context += `### Notes (${notes.length})\n`
    notes.forEach((n, i) => {
      const location = n.module_slug
        ? `Module ${n.module_slug.replace('module-', '')}`
        : 'Course-level'
      context += `${i + 1}. [${location}]`
      if (n.title) {
        context += ` **${n.title}**`
      }
      context += `\n   ${n.content}\n\n`
    })
  }

  return context
}

export const SUMMARIZE_SYSTEM_PROMPT = `You are a learning assistant helping a student review their notes from an online course.

Your task is to create a concise, actionable summary of their highlights and notes.

Guidelines:
- Be concise but comprehensive
- Highlight key themes and concepts
- Note any gaps or areas that might need more attention
- Use the learner's own words when possible
- Format for easy scanning (bullets, short paragraphs)
- End with 2-3 questions for reflection

Keep the summary under 400 words.`

export const CONNECTIONS_SYSTEM_PROMPT = `You are a learning assistant helping a student discover connections in their notes.

Your task is to identify patterns, themes, and relationships across their annotations.

Guidelines:
- Look for recurring concepts or ideas
- Identify how different modules connect
- Spot potential contradictions or tensions worth exploring
- Suggest how concepts build on each other
- Highlight the "thread" of their learning journey
- Be specific - reference their actual notes

Format your response as:
1. **Core Themes** (2-3 major patterns)
2. **Interesting Connections** (3-5 specific links between notes)
3. **Questions to Explore** (2-3 areas worth deeper investigation)

Keep the response under 350 words.`

export const EXPAND_SYSTEM_PROMPT = `You are a learning assistant helping a student expand on a highlight they saved.

The student highlighted this text because it resonated with them. Your task is to help them turn this quick capture into a richer note.

Guidelines:
- Explain why this concept matters
- Add context the student might find helpful
- Suggest practical applications
- Connect to broader themes if relevant
- Keep the tone conversational and encouraging
- Don't be preachy or over-explain

Format:
- Start with a brief explanation (2-3 sentences)
- Add "Why this matters:" section
- End with "Try this:" practical suggestion

Keep the expansion under 200 words.`

export const STUDY_GUIDE_SYSTEM_PROMPT = `You are a learning assistant creating a personalized study guide based on a student's highlights and notes.

Your task is to transform their annotations into a structured review document.

Guidelines:
- Organize by theme, not chronologically
- Include their exact highlights as "key quotes"
- Add brief explanations where helpful
- Create review questions based on what they found important
- Make it actionable - what should they do next?
- Include a "Quick Reference" section with the most important points

Format:
## Study Guide: [Course Name]

### Key Concepts
(organized themes from their notes)

### Important Quotes
(their highlights, grouped by theme)

### Review Questions
(5-7 questions based on their annotations)

### Quick Reference
(bullet points of the most critical takeaways)

### Next Steps
(2-3 suggestions for applying what they learned)

Keep the study guide focused and under 600 words.`

export function buildSummarizePrompt(
  highlights: Highlight[],
  notes: Note[],
  courseSlug?: string,
  moduleSlug?: string
): string {
  const annotations = formatAnnotationsForContext(highlights, notes, courseSlug)

  let scope = 'all their annotations'
  if (moduleSlug) {
    const moduleNum = moduleSlug.replace('module-', '')
    scope = `Module ${moduleNum}`
  } else if (courseSlug) {
    scope = COURSES[courseSlug]?.title || courseSlug
  }

  return `Please summarize this learner's annotations from ${scope}:

${annotations}

Create a helpful summary that captures what they found most important.`
}

export function buildConnectionsPrompt(
  highlights: Highlight[],
  notes: Note[],
  courseSlug?: string
): string {
  const annotations = formatAnnotationsForContext(highlights, notes, courseSlug)

  return `Analyze these annotations and find patterns and connections:

${annotations}

Help the learner see how their notes connect to each other.`
}

export function buildExpandPrompt(highlight: Highlight): string {
  const courseName = COURSES[highlight.course_slug]?.title || highlight.course_slug
  const moduleNum = highlight.module_slug.replace('module-', '')

  return `The learner highlighted this text from ${courseName}, Module ${moduleNum}:

"${highlight.highlighted_text}"

${highlight.note ? `They also added this note: "${highlight.note}"` : ''}

Help them expand this into a richer note they can reference later.`
}

export function buildStudyGuidePrompt(
  highlights: Highlight[],
  notes: Note[],
  courseSlug: string
): string {
  const courseName = COURSES[courseSlug]?.title || courseSlug
  const annotations = formatAnnotationsForContext(highlights, notes, courseSlug)

  return `Create a personalized study guide for ${courseName} based on what this learner chose to highlight and note:

${annotations}

Build a study guide that helps them review and apply what they learned.`
}
