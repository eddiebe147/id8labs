'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Sparkles, Wrench, Zap, Terminal, Box } from 'lucide-react'

interface Product {
    name: string
    status: 'active' | 'coming-soon' | 'internal'
    tagline: string
    description: string
    link?: string
    external?: boolean
}

// FOR CREATORS - Professional tools for people who make things
const creatorProducts: Product[] = [
    {
        name: 'Composer',
        status: 'active',
        tagline: 'AI writing partner with memory',
        description:
            'AI writing partner that actually remembers your story world. Built for 90 Day Fiancé production—context rot solved.',
        link: 'https://id8composer.app',
        external: true,
    },
    {
        name: 'DeepStack',
        status: 'active',
        tagline: 'Trading research with Claude',
        description:
            '30+ analysis tools, thesis tracking, emotion-aware journaling. Blocks revenge trades. Research only.',
        link: 'https://deepstack.trade',
        external: true,
    },
    {
        name: 'Lexicon',
        status: 'coming-soon',
        tagline: 'Story bible as knowledge graph',
        description:
            'Characters, relationships, timelines—100 episodes deep, instantly searchable.',
        link: '/products/lexicon',
    },
    {
        name: 'Pause',
        status: 'coming-soon',
        tagline: 'Communication translator for conflict',
        description:
            'When emotions run high, people stop hearing each other. Pause sits between what you said and what they heard. Not therapy. Not judgment. Translation.',
        link: '/products/pause',
    },
]

// FOR BUILDERS - AI orchestration for solo builders
const builderProducts: Product[] = [
    {
        name: 'MILO',
        status: 'active',
        tagline: 'Signal-to-noise task manager',
        description:
            'Jobs/Musk-level signal filtering with Claude Code integration. 17 MCP tools for natural language task management. Open source.',
        link: '/products/milo',
    },
    {
        name: 'ID8Foundry',
        status: 'internal',
        tagline: 'The system that builds systems',
        description:
            'Self-improving development framework. Captures patterns, decisions, and failures across projects. Every build makes the next one faster.',
        link: '/products/foundry',
    },
    {
        name: 'Pipeline',
        status: 'internal',
        tagline: 'Idea-to-exit in 11 stages',
        description:
            '8 AI agents handle validation through exit prep. Decay mechanics keep projects moving.',
        link: '/products/pipeline',
    },
    {
        name: 'Factory',
        status: 'coming-soon',
        tagline: 'AI creative production pipeline',
        description:
            'Midjourney + Grok + Gemini in one tracked workflow. Browser automation handles the tabs. You handle taste.',
        link: '/products/factory',
    },
    {
        name: 'LLC Ops',
        status: 'internal',
        tagline: 'AI agents for business ops',
        description:
            '9 AI agents for taxes, compliance, asset protection. Replace a $50k back office.',
        link: '/products/llc-ops',
    },
    {
        name: 'Pipeline CLI',
        status: 'internal',
        tagline: 'Terminal dashboard',
        description:
            'Decay bars, sparklines, health indicators. Control room aesthetic.',
        link: '/essays/building-pipeline-cli',
    },
]

