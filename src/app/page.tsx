import { Metadata } from 'next'

import Redirecionador from '@/components/redirecionador'

export const metadata: Metadata = {
  title: 'JF Imperadores',
  description: 'Pagina inicial JF Imperadores',
  keywords:
    'imperadores, jf imperadores, jfimperadores, futebolamericano, futebol ameriacno, fabr, juiz de fora imperadores, time imperadores, time jfimperadores, time jf imperadores',
}

export default function HomePage() {
  return (
    <div className="flex h-screen items-center justify-center ">
      {/*       <Redirecionador link={'https://jfimperadores.lojavirtualnuvem.com.br'} /> */}
    </div>
  )
}
