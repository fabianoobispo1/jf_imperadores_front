'use client'
import { useState } from 'react'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { ScrollArea } from '@/components/ui/scroll-area'

import { TryoutForm } from './tryout-form'
import { TryoutList } from './tryout-list'

export const Tryout: React.FC = () => {
  const [exibeBotoes, setExibeBotoes] = useState(false)
  const [exibeListar, setExibeListar] = useState(true)
  const [exibeAdicionar, setExibeAdicionar] = useState(false)

  return (
    <>
      {exibeBotoes ? (
        <div className="flex items-start justify-center gap-4">
          <Button
            onClick={() => {
              setExibeBotoes(false)
              setExibeListar(true)
            }}
          >
            Listar
          </Button>
          {/*          <Button
            onClick={() => {
              setExibeBotoes(false)
              setExibeAdicionar(true)
            }}
          >
            Adicionar
          </Button> */}
        </div>
      ) : (
        <></>
      )}

      {exibeListar ? (
        <>
          <div className="flexrow flex items-start justify-between gap-4 ">
            <Heading
              title="Seletiva"
              description="Lista dos cadastrados na seletiva."
            />
            <Button
              onClick={() => {
                redirect('/dashboard/seletivaimg')
              }}
            >
              Adicionar foto
            </Button>
          </div>

          <TryoutList />
        </>
      ) : (
        <></>
      )}

      {exibeAdicionar ? (
        <ScrollArea className="h-[80vh] w-full px-4">
          <div className="flexrow flex items-start justify-between ">
            <Heading title="Adicionar" description="...." />
            <Button
              onClick={() => {
                setExibeBotoes(true)
                setExibeAdicionar(false)
              }}
            >
              Voltar
            </Button>
          </div>
          <TryoutForm />
        </ScrollArea>
      ) : (
        <></>
      )}
    </>
  )
}
