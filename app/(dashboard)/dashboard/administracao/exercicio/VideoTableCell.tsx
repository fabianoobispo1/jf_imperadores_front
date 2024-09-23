import { useState } from 'react';
import { TableCell } from '@/components/ui/table'; // Ou o seu próprio componente

// Supondo que você esteja usando um modal genérico da biblioteca
import { Modal } from '@/components/ui/modal';

interface Exercicio {
  url_img: string;
  url_video: string;
}

function VideoTableCell({ exercicio }: { exercicio: Exercicio }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Exibe a miniatura do vídeo na célula da tabela */}
      <TableCell>
        <video
          src={exercicio.url_img}
          width="100" // Tamanho da miniatura
          onClick={handleOpen} // Ao clicar, abre o modal
          style={{ cursor: 'pointer' }}
          controls={false} // Remove os controles na miniatura
        />
      </TableCell>

      {/* Modal que exibe o vídeo maior */}
      <Modal
        title="Exibir Vídeo"
        description="Veja o vídeo completo"
        isOpen={isOpen}
        onClose={handleClose}
      >
        <video
          src={exercicio.url_video} // URL do vídeo maior
          width="800" // Tamanho do vídeo no modal
          controls // Habilita os controles de reprodução
          autoPlay
        />
      </Modal>
    </>
  );
}

export default VideoTableCell;