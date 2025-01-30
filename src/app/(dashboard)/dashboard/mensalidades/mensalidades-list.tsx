'use-client'
import { fetchQuery } from 'convex/nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'

export interface Mensalidade {
  _id: Id<'mensalidade'>
  _creationTime: number
  tipo: 'avulsa' | 'recorrente'
  email: string
  customer: string
  id_payment_stripe: string
  valor: number
  data_pagamento: number
  data_cancelamento: number
  cancelado: boolean
}

export const MensalidadesList: React.FC = () => {
  const { open } = useSidebar()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [mensalidades, setMensalidades] = useState<Mensalidade[]>([])

  const loadList = async () => {
    setLoading(true)
    try {
      const allMensalidades = await fetchQuery(api.mensalidade.getAll, {})
      console.log(allMensalidades)
      setMensalidades(allMensalidades)
    } catch (error) {
      console.error('Erro ao buscar Mensalidades:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadList()
  }, [])

  return (
    <div
      className={cn(
        'space-y-4 w-screen pr-4 ',
        open ? 'md:max-w-[calc(100%-16rem)] ' : 'md:max-w-[calc(100%-7rem)] ',
      )}
    >
      <Button
        onClick={() => {
          router.push('/dashboard/mensalidades/cadastrar')
        }}
      >
        Adicionar Mensalidade
      </Button>

      <div className="w-full overflow-auto">
        <div className="w-full pr-4">
          {/* Largura mínima para garantir que todas as colunas fiquem visíveis */}
          <ScrollArea className="h-[calc(80vh-220px)] w-full  rounded-md border ">
            <Table>
              <TableHeader className="sticky top-0 bg-background ">
                <TableRow>
                  <TableHead className="text-center min-w-[300px]">
                    Nome
                  </TableHead>

                  <TableHead className="text-center">Opções</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center">
                      <Spinner />
                    </TableCell>
                  </TableRow>
                ) : (
                  mensalidades.map((mensalidade) => (
                    <TableRow key={mensalidade._id}>
                      <TableCell className="text-center">
                        {mensalidade.email}
                      </TableCell>
                      <TableCell className="text-center">
                        {/* Add options here */}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
