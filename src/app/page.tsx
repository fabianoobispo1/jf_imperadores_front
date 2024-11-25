import { Metadata } from 'next'

import { ScrollArea } from '@/components/ui/scroll-area'

export const metadata: Metadata = {
  title: 'Principal',
  description: 'Pagina inicial do meu sistema',
  keywords:
    'Fabiano Bispo Canedo, Fabiano Bispo, fabiano bispo, fabianoobispo, @fabianoobispo, fabiano bispo canedo',
}

export default function Home() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">Pagina inicial</div>
    </ScrollArea>
  )
}
