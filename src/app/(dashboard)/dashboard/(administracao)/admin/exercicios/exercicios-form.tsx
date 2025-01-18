'use client'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useMutation } from 'convex/react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Heading } from '@/components/ui/heading'
import { api } from '@/convex/_generated/api'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
})

type FormValues = z.infer<typeof formSchema>

export const ExerciciosForm = () => {
  const { toast } = useToast()
  const create = useMutation(api.exercicios.create)
  const [loading, setLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      descricao: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)
      await create({
        nome: data.nome,
        descricao: data.descricao,
      })

      toast({
        title: 'Sucesso!',
        description: 'Exercício cadastrado.',
      })

      form.reset()
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Erro!',
        description: 'Algo deu errado.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Cadastro de Exercícios"
          description="Adicione um novo exercício"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="grid grid-cols-1 gap-8">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Exercício</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Nome do exercício"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Descrição do exercício"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} type="submit">
              Cadastrar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
