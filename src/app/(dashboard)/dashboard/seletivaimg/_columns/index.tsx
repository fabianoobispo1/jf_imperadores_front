/* eslint-disable @next/next/no-img-element */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { fetchMutation } from 'convex/nextjs'
import { Trash2 } from 'lucide-react'

import type { Id } from '@/convex/_generated/dataModel'
import { FileUpload } from '@/components/file-upload'
import { api } from '@/convex/_generated/api'
import { useStorageUrl } from '@/hooks/useStorageUrl'
import { Button } from '@/components/ui/button'

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
        const imageUrl = useStorageUrl(seletiva.img_link)
        return (
          <div className="flex items-center gap-2">
            {seletiva.img_link ? (
              <img
                src={imageUrl || ''}
                alt={seletiva.nome}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="flex items-center gap-2">
                <FileUpload
                  onUploadComplete={async (url) => {
                    await fetchMutation(api.seletiva.updateImg, {
                      id: seletiva._id,
                      img_link: url,
                    })
                    onListUpdate()
                  }}
                />
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
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row: { original: Seletivas } }) => {
      const handleRemoveImage = async () => {
        await fetchMutation(api.seletiva.updateImg, {
          id: Seletivas._id,
          img_link: '', // Limpa o link da imagem
        })
        // Recarrega a lista após remover
        onListUpdate()
      }
      return (
        <div className="flex items-center gap-2">
          {Seletivas.img_link ? (
            <Button variant="destructive" size="sm" onClick={handleRemoveImage}>
              <Trash2 className="h-4 w-4" />
            </Button>
          ) : (
            <></>
          )}
        </div>
      )
    },
  },
]
