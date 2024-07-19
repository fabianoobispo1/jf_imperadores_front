import BreadCrumb from '@/components/breadcrumb';

import FileUpload from '@/components/file-upload';
import { Tryout } from '@/components/tryout/tryout';

/* import { MovimentacaoClient } from '@/components/tables/movimentacao-tables/client'; */
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const breadcrumbItems = [
  { title: 'TryOut', link: '/dashboard/tryout' }
];
export default function page() {
  return (
    <ScrollArea className="h-full flex-1 space-y-4  p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
     {/*  <MovimentacaoClient /> */}
      <Tryout />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>

  );
}
