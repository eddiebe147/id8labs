// ID8 Academy Onboarding - 7-Email Welcome Sequence
// Triggers: After $99 Masterclass purchase via Stripe webhook

export const ACADEMY_ONBOARDING_SEQUENCE = {
  id: 'academy-onboarding',
  name: 'ID8 Academy Onboarding',
  totalSteps: 7,
  // Delays in hours from sequence start
  schedule: {
    1: 0,      // Immediate
    2: 24,     // +1 day
    3: 72,     // +3 days
    4: 168,    // +7 days
    5: 336,    // +14 days
    6: 504,    // +21 days
    7: 0,      // Triggered on completion (handled separately)
  },
}

interface EmailTemplate {
  subject: string
  subjectVariants?: string[]
  html: string
}

export function getAcademyOnboardingEmail(step: number, email: string): EmailTemplate | null {
  switch (step) {
    case 1:
      return getWelcomeEmail(email)
    case 2:
      return getFirst48HoursEmail(email)
    case 3:
      return getMiloIntroEmail(email)
    case 4:
      return getProgressCheckEmail(email)
    case 5:
      return getHalfwayEmail(email)
    case 6:
      return getFinalPushEmail(email)
    case 7:
      return getGraduationEmail(email)
    default:
      return null
  }
}

// Shared styles
const HEADER_HTML = `
    <!-- Header -->
    <tr>
      <td style="padding: 30px 30px 20px; text-align: left;">
        <span style="color: #FF6B35; font-weight: bold; font-size: 20px;">id8</span><span style="color: #0A0A0A; font-weight: bold; font-size: 20px;">Academy</span>
      </td>
    </tr>
`

const FOOTER_HTML = `
    <!-- Footer -->
    <tr>
      <td style="padding: 30px; background-color: #f5f5f5; text-align: center;">
        <p style="margin: 0 0 10px; color: #737373; font-size: 14px;">
          ID8 Academy - Learn to Build with AI
        </p>
        <p style="margin: 0; color: #A3A3A3; font-size: 12px;">
          Miami, FL | <a href="https://id8labs.app" style="color: #A3A3A3;">id8labs.app</a>
        </p>
        <p style="margin: 15px 0 0; color: #A3A3A3; font-size: 11px;">
          <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #A3A3A3;">Unsubscribe</a>
        </p>
      </td>
    </tr>
`

const EMAIL_WRAPPER_START = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
`

const EMAIL_WRAPPER_END = `
  </table>
</body>
</html>
`

// ============================================
// EMAIL 1: Welcome to ID8 Academy
// Send: Immediately after purchase
// ============================================
function getWelcomeEmail(email: string): EmailTemplate {
  return {
    subject: "You're in. Here's your Academy access.",
    subjectVariants: [
      'Welcome to ID8 Academy',
      'Your Academy dashboard is ready',
    ],
    html: `${EMAIL_WRAPPER_START}
${HEADER_HTML}
    <!-- Main Content -->
    <tr>
      <td style="padding: 20px 30px 40px;">
        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Hey,
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Welcome to ID8 Academy.
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          You just made a decision most people avoid — investing in how you think, not just what you do.
        </p>

        <h2 style="margin: 30px 0 15px; color: #0A0A0A; font-size: 18px; font-weight: bold;">
          Here's what happens next:
        </h2>

        <div style="margin: 20px 0; padding: 20px; background-color: #FFF5F0; border-left: 4px solid #FF6B35; border-radius: 4px;">
          <p style="margin: 0 0 15px; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            <strong>→ Your Academy Dashboard</strong><br>
            Everything lives here. Modules, resources, your progress.
          </p>
          <p style="margin: 0 0 15px; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            <strong>→ Start with Module 1: The Innovation Mindset</strong><br>
            Takes about 20 minutes. Do it today while momentum is fresh.
          </p>
          <p style="margin: 0; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            <strong>→ Meet MILO</strong><br>
            Your AI co-pilot for implementation. We'll introduce you properly in a few days.
          </p>
        </div>

        <p style="margin: 20px 0; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          No fluff. No filler. Just frameworks that work.
        </p>

        <a href="https://id8labs.app/academy?utm_source=email&utm_medium=onboarding&utm_campaign=academy&utm_content=welcome" style="display: inline-block; margin: 10px 0 25px; padding: 14px 28px; background-color: #FF6B35; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 6px;">
          Open Your Dashboard →
        </a>

        <p style="margin: 0 0 10px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          See you inside,<br>
          Eddie
        </p>

        <p style="margin: 30px 0 0; padding-top: 20px; border-top: 1px solid #E5E5E5; color: #737373; font-size: 14px; line-height: 1.6;">
          P.S. — Bookmark your dashboard. You'll be back often.
        </p>
      </td>
    </tr>
