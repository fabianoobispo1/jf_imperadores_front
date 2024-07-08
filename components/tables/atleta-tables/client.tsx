'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Atletas } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

interface AtletasProps {
  data: Atletas[];
}

export const AtletaClient: React.FC<AtletasProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`.. (${data.length})`}
          description="Gerenciar atletas"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/atleta/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="nome" columns={columns} data={data} />
    </>
  );
};
