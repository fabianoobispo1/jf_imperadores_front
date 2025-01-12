'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/convex/_generated/api'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import type { Id } from '@/convex/_generated/dataModel'
import { DatePickerWithDefaults } from '@/components/calendar/with-default'

const formSchema = z.object({
  tipo: z.enum(['receita', 'despesa']),
  descricao: z.string().min(3, 'Descrição deve ter no mínimo 3 caracteres'),
  valor: z.number().min(0.01, 'Valor deve ser maior que zero'),
  data: z.date(),
  categoria: z.enum([
    'mensalidade',
    'equipamento',
    'viagem',
    'patrocinio',
    'evento',
    'outros',
  ]),
  status: z.enum(['pendente', 'confirmado']),
  comprovante: z.any().optional(),
  observacao: z.string().optional(),
})

type TransacaoFormValues = z.infer<typeof formSchema>

interface TransacaoFormProps {
  onSuccess?: () => void
  id?: string
}
export function TransacaoForm({ onSuccess, id }: TransacaoFormProps) {
  const { toast } = useToast()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const create = useMutation(api.financas.create)

  const form = useForm<TransacaoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: 'despesa',
      status: 'pendente',
      data: new Date(),
      descricao: '',
      valor: 0,
      categoria: 'outros',
      observacao: '',
    },
  })

  async function onSubmit(data: TransacaoFormValues) {
    try {
      setLoading(true)
      if (!session?.user?.id) return
      if (id) {
        console.log('update')
      } else {
        const transacao = await create({
          tipo: data.tipo,
          descricao: data.descricao,
          valor: data.valor,
          data: data.data.getTime(),
          categoria: data.categoria,
          status: data.status,
          created_at: Date.now(),
          updated_at: Date.now(),
          userId: session.user.id as Id<'user'>,
          comprovante_url: data.comprovante?.url,
          comprovante_key: data.comprovante?.key,
        })
        console.log(transacao)
      }
      onSuccess?.()
      toast({
        title: 'Sucesso!',
        description: 'Transação registrada com sucesso',
      })

      form.reset()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro!',
        description: 'Ocorreu um erro ao registrar a transação',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Movimentação</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="receita">Receita</SelectItem>
                    <SelectItem value="despesa">Despesa</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mensalidade">Mensalidade</SelectItem>
                    <SelectItem value="equipamento">Equipamento</SelectItem>
                    <SelectItem value="viagem">Viagem</SelectItem>
                    <SelectItem value="patrocinio">Patrocínio</SelectItem>
                    <SelectItem value="evento">Evento</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
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
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Digite a descrição"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    placeholder="0,00"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
              <DatePickerWithDefaults
                label="Data pagamento/recebimento"
                date={field.value || undefined}
                setDate={(date) => field.onChange(date || null)}
              />
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="confirmado">Confirmado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="observacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Textarea
                  disabled={loading}
                  placeholder="Observações adicionais"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar Transação'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
