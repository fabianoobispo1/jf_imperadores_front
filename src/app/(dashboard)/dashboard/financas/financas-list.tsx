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

interface Transacoes {
  _id: Id<'transacao'>
  _creationTime: number
  tipo: string
  descricao: string
  valor: number
  data: number
}

export function FinancasList() {
  const [loading, setLoading] = useState<boolean>(false)
  const [transacoes, setTransacoes] = useState<Transacoes[]>([])
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1, // Mês atual (1 = Janeiro)
  )
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  )

  const getMonthTimestamps = (year: number, month: number) => {
    // O mês em JavaScript é baseado em zero (0 = Janeiro, 11 = Dezembro)
    const firstDay = new Date(year, month - 1, 1) // Primeiro dia do mês
    const lastDay = new Date(year, month, 0) // Último dia do mês

    const timestampStart = firstDay.getTime() // Início do mês em timestamp
    const timestampEnd = lastDay.setHours(23, 59, 59, 999) // Final do mês em timestamp

    return { timestampStart, timestampEnd }
  }

  const fetchSeletivaByMonth = async (year: number, month: number) => {
    setLoading(true)
    // Obtém os timestamps do mês
    const { timestampStart, timestampEnd } = getMonthTimestamps(year, month)
    console.log('Timestamp Inicial:', timestampStart)
    console.log('Timestamp Final:', timestampEnd)
    try {
      // Buscar dados para o mês e ano selecionado
      const transacoes = await fetchQuery(api.transacao.buscaPeriodo, {
        dataInicial: timestampStart,
        dataFinal: timestampEnd,
      })
      setTransacoes(transacoes)
    } catch (error) {
      console.error('Erro ao buscar seletivas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSeletivaByMonth(currentMonth, currentYear)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth])

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 12) {
        setCurrentYear((prevYear) => prevYear + 1)
        return 1 // Volta para Janeiro
      }
      return prevMonth + 1
    })
  }

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 1) {
        setCurrentYear((prevYear) => prevYear - 1)
        return 12 // Volta para Dezembro
      }
      return prevMonth - 1
    })
  }

  /*   const removeCandidato = async (id: Id<'seletiva'>) => {
    setLoading(true)
    await fetchMutation(api.seletiva.remove, { seletivaId: id })
    fetchSeletivaPaginated(offset, limit)
    setLoading(false)
  } */

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
              transacoes.map((transacoe) => (
                <TableRow key={transacoe._id}>
                  {/*  <TableCell>{seletiva.nome}</TableCell>
                  <TableCell>{seletiva.email}</TableCell>
                  <TableCell className="text-center">
                    {seletiva.data_nascimento
                      ? new Date(seletiva.data_nascimento).toLocaleDateString()
                      : '-'}
                  </TableCell>
                  <TableCell className="flex items-center justify-center gap-2"> */}
                  {/*   <LoadingButton
                      loading={loading}
                      variant={'destructive'}
                      onClick={() => removeCandidato(seletiva._id)}
                    >
                      <Trash className="h-4 w-4" />
                    </LoadingButton> */}
                  {/* </TableCell> */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex flex-row items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevMonth}
          disabled={loading}
        >
          Anterior
        </Button>
        <div className="flex-1 text-sm text-muted-foreground text-center">
          <p>
            Mês: {String(currentMonth).padStart(2, '0')}/{currentYear}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextMonth}
          disabled={loading}
        >
          Próxima
        </Button>
      </div>
    </div>
  )
}
