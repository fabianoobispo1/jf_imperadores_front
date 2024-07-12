import BreadCrumb from '@/components/breadcrumb';
import { MovimentacaoClient } from '@/components/tables/movimentacao-tables/client';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const breadcrumbItems = [
  { title: 'Movimentação', link: '/dashboard/movimentacao' }
];
export default function page() {
  return (
    <ScrollArea className="h-full flex-1 space-y-4  p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <MovimentacaoClient />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>

  );
}
