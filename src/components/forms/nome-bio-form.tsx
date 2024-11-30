'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import * as z from 'zod'

import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { api } from '../../../convex/_generated/api'
import { LoadingButton } from '../ui/loading-button'
import type { Id } from '../../../convex/_generated/dataModel'
/* import { useToast } from '../../components/ui/use-toast' */
const formSchema = z.object({
  nome: z.string().min(3, { message: 'Digite o nome.' }),
  bio: z.string().min(3, { message: 'DIgite uma descrição' }),
})

type UserFormValue = z.infer<typeof formSchema>

interface NomeeBioFormProps {
  nome: string
  bio: string
  idTela: string
  setButton: (value: string) => void
}

export default function NomeBioForm({
  setButton,
  nome,
  bio,
  idTela,
}: NomeeBioFormProps) {
  const [loading, setLoading] = useState(false)

  const updateTelaLinks = useMutation(api.telaLinks.updateTelaLinks)

  const defaultValues = {
    nome,
    bio,
  }
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true)
    console.log(data)
    console.log(idTela)

    try {
      const id: Id<'telaLinks'> = idTela as Id<'telaLinks'>
      const teste = await updateTelaLinks({ id, nome, bio })
      console.log(teste)
      console.log('Atualização bem-sucedida!')
    } catch (error) {
      console.error('Erro ao atualizar telaLinks:', error)
    }
    setButton('Cadastrar')
    setLoading(false)
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Tela</FormLabel>
                <FormControl>
                  <Input
                    type="nome"
                    placeholder="Digite o nome da tela..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input
                    type="bio"
                    placeholder="Digite a descrição..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            loading={loading}
            className="ml-auto w-full"
            type="submit"
          >
            {loading ? 'Carregando' : 'Salvar'}
          </LoadingButton>
        </form>
      </Form>
    </>
  )
}
