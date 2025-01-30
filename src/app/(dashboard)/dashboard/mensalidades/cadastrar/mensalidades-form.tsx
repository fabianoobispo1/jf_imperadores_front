'use client'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { fetchQuery } from 'convex/nextjs'
import { Check, ChevronsUpDown } from 'lucide-react'

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
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getMesAtual, MESES } from '@/constants/dates'

/* tipo: v.union(v.literal('avulsa'), v.literal('recorrente')),
email: v.string(),
customer: v.string(),
id_payment_stripe: v.string(),
valor: v.number(),
data_pagamento: v.number(),
data_cancelamento: v.number(),
cancelado: v.boolean(),
 */
const formSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email(),
  valor: z.number(),
  data_pagamento: z.preprocess(
    (val) => (val === null ? undefined : val), // Transforma null em undefined
    z.date({
      required_error: 'A data de pagamento precisa ser preenchida.',
    }),
  ),
  mes_referencia: z.string(),
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

interface ComboboxOption {
  label: string
  value: string
}

export const MensalidadeForm: React.FC<MensalidadesFormProps> = ({
  initialData,
  onSuccess,
}) => {
  const [options, setOptions] = useState<ComboboxOption[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const loadAtletas = async () => {
      try {
        const response = await fetchQuery(api.atletas.getAllAtivos, {})
        const formattedOptions = (response || []).map((atleta) => ({
          label: atleta.nome,
          value: atleta.email,
        }))
        setOptions(formattedOptions)
      } catch (error) {
        console.error('Erro ao carregar atletas:', error)
        setOptions([])
      }
    }

    loadAtletas()
  }, [])

  const currencyMask = (value: string | number) => {
    const cleanValue =
      typeof value === 'string' ? value.replace(/\D/g, '') : value.toString()
    const numberValue = Number(cleanValue) / 100
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numberValue)
  }

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
          data_pagamento: new Date(),
          valor: 0,
          mes_referencia: getMesAtual(),
        },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      console.log(initialData)
      console.log(values)

      if (initialData) {
        console.log(`edita`)
      } else {
        console.log(`adiciona`)

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
              <FormItem className="flex flex-col">
                <FormLabel>Atletas ativos</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          ' justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? options.find(
                              (option) => option.value === field.value,
                            )?.label
                          : 'Selecione o email'}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className=" p-0">
                    <Command>
                      <CommandInput placeholder="Procurar..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>Email não encontrado.</CommandEmpty>
                        <CommandGroup>
                          {options.map((option) => (
                            <CommandItem
                              value={option.label}
                              key={option.value}
                              onSelect={() => {
                                form.setValue('email', option.value)
                                setOpen(false)
                              }}
                            >
                              {option.label}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  option.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input
                    placeholder="R$ 0,00"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      field.onChange(Number(value))
                    }}
                    value={field.value ? currencyMask(field.value) : ''}
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="data_pagamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data do Pagamento</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={(e) =>
                      field.onChange(new Date(e.target.value).toISOString())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mes_referencia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mês de Referência</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o mês" />
                  </SelectTrigger>
                  <SelectContent>
                    {MESES.map((mes) => (
                      <SelectItem key={mes} value={mes}>
                        {mes}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Mensalidade'}
          </Button>
        </form>
      </Form>
    </ScrollArea>
    /*  </div> */
  )
}
