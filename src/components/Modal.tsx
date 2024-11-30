'use client'

import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface ModalProps {
  exibeModal: boolean // Controla a visibilidade do modal
  onClose: () => void // Função para fechar o modal
  title?: string // Título do modal (opcional)
  children: ReactNode // Conteúdo do modal
  isMobile?: boolean
}

export function Modal({
  exibeModal,
  onClose,
  title,
  children,
  isMobile,
}: ModalProps) {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  /*   cn(
    isMobile
      ? '  h-28 flex flex-col justify-center gap-4 items-start p-2'
      : ' h-24 flex justify-between items-center rounded-3xl p-2',
    'bg-teal-200 ',
  ) */
  return (
    <div
      className={cn(
        exibeModal ? 'opacity-100 visible' : 'opacity-0 invisible',
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300',
      )}
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          exibeModal ? 'scale-100' : 'scale-95',

          isMobile
            ? 'fixed bottom-0 left-0  right-0 m-0 rounded-t-lg' // Estilo para mobile
            : 'relative w-full max-w-lg ', // Estilo para desktop
          'rounded-lg  p-6 shadow-lg bg-white transition-transform duration-300',
        )}
      >
        {/* Cabeçalho do modal */}
        {title && (
          <div className="mb-4 flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        )}

        {/* Conteúdo do modal */}
        <div>{children}</div>

        {/* Rodapé */}
        {/*   <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Fechar
          </button>
        </div> */}
      </div>
    </div>
  )
}
