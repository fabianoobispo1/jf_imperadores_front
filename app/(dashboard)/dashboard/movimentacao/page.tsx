import BreadCrumb from '@/components/breadcrumb';
import { MovimentacaoClient } from '@/components/tables/movimentacao-tables/client';

const breadcrumbItems = [
  { title: 'Movimentação', link: '/dashboard/movimentacao' }
];
export default function page() {
  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <MovimentacaoClient />
    </div>
  );
}
