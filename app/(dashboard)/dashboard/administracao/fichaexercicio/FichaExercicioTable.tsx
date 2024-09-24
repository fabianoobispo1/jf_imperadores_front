'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { FichaExercicio } from './schemas/fichaExercicioSchema';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { VideoModalButton } from '@/components/VideoModalButton';

interface FichaExercicioExibir extends FichaExercicio {
  posicaoEspecifica?: string;
  descricao?: string;
  nomeExercicio?: string;
  url_img?: string;
  url_video?: string;
}

type Props = {
  fichaExercicios: FichaExercicio[];
  onEdit: (fichaexercicio: FichaExercicio) => void;
  onDelete: (id: string) => void;
};

export function FichaExercicioTable({
  fichaExercicios,
  onEdit,
  onDelete
}: Props) {
  return (
    <div className="pt-2">
      {fichaExercicios.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">Nenhum exercício encontrado.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="relative">
            <TableHeader>
              <TableRow>
                <TableHead >Dia</TableHead>
                <TableHead >Nome</TableHead>
                <TableHead >Reptição</TableHead>
                <TableHead >Carga</TableHead>
                <TableHead className="text-center">video</TableHead>
                <TableHead className="text-end">Opções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fichaExercicios.map((exercicio: FichaExercicioExibir) => (
                <TableRow key={exercicio.id}>
                  <TableCell>{exercicio.diaSemana}</TableCell>
                  <TableCell>{exercicio.nomeExercicio}</TableCell>
                  <TableCell>{exercicio.repeticoes}</TableCell>
                  <TableCell>{exercicio.carga}</TableCell>
                  <TableCell className=" text-center">
                    {exercicio.url_video == '' ? (
                      <></>
                    ) : (
                      <VideoModalButton
                        videoUrl={exercicio.url_video || ''}
                        videoTitle={exercicio.nomeExercicio || ''}
                      />
                    )}
                  </TableCell>
                  {/*          <TableCell>{exercicio.0nomeExercicio}</TableCell>
                  <TableCell>{exercicio.exercicioId}</TableCell>
         
                  <TableCell>{exercicio.repeticoes}</TableCell>
                  <TableCell>{exercicio.carga}</TableCell> */}
                  <TableCell className="flex justify-end gap-4 text-center">
                    <Button
                      className="border-none focus:border-none focus:ring-0"
                      onClick={() => onEdit(exercicio)}
                    >
                      Editar
                    </Button>
                    <Button
                      className="border-none focus:border-none focus:ring-0"
                      onClick={() => onDelete(exercicio.fichaId!)}
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
