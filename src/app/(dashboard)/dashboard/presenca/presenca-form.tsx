'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useMutation } from 'convex/react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/convex/_generated/api'
import { useToast } from '@/hooks/use-toast'
import { DatePickerWithDropdown } from '@/components/calendar/with-dropdown'
import type { Id } from '@/convex/_generated/dataModel'

const formSchema = z.object({
  data_treino: z.date(),
  atletas: z.array(
    z.object({
      id: z.string(),
      presente: z.boolean(),
      observacao: z.string().optional(),
    }),
  ),
})

export const PresencaForm = ({
  atletas,
}: {
  atletas: Array<{ _id: string; nome: string }>
}) => {
  const { toast } = useToast()
  const create = useMutation(api.presenca.create)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data_treino: new Date(),
      atletas: atletas.map((a) => ({
        id: a._id,
        presente: false,
        observacao: '',
      })),
    },
  })
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      for (const atleta of data.atletas) {
        await create({
          atleta_id: atleta.id as Id<'atletas'>,
          data_treino: data.data_treino.getTime(),
          presente: atleta.presente,
          observacao: atleta.observacao,
        })
      }
      toast({ title: 'Presenças registradas com sucesso!' })
    } catch (error) {
      console.log(error)
      toast({
        title: 'Erro ao registrar presenças',
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="data_treino"
          render={({ field }) => (
            <DatePickerWithDropdown
              label="Data do Treino"
              date={field.value || undefined}
              setDate={(date) => field.onChange(date || null)}
            />
          )}
        />

        {atletas.map((atleta, index) => (
          <div key={atleta._id} className="flex items-center gap-4">
            <FormField
              control={form.control}
              name={`atletas.${index}.presente`}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>{atleta.nome}</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`atletas.${index}.observacao`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea placeholder="Observações" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        ))}

        <Button type="submit">Registrar Presenças</Button>
      </form>
    </Form>
  )
}
