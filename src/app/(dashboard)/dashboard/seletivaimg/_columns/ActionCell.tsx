import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { fetchMutation, fetchQuery } from 'convex/nextjs'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'

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
interface ActionCellProps {
  seletiva: Seletivas
  onListUpdate: () => Promise<void>
}

const ActionCell = ({ seletiva, onListUpdate }: ActionCellProps) => {
  const [codSeletiva, setCodSeletiva] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpdateCodSeletiva = async () => {
    try {
      setIsLoading(true)
      setError('')

      // Verificar se o código já existe
      const existingCodigo = await fetchQuery(api.seletiva.getByCodSeletiva, {
        cod_seletiva: codSeletiva,
      })

      if (existingCodigo) {
        setError('Este código já está sendo usado')
        return
      }

      await fetchMutation(api.seletiva.updateCodSeletiva, {
        id: seletiva._id,
        cod_seletiva: codSeletiva,
      })
      await onListUpdate()
      setCodSeletiva('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveImage = async () => {
    if (!seletiva.img_link) return

    setIsLoading(true)
    try {
      await fetchMutation(api.files.deleteFile, {
        storageId: seletiva.img_link,
      })
      await fetchMutation(api.seletiva.updateImg, {
        id: seletiva._id,
        img_link: '',
      })
      await onListUpdate()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" disabled={isLoading}>
            Código Seletiva
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Código da Seletiva</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Digite o código"
              value={codSeletiva}
              onChange={(e) => setCodSeletiva(e.target.value)}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              onClick={handleUpdateCodSeletiva}
              disabled={isLoading || !codSeletiva}
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {seletiva.img_link && (
        <Button
          variant="destructive"
          size="sm"
          onClick={handleRemoveImage}
          disabled={isLoading}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

export default ActionCell
