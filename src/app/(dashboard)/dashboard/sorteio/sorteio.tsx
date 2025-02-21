'use client'

import { useState } from 'react'
import { useQuery } from 'convex/react'
import { motion, AnimatePresence } from 'framer-motion'

import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const Sorteio: React.FC = () => {
  const [sorteando, setSorteando] = useState(false)
  const [atletaSorteado, setAtletaSorteado] = useState<string | null>(null)
  const [listaSelecionada, setListaSelecionada] = useState<string>('')

  const atletas = useQuery(api.atletas.getAllAtivos)

  const atletasOrdenados = atletas?.sort((a, b) => a.nome.localeCompare(b.nome))

  const opcoesLista = [
    { value: 'atletas_ativos', label: 'Atletas Ativos' },
    // Futuras opções podem ser adicionadas aqui
  ]

  const realizarSorteio = () => {
    if (!atletas?.length) return

    setSorteando(true)

    // Efeito visual de rolagem
    let contador = 0
    const intervalo = setInterval(() => {
      const indiceAleatorio = Math.floor(Math.random() * atletas.length)
      setAtletaSorteado(atletas[indiceAleatorio].nome)

      contador++
      if (contador > 20) {
        clearInterval(intervalo)
        setSorteando(false)
      }
    }, 100)
  }

  if (!atletas) {
    return <Spinner />
  }

  return (
    <ScrollArea className="h-[calc(100vh-220px)] w-full  pr-2 ">
      <div className="flex flex-col items-center gap-6">
        <Select onValueChange={setListaSelecionada} value={listaSelecionada}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Selecione uma lista para sorteio" />
          </SelectTrigger>
          <SelectContent>
            {opcoesLista.map((opcao) => (
              <SelectItem key={opcao.value} value={opcao.value}>
                {opcao.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {listaSelecionada && (
          <>
            <Card className="p-6 ">
              <div className="flex flex-col items-center gap-6">
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Total de atletas participando: {atletas.length}
                  </p>
                </div>

                <AnimatePresence>
                  {atletaSorteado && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold text-primary p-8 border-2 rounded-lg"
                    >
                      {atletaSorteado}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  size="lg"
                  onClick={realizarSorteio}
                  disabled={sorteando || atletas.length === 0}
                >
                  {sorteando ? 'Sorteando...' : 'Realizar Sorteio'}
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Participantes do Sorteio
              </h3>
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {atletasOrdenados?.map((atleta, index) => (
                    <div
                      key={atleta.id}
                      className="p-2 border rounded hover:bg-accent flex items-center"
                    >
                      <span className="mr-2">{index + 1}.</span>
                      <span>{atleta.nome}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </>
        )}{' '}
      </div>
    </ScrollArea>
  )
}