// FOR FUN - Building in public, social experiments
const funProducts: Product[] = [
    {
        name: 'X-Place',
        status: 'coming-soon',
        tagline: 'r/place meets X',
        description:
            'Shared pixel canvas, cooldown timers, real-time chaos. A social experiment.',
        link: '/products/xplace',
    },
    {
        name: 'Memmon',
        status: 'internal',
        tagline: 'RAM monitor for AI dev',
        description:
            'Green means work. Yellow means attention. Red means kill something. Built because AI agents kept crashing my Mac.',
        link: '/essays/memmon-making-the-invisible-visible',
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
}

function ProductCard({ product }: { product: Product }) {
    const statusConfig = {
        'active': {
            label: 'Live',
            dotColor: 'bg-emerald-500',
            textColor: 'text-emerald-400',
            borderColor: 'border-emerald-500/20',
            glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]',
            bg: 'bg-emerald-500/5',
        },
        'coming-soon': {
            label: 'Coming Soon',
            dotColor: 'bg-amber-500',
            textColor: 'text-amber-400',
            borderColor: 'border-amber-500/20',
            glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.2)]',
            bg: 'bg-amber-500/5',
        },
        'internal': {
            label: 'Internal Tool',
            dotColor: 'bg-violet-500',
            textColor: 'text-violet-400',
            borderColor: 'border-violet-500/20',
            glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.25)]',
            bg: 'bg-violet-500/5',
        },
    }

    const config = statusConfig[product.status]

    return (
        <motion.div
            variants={itemVariants}
            className={`group relative flex flex-col p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] ${config.glow}`}
        >
            <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors pointer-events-none" />

            <div className="flex items-start justify-between mb-4 z-10">
                <h3 className="text-xl font-bold text-white group-hover:text-[var(--id8-orange)] transition-colors">
                    {product.name}
                </h3>
                <div className={`px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider flex items-center gap-1.5 border ${config.borderColor} ${config.bg} ${config.textColor}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor} animate-pulse`} />
                    {config.label}
                </div>
            </div>

            <p className="text-sm font-medium text-[var(--id8-orange)]/90 mb-3">{product.tagline}</p>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6 flex-grow">{product.description}</p>

            {product.link && (
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                    {product.status === 'active' ? (
                        <>
                            Launch App <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </>
                    ) : (
                        <>
                            Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </div>
            )}

            {/* Click target overlay */}
            {product.link && (
                product.external ? (
                    <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-20 focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)] focus:ring-offset-2 focus:ring-offset-black rounded-2xl"
                    >
                        <span className="sr-only">Go to {product.name}</span>
                    </a>
                ) : (
                    <Link
                        href={product.link}
                        className="absolute inset-0 z-20 focus:outline-none focus:ring-2 focus:ring-[var(--id8-orange)] focus:ring-offset-2 focus:ring-offset-black rounded-2xl"
                    >
                        <span className="sr-only">Go to {product.name}</span>
                    </Link>
                )
            )}
        </motion.div>
    )
}

function CategorySection({
    title,
    subtitle,
    icon: Icon,
    products,
    accent,
}: {
    title: string
    subtitle: string
    icon: any
    products: Product[]
    accent: string
}) {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
            className="mb-24 last:mb-0"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg bg-${accent}-500/10 text-${accent}-400`}>
                    <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
            <p className="text-zinc-400 ml-12 mb-8 text-lg">{subtitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.name} product={product} />
                ))}
            </div>
        </motion.section>
    )
}

export default function ProductsContent() {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] px-6 py-24 selection:bg-[var(--id8-orange)] selection:text-white">
            <div className="max-w-[1200px] mx-auto">
                {/* Back Link */}
                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-16 transition-colors"
                >
                    <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Back to home
                </Link>

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mb-24"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
                        Products
                        <span className="text-[var(--id8-orange)]">.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed text-balance">
                        Professional tools for creators. AI orchestration for builders.
                        <br className="hidden md:block" />
                        <span className="text-zinc-200"> Experiments because we can't help ourselves.</span>
                    </p>
                </motion.header>

                {/* For Creators */}
                <CategorySection
                    title="For Creators"
                    subtitle="Professional tools for people who make things"
                    icon={Sparkles}
                    products={creatorProducts}
                    accent="orange" // handled via variable color styles above in Card, simplified here
                />

                {/* For Builders */}
                <CategorySection
                    title="For Builders"
                    subtitle="AI orchestration for solo builders"
                    icon={Wrench}
                    products={builderProducts}
                    accent="purple"
                />

                {/* For Fun */}
                <CategorySection
                    title="For Fun"
                    subtitle="Building in public, social experiments"
                    icon={Zap}
                    products={funProducts}
                    accent="cyan"
                />

                {/* Custom Builds CTA */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 relative overflow-hidden rounded-3xl border border-[var(--id8-orange)]/20 bg-[var(--id8-orange)]/5 p-8 md:p-12 md:py-20 text-center"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[var(--id8-orange)]/5 to-transparent pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] mb-6">
                            <Terminal className="w-8 h-8" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need Something Custom?</h2>

                        <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
                            Every tool here started as a real problem I faced. If you've got a workflow that's
                            held together by duct tape and browser tabs, I can probably build something better.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="https://x.com/eddiebe"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--id8-orange)] text-white font-semibold rounded-full hover:bg-[var(--id8-orange)]/90 transition-all hover:scale-105 active:scale-95"
                            >
                                Let's Talk
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    )
}
