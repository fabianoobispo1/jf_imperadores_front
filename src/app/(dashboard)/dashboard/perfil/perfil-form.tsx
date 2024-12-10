'use client'
import * as z from 'zod'
import { useCallback, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { fetchMutation, fetchQuery } from 'convex/nextjs'
import { useSession } from 'next-auth/react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { DatePickerWithDropdown } from '@/components/calendar/with-dropdown'
import { useToast } from '@/hooks/use-toast'
import { Spinner } from '@/components/ui/spinner'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUploadFile } from '@/hooks/use-upload-file'
import { FileUploaderButton } from '@/components/file-uploader-button'

import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'

const formSchema = z.object({
  id: z.string(),
  nome: z.string().min(3, { message: 'Nome precisa ser preenchido.' }),
  data_nascimento: z.preprocess(
    (val) => (val === null ? undefined : val), // Transforma null em undefined
    z.date({
      required_error: 'A data de nascimento precisa ser preenchida.',
    }),
  ),
  email: z.string().email({ message: 'Digite um email valido.' }),
  image: z
    .string()
    .url({ message: 'Insira uma URL válida para a imagem.' })
    .optional(),
})

type ProductFormValues = z.infer<typeof formSchema>

export const PerfilForm: React.FC = () => {
  const { onUpload, progresses, isUploading, uploadedFiles } = useUploadFile(
    'imageUploader',
    {
      defaultUploadedFiles: [],
    },
  )

  const { data: session } = useSession()
  const [loadingData, setLoadingData] = useState(true)
  const [bloqueioProvider, setBloqueioProvider] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [img, setImg] = useState('')
  const { toast } = useToast()

  const defaultValues = {
    id: '',
    nome: '',
    data_nascimento: undefined,
    email: '',
    imagee: '',
  }
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const loadUser = useCallback(async () => {
    setLoadingData(true)

    if (sessionId) {
      try {
        const response = await fetchQuery(api.user.getById, {
          userId: sessionId as Id<'user'>,
        })

        if (!response) {
          console.error('Erro ao buscar os dados do usuário:')
          return
        }

        if (response.provider !== 'credentials') {
          setBloqueioProvider(true)
        }
        // Atualiza os valores do formulário com os dados da API
        setImg(response.image ?? '')
        form.reset({
          id: response._id,
          nome: response.nome,
          email: response.email,
          data_nascimento: response.data_nascimento
            ? new Date(response.data_nascimento)
            : undefined,
          image: response.image ?? '',
        })
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error)
      } finally {
        setLoadingData(false) // Define o carregamento como concluído
      }
    }
  }, [sessionId, form])

  useEffect(() => {
    if (session) {
      setSessionId(session.user.id)
      loadUser()
    }
  }, [setSessionId, session, loadUser, sessionId])

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      console.log('Arquivos enviados:', uploadedFiles)
      // Chame aqui a função que você deseja executar
      setImg(uploadedFiles[0]?.url || '')
      form.setValue('image', uploadedFiles[0]?.url || '') // Exemplo de atualização do campo de imagem
    }
  }, [uploadedFiles, form])

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true)

    console.log(data)
    const timestamp = data.data_nascimento
      ? new Date(data.data_nascimento).getTime()
      : 0

    const user = await fetchMutation(api.user.UpdateUser, {
      userId: data.id as Id<'user'>,
      email: data.email,
      image: data.image,
      nome: data.nome,
      data_nascimento: timestamp,
      provider: 'credentials',
    })

    console.log(user)
    toast({
      title: 'ok',
      description: 'Teste.',
    })
    setLoading(false)
  }

  const removeImage = async () => {
    setImg('')
    form.setValue('image', '')
  }

  if (loadingData) {
    return <Spinner />
  }

  return (
    <ScrollArea className="h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="flex flex-col gap-4  md:grid md:grid-cols-2">
            <Avatar className="h-32 w-32">
              <AvatarImage src={img || ''} alt="Avatar" />
              <AvatarFallback>
                {form.getValues('nome')?.[0] || '?'}
              </AvatarFallback>
            </Avatar>{' '}
            <div className="flex flex-col gap-4">
              <FileUploaderButton
                progresses={progresses}
                onUpload={onUpload}
                disabled={isUploading}
              />
              <Button
                variant={'ghost'}
                className="border-2"
                type="button"
                onClick={removeImage}
              >
                Remover Imagem
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className=" flex-col hidden">
                  <FormLabel>Imagem</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="URL da imagem"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className=" flex-col hidden">
                  <FormLabel>id</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading || bloqueioProvider}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="data_nascimento"
              render={({ field }) => (
                <DatePickerWithDropdown
                  label="Data Nascimento"
                  date={field.value || undefined} // Passa undefined se for null
                  setDate={(date) => field.onChange(date || null)} // Define null ao limpar
                />
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            Salvar
          </Button>
        </form>
      </Form>
    </ScrollArea>
  )
}
