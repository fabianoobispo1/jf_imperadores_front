import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

/* import { DashboardFinanceiro } from './dashboard-financeiro' */
import { TransacoesLista } from './transacoes-lista'
/* import { RelatoriosFinanceiro } from './relatorios-financeiro' */

export function FinanceiroTabs() {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="transacoes">Transações</TabsTrigger>
        <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        {/*  <DashboardFinanceiro /> */}
      </TabsContent>
      <TabsContent value="transacoes">
        <TransacoesLista />
      </TabsContent>
      <TabsContent value="relatorios">
        {/*   <RelatoriosFinanceiro /> */}
      </TabsContent>
    </Tabs>
  )
}
