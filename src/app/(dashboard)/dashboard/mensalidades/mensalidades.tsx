'use client'

import { Heading } from '@/components/ui/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

import { MensalidadesList } from './mensalidades-list'

export const Mensalidades: React.FC = () => {
  const { open } = useSidebar()

  return (
    <>
      <div className="flexrow flex items-start justify-between gap-4 ">
        <Heading
          title="Mensalidades"
          description="Gerenciamento de mensalidades"
        />
        {/*  <Button
          onClick={() => {
            setExibeAdicionar(true)
            setExibeListar(false)
          }}
        >
          Adicionar
        </Button> */}
      </div>

      <ScrollArea
        className={cn(
          'space-y-8 w-screen pr-4 md:pr-1  h-[calc(100vh-220px)]',
          open ? 'md:max-w-[calc(100%-16rem)] ' : 'md:max-w-[calc(100%-5rem)] ',
        )}
      >
        <MensalidadesList />
      </ScrollArea>

      {/* 
      {exibeListar && <MensalidadesList />}
      {exibeAdicionar && (
        <ScrollArea className="h-[80vh] w-full px-4">
          <MensalidadesForm />
        </ScrollArea>
      )} */}
    </>
  )
}
