'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Separator } from '@radix-ui/react-separator'
import { fetchMutation, fetchQuery } from 'convex/nextjs'

import { Spinner } from '@/components/ui/spinner'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

import { Usuario, usuarioSchema } from './schemas/usuarioSchema'
import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'

export function PerfilForm() {
  const [loadingData, setLoadingData] = useState(true)
  const [bloqueioProvider, setBloqueioProvider] = useState(false)
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Usuario>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      id: '',
      nome: '',
      email: '',
      data_nascimento: '',
      administrador: '',
    },
  })
  const { data: session } = useSession()

  const loadUser = useCallback(async () => {
    setLoadingData(true)

    if (session) {
      try {
        const response = await fetchQuery(api.user.getById, {
          userId: session?.user.id as Id<'user'>,
        })

        if (!response) {
          console.error('Erro ao buscar os dados do usuário:')
          return
        }

        console.log(response)
        if (response.provider !== 'credentials') {
          setBloqueioProvider(true)
        }
        // Atualiza os valores do formulário com os dados da API
        reset({
          id: response._id,
          nome: response.nome,
          email: response.email,
          data_nascimento: response.data_nascimento
            ? new Date(response.data_nascimento).toISOString().split('T')[0]
            : '',
          administrador: response.role,
          provider: response.provider || '',
          img_url: response.image || '',
        })
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error)
      } finally {
        setLoadingData(false) // Define o carregamento como concluído
      }
    }
  }, [session, reset])

  useEffect(() => {
    if (session) {
      loadUser()
    }
  }, [loadUser, session])

  // Chame a função onSubmit passada como props
  const onSubmitHandler = async (data: Usuario) => {
    console.log(data)
    try {
      // Verifique se data_nascimento não é undefined

      const timestamp_dataNascimento = Date.parse(data.data_nascimento || '')
      console.log(timestamp_dataNascimento)

      await fetchMutation(api.user.UpdateUser, {
        userId: data.id as Id<'user'>,
        nome: data.nome,
        email: data.email,
        image: data.img_url,
        data_nascimento: Date.parse(data.data_nascimento || ''),
        provider: data.provider,
      })
      toast({
        title: 'OK',
        description: 'Usuário alterado sucesso.',
      })

      setLoadingData(false)
    } catch (error) {
      console.error('Failed to update user data', error)
      toast({
        title: 'Erro',
        variant: 'destructive',
        description: 'Ocorreu um erro interno.',
      })
      setLoadingData(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={'Perfil'}
          description={'Editar suas informações pessoais.'}
        />
      </div>
      <Separator />

      {loadingData ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
          {/* Campo oculto para o id */}
          <input type="hidden" {...register('id')} />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Nome do usuário"
                {...register('nome')}
                color={errors.nome ? 'failure' : undefined} // Modifica o estilo se houver erro
              />
              {errors.nome && (
                <p className="text-sm text-red-500">{errors.nome.message}</p> // Exibe a mensagem de erro
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                disabled={bloqueioProvider}
                id="email"
                type="email"
                placeholder="user@example.com"
                {...register('email')}
                color={errors.email ? 'failure' : undefined}
              />
            </div>

            <div>
              <Label htmlFor="data_nascimento">Data Nascimento</Label>
              <Input
                id="data_nascimento"
                type="date"
                {...register('data_nascimento')}
                color={errors.data_nascimento ? 'failure' : undefined}
              />
            </div>

            {/*   <div>
              <Label htmlFor="administrador">Administrador</Label>
              <select
                id="administrador"
                {...register('administrador', {
                  setValueAs: (v) => v === 'true' // Converte a string para booleano
                })}
                className={`'flex disabled:opacity-50' h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed ${
                  errors.administrador ? 'border-red-500' : ''
                }`}
              >
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
              {errors.administrador && (
                <p className="text-sm text-red-500">
                  {errors.administrador.message}
                </p> // Exibe a mensagem de erro
              )}
            </div> */}
          </div>

          <Button
            disabled={loadingData}
            className="w-32 border-none focus:border-none focus:ring-0"
            type="submit"
          >
            Salvar
          </Button>
        </form>
      )}
    </>
  )
}
