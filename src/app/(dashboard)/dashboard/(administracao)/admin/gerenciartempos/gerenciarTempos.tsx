'use client'
import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'

import { api } from '@/convex/_generated/api'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Spinner } from '@/components/ui/spinner'
import type { Id } from '@/convex/_generated/dataModel'

export const GerenciarTempos = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const tentativas = useQuery(api.exercicios.getAllTentativas)
  const exercicios = useQuery(api.exercicios.getAll)
  const removeTentativa = useMutation(api.exercicios.removeTentativa)

  const handleRemover = async (tentativaId: Id<'exercicios_tentativas'>) => {
    try {
      setLoading(true)
      await removeTentativa({ tentativaId })

      toast({
        title: 'Sucesso',
        description: 'Tempo removido com sucesso',
      })
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Erro ao remover o tempo',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Gerenciar Tempos"
          description="Gerencie os tempos registrados dos atletas"
        />

        <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Atleta</TableHead>
                <TableHead>Exercício</TableHead>
                <TableHead>Tentativa</TableHead>
                <TableHead>Tempo</TableHead>
                <TableHead>Data Registro</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : (
                tentativas?.map((tentativa) => (
                  <TableRow key={tentativa._id}>
                    <TableCell>{tentativa.atleta_nome}</TableCell>
                    <TableCell>
                      {
                        exercicios?.find(
                          (e) => e._id === tentativa.exercicio_id,
                        )?.nome
                      }
                    </TableCell>
                    <TableCell>{tentativa.tentativa}ª Tentativa</TableCell>
                    <TableCell>
                      {tentativa.tempo.toFixed(2).replace('.', ',')} seg
                    </TableCell>
                    <TableCell>
                      {new Date(tentativa.data_registro).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemover(tentativa._id)}
                        disabled={loading}
                      >
                        Remover
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}
