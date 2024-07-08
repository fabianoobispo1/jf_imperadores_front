import BreadCrumb from '@/components/breadcrumb';
import { AtletaClient } from '@/components/tables/atleta-tables/client';
import { atletas } from '@/constants/data';

const breadcrumbItems = [
  { title: 'Atleta', link: '/dashboard/atleta' }
];
export default function page() {
  return (
    <>

      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <AtletaClient data={atletas} />
      </div>      
    </>
  );
}



