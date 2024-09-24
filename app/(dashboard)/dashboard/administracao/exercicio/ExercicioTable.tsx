'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Exercicio } from './schemas/exercicioSchema';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { useState } from 'react';
import { extractYouTubeID } from '@/lib/utils';
import { VideoModalButton } from '@/components/VideoModalButton';

type Props = {
  exercicios: Exercicio[];
  onEdit: (exercicio: Exercicio) => void;
  onDelete: (id: string) => void;
};

export function ExercicioTable({ exercicios, onEdit, onDelete }: Props) {
  return (
    <div className="pt-2">
      {exercicios.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">Nenhum exercício encontrado.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="relative">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                {/*   <TableHead className="text-center">imagem</TableHead> */}
                <TableHead className="text-center">video</TableHead>
                <TableHead className="text-end">Opções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercicios.map((exercicio) => (
                <TableRow key={exercicio.id}>
                  <TableCell>{exercicio.nome}</TableCell>
                  <TableCell>{exercicio.descricao}</TableCell>
                  {/*      <TableCell>{exercicio.url_img}</TableCell> */}

                  <TableCell className=" text-center">
                    {exercicio.url_video == '' ? (
                      <></>
                    ) : (
                      <VideoModalButton
                        videoUrl={exercicio.url_video || ''}
                        videoTitle={exercicio.nome || ''}
                      />
                    )}
                  </TableCell>
                  <TableCell className="flex justify-end gap-4 text-center">
                    <Button
                      className="border-none focus:border-none focus:ring-0"
                      onClick={() => onEdit(exercicio)}
                    >
                      Editar
                    </Button>
                    <Button
                      className="border-none focus:border-none focus:ring-0"
                      onClick={() => onDelete(exercicio.id!)}
                      color="failure"
                    >
                      <Trash className="h-4 w-4" />
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
