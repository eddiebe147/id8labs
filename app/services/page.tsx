'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

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

// Icon components
const ClockIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
)

const SparklesIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
)

const LayoutIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M3 9h18M9 21V9"/>
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

// Data
const problems = [
  { icon: <ClockIcon />, text: "You've bookmarked 47 tutorials you'll \"watch later\"" },
  { icon: <SparklesIcon />, text: "Every prompt feels like starting from scratch" },
  { icon: <LayoutIcon />, text: "You know there's a better way but can't find the time to build it" },
  { icon: <TrendingUpIcon />, text: "Meanwhile, competitors are shipping faster than you" },
]

const services = [
  {
    tier: "Tier 1",
    name: "The Workshop",
    price: "$297",
    description: "2-hour intensive session. Walk in confused, walk out with workflows you'll use tomorrow.",
    features: [
      "Live prompt demonstrations",
      "Custom applications for your work",
      "20 prompt templates (PDF)",
      "30 days follow-up support",
    ],
    popular: false,
  },
  {
    tier: "Tier 2",
    name: "The Sprint",
    price: "$1,997",
    description: "4 weeks. We implement 3 AI workflows together. You learn by doing, with me guiding every step.",
    features: [
      "Weekly 90-min working sessions",
      "3 fully implemented workflows",
      "Custom templates and SOPs",
      "Daily async support",
      "Recorded sessions for reference",
    ],
    popular: true,
  },
  {
    tier: "Tier 3",
    name: "The Build",
    price: "$5,997",
    description: "8 weeks. Full AI integration for your operation. Done with you, built to last.",
    features: [
      "Complete AI integration roadmap",
      "Custom GPTs or Claude Projects built",
      "Team training included",
      "Process documentation",
      "90 days of follow-up support",
    ],
    popular: false,
  },
]

const audiences = [
  {
    title: "Business owners drowning in busywork",
    description: "Emails, proposals, follow-ups eating your week. You need systems, not more hours.",
  },
  {
    title: "Founders shipping too slowly",
    description: "Your competitors are using AI to move faster. You need to catch up — now.",
  },
  {
    title: "Creative professionals scaling up",
    description: "More clients means more admin. AI handles the repetitive stuff so you can do the real work.",
  },
  {
    title: "Anyone tired of feeling behind",
    description: "You know AI matters. You just need someone to show you how to actually use it.",
  },
]

const credentials = [
  { highlight: "90 Day Fiancé", role: "— Story Production" },
  { highlight: "The First 48", role: "— Director of Photography" },
  { highlight: "High on the Hog (Netflix)", role: "— Cinematography" },
  { highlight: "Teen Mom", role: "— Camera & Production" },
  { highlight: "3+ years", role: "daily AI workflow integration" },
  { highlight: "ID8Labs", role: "— Founder, building AI tools for creators" },
]

export default function ServicesPage() {
  const contactEmail = "eddie.belaval@gmail.com"
  const bookingUrl = `mailto:${contactEmail}?subject=AI%20Implementation%20-%20Let's%20Talk&body=Hey%20Eddie%2C%0A%0AI'm%20interested%20in%20learning%20more%20about%20your%20AI%20implementation%20services.%0A%0AA%20bit%20about%20me%3A%0A-%20What%20I%20do%3A%20%0A-%20Biggest%20time%20sink%3A%20%0A-%20What%20I'm%20hoping%20AI%20can%20help%20with%3A%20%0A%0ALet's%20find%20a%20time%20to%20chat.`

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-zone-text">
        <div className="container">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-6"
            >
              AI Implementation Services
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] font-bold tracking-tight mb-8"
            >
              Stop watching tutorials.
              <br />
              <span className="text-gradient-orange">Start using AI.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed"
            >
              You know AI matters. You've played with ChatGPT. But turning that into actual workflows that save you hours every week? That's where most people get stuck. We fix that.
            </motion.p>

            <motion.div variants={fadeUp}>
              <a
                href={bookingUrl}
                className="btn btn-primary hover-lift group inline-flex items-center gap-3"
              >
                Book a Call
                <ArrowRightIcon />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Problem Section */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                The real problem isn't the tools.{' '}
                <span className="text-gradient-orange">It's implementation.</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                You're tech-savvy. You're not afraid of new software. But between running your business and keeping up with the AI tsunami, something falls through the cracks: actually setting this stuff up.
              </p>
            </div>

            <motion.ul
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="space-y-0"
            >
              {problems.map((problem, index) => (
                <motion.li
                  key={index}
                  variants={fadeUp}
                  className="flex items-start gap-4 py-5 border-b border-[var(--border)] last:border-b-0"
                >
                  <span className="text-id8-orange flex-shrink-0 mt-0.5">
                    {problem.icon}
                  </span>
                  <span className="text-[var(--text-secondary)] text-lg">
                    {problem.text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]" id="services">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Services
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Three ways to work together
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-lg mx-auto">
              From hands-on training to full implementation. Pick what fits.
            </p>
          </div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className={`relative overflow-hidden ${
                  service.popular ? 'card-featured' : 'card'
                }`}
              >
                {service.popular && (
                  <span className="absolute top-4 right-4 text-xs font-mono uppercase tracking-wider text-id8-orange bg-[var(--id8-orange-light)] px-3 py-1.5 rounded-md">
                    Most Popular
                  </span>
                )}

                <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-3">
                  {service.tier}
                </p>
                <h3 className="text-2xl font-bold mb-2 tracking-tight">
                  {service.name}
                </h3>
                <p className="text-3xl font-bold text-id8-orange font-mono mb-5">
                  {service.price}
                </p>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3 text-[var(--text-secondary)]"
                    >
                      <span className="text-id8-orange flex-shrink-0 mt-1">
                        <CheckIcon />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Who This Is For
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              You're in the right place if...
            </h2>
          </div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto"
          >
            {audiences.map((audience, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="card hover:border-[var(--border-light)]"
              >
                <h3 className="text-lg font-bold mb-2">{audience.title}</h3>
                <p className="text-[var(--text-secondary)]">{audience.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Built by someone who's been{' '}
                <span className="text-gradient-orange">in the trenches</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                I'm not an AI researcher. I'm a producer who figured out how to make these tools actually work for creative, fast-moving operations.
              </p>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                20+ years in film and TV production taught me one thing: systems beat hustle. Now I build AI systems for people who don't have time to figure it out themselves.
              </p>
            </div>

            <motion.ul
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="space-y-0"
            >
              {credentials.map((cred, index) => (
                <motion.li
                  key={index}
                  variants={fadeUp}
                  className="py-4 border-b border-[var(--border)] last:border-b-0 font-mono text-sm"
                >
                  <span className="text-[var(--text-primary)] font-semibold">
                    {cred.highlight}
                  </span>{' '}
                  <span className="text-[var(--text-tertiary)]">
                    {cred.role}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing-lg relative">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--id8-orange-light)_0%,transparent_70%)] opacity-30 pointer-events-none" />

        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to stop playing catch-up?
            </h2>
            <p className="text-xl text-[var(--text-secondary)] mb-10">
              Book a 15-minute call. We'll figure out which option fits — or if this isn't right for you.
            </p>

            <a
              href={bookingUrl}
              className="btn btn-primary hover-lift group inline-flex items-center gap-3 text-lg px-8 py-4"
            >
              Let's Talk
              <ArrowRightIcon />
            </a>

            <p className="mt-6 text-sm font-mono text-[var(--text-tertiary)]">
              No pitch. No pressure. Just a conversation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
