'use client'

import { useState } from 'react'
import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PresencaPage() {
  const [dataInicio, setDataInicio] = useState<Date>()
  const [dataFim, setDataFim] = useState<Date>()

  const presencas = useQuery(api.presenca.getByPeriodo, {
    data_inicio: dataInicio?.getTime() ?? 0,
    data_fim: dataFim?.getTime() ?? Date.now(),
  })

  const atletas = useQuery(api.atletas.getAllPaginated, {
    offset: 0,
    limit: 100,
    status: 1,
  })

  const columns = [
    {
      accessorKey: 'nome',
      header: 'Atleta',
    },
    {
      accessorKey: 'presencas',
      header: 'Presenças',
    },
    {
      accessorKey: 'frequencia',
      header: 'Frequência %',
    },
  ]

  const data =
    atletas?.map((atleta) => {
      const presencasAtleta =
        presencas?.filter((p) => p.atleta_id === atleta._id) ?? []
      const totalPresencas = presencasAtleta.filter((p) => p.presente).length
      const frequencia = (totalPresencas / (presencasAtleta.length || 1)) * 100

      return {
        id: atleta._id,
        nome: atleta.nome,
        presencas: totalPresencas,
        frequencia: `${frequencia.toFixed(2)}%`,
      }
    }) ?? []

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Controle de Frequência</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Calendar
              mode="single"
              selected={dataInicio}
              onSelect={setDataInicio}
              className="rounded-md border"
            />
            <Calendar
              mode="single"
              selected={dataFim}
              onSelect={setDataFim}
              className="rounded-md border"
            />
          </div>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  )
}
