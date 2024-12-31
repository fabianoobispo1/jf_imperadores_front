import { useQuery } from 'convex/react'
import { UsersIcon, UserCheckIcon, UserPlusIcon } from 'lucide-react'

import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { api } from '../../../convex/_generated/api'

export default function Page() {
  const totalAtletas = useQuery(api.atletas.getCount)
  const totalAtletasAtivos = 1
  const totalSeletiva = useQuery(api.seletiva.getCount)

  return (
    <ScrollArea className="h-full">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="flex-1 space-y-4 p-4 pt-6">
        <div className="flex items-center justify-start space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Bem Vindo 👋</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Atletas
              </CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAtletas || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Atletas Ativos
              </CardTitle>
              <UserCheckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalAtletasAtivos || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Inscrições Seletiva
              </CardTitle>
              <UserPlusIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSeletiva || 0}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  )
}
