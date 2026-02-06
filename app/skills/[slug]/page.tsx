import SkillDetailPage, {
  generateMetadata,
  generateStaticParams,
} from '../../stackshack/[slug]/page'

export { generateMetadata, generateStaticParams }

export default async function SkillsSlugPage(
  props: Parameters<typeof SkillDetailPage>[0]
) {
  return SkillDetailPage({ ...props, basePath: '/skills' })
}
