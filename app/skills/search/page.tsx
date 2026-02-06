import SearchPage from '../../stackshack/search/page'

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string; complexity?: string }>
}

export default async function SkillsSearchPage({ searchParams }: PageProps) {
  return SearchPage({ searchParams })
}
