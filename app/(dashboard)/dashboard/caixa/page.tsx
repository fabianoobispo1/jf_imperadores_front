import BreadCrumb from '@/components/breadcrumb';
import { Caixa } from '@/components/caxa/caixa';
/* import { MovimentacaoClient } from '@/components/tables/movimentacao-tables/client'; */
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const breadcrumbItems = [
  { title: 'Caixa', link: '/dashboard/caixa' }
];
export default function page() {
  return (
    <ScrollArea className="h-full flex-1 space-y-4  p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
     {/*  <MovimentacaoClient /> */}
     <Caixa />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>

  );
}
