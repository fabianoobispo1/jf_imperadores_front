'use client'

import { Heading } from '@/components/ui/heading'
import { ScrollArea } from '@/components/ui/scroll-area'

import { AtletasList } from './atletas-list'
import { AtletasForm } from './atletas-form'

export const Atletas: React.FC = () => {
  return (
    <>
      <div className="flexrow flex items-start justify-between gap-4 ">
        <Heading title="Atletas" description="Lista de atletas do time." />
      </div>
      <ScrollArea className="h-[calc(100vh-220px)] w-full ">
        <AtletasList />
        <AtletasForm />
      </ScrollArea>
    </>
  )
}