${FOOTER_HTML}
${EMAIL_WRAPPER_END}`,
  }
}

// ============================================
// EMAIL 2: Your First 48 Hours
// Send: Day 1 (+24 hours)
// ============================================
function getFirst48HoursEmail(email: string): EmailTemplate {
  return {
    subject: 'The one thing that separates finishers from browsers',
    subjectVariants: [
      "Don't be part of the 67%",
      'Your first 48 hours matter',
    ],
    html: `${EMAIL_WRAPPER_START}
${HEADER_HTML}
    <!-- Main Content -->
    <tr>
      <td style="padding: 20px 30px 40px;">
        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Hey,
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Quick truth: <strong>67% of online course buyers never finish.</strong>
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          You're not going to be one of them. Here's why:
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          The Academy is built different. Each module is under 30 minutes. No 4-hour lectures. No endless theory.
        </p>

        <div style="margin: 25px 0; padding: 20px; background-color: #F9F9F9; border-radius: 8px;">
          <p style="margin: 0 0 10px; color: #0A0A0A; font-size: 15px; font-weight: bold;">
            Your move today:
          </p>
          <p style="margin: 0 0 8px; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            □ Complete Module 1 if you haven't
          </p>
          <p style="margin: 0; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            □ Start Module 2: Problem Framing
          </p>
        </div>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          That's it. Two modules. Under an hour total.
        </p>

        <p style="margin: 0 0 25px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          The people who finish aren't smarter — they just <strong>move faster at the start</strong>.
        </p>

        <a href="https://id8labs.app/academy?utm_source=email&utm_medium=onboarding&utm_campaign=academy&utm_content=day1" style="display: inline-block; margin: 10px 0 25px; padding: 14px 28px; background-color: #FF6B35; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 6px;">
          Open Your Dashboard →
        </a>

        <p style="margin: 0; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Talk soon,<br>
          Eddie
        </p>
      </td>
    </tr>
${FOOTER_HTML}
${EMAIL_WRAPPER_END}`,
  }
}

// ============================================
// EMAIL 3: Introducing MILO
// Send: Day 3 (+72 hours)
// ============================================
function getMiloIntroEmail(email: string): EmailTemplate {
  return {
    subject: 'Meet your implementation partner',
    subjectVariants: [
      'Introducing MILO',
      'The tool that makes the learning stick',
    ],
    html: `${EMAIL_WRAPPER_START}
${HEADER_HTML}
    <!-- Main Content -->
    <tr>
      <td style="padding: 20px 30px 40px;">
        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Hey,
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          You've got the frameworks. Now let's talk execution.
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          <strong>MILO</strong> is the AI tool we built to help you actually use what you're learning.
        </p>

        <h2 style="margin: 30px 0 15px; color: #FF6B35; font-size: 18px; font-weight: bold;">
          Here's what MILO does:
        </h2>

        <ul style="margin: 0 0 25px; padding-left: 20px; color: #0A0A0A; font-size: 15px; line-height: 1.8;">
          <li>Breaks down your projects into actionable steps</li>
          <li>Applies ID8 frameworks to your specific situation</li>
          <li>Keeps you accountable without the busywork</li>
        </ul>

        <div style="margin: 25px 0; padding: 20px; background-color: #FFF5F0; border-left: 4px solid #FF6B35; border-radius: 4px;">
          <p style="margin: 0; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            <strong>The Academy teaches you HOW to think.</strong><br>
            MILO helps you DO the thinking.
          </p>
        </div>

        <a href="https://id8labs.app/milo?utm_source=email&utm_medium=onboarding&utm_campaign=academy&utm_content=milo-intro" style="display: inline-block; margin: 10px 0 25px; padding: 14px 28px; background-color: #FF6B35; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 6px;">
          Open MILO →
        </a>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          <strong>Try this:</strong> Tell MILO about a project you're stuck on. Watch what happens.
        </p>

        <p style="margin: 0 0 10px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Eddie
        </p>

        <p style="margin: 30px 0 0; padding-top: 20px; border-top: 1px solid #E5E5E5; color: #737373; font-size: 14px; line-height: 1.6;">
          P.S. — MILO gets smarter the more you use it. Start today.
        </p>
      </td>
    </tr>
