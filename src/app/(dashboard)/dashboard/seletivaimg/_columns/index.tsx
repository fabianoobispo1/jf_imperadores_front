'use client'

import { ColumnDef } from '@tanstack/react-table'
import { fetchMutation } from 'convex/nextjs'
import Image from 'next/image'
import { useState } from 'react'

import type { Id } from '@/convex/_generated/dataModel'
import { FileUpload } from '@/components/file-upload'
import { api } from '@/convex/_generated/api'
import { useStorageUrl } from '@/hooks/useStorageUrl'

import ActionCell from './ActionCell'

interface Seletivas {
  _id: Id<'seletiva'>
  _creationTime: number
  numerio_seletiva: number
  nome: string
  cpf: string
  data_nascimento?: number
  email: string
  altura: number
  peso: number
  celular: string
  tem_experiencia: boolean
  equipe_anterior: string
  setor: number
  posicao: string
  equipamento: number
  aprovado?: boolean
  img_link?: string
  cod_seletiva?: string
}

export const transactionColumns = (
  onListUpdate: () => Promise<void>,
): ColumnDef<Seletivas>[] => [
  {
    id: 'image',
    header: 'Foto',
    cell: ({ row }) => {
      const seletiva = row.original
      const ImageCell = () => {
        const [isUploading, setIsUploading] = useState(false)
        const imageUrl = useStorageUrl(seletiva.img_link)

        return (
          <div className="flex items-center gap-2">
            {seletiva.img_link ? (
              <Image
                src={imageUrl ?? '/carousel-1.svg'} // Add a fallback image path
                alt={seletiva.nome}
                className="h-20 w-20 rounded-full object-cover"
                width={80}
                height={80}
              />
            ) : (
              <div className="flex items-center gap-2">
                {isUploading ? (
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <FileUpload
                    onUploadComplete={async (url) => {
                      setIsUploading(true)
                      await fetchMutation(api.seletiva.updateImg, {
                        id: seletiva._id,
                        img_link: url,
                      })
                      setIsUploading(false)
                      onListUpdate()
                    }}
                  />
                )}
              </div>
            )}
          </div>
        )
      }
      return <ImageCell />
    },
  },

  {
    accessorKey: 'nome',
    header: 'Nome',
  },
  {
    accessorKey: 'cod_seletiva',
    header: 'Cod. Seletiva',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <ActionCell seletiva={row.original} onListUpdate={onListUpdate} />
    ),
  },
]
