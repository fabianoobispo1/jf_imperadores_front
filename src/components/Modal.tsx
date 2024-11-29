'use client'

import { ReactNode } from 'react'
import clsx from 'clsx' // Biblioteca opcional para manipular classes dinamicamente

interface ModalProps {
  exibeModal: boolean // Controla a visibilidade do modal
  onClose: () => void // Função para fechar o modal
  title?: string // Título do modal (opcional)
  children: ReactNode // Conteúdo do modal
}

export function Modal({ exibeModal, onClose, title, children }: ModalProps) {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300',
        {
          'opacity-100 visible': exibeModal, // Modal visível
          'opacity-0 invisible': !exibeModal, // Modal escondido
        },
      )}
      onClick={handleOverlayClick}
    >
      <div
        className={clsx(
          'relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg transition-transform duration-300',
          {
            'scale-100': exibeModal, // Escala normal ao exibir
            'scale-95': !exibeModal, // Escala reduzida ao esconder
          },
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
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
