// AI Conversation Fundamentals - 3-Day Nurture Sequence Email Templates

export const AI_FUNDAMENTALS_SEQUENCE = {
  id: 'ai-fundamentals-nurture',
  name: 'AI Conversation Fundamentals Nurture',
  totalSteps: 3,
  // Delays in hours from sequence start
  schedule: {
    1: 0,    // Immediate (or 4 hours if late evening)
    2: 24,   // +24 hours
    3: 48,   // +48 hours
  },
}

interface EmailTemplate {
  subject: string
  subjectVariants?: string[]
  html: string
}

export function getSequenceEmail(step: number, email: string): EmailTemplate | null {
  switch (step) {
    case 1:
      return getDay1Email(email)
    case 2:
      return getDay2Email(email)
    case 3:
      return getDay3Email(email)
    default:
      return null
  }
}

// ============================================
// DAY 1: Value-Add Tip
// ============================================
function getDay1Email(email: string): EmailTemplate {
  return {
    subject: 'The one thing that changes everything',
    subjectVariants: [
      "You're already ahead of 90% of AI users",
      'Quick tip from the course',
    ],
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
      <td style="padding: 30px 30px 20px; text-align: left;">
        <span style="color: #FF6B35; font-weight: bold; font-size: 20px;">id8</span><span style="color: #0A0A0A; font-weight: bold; font-size: 20px;">Labs</span>
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding: 20px 30px 40px;">
        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Hey,
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Thanks for checking out AI Conversation Fundamentals.
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Here's a quick tip that didn't make it into the course:
        </p>

        <h2 style="margin: 30px 0 15px; color: #0A0A0A; font-size: 20px; font-weight: bold;">
          The 10-Second Reset
        </h2>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          When AI output misses the mark, most people immediately start rewriting their prompt.
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          <strong>Don't.</strong>
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Instead, take 10 seconds to ask: <em>"What did the AI think I wanted?"</em>
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Read the output as a <em>diagnosis</em>. It's showing you exactly how your request was interpreted.
        </p>

        <p style="margin: 0 0 10px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Usually, you'll spot the gap instantly:
        </p>

        <ul style="margin: 0 0 20px; padding-left: 20px; color: #737373; font-size: 15px; line-height: 1.8;">
          <li>You asked for "professional" but got "corporate buzzword soup"</li>
          <li>You asked for "detailed" but got a 2,000-word wall of text</li>
          <li>You asked for "creative" but got clichés</li>
        </ul>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          The fix is almost never "better prompting." It's <strong>clearer constraints</strong>.
        </p>

        <p style="margin: 0 0 30px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Try it on your next AI conversation. You'll be surprised how often the problem becomes obvious.
        </p>

        <p style="margin: 0 0 10px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Talk soon,<br>
          Eddie
        </p>

        <p style="margin: 30px 0 0; padding-top: 20px; border-top: 1px solid #E5E5E5; color: #737373; font-size: 14px; line-height: 1.6;">
          P.S. If you haven't finished the course yet, Module 3 (The Iteration Loop) goes deeper on this exact skill.
        </p>

        <a href="https://id8labs.app/courses/ai-conversation-fundamentals?utm_source=email&utm_medium=nurture&utm_campaign=ai-fundamentals&utm_content=day-1" style="display: inline-block; margin-top: 15px; padding: 12px 24px; background-color: #FF6B35; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px;">
          Continue the Course →
        </a>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 30px; background-color: #f5f5f5; text-align: center;">
        <p style="margin: 0 0 10px; color: #737373; font-size: 14px;">
          ID8Labs - Professional Tools for the AI Era
        </p>
        <p style="margin: 0; color: #A3A3A3; font-size: 12px;">
          Miami, FL | <a href="https://id8labs.app" style="color: #A3A3A3;">id8labs.app</a>
        </p>
        <p style="margin: 15px 0 0; color: #A3A3A3; font-size: 11px;">
          <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #A3A3A3;">Unsubscribe</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`,
  }
}

