import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { extractYouTubeID } from '@/lib/utils';

type VideoModalButtonProps = {
  videoUrl: string;
  videoTitle: string;
};

export function VideoModalButton({ videoUrl, videoTitle }: VideoModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button className="border-none focus:border-none focus:ring-0" onClick={handleOpen}>
        Ver Vídeo
      </Button>
      {isOpen && (
        <Modal
          title={videoTitle}
          description=""
          isOpen={isOpen}
          onClose={handleClose}
        >
          <div className="flex justify-center items-center">
            <div className="w-full max-w-2xl">
              <iframe
                className="w-full h-auto aspect-video"
                src={`https://www.youtube.com/embed/${extractYouTubeID(videoUrl)}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
