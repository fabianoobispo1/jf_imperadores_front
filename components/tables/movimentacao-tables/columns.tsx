'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Movimentacoes } from './client';

export const columns = (handleDelete: (id: number) => void): ColumnDef<Movimentacoes>[] => [
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
    accessorKey: 'descricao',
    header: 'DESCRIÇÃO'
  },
  {
    accessorKey: 'valor',
    header: 'VALOR'
  },
  {
    accessorKey: 'data_vencimento',
    header: 'VENCIMENTO'
  },
  {
    accessorKey: 'data_pagamento',
    header: 'PAGAMENTO'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} onDelete={handleDelete} />
  }
];
