import { Metadata } from 'next'

import { ScrollArea } from '@/components/ui/scroll-area'

import { SeletivaForm } from './seletiva-form'

export const metadata: Metadata = {
  title: 'Seletiva jf imperadores',
  description: 'Pagina para cadastro',
  keywords: '',
}

export default function seletiva() {
  return (
    <ScrollArea className="h-screen">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex flex-col items-start gap-2 space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Seletiva 2025 - Juiz de Fora Imperadores
          </h2>
          <p className="text-sm text-muted-foreground">
            Bem-vindo ao Juiz de Fora Imperadores. Este formulário deve ser
            preenchido por todos que queiram participar da 1ª seletiva do JF
            Imperadores de 2025.
          </p>
          <p className="text-sm text-muted-foreground">
            A seletiva será realizada no dia 19 de Janeiro. Horário: 9 horas
            Local: Ginásio da Faefid-UFJF
          </p>
        </div>
        <SeletivaForm />
      </div>
    </ScrollArea>
  )
}
