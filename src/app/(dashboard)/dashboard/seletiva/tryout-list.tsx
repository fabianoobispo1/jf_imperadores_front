'use client'
import { useEffect, useState } from 'react'
import { fetchMutation, fetchQuery } from 'convex/nextjs'
import axios from 'axios'
import { jsPDF } from 'jspdf'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import 'jspdf-autotable'
import { useSidebar } from '@/components/ui/sidebar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import { cn, formatPhoneNumber } from '@/lib/utils'
import { MessageButtons } from '@/components/MessageButtons'

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
  aprovado?: boolean
}

export function TryoutList() {
  const [loading, setLoading] = useState<boolean>(false)
  const [seletivas, setSeletivas] = useState<Seletivas[]>([])
  const [offset, setOffset] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const limit = 10
  const [pageLimit, setPageLimit] = useState(10)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [pesoDirection, setPesoDirection] = useState<'asc' | 'desc'>('asc')
  const [alturaDirection, setAlturaDirection] = useState<'asc' | 'desc'>('asc')
  const [dataCradastroDirection, setDataCradastroDirection] = useState<
    'asc' | 'desc'
  >('asc')

  const { open } = useSidebar()

  const [whatsappStatus, setWhatsappStatus] = useState('')

  const [numeroConectado, setNumeroConectado] = useState('')
  const [nomeConectado, setNomeConectado] = useState('')

  const [approvingId, setApprovingId] = useState<Id<'seletiva'> | null>(null)

  const checkWhatsappStatus = async () => {
    try {
      const responseStatus = await axios.get('/api/whatsapp/status')
      setWhatsappStatus(responseStatus.data.message)

      if (responseStatus.data.message === 'session_connected') {
        const responseNumber = await axios.get('/api/whatsapp/getNumber')
        setNomeConectado(responseNumber.data.sessionInfo.pushname)
        setNumeroConectado(
          responseNumber.data.sessionInfo.me.user.slice(2, 4) +
            '9' +
            responseNumber.data.sessionInfo.me.user.slice(4),
        )
      }
    } catch (error) {
      console.error('Error checking whatsapp status:', error)
    }
  }

  // Add useEffect to check status periodically
  useEffect(() => {
    const interval = setInterval(checkWhatsappStatus, 5000)
    checkWhatsappStatus() // Initial check

    return () => clearInterval(interval)
  }, [])

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
    fetchSeletivaPaginated(offset, pageLimit)
  }, [offset, pageLimit])

  const handleNext = () => setOffset((prev) => prev + pageLimit)
  const handlePrev = () => setOffset((prev) => Math.max(prev - pageLimit, 0))

  /*  const removeCandidato = async (id: Id<'seletiva'>) => {
    setLoading(true)
    await fetchMutation(api.seletiva.remove, { seletivaId: id })
    fetchSeletivaPaginated(offset, limit)
    setLoading(false)
  } */

  const handleApproveAthlete = async (seletiva: Seletivas) => {
    setApprovingId(seletiva._id)
    try {
      // Update seletiva status
      await fetchMutation(api.seletiva.update, {
        id: seletiva._id,
        aprovado: true,
      })

      // Refresh list
      fetchSeletivaPaginated(offset, limit)
    } catch (error) {
      console.error('Erro ao aprovar atleta:', error)
    } finally {
      setApprovingId(null)
    }
  }

  const exportToPDF = async () => {
    // Fetch all records for PDF
    const allSeletivas = await fetchQuery(api.seletiva.getAll, {})

    // Apply the same sorting logic used in the table
    const sortedSeletivas = [...allSeletivas].sort((a, b) => {
      if (sortDirection === 'desc') {
        return a.nome.localeCompare(b.nome)
      }
      return b.nome.localeCompare(a.nome)
    })

    // eslint-disable-next-line new-cap
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    })

    doc.setFontSize(16)
    doc.text('Lista Completa de Candidatos - Seletiva', 14, 15)

    const tableData = sortedSeletivas.map((seletiva) => [
      seletiva.nome,
      seletiva.email,
      formatPhoneNumber(seletiva.celular),
      seletiva.data_nascimento
        ? new Date(seletiva.data_nascimento).toLocaleDateString()
        : '-',
      `${seletiva.altura}m`,
      `${seletiva.peso}kg`,
      SETOR_LABELS[seletiva.setor as keyof typeof SETOR_LABELS],
      seletiva.posicao,
      seletiva.tem_experiencia ? 'Sim' : 'Não',
      seletiva.equipe_anterior || '-',
      EQUIPAMENTO_LABELS[
        seletiva.equipamento as keyof typeof EQUIPAMENTO_LABELS
      ],
    ])

    // @ts-expect-error - Specific reason for expecting the error
    doc.autoTable({
      head: [
        [
          'Nome',
          'Email',
          'Celular',
          'Data Nasc.',
          'Altura',
          'Peso',
          'Setor',
          'Posição',
          'Experiência',
          'Equipe Anterior',
          'Equipamento',
        ],
      ],
      body: tableData,
      startY: 25,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [0, 51, 102] },
      margin: { top: 25, right: 7, bottom: 7, left: 7 }, // Adicione esta linha
    })

    doc.save('lista-completa-seletiva.pdf')
  }

  // Adicione esta função de ordenação
  const sortSeletivas = (data: Seletivas[]) => {
    return [...data].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.nome.localeCompare(b.nome)
      }
      return b.nome.localeCompare(a.nome)
    })
  }
  const sortPesoSeletivas = (data: Seletivas[]) => {
    return [...data].sort((a, b) => {
      if (pesoDirection === 'asc') {
        return a.peso - b.peso
      }
      return b.peso - a.peso
    })
  }
  const sortDataCadastroSeletivas = (data: Seletivas[]) => {
    return [...data].sort((a, b) => {
      if (dataCradastroDirection === 'asc') {
        return a._creationTime - b._creationTime
      }
      return b._creationTime - a._creationTime
    })
  }
  const sortAlturaSeletivas = (data: Seletivas[]) => {
    return [...data].sort((a, b) => {
      if (alturaDirection === 'asc') {
        return a.altura - b.altura
      }
      return b.altura - a.altura
    })
  }

  return (
    <>
      <div
        className={cn(
          'space-y-8 w-screen pr-4 ',
          open ? 'md:max-w-[calc(100%-16rem)] ' : 'md:max-w-[calc(100%-5rem)] ',
        )}
      >
        <div className="w-full overflow-auto">
          <Button variant="outline" size="sm" onClick={exportToPDF}>
            Exportar PDF
          </Button>
          <div className="w-full pr-4 pt-2">
            {/* Largura mínima para garantir que todas as colunas fiquem visíveis */}
            <ScrollArea className="h-[calc(80vh-220px)] w-full  rounded-md border   pr-2 ">
              <div className="">
                <Table>
                  <TableHeader className="sticky top-0 bg-background">
                    <TableRow>
                      {/* <TableHead className="text-center w-16">Nº</TableHead> */}
                      <TableHead
                        className="text-center min-w-[200px] cursor-pointer hover:bg-muted"
                        onClick={() => {
                          setSortDirection((prev) =>
                            prev === 'asc' ? 'desc' : 'asc',
                          )
                          setSeletivas(sortSeletivas(seletivas))
                        }}
                      >
                        Nome {sortDirection === 'asc' ? '↑' : '↓'}
                      </TableHead>
                      <TableHead className="text-center min-w-[200px]">
                        Email
                      </TableHead>
                      <TableHead className="text-center w-32">
                        Celular
                      </TableHead>
                      <TableHead className="text-center w-28">
                        Data Nasc.
                      </TableHead>
                      <TableHead
                        className="text-center min-w-[200px] cursor-pointer hover:bg-muted"
                        onClick={() => {
                          setAlturaDirection((prev) =>
                            prev === 'asc' ? 'desc' : 'asc',
                          )
                          setSeletivas(sortAlturaSeletivas(seletivas))
                        }}
                      >
                        Altura {sortDirection === 'asc' ? '↑' : '↓'}
                      </TableHead>
                      <TableHead
                        className="text-center min-w-[200px] cursor-pointer hover:bg-muted"
                        onClick={() => {
                          setPesoDirection((prev) =>
                            prev === 'asc' ? 'desc' : 'asc',
                          )
                          setSeletivas(sortPesoSeletivas(seletivas))
                        }}
                      >
                        Peso {sortDirection === 'asc' ? '↑' : '↓'}
                      </TableHead>
                      <TableHead className="text-center w-32">Setor</TableHead>
                      <TableHead className="text-center w-28">
                        Posição
                      </TableHead>
                      <TableHead className="text-center w-28">
                        Experiência
                      </TableHead>
                      <TableHead className="text-center min-w-[150px]">
                        Equipe Anterior
                      </TableHead>
                      <TableHead className="text-center min-w-[150px]">
                        Equipamento
                      </TableHead>
                      <TableHead
                        className="text-center min-w-[200px] cursor-pointer hover:bg-muted"
                        onClick={() => {
                          setDataCradastroDirection((prev) =>
                            prev === 'asc' ? 'desc' : 'asc',
                          )
                          setSeletivas(sortDataCadastroSeletivas(seletivas))
                        }}
                      >
                        Data Cadastro {sortDirection === 'asc' ? '↑' : '↓'}
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
                        <TableRow
                          key={seletiva._id}
                          className={cn(seletiva.aprovado && 'bg-green-100')}
                        >
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
                          <TableCell className="text-center whitespace-nowrap">
                            {new Date(
                              seletiva._creationTime,
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col items-center justify-center gap-2">
                              <MessageButtons
                                recipient={{
                                  nome: seletiva.nome,
                                  email: seletiva.email,
                                  celular: seletiva.celular,
                                }}
                                whatsappStatus={whatsappStatus}
                                nomeConectado={nomeConectado}
                                numeroConectado={numeroConectado}
                                loading={loading}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveAthlete(seletiva)}
                                disabled={
                                  seletiva.aprovado ||
                                  approvingId === seletiva._id
                                }
                                className="w-full"
                              >
                                {approvingId === seletiva._id ? (
                                  <Spinner className="h-4 w-4" />
                                ) : seletiva.aprovado ? (
                                  'Aprovado'
                                ) : (
                                  'Aprovar'
                                )}
                              </Button>
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
              Página {Math.ceil(offset / pageLimit) + 1} de{' '}
              {Math.ceil(totalCount / pageLimit)} | Total de registros:{' '}
              {totalCount}
            </p>
          </div>
          <Select
            value={pageLimit.toString()}
            onValueChange={(value) => {
              setPageLimit(Number(value))
              setOffset(0)
            }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
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
              disabled={loading || seletivas.length < pageLimit}
            >
              Próxima
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