// ============================================
// DAY 2: Social Proof + Soft Pitch
// ============================================
function getDay2Email(email: string): EmailTemplate {
  return {
    subject: 'From 3 hours to 20 minutes',
    subjectVariants: [
      '"I finally get it now"',
      'What happened when Sarah tried the framework',
    ],
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
      <td style="padding: 30px 30px 20px; text-align: left;">
        <span style="color: #FF6B35; font-weight: bold; font-size: 20px;">id8</span><span style="color: #0A0A0A; font-weight: bold; font-size: 20px;">Labs</span>
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding: 20px 30px 40px;">
        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Hey,
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Quick story from someone who went through the fundamentals course:
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Sarah runs content for a B2B SaaS company. She was spending 3+ hours per blog post—even with AI help.
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          The problem? She'd prompt, get mediocre output, tweak the prompt, get different mediocre output, and repeat until she gave up and just wrote it herself.
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Sound familiar?
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          After the course, she changed one thing:
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          <strong>She started giving Claude her actual quality bar.</strong>
        </p>

        <p style="margin: 0 0 20px; color: #737373; font-size: 15px; line-height: 1.6;">
          Not "write a good blog post."
        </p>

        <div style="margin: 20px 0; padding: 20px; background-color: #FFF5F0; border-left: 4px solid #FF6B35; border-radius: 4px;">
          <p style="margin: 0; color: #0A0A0A; font-size: 15px; line-height: 1.6; font-style: italic;">
            "Write like our best-performing posts. Conversational but credible. Short paragraphs. No corporate jargon. Include a specific example in every section."
          </p>
        </div>

        <p style="margin: 20px 0; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Same AI. Same topic. <strong>Completely different output.</strong>
        </p>

        <p style="margin: 0 0 30px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Her new workflow: 20 minutes for a first draft she actually wants to edit.
        </p>

        <p style="margin: 0 0 30px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          That's the shift the fundamentals course teaches. AI isn't magic—it's a conversation. And you now know how to have that conversation.
        </p>

        <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 30px 0;">

        <h2 style="margin: 0 0 15px; color: #0A0A0A; font-size: 18px; font-weight: bold;">
          Ready for the next level?
        </h2>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          The fundamentals gave you the mental models.
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          But there's a ceiling to what you can do in a chat interface.
        </p>

        <p style="margin: 0 0 15px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          <strong>Claude for Knowledge Workers</strong> teaches you to break through it:
        </p>

        <ul style="margin: 0 0 25px; padding-left: 20px; color: #737373; font-size: 15px; line-height: 1.8;">
          <li>Process entire folders of files</li>
          <li>Automate recurring workflows</li>
          <li>Delegate real tasks (not just writing)</li>
          <li>Build systems that run without you</li>
        </ul>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          It's 5 hands-on modules. You'll build real automations by the end of Module 1.
        </p>

        <a href="https://id8labs.app/courses/claude-for-knowledge-workers?utm_source=email&utm_medium=nurture&utm_campaign=ai-fundamentals&utm_content=day-2" style="display: inline-block; margin: 10px 0 20px; padding: 14px 28px; background-color: #FF6B35; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 6px;">
          Get the Full Course — $99
        </a>

        <p style="margin: 0 0 30px; color: #737373; font-size: 14px; line-height: 1.6;">
          Launch pricing. Won't last forever.
        </p>

        <p style="margin: 0; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Eddie
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 30px; background-color: #f5f5f5; text-align: center;">
        <p style="margin: 0 0 10px; color: #737373; font-size: 14px;">
          ID8Labs - Professional Tools for the AI Era
        </p>
        <p style="margin: 0; color: #A3A3A3; font-size: 12px;">
          Miami, FL | <a href="https://id8labs.app" style="color: #A3A3A3;">id8labs.app</a>
        </p>
        <p style="margin: 15px 0 0; color: #A3A3A3; font-size: 11px;">
          <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #A3A3A3;">Unsubscribe</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`,
  }
}

