'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Atletas } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';

export const columns = (handleDelete: (id: number) => void): ColumnDef<Atletas>[] => [
   {
    id: 'select',
    /* header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="selecionar todos"
      />
    ), */
/*     cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="selecionar linha"
      />
    ), */
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'nome',
    header: 'NOME'
  },
  {
    accessorKey: 'setor',
    header: 'SETOR'
  },
  {
    accessorKey: 'posicao',
    header: 'POSIÇÃO'
  },
  {
    accessorKey: 'numero',
    header: 'NUMERO'
  },
  {
    accessorKey: 'ativo',
    header: 'ATIVO'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} onDelete={handleDelete} />
  }
];
