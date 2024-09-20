import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { FichaExercicios } from './Componentes/fichaExercicios';

const breadcrumbItems = [
  { title: 'Ficha Exercicios', link: '/dashboard/fichaexercicios' }
];
export default function page() {
  return (
    <ScrollArea className="h-full flex-1 space-y-4  p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <FichaExercicios />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
