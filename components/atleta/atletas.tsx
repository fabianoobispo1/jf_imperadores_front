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

interface ProductsClientProps {
  data: User[];
}


export const Atletas: React.FC = () => {
  const router = useRouter();



  const columns: ColumnDef<User>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'name',
      header: 'NAME'
    },
    {
      accessorKey: 'company',
      header: 'COMPANY'
    },
    {
      accessorKey: 'role',
      header: 'ROLE'
    },
    {
      accessorKey: 'status',
      header: 'STATUS'
    }/* ,
    {
      id: 'actions',
      cell: ({ row }) => <CellAction data={row.original} />
    } */
  ];



  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Atletas (10)`}
          description="Lista de atletas"
        />
        <Button
          disabled={true}
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />Adcionar
        </Button>
      </div>
      <Separator />


      <DataTable searchKey="name" columns={columns} data={[]} />
    </>
  );
};
