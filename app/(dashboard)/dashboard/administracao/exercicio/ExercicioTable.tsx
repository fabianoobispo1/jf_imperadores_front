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

type Props = {
  exercicios: Exercicio[];
  onEdit: (exercicio: Exercicio) => void;
  onDelete: (id: string) => void;
};

export function ExercicioTable({ exercicios , onEdit, onDelete }: Props) {

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const extractYouTubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|embed\/|watch\?v=|\/videos\/|watch\?v%3D|watch\?v%3D|watch\?list=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  
  const handleVideoOpen = (url_video: string) => {
    setSelectedVideo(url_video);
  };

  const handleModalClose = () => {
    setSelectedVideo(null);
  };
  
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
                <TableHead className="text-center">Nome</TableHead>
                <TableHead className="text-center">Descrição</TableHead>
                <TableHead className="text-center">imagem</TableHead>
                <TableHead className="text-center">video</TableHead>
                <TableHead className="text-end">Opções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercicios.map((exercicio) => (
                <TableRow key={exercicio.id}>
                  <TableCell>{exercicio.nome}</TableCell>
                  <TableCell>{exercicio.descricao}</TableCell>
                  <TableCell>{exercicio.url_img}</TableCell>
                 
                  {/* Exibir URL do vídeo */}
                  <TableCell>
                    {exercicio.url_video =='' ? <></> : <Button
                      className="border-none focus:border-none focus:ring-0"
                      onClick={() => handleVideoOpen(exercicio.url_video||'')}
                    >
                      Ver Vídeo
                    </Button>}

                    
                  </TableCell>
                  <TableCell className="text-center flex gap-4 justify-end">
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
     
      {selectedVideo && (
        <Modal
          title="Exibir Vídeo"
          description=""
          isOpen={!!selectedVideo}
          onClose={handleModalClose}
        >
           <iframe
            width="450"
            height="300"
            src={`https://www.youtube.com/embed/${extractYouTubeID(selectedVideo)}`}
         
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Modal>
      )}
    </div>
  );
}
