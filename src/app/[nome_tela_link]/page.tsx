import LinkTree from '@/components/layout/LinkTree'

export default async function Page({
  params,
}: {
  params: Promise<{ nome_tela_link: string }>
}) {
  const slug = (await params).nome_tela_link
  return <LinkTree nomeTela={slug} />
}
