'use client'
import { useQuery, useMutation } from 'convex/react'
import { useState } from 'react'

import { api } from '@/convex/_generated/api'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import type { Id } from '@/convex/_generated/dataModel'
import { Spinner } from '@/components/ui/spinner'

interface ListaPresencaProps {
  data: Date
}

export const ListaPresenca: React.FC<ListaPresencaProps> = ({ data }) => {
  const timestamp = data.getTime()
  const presencas = useQuery(api.presenca.getPresencasByData, {
    data_treino: timestamp,
  })
  // carrega atletas ativos, ordenados por nome
  const atletas = useQuery(api.atletas.getAllAtivos)
  const addMultiplePresencas = useMutation(api.presenca.addMultiplePresencas)

  const [pendingPresencas, setPendingPresencas] = useState<
    Map<string, boolean>
  >(new Map())

  const atletasOrdenados = atletas?.sort((a, b) => a.nome.localeCompare(b.nome))

  const handleCheckChange = (atletaId: Id<'atletas'>, checked: boolean) => {
    setPendingPresencas(new Map(pendingPresencas.set(atletaId, checked)))
  }

  const handleSaveAll = async () => {
    const presencasArray = Array.from(pendingPresencas.entries())
      .filter(
        ([atletaId, presente]) =>
          atletaId !== undefined && presente !== undefined,
      )
      .map(([atletaId, presente]) => ({
        atleta_id: atletaId as unknown as Id<'atletas'>, // Forçando a tipagem correta
        data_treino: timestamp,
        presente: Boolean(presente),
        observacao: '',
      }))
    console.log(presencasArray)

    if (presencasArray.length > 0) {
      await addMultiplePresencas({ presencas: presencasArray })
      setPendingPresencas(new Map())
    }
  }
  if (!atletas) {
    return (
      <div className="flex items-center justify-center h-40">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Lista de Presença - {data.toLocaleDateString()}
        </h3>
        <Button onClick={handleSaveAll} disabled={pendingPresencas.size === 0}>
          Salvar Presenças
        </Button>
      </div>

      <div className="space-y-2">
        {atletasOrdenados?.map((atleta) => (
          <div
            key={atleta.id}
            className="flex items-center gap-2 p-2 border rounded"
          >
            <Checkbox
              checked={
                pendingPresencas.has(atleta.id)
                  ? pendingPresencas.get(atleta.id)
                  : presencas?.some(
                      (p) => p.atleta_id === atleta.id && p.presente,
                    )
              }
              onCheckedChange={(checked) =>
                handleCheckChange(atleta.id, !!checked)
              }
            />
            <span>{atleta.nome}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
