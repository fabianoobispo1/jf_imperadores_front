'use client'
import * as z from 'zod'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { fetchMutation, fetchQuery } from 'convex/nextjs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import { formatCPF } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

import { api } from '../../../../../convex/_generated/api'

const formSchema = z.object({
  tipo: z.enum(['despesa', 'receita']).default('despesa'),
  descricao: z
    .string()
    .min(1, { message: 'descrição precisa ser preenchida.' }),
  valor: z.number(),
  data: z.preprocess(
    (val) => (val === null ? undefined : val),
    z.date({
      required_error: 'A data de nascimento precisa ser preenchida.',
    }),
  ),
})

type ProductFormValues = z.infer<typeof formSchema>

export const FinancasForm: React.FC = () => {
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)

  const defaultValues = {
    tipo: 'despesa',
    descricao: '',
    data: undefined,
    valor: 0,
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true)
    console.log(data)
    const timestamp = data.data ? new Date(data.data).getTime() : 0

    // vrfica e ja exsite registro
    /*  
 
    const candidato = await fetchMutation(api.seletiva.create, {
      nome: data.nome,
      cpf: cpfSemMascara,
      email: data.email,
      data_nascimento: timestamp,
      img_link: imgUrl,
    })

    if (!candidato) {
      toast({
        title: 'Erro',
        variant: 'destructive',
        description: 'Candidato não cadastrado.',
      })
      setLoading(false)
      return
    }

    toast({
      title: 'ok',
      description: 'Candidato cadastrado.',
    }) */

    /*  console.log({
      ...data,
      imgUrl,
      cpfSemMascara,
      timestamp: data.data_nascimento
        ? new Date(data.data_nascimento).getTime()
        : null,
    }) */

    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Movimentação</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} placeholder="?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="receita">Entrada</SelectItem>
                    <SelectItem value="despesa">Saida</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Descrição"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="data"
            render={({ field }) => (
              <DatePickerWithDropdown
                label="Data pagamento/recebimento"
                date={field.value || undefined} 
                setDate={(date) => field.onChange(date || null)} 
              />
            )}
          />
          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input disabled={loading} type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={loading} className="ml-auto" type="submit">
          Salvar
        </Button>
      </form>
    </Form>
  )
}