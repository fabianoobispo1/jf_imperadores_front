'use client'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'

import type { Id } from '../../../../../convex/_generated/dataModel'

const formSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email(),
})

interface MensalidadesFormProps {
  initialData?: {
    _id: Id<'mensalidade'>
    _creationTime: number
    tipo: 'avulsa' | 'recorrente'
    email: string
    customer: string
    id_payment_stripe: string
    valor: number
    data_pagamento: number
    data_cancelamento: number
    cancelado: boolean
  } | null
  onSuccess?: () => void
}

export const MensalidadeForm: React.FC<MensalidadesFormProps> = ({
  initialData,
  onSuccess,
}) => {
  /*   const update = useMutation(api.atletas.update)
  const create = useMutation(api.atletas.create) */

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          _id: initialData._id,
          email: initialData.email,
        }
      : {
          _id: undefined,
          email: '',
        },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      console.log(initialData)
      console.log(values)

      if (initialData) {
        // Check if email already exists
        /*      const existingAtleta = await fetchQuery(api.atletas.getByEmail, {
          email: values.email,
        })
 */
        /* if (existingAtleta) { */
        /*      toast({
            title: 'Erro',
            variant: 'destructive',
            description: 'Email já cadastrado no sistema.',
          }) */
        /*   } else { */
        /*   await update({
            atletaId: initialData._id,
            status: parseInt(values.status),
            nome: values.nome,
            cpf: values.cpf,
            email: values.email,
            data_nascimento: new Date(values.data_nascimento).getTime(),
            data_registro: initialData.data_registro,
            altura: parseFloat(values.altura),
            peso: parseFloat(values.peso),
            celular: values.celular,
            setor: parseInt(values.setor),
            posicao: values.posicao,
            rua: values.rua,
            bairro: values.bairro,
            cidade: values.cidade,
            cep: values.cep,
            uf: values.uf,
            complemento: values.complemento,
            genero: values.genero,
            rg: values.rg,
            emisor: values.emisor,
            uf_emisor: values.uf_emisor,
            img_link: '',
          }) */
        /*     toast({
            title: 'Atleta Altrerado com sucesso!',
            description: 'Os dados foram alterados no sistema.',
          }) */
        /*      form.reset()

          onSuccess?.()
          setLoading(false) */
        /* } */
      } else {
        console.log(`adiciona`)

        // Check if email already exists
        /*   const existingAtleta = await fetchQuery(api.atletas.getByEmail, {
          email: values.email,
        }) */

        /*  if (existingAtleta) {
          toast({
            title: 'Erro',
            variant: 'destructive',
            description: 'Email já cadastrado no sistema.',
          })
        } else {
          await create({
            status: parseInt(values.status),
            nome: values.nome,
            cpf: values.cpf,
            email: values.email,
            data_nascimento: new Date(values.data_nascimento).getTime(),
            data_registro: new Date().getTime(),
            altura: values.altura ? parseFloat(values.altura) : 0,
            peso: values.peso ? parseFloat(values.peso) : 0,
            celular: values.celular,
            setor: parseInt(values.setor),
            posicao: values.posicao,
            rua: values.rua,
            bairro: values.bairro,
            cidade: values.cidade,
            cep: values.cep,
            uf: values.uf,
            complemento: values.complemento,
            genero: values.genero,
            rg: values.rg,
            emisor: values.emisor,
            uf_emisor: values.uf_emisor,
            img_link: '',
          }) */

        /*    toast({
            title: 'Atleta cadastrado com sucesso!',
            description: 'Os dados foram salvos no sistema.',
          }) */

        form.reset()

        onSuccess?.()
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Erro ao cadastrar',
        description: 'Ocorreu um erro ao salvar os dados.',
      })
    }
  }

  return (
    /*    <div
      className={cn(
        'space-y-8 w-screen pr-4 ',
        open ? 'md:max-w-[calc(100%-18rem)] ' : 'md:max-w-[calc(100%-7rem)] ',
      )}
    > */
    <ScrollArea className="h-[calc(100vh-270px)]  w-full px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="_id"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input type="_id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@exemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Atleta'}
          </Button>
        </form>
      </Form>
    </ScrollArea>
    /*  </div> */
  )
}
