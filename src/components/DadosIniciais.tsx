'use client'
import { useQuery } from 'convex/react'
import { UsersIcon, UserCheckIcon, UserPlusIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { api } from '../../convex/_generated/api'

export default function DadosIniciais() {
  const totalAtletas = useQuery(api.atletas.getCount)
  const totalAtletasAtivos = useQuery(api.atletas.getCountByStatus, {
    status: 1,
  })
  const totalSeletiva = useQuery(api.seletiva.getCount)

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Atletas
          </CardTitle>
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalAtletas === undefined ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              totalAtletas || 0
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Atletas Ativos</CardTitle>
          <UserCheckIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalAtletasAtivos === undefined ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              totalAtletasAtivos || 0
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Inscrições para a Seletiva
          </CardTitle>
          <UserPlusIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalSeletiva === undefined ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              totalSeletiva || 0
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
