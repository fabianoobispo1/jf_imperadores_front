'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Usuario } from './schemas/usuarioSchema';
import { Button } from '@/components/ui/button';

type Props = {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onDelete: (id: string) => void;
};

export function ExercicioTable({ usuarios , onEdit, onDelete }: Props) {
  return (
    <div className="pt-2">
      {usuarios.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">Nenhum exercício encontrado.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="relative">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Nome</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Administrador</TableHead>
                <TableHead className="text-center">Criado em</TableHead>
                <TableHead className="text-center">Opções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.nome}</TableCell>
                  <TableCell>{usuario.nome}</TableCell>
                  <TableCell className="text-center">
                    {' '}
                    {usuario.administrador ? 'Sim' : 'Não'}
                  </TableCell>
                  <TableCell className="text-center">
                  {usuario.created_at ? new Date(usuario.created_at).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      className="border-none focus:border-none focus:ring-0"
                      onClick={() => onEdit(usuario)}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
