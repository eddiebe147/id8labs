import Script from 'next/script'
import Hero from '@/components/Hero'
import WhatWeAre from '@/components/WhatWeAre'
import Builder from '@/components/Builder'
import ProductGrid from '@/components/ProductGrid'
import Mission from '@/components/Mission'
import ClaudePartnership from '@/components/ClaudePartnership'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ID8Labs',
  url: 'https://id8labs.app',
  logo: 'https://id8labs.app/icon.svg',
  description: 'ID8Labs builds professional AI tools and offers Claude Code training for developers and creators.',
  founder: {
    '@type': 'Person',
    name: 'Eddie Belaval',
    jobTitle: 'Founder',
  },
  sameAs: [
    'https://twitter.com/eddiebe147',
    'https://github.com/eddiebe147',
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI Development Training',
  provider: {
    '@type': 'Organization',
    name: 'ID8Labs',
  },
  name: 'Claude Code Training',
  description: 'Live training sessions for Claude Code - from basics to advanced hooks, MCP servers, and production workflows.',
  areaServed: 'Worldwide',
}

export default function Home() {
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(organizationSchema)}
      </Script>
      <Script
        id="service-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(serviceSchema)}
      </Script>
      <Hero />
      <WhatWeAre />
      <Builder />
      <ProductGrid />
      <Mission />
      <ClaudePartnership />
    </>
  )
}
