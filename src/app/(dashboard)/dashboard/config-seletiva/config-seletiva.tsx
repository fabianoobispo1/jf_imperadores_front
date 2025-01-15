'use client'
import { useEffect, useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Edit } from 'lucide-react'

import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { DataTable } from '@/components/ui/data-table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import type { Id } from '@/convex/_generated/dataModel'
import { DatePickerWithRange } from '@/components/calendar/with-range'

const formSchema = z.object({
  _id: z.string().optional(),
  titulo: z.string().min(1, 'Título é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  local: z.string().min(1, 'Local é obrigatório'),
  horario: z.string().min(1, 'Horário é obrigatório'),
  status: z.boolean(),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
})

type FormValues = z.infer<typeof formSchema>

export const ConfigSeletiva = () => {
  const { toast } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const [editingItem, setEditingItem] = useState<FormValues | null>(null)

  const update = useMutation(api.seletivaConfig.updateConfig)
  const seletivas = useQuery(api.seletivaConfig.getAllConfig) || []
  const create = useMutation(api.seletivaConfig.createConfig)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: '',
      descricao: '',
      local: '',
      horario: '',
      status: false,
      date: {
        from: new Date(),
        to: new Date(),
      },
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)

      if (editingItem) {
        await update({
          id: editingItem._id as Id<'seletivaConfig'>,
          titulo: data.titulo,
          descricao: data.descricao,
          local: data.local,
          horario: data.horario,
          status: data.status,
          data_inicio: data.date.from.getTime(),
          data_fim: data.date.to.getTime(),
        })
        toast({
          title: 'Sucesso',
          description: 'Seletiva atualizada com sucesso',
        })
      } else {
        await create({
          titulo: data.titulo,
          descricao: data.descricao,
          local: data.local,
          horario: data.horario,
          status: data.status,
          data_inicio: data.date.from.getTime(),
          data_fim: data.date.to.getTime(),
          created_at: Date.now(),
        })
        toast({
          title: 'Sucesso',
          description: 'Seletiva criada com sucesso',
        })
      }

      setShowModal(false)
      setEditingItem(null)
      form.reset()
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Ocorreu um erro ao criar a seletiva',
      })
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      accessorKey: 'titulo',
      header: 'Título',
    },
    {
      accessorKey: 'data_inicio',
      header: 'Data Início',

      cell: ({ row }: { row: { getValue: (key: string) => number } }) =>
        format(row.getValue('data_inicio'), 'dd/MM/yyyy'),
    },
    {
      accessorKey: 'data_fim',
      header: 'Data Fim',

      cell: ({ row }: { row: { getValue: (key: string) => number } }) =>
        format(row.getValue('data_fim'), 'dd/MM/yyyy'),
    },
    {
      accessorKey: 'local',
      header: 'Local',
    },
    {
      accessorKey: 'horario',
      header: 'Horário',
    },
    {
      accessorKey: 'status',
      header: 'Status',

      cell: ({ row }: { row: { getValue: (key: string) => boolean } }) => (
        <span
          className={row.getValue('status') ? 'text-green-600' : 'text-red-600'}
        >
          {row.getValue('status') ? 'Ativa' : 'Inativa'}
        </span>
      ),
    },
    {
      id: 'actions',

      cell: ({ row }: { row: { original: FormValues } }) => {
        const seletiva = row.original

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditingItem(seletiva)
                setShowModal(true)
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    if (editingItem) {
      form.reset({
        titulo: editingItem.titulo,
        descricao: editingItem.descricao,
        local: editingItem.local,
        horario: editingItem.horario,
        status: editingItem.status,
        date: {
          from: new Date(editingItem.date.from),
          to: new Date(editingItem.date.to),
        },
      })
    }
  }, [editingItem, form])

  const formattedSeletivas = seletivas.map((seletiva) => ({
    ...seletiva,
    date: {
      from: new Date(seletiva.data_inicio),
      to: new Date(seletiva.data_fim),
    },
  }))

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Configuração de Seletivas"
          description="Gerencie os períodos de seletivas"
        />
        <Button onClick={() => setShowModal(true)}>Nova Seletiva</Button>
      </div>

      <DataTable
        columns={columns}
        data={formattedSeletivas}
        searchKey="titulo"
      />

      <Dialog
        open={showModal}
        onOpenChange={(open) => {
          setShowModal(open)
          if (!open) {
            setEditingItem(null)
            form.reset()
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Editar Seletiva' : 'Nova Seletiva'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Título da seletiva"
                        {...field}
                      />
                    </FormControl>
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
                      <Textarea
                        disabled={loading}
                        placeholder="Descrição da seletiva"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Período da Seletiva</FormLabel>
                    <DatePickerWithRange
                      date={field.value}
                      setDate={field.onChange}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="local"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Local da seletiva"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="horario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Horário da seletiva"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Seletiva Ativa</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={loading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {editingItem ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
