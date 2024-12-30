'use client'
import { useEffect, useState } from 'react'
import { /* Trash,  */ MailPlusIcon } from 'lucide-react'
import { fetchMutation, fetchQuery } from 'convex/nextjs'

import { useSidebar } from '@/components/ui/sidebar'
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
import { cn } from '@/lib/utils'

import type { Id } from '../../../../../convex/_generated/dataModel'
import { api } from '../../../../../convex/_generated/api'

// Enums para mostrar valores legíveis
const SETOR_LABELS = {
  1: 'Ataque',
  2: 'Defesa',
  3: 'Special Teams',
  4: 'Sem preferência',
} as const

const EQUIPAMENTO_LABELS = {
  1: 'Sim os dois equipamentos',
  2: 'Somente a ombreira',
  3: 'Somente capacete',
  4: 'Não possuo nenhum equipamento',
} as const

interface Seletivas {
  _id: Id<'seletiva'>
  _creationTime: number
  numerio_seletiva: number
  nome: string
  cpf: string
  data_nascimento?: number
  email: string
  altura: number
  peso: number
  celular: string
  tem_experiencia: boolean
  equipe_anterior: string
  setor: number
  posicao: string
  equipamento: number
}

export function TryoutList() {
  const [loading, setLoading] = useState<boolean>(false)
  const [seletivas, setSeletivas] = useState<Seletivas[]>([])
  const [offset, setOffset] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const limit = 10
  const { open } = useSidebar()

  const fetchSeletivaPaginated = async (offset: number, limit: number) => {
    setLoading(true)
    try {
      const seletivas = await fetchQuery(api.seletiva.getAllPaginated, {
        limit,
        offset,
      })

      const total = await fetchQuery(api.seletiva.getCount, {})
      setSeletivas(seletivas)
      setTotalCount(total)
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
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    return phone
  }

  return (
    <div
      className={cn(
        'space-y-8 w-screen pr-4 ',
        open ? 'md:max-w-[calc(100%-16rem)] ' : 'md:max-w-[calc(100%-5rem)] ',
      )}
    >
      <div className="w-full overflow-auto">
        <div className="w-full pr-4">
          {/* Largura mínima para garantir que todas as colunas fiquem visíveis */}
          <ScrollArea className="h-[calc(80vh-220px)] w-full  rounded-md border  ">
            <div className="">
              <Table>
                <TableHeader className="sticky top-0 bg-background">
                  <TableRow>
                    {/* <TableHead className="text-center w-16">Nº</TableHead> */}
                    <TableHead className="text-center min-w-[200px]">
                      Nome
                    </TableHead>
                    <TableHead className="text-center min-w-[200px]">
                      Email
                    </TableHead>
                    <TableHead className="text-center w-32">Celular</TableHead>
                    <TableHead className="text-center w-28">
                      Data Nasc.
                    </TableHead>
                    <TableHead className="text-center w-24">Altura</TableHead>
                    <TableHead className="text-center w-24">Peso</TableHead>
                    <TableHead className="text-center w-32">Setor</TableHead>
                    <TableHead className="text-center w-28">Posição</TableHead>
                    <TableHead className="text-center w-28">
                      Experiência
                    </TableHead>
                    <TableHead className="text-center min-w-[150px]">
                      Equipe Anterior
                    </TableHead>
                    <TableHead className="text-center min-w-[150px]">
                      Equipamento
                    </TableHead>
                    <TableHead className="text-center w-24">Opções</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={13} className="text-center">
                        <Spinner />
                      </TableCell>
                    </TableRow>
                  ) : (
                    seletivas.map((seletiva) => (
                      <TableRow key={seletiva._id}>
                        {/*  <TableCell className="text-center">
                          {seletiva.numerio_seletiva}
                        </TableCell> */}
                        <TableCell className="text-center  font-medium">
                          {seletiva.nome}
                        </TableCell>
                        <TableCell>{seletiva.email}</TableCell>
                        <TableCell className="text-center whitespace-nowrap">
                          {formatPhoneNumber(seletiva.celular)}
                        </TableCell>
                        <TableCell className="text-center whitespace-nowrap">
                          {seletiva.data_nascimento
                            ? new Date(
                                seletiva.data_nascimento,
                              ).toLocaleDateString()
                            : '-'}
                        </TableCell>
                        <TableCell className="text-center">
                          {seletiva.altura}m
                        </TableCell>
                        <TableCell className="text-center">
                          {seletiva.peso}kg
                        </TableCell>
                        <TableCell className="text-center whitespace-nowrap">
                          {
                            SETOR_LABELS[
                              seletiva.setor as keyof typeof SETOR_LABELS
                            ]
                          }
                        </TableCell>
                        <TableCell className="text-center">
                          {seletiva.posicao}
                        </TableCell>
                        <TableCell className="text-center whitespace-nowrap">
                          {seletiva.tem_experiencia ? 'Sim' : 'Não'}
                        </TableCell>
                        <TableCell className="text-center">
                          {seletiva.equipe_anterior || '-'}
                        </TableCell>
                        <TableCell className="text-center">
                          {
                            EQUIPAMENTO_LABELS[
                              seletiva.equipamento as keyof typeof EQUIPAMENTO_LABELS
                            ]
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center">
                            <LoadingButton
                              loading={loading}
                              disabled
                              onClick={() => removeCandidato(seletiva._id)}
                            >
                              <MailPlusIcon className="h-4 w-4" />
                            </LoadingButton>
                            {/*  <LoadingButton
                              loading={loading}
                              disabled
                              variant={'destructive'}
                              onClick={() => removeCandidato(seletiva._id)}
                            >
                              <Trash className="h-4 w-4" />
                            </LoadingButton> */}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4 pr-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <p>
            Página {Math.ceil(offset / limit) + 1} de{' '}
            {Math.ceil(totalCount / limit)} | Total de registros: {totalCount}
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
