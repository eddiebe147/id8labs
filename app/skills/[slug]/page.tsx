import SkillDetailPage, {
  generateMetadata,
  generateStaticParams,
} from '../../stackshack/[slug]/page'

export { generateMetadata, generateStaticParams }

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function SkillsSlugPage(props: PageProps) {
  return SkillDetailPage({ ...props, basePath: '/skills' })
}