${FOOTER_HTML}
${EMAIL_WRAPPER_END}`,
  }
}

// ============================================
// EMAIL 4: Progress Check
// Send: Day 7 (+168 hours)
// ============================================
function getProgressCheckEmail(email: string): EmailTemplate {
  return {
    subject: 'Week one — where are you?',
    subjectVariants: [
      'Quick check-in',
      "Module 3 is where it clicks",
    ],
    html: `${EMAIL_WRAPPER_START}
${HEADER_HTML}
    <!-- Main Content -->
    <tr>
      <td style="padding: 20px 30px 40px;">
        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Hey,
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          It's been a week. Quick check-in.
        </p>

        <div style="margin: 25px 0; padding: 20px; background-color: #F9F9F9; border-radius: 8px;">
          <p style="margin: 0 0 15px; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            <strong>If you're ahead:</strong> Nice. Keep moving. The best modules are still coming.
          </p>
          <p style="margin: 0; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            <strong>If you're behind:</strong> That's fine. Life happens.
          </p>
        </div>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          But here's the thing — <strong>Module 3 (Rapid Prototyping)</strong> is where most students have their first "aha" moment.
        </p>

        <p style="margin: 0 0 25px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Don't let it sit.
        </p>

        <a href="https://id8labs.app/academy?utm_source=email&utm_medium=onboarding&utm_campaign=academy&utm_content=week1" style="display: inline-block; margin: 10px 0 25px; padding: 14px 28px; background-color: #FF6B35; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 6px;">
          Pick Up Where You Left Off →
        </a>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          One module today. That's the only ask.
        </p>

        <p style="margin: 0; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Eddie
        </p>
      </td>
    </tr>
${FOOTER_HTML}
${EMAIL_WRAPPER_END}`,
  }
}

// ============================================
// EMAIL 5: The Halfway Point
// Send: Day 14 (+336 hours)
// ============================================
function getHalfwayEmail(email: string): EmailTemplate {
  return {
    subject: "You're halfway. Here's what changes now.",
    subjectVariants: [
      'The second half is different',
      'From theory to revenue',
    ],
    html: `${EMAIL_WRAPPER_START}
${HEADER_HTML}
    <!-- Main Content -->
    <tr>
      <td style="padding: 20px 30px 40px;">
        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Hey,
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          If you've been following along, you're about halfway through the Academy.
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Here's what I want you to notice:
        </p>

        <div style="margin: 25px 0; padding: 20px; background-color: #FFF5F0; border-left: 4px solid #FF6B35; border-radius: 4px;">
          <p style="margin: 0 0 10px; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            <strong>The first half</strong> was about SEEING differently.
          </p>
          <p style="margin: 0; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            <strong>The second half</strong> is about BUILDING differently.
          </p>
        </div>

        <p style="margin: 0 0 15px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Modules 4-6 get tactical. You'll walk away with:
        </p>

        <ul style="margin: 0 0 25px; padding-left: 20px; color: #0A0A0A; font-size: 15px; line-height: 1.8;">
          <li>A validation framework you can use tomorrow</li>
          <li>A launch checklist that removes guesswork</li>
          <li>The ID8 feedback loop that compounds results</li>
        </ul>

        <p style="margin: 0 0 25px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          This is where theory becomes revenue.
        </p>

        <a href="https://id8labs.app/academy?utm_source=email&utm_medium=onboarding&utm_campaign=academy&utm_content=halfway" style="display: inline-block; margin: 10px 0 25px; padding: 14px 28px; background-color: #FF6B35; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 6px;">
          Continue to Module 4 →
        </a>

        <p style="margin: 0 0 10px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Almost there,<br>
          Eddie
        </p>

        <p style="margin: 30px 0 0; padding-top: 20px; border-top: 1px solid #E5E5E5; color: #737373; font-size: 14px; line-height: 1.6;">
          P.S. — Have you been using MILO? Open it alongside Module 4. Apply what you learn in real-time.
        </p>
      </td>
    </tr>
${FOOTER_HTML}
${EMAIL_WRAPPER_END}`,
  }
}

// ============================================
// EMAIL 6: Final Push
// Send: Day 21 (+504 hours)
// ============================================
function getFinalPushEmail(email: string): EmailTemplate {
  return {
    subject: 'One module left. Then: your certificate.',
    subjectVariants: [
      "You're almost a graduate",
      'The finish line is here',
    ],
    html: `${EMAIL_WRAPPER_START}