// ============================================
// DAY 3: Direct Pitch
// ============================================
function getDay3Email(email: string): EmailTemplate {
  return {
    subject: 'Chat vs. Code (the real difference)',
    subjectVariants: [
      "What you can't do in ChatGPT",
      "The ceiling you're about to hit",
    ],
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
      <td style="padding: 30px 30px 20px; text-align: left;">
        <span style="color: #FF6B35; font-weight: bold; font-size: 20px;">id8</span><span style="color: #0A0A0A; font-weight: bold; font-size: 20px;">Labs</span>
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding: 20px 30px 40px;">
        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Hey,
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Let me be direct:
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          The AI Conversation Fundamentals course taught you <em>how to think</em>.
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          But there's a hard limit to what you can do in a chat window.
        </p>

        <h2 style="margin: 30px 0 15px; color: #0A0A0A; font-size: 18px; font-weight: bold;">
          What you CAN'T do in ChatGPT or Claude.ai:
        </h2>

        <ul style="margin: 0 0 25px; padding-left: 20px; color: #0A0A0A; font-size: 15px; line-height: 1.8;">
          <li>Process 50 files at once</li>
          <li>Run code and see actual results</li>
          <li>Build workflows that trigger automatically</li>
          <li>Have AI read your screen and take action</li>
          <li>Create systems that work while you sleep</li>
        </ul>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          This isn't a prompting problem. It's an <em>interface</em> problem.
        </p>

        <h2 style="margin: 30px 0 15px; color: #FF6B35; font-size: 20px; font-weight: bold;">
          Claude Code changes the equation.
        </h2>

        <p style="margin: 0 0 15px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Same AI. But now it can:
        </p>

        <ul style="margin: 0 0 25px; padding-left: 20px; color: #737373; font-size: 15px; line-height: 1.8;">
          <li>Read files on your computer</li>
          <li>Execute commands</li>
          <li>Take real action on your behalf</li>
        </ul>

        <p style="margin: 0 0 30px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          The fundamentals you learned? They transfer directly. The mental models are the same.
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          But the capabilities? <strong>Completely different league.</strong>
        </p>

        <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 30px 0;">

        <h2 style="margin: 0 0 20px; color: #0A0A0A; font-size: 20px; font-weight: bold;">
          Claude for Knowledge Workers is the bridge.
        </h2>

        <p style="margin: 0 0 15px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          5 modules. Hands-on. You'll have a working automation by the end of the first lesson.
        </p>

        <p style="margin: 0 0 10px; color: #737373; font-size: 14px; line-height: 1.6;">
          Here's what's inside:
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0 30px; border: 1px solid #E5E5E5; border-radius: 8px; overflow: hidden;">
          <tr style="background-color: #F9F9F9;">
            <td style="padding: 12px 15px; border-bottom: 1px solid #E5E5E5;">
              <strong style="color: #FF6B35;">Module 0:</strong> <span style="color: #0A0A0A;">Install Claude Code + clean your Downloads folder</span> <span style="color: #10B981; font-size: 12px;">(free preview)</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #E5E5E5;">
              <strong style="color: #FF6B35;">Module 1:</strong> <span style="color: #0A0A0A;">Your first real delegation</span>
            </td>
          </tr>
          <tr style="background-color: #F9F9F9;">
            <td style="padding: 12px 15px; border-bottom: 1px solid #E5E5E5;">
              <strong style="color: #FF6B35;">Module 2:</strong> <span style="color: #0A0A0A;">File processing at scale</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #E5E5E5;">
              <strong style="color: #FF6B35;">Module 3:</strong> <span style="color: #0A0A0A;">Research workflows</span>
            </td>
          </tr>
          <tr style="background-color: #F9F9F9;">
            <td style="padding: 12px 15px; border-bottom: 1px solid #E5E5E5;">
              <strong style="color: #FF6B35;">Module 4:</strong> <span style="color: #0A0A0A;">Data transformation</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 15px;">
              <strong style="color: #FF6B35;">Module 5:</strong> <span style="color: #0A0A0A;">Building your personal AI system</span>
            </td>
          </tr>
        </table>

        <a href="https://id8labs.app/courses/claude-for-knowledge-workers?utm_source=email&utm_medium=nurture&utm_campaign=ai-fundamentals&utm_content=day-3" style="display: inline-block; margin: 10px 0 25px; padding: 16px 32px; background-color: #FF6B35; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 6px;">
          Get Instant Access — $99
        </a>

        <p style="margin: 0 0 30px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          This is the skillset that's going to separate "AI curious" from "AI fluent" over the next 2-3 years.
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          You've got the foundation. Time to build on it.
        </p>

        <p style="margin: 0 0 30px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Eddie
        </p>

        <p style="margin: 0; padding-top: 20px; border-top: 1px solid #E5E5E5; color: #737373; font-size: 14px; line-height: 1.6;">
          P.S. Already tried Module 0? Reply and tell me what you automated. I read every response.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 30px; background-color: #f5f5f5; text-align: center;">
        <p style="margin: 0 0 10px; color: #737373; font-size: 14px;">
          ID8Labs - Professional Tools for the AI Era
        </p>
        <p style="margin: 0; color: #A3A3A3; font-size: 12px;">
          Miami, FL | <a href="https://id8labs.app" style="color: #A3A3A3;">id8labs.app</a>
        </p>
        <p style="margin: 15px 0 0; color: #A3A3A3; font-size: 11px;">
          <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #A3A3A3;">Unsubscribe</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`,
  }
}
