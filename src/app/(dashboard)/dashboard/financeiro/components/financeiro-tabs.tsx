import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { DashboardFinanceiro } from './dashboard-financeiro'
import { TransacoesLista } from './transacoes-lista'
/* import { RelatoriosFinanceiro } from './relatorios-financeiro' */

export function FinanceiroTabs() {
  return (
    <ScrollArea className="h-[calc(100vh-250px)] w-full">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
          {/*  <TabsTrigger value="relatorios">Relatórios</TabsTrigger> */}
        </TabsList>
        <TabsContent value="dashboard">
          <DashboardFinanceiro />
        </TabsContent>
        <TabsContent value="transacoes">
          <TransacoesLista />
        </TabsContent>
        <TabsContent value="relatorios">
          {/*   <RelatoriosFinanceiro /> */}
        </TabsContent>
      </Tabs>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
