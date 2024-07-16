'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { User } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
/* import { CellAction } from './cell-action'; */
import { Checkbox } from '@/components/ui/checkbox';

/* import { columns } from './columns'; */


export const Caixa: React.FC = () => {
  const router = useRouter();







  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="Caixa"
          description="...."
        />
        <Button
    
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/movimentacao/create`)}
        >
          <Plus className="mr-2 h-4 w-4" />Adcionar movimentação
        </Button>
      </div>
      <Separator />


   
    </>
  );
};
