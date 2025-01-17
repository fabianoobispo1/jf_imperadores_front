'use client'
import { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { fetchQuery } from 'convex/nextjs'

import { DataTable } from '@/components/ui/data-table'
import type { Id } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'

import { transactionColumns } from './_columns'

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

export const TryoutImg: React.FC = () => {
  const { data: session } = useSession()

  const [seltivas, setSeletivas] = useState<Seletivas[]>([])

  const loadList = useCallback(async () => {
    const allSeletivas = await fetchQuery(api.seletiva.getAll, {})

    const sortedSeletivas = [...allSeletivas].sort((a, b) => {
      return a.nome.localeCompare(b.nome)
    })
    setSeletivas(sortedSeletivas)
  }, [])

  useEffect(() => {
    if (session) {
      loadList()
    }
  }, [loadList, session])

  return (
    <>
      <DataTable
        searchKey="nome"
        columns={transactionColumns(loadList)} // Modificar aqui para passar a função
        data={JSON.parse(JSON.stringify(seltivas))}
      />
    </>
  )
}
