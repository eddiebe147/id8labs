export type HomeProductStatus = 'shipping' | 'development' | 'exploration' | 'internal'
export type HomeProductCategory = 'creators' | 'builders' | 'fun'

export interface HomeProduct {
  name: string
  status: HomeProductStatus
  statusLabel: string
  description: string
  link?: string
  external?: boolean
  category: HomeProductCategory
  previewImage?: string
}

export const featuredHomeProducts: HomeProduct[] = [
  {
    name: 'Composer',
    status: 'shipping',
    statusLabel: 'v1.8161 • Live',
    description: 'AI writing partner that actually remembers your story world. Built in the field when other tools failed us.',
    link: 'https://id8composer.app',
    external: true,
    category: 'creators',
  },
  {
    name: 'HOMER',
    status: 'shipping',
    statusLabel: 'v1.0 • Live',
    description: 'Deal automation from contract to close. Parse contracts, coordinate calendars, track deadlines, automate compliance. Deals don\'t manage themselves.',
    link: 'https://tryhomer.vip',
    external: true,
    category: 'builders',
  },
  {
    name: 'DeepStack',
    status: 'shipping',
    statusLabel: 'v2.5.0 • Live',
    description: 'Trading research with Claude. 30+ analysis tools, thesis tracking, emotion-aware journaling. Blocks revenge trades.',
    link: 'https://deepstack.trade',
    external: true,
    category: 'builders',
  },
  {
    name: 'MILO',
    status: 'internal',
    statusLabel: 'Open Source • Free',
    description: 'Signal-to-noise task manager with Claude Code integration. Jobs/Musk-level filtering. 17 MCP tools for natural language task management.',
    link: '/products/milo',
    external: false,
    category: 'builders',
  },
]

export const showcaseHomeProducts: HomeProduct[] = [
  {
    name: 'LLC Ops',
    status: 'internal',
    statusLabel: 'Internal',
    description: '9 AI agents for taxes, compliance, asset protection.',
    link: '/products/llc-ops',
    category: 'builders',
  },
  {
    name: 'Pipeline',
    status: 'internal',
    statusLabel: 'Internal',
    description: 'Idea-to-exit in 11 stages. Decay mechanics keep projects moving.',
    link: '/products/pipeline',
    category: 'builders',
  },
  {
    name: 'Lexicon',
    status: 'development',
    statusLabel: 'In Development',
    description: 'Story bible as knowledge graph. 100 episodes deep, instantly searchable.',
    link: '/products/lexicon',
    category: 'creators',
  },
]
