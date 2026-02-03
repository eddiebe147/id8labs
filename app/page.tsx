import Script from 'next/script'
import Hero from '@/components/Hero'
import Builder from '@/components/Builder'
import ProductGrid from '@/components/ProductGrid'
import Education from '@/components/Education'
import Mission from '@/components/Mission'
import HomeNavigation from '@/components/HomeNavigation'
import SocialProofStrip from '@/components/SocialProofStrip'
import LatestFromLab from '@/components/LatestFromLab'
import { getAllWriting } from '@/lib/writing'
import { getAllEssays } from '@/lib/essays'
import { featuredHomeProducts, showcaseHomeProducts } from '@/lib/home-products'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ID8Labs',
  url: 'https://id8labs.app',
  logo: 'https://id8labs.app/icon.svg',
  description: 'ID8Labs builds professional AI tools and offers Claude Code training for developers and creators.',
  foundingDate: '2024',
  founder: {
    '@type': 'Person',
    name: 'Eddie Belaval',
    jobTitle: 'Founder & Principal Engineer',
    url: 'https://id8labs.app',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'hello@id8labs.app',
    availableLanguage: ['English', 'Spanish'],
  },
  sameAs: [
    'https://twitter.com/eddiebe147',
    'https://github.com/eddiebe147',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Claude Code',
    'MCP Servers',
    'AI Agent Development',
    'Large Language Models',
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
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Training Programs',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Claude Code Fundamentals',
          description: 'Learn the basics of Claude Code for everyday development workflows',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Advanced MCP Development',
          description: 'Build custom MCP servers and integrate AI into your toolchain',
        },
      },
    ],
  },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ID8Composer',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Organization',
    name: 'ID8Labs',
  },
  description: 'AI-powered writing partner that helps creators develop their unique voice.',
}

const schemas = [
  { id: 'organization-schema', data: organizationSchema },
  { id: 'service-schema', data: serviceSchema },
  { id: 'software-schema', data: softwareSchema },
]

export default function Home() {
  // Server-side: fetch writing content for Latest from Lab section
  const writingItems = getAllWriting()
  const essayCount = getAllEssays().length
  const productsShipping = featuredHomeProducts.length
  const activeProjects = featuredHomeProducts.length + showcaseHomeProducts.length

  return (
    <>
      {schemas.map(({ id, data }) => (
        <Script
          key={id}
          id={id}
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(data)}
        </Script>
      ))}
      <HomeNavigation />
      <Hero />
      <SocialProofStrip
        essayCount={essayCount}
        productsShipping={productsShipping}
        activeProjects={activeProjects}
        startYear={2024}
      />
      <ProductGrid />
      <LatestFromLab items={writingItems} />
      <Education />
      <Mission />
      <Builder />
    </>
  )
}