${HEADER_HTML}
    <!-- Main Content -->
    <tr>
      <td style="padding: 20px 30px 40px;">
        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Hey,
        </p>

        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          You're <strong>one module away</strong> from completing ID8 Academy.
        </p>

        <div style="margin: 25px 0; padding: 20px; background-color: #F9F9F9; border-radius: 8px;">
          <p style="margin: 0 0 10px; color: #0A0A0A; font-size: 15px; font-weight: bold;">
            When you finish:
          </p>
          <p style="margin: 0 0 8px; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            ✓ You'll receive your Certificate of Completion
          </p>
          <p style="margin: 0 0 8px; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            ✓ You can share it directly to LinkedIn
          </p>
          <p style="margin: 0; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            ✓ You'll unlock the "Graduate" resources in your dashboard
          </p>
        </div>

        <p style="margin: 0 0 25px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Module 6 is the capstone. It ties everything together.
        </p>

        <a href="https://id8labs.app/academy?utm_source=email&utm_medium=onboarding&utm_campaign=academy&utm_content=final-push" style="display: inline-block; margin: 10px 0 25px; padding: 14px 28px; background-color: #FF6B35; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 6px;">
          Finish Module 6 →
        </a>

        <p style="margin: 0; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          See you at graduation.<br><br>
          Eddie
        </p>
      </td>
    </tr>
${FOOTER_HTML}
${EMAIL_WRAPPER_END}`,
  }
}

// ============================================
// EMAIL 7: Graduation
// Send: Triggered on course completion
// ============================================
function getGraduationEmail(email: string): EmailTemplate {
  return {
    subject: "You did it. Here's your certificate.",
    subjectVariants: [
      'Congratulations, Graduate',
      'ID8 Academy: Complete',
    ],
    html: `${EMAIL_WRAPPER_START}
${HEADER_HTML}
    <!-- Main Content -->
    <tr>
      <td style="padding: 20px 30px 40px;">
        <p style="margin: 0 0 20px; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Hey,
        </p>

        <p style="margin: 0 0 20px; color: #FF6B35; font-size: 20px; font-weight: bold;">
          Congratulations — you've completed ID8 Academy.
        </p>

        <div style="margin: 25px 0; padding: 25px; background-color: #FFF5F0; border-radius: 8px; text-align: center;">
          <p style="margin: 0 0 15px; color: #0A0A0A; font-size: 16px; font-weight: bold;">
            Your Certificate of Completion
          </p>
          <a href="https://id8labs.app/academy/certificate?utm_source=email&utm_medium=onboarding&utm_campaign=academy&utm_content=graduation" style="display: inline-block; padding: 12px 24px; background-color: #FF6B35; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px;">
            Download Certificate
          </a>
        </div>

        <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://id8labs.app/academy/certificate" style="display: inline-block; margin: 10px 0 25px; padding: 12px 24px; background-color: #0A66C2; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px;">
          Share on LinkedIn →
        </a>

        <h2 style="margin: 30px 0 15px; color: #0A0A0A; font-size: 18px; font-weight: bold;">
          What happens now:
        </h2>

        <div style="margin: 20px 0; padding: 20px; background-color: #F9F9F9; border-radius: 8px;">
          <p style="margin: 0 0 15px; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            <strong>1. MILO is yours forever.</strong><br>
            Keep using it. The more you use it, the more valuable it becomes.
          </p>
          <p style="margin: 0 0 15px; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            <strong>2. You're now part of the ID8 community.</strong><br>
            Our monthly newsletter lands in your inbox with fresh frameworks, case studies, and tools.
          </p>
          <p style="margin: 0; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
            <strong>3. Graduate resources are unlocked in your dashboard.</strong><br>
            Templates, checklists, and advanced materials.
          </p>
        </div>

        <p style="margin: 25px 0; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Thank you for trusting us with your growth.
        </p>

        <p style="margin: 0 0 20px; color: #FF6B35; font-size: 18px; font-weight: bold;">
          Now go build something.
        </p>

        <p style="margin: 0; color: #0A0A0A; font-size: 16px; line-height: 1.6;">
          Eddie<br>
          <span style="color: #737373;">Founder, ID8 Labs</span>
        </p>
      </td>
    </tr>
${FOOTER_HTML}
${EMAIL_WRAPPER_END}`,
  }
}
