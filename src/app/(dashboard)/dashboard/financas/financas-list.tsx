'use client'
import { useEffect, useState } from 'react'
import { Trash } from 'lucide-react'
import { fetchMutation, fetchQuery } from 'convex/nextjs'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { LoadingButton } from '@/components/ui/loading-button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'

import type { Id } from '../../../../../convex/_generated/dataModel'
import { api } from '../../../../../convex/_generated/api'

interface Seletivas {
  _id: Id<'seletiva'>
  _creationTime: number
  nome: string
  cpf: string
  email: string
  data_nascimento?: number
}
/* interface Transacoes {
  _id: Id<'transacao'>
  _creationTime: number
  tipo: string
  descricao: string
  valor: number
  data: number
} */
export function TryoutList() {
  const [loading, setLoading] = useState<boolean>(false)

  const [seletivas, setSeletivas] = useState<Seletivas[]>([])
  /*  const [transacoes, setTransacoes] = useState<Transacoes[]>([]) */

  const [offset, setOffset] = useState(0)
  const limit = 10

  const fetchSeletivaPaginated = async (offset: number, limit: number) => {
    setLoading(true)
    try {
      const seletivas = await fetchQuery(api.seletiva.getAllPaginated, {
        limit,
        offset,
      })
      setSeletivas(seletivas)
    } catch (error) {
      console.error('Erro ao buscar seletivas paginadas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSeletivaPaginated(offset, limit)
  }, [offset])

  const handleNext = () => setOffset((prev) => prev + limit)
  const handlePrev = () => setOffset((prev) => Math.max(prev - limit, 0))

  const removeCandidato = async (id: Id<'seletiva'>) => {
    setLoading(true)
    await fetchMutation(api.seletiva.remove, { seletivaId: id })
    fetchSeletivaPaginated(offset, limit)
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      <ScrollArea className="h-[calc(80vh-220px)] w-full overflow-x-auto rounded-md border">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Data de nascimento</TableHead>
              <TableHead className="text-center">Opções</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : (
              seletivas.map((seletiva) => (
                <TableRow key={seletiva._id}>
                  <TableCell>{seletiva.nome}</TableCell>
                  <TableCell>{seletiva.email}</TableCell>
                  <TableCell className="text-center">
                    {seletiva.data_nascimento
                      ? new Date(seletiva.data_nascimento).toLocaleDateString()
                      : '-'}
                  </TableCell>
                  <TableCell className="flex items-center justify-center gap-2">
                    <LoadingButton
                      loading={loading}
                      variant={'destructive'}
                      onClick={() => removeCandidato(seletiva._id)}
                    >
                      <Trash className="h-4 w-4" />
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <p>
            Página {Math.ceil(offset / limit) + 1} de{' '}
            {Math.ceil(seletivas.length / limit)}
          </p>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={offset === 0 || loading}
          >
            Anterior
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={loading || seletivas.length < limit}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}
