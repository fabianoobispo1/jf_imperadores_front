'use-client'
import { useEffect, useState } from 'react'
import { MailPlusIcon } from 'lucide-react'
import { fetchQuery } from 'convex/nextjs'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import { LoadingButton } from '@/components/ui/loading-button'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

import type { Id } from '../../../../../convex/_generated/dataModel'
import { api } from '../../../../../convex/_generated/api'

const SETOR_LABELS = {
  1: 'Ataque',
  2: 'Defesa',
  3: 'Special Teams',
  4: 'Sem preferência',
} as const

const STATUS_LABELS = {
  1: 'Ativo',
  2: 'Inativo',
  3: 'Pendente',
} as const

interface Atletas {
  _id: Id<'atletas'>
  _creationTime: number
  status: number
  nome: string
  cpf: string
  data_nascimento?: number
  email: string
  altura?: number // Make optional
  peso?: number // Make optional
  celular: string
  setor: number
  posicao: string
  rua: string
  bairro: string
  cidade: string
  cep: string
  uf: string
  complemento: string
  genero: string
  rg: string
  emisor: string
  uf_emisor: string
  img_link: string
}

export const AtletasList = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [atletas, setAtletas] = useState<Atletas[]>([])
  const [offset, setOffset] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const limit = 10
  const { open } = useSidebar()

  const fetchAtletasPaginated = async (offset: number, limit: number) => {
    setLoading(true)
    try {
      const atletas = await fetchQuery(api.atletas.getAllPaginated, {
        limit,
        offset,
      })
      const total = await fetchQuery(api.atletas.getCount, {})
      setAtletas(atletas)
      setTotalCount(total)
    } catch (error) {
      console.error('Erro ao buscar atletas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAtletasPaginated(offset, limit)
  }, [offset])

  const handleNext = () => setOffset((prev) => prev + limit)
  const handlePrev = () => setOffset((prev) => Math.max(prev - limit, 0))

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
        open ? 'md:max-w-[calc(100%-18rem)] ' : 'md:max-w-[calc(100%-7rem)] ',
      )}
    >
      <div className="w-full overflow-auto">
        <div className="w-full pr-4">
          {/* Largura mínima para garantir que todas as colunas fiquem visíveis */}
          <ScrollArea className="h-[calc(80vh-220px)] w-full  rounded-md border  ">
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead className="text-center min-w-[150px]">
                    Status
                  </TableHead>
                  <TableHead className="text-center min-w-[200px]">
                    Nome
                  </TableHead>
                  <TableHead className="text-center min-w-[200px]">
                    Email
                  </TableHead>
                  <TableHead className="text-center w-32">Celular</TableHead>
                  <TableHead className="text-center w-28">Data Nasc.</TableHead>
                  <TableHead className="text-center w-24">Altura</TableHead>
                  <TableHead className="text-center w-24">Peso</TableHead>
                  <TableHead className="text-center w-32">Setor</TableHead>
                  <TableHead className="text-center w-28">Posição</TableHead>
                  <TableHead className="text-center min-w-[150px]">
                    Cidade
                  </TableHead>
                  <TableHead className="text-center w-20">UF</TableHead>
                  <TableHead className="text-center w-24">Opções</TableHead>
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
                  atletas.map((atleta) => (
                    <TableRow key={atleta._id}>
                      <TableCell className="text-center">
                        {
                          STATUS_LABELS[
                            atleta.status as keyof typeof STATUS_LABELS
                          ]
                        }
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {atleta.nome}
                      </TableCell>
                      <TableCell>{atleta.email}</TableCell>
                      <TableCell className="text-center whitespace-nowrap">
                        {formatPhoneNumber(atleta.celular)}
                      </TableCell>
                      <TableCell className="text-center whitespace-nowrap">
                        {atleta.data_nascimento
                          ? new Date(
                              atleta.data_nascimento,
                            ).toLocaleDateString()
                          : '-'}
                      </TableCell>
                      <TableCell className="text-center">
                        {atleta.altura}m
                      </TableCell>
                      <TableCell className="text-center">
                        {atleta.peso}kg
                      </TableCell>
                      <TableCell className="text-center whitespace-nowrap">
                        {
                          SETOR_LABELS[
                            atleta.setor as keyof typeof SETOR_LABELS
                          ]
                        }
                      </TableCell>
                      <TableCell className="text-center">
                        {atleta.posicao}
                      </TableCell>
                      <TableCell className="text-center">
                        {atleta.cidade}
                      </TableCell>
                      <TableCell className="text-center">{atleta.uf}</TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <LoadingButton loading={loading} disabled>
                            <MailPlusIcon className="h-4 w-4" />
                          </LoadingButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
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
            disabled={loading || atletas.length < limit}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}
