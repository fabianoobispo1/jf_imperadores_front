import { Metadata } from 'next'

import LinkTree from '@/components/layout/LinkTree'

export const metadata: Metadata = {
  title: 'Principal',
  description: 'Pagina inicial do meu sistema',
  keywords:
    'Fabiano Bispo Canedo, Fabiano Bispo, fabiano bispo, fabianoobispo, @fabianoobispo, fabiano bispo canedo',
}

export default function Home() {
  return <LinkTree nomeTela="teste" />
}
