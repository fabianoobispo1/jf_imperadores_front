'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { fetchQuery } from 'convex/nextjs'

import { Progress } from '@/components/ui/progress'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Heading } from '@/components/ui/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSidebar } from '@/components/ui/sidebar'
import { cn, formatWhatsAppNumber } from '@/lib/utils'

import { api } from '../../../../../convex/_generated/api'

const formSchema = z
  .object({
    grupoDestino: z.string().min(1, 'Selecione um grupo'),
    tipoMensagem: z.string().min(1, 'Selecione o tipo de mensagem'),
    assunto: z.string(),
    mensagem: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres'),
  })
  .refine(
    (data) => {
      if (data.tipoMensagem === 'email') {
        return data.assunto.length >= 3
      }
      return true
    },
    {
      message:
        'Assunto é obrigatório para envio de email e deve ter no mínimo 3 caracteres',
      path: ['assunto'], // isso faz o erro aparecer no campo específico
    },
  )
type FormValues = z.infer<typeof formSchema>

export function MessagesForm() {
  const { open } = useSidebar()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [destinatarios, setDestinatarios] = useState<
    Array<{ email: string; celular: string }>
  >([])

  const [whatsappStatus, setWhatsappStatus] = useState('')
  const [nomeConectado, setNomeConectado] = useState('')
  const [numeroConectado, setNumeroConectado] = useState('')

  const [progress, setProgress] = useState(0)
  const [enviando, setEnviando] = useState(false)
  const [emailsEnviados, setEmailsEnviados] = useState(0)
  const [totalEmails, setTotalEmails] = useState(0)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grupoDestino: '',
      tipoMensagem: '',
      assunto: '',
      mensagem: '',
    },
  })

  // Sua função checkWhatsappStatus existente
  const checkWhatsappStatus = async () => {
    try {
      const responseStatus = await axios.get('/api/whatsapp/status')
      setWhatsappStatus(responseStatus.data.message)

      if (responseStatus.data.message === 'session_connected') {
        const responseNumber = await axios.get('/api/whatsapp/getNumber')
        setNomeConectado(responseNumber.data.sessionInfo.pushname)
        setNumeroConectado(
          responseNumber.data.sessionInfo.me.user.slice(2, 4) +
            '9' +
            responseNumber.data.sessionInfo.me.user.slice(4),
        )
      }
    } catch (error) {
      console.error('Error checking whatsapp status:', error)
    }
  }

  // Adicione o useEffect para verificar o status periodicamente
  useEffect(() => {
    checkWhatsappStatus()
    const interval = setInterval(checkWhatsappStatus, 5000)
    return () => clearInterval(interval)
  }, [])

  const carregarDestinatarios = async (grupo: string) => {
    setLoading(true)
    try {
      let lista: Array<{ email: string; celular: string }> = []
      switch (grupo) {
        case 'atletas':
          lista = await fetchQuery(api.atletas.getAll, {})

          break
        case 'seletiva':
          lista = await fetchQuery(api.seletiva.getAll, {})

          break
      }
      setDestinatarios(lista)
    } catch (error: unknown) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Erro ao carregar destinatários',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  // Função auxiliar para criar delay
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  const enviarEmails = async (
    destinatarios: Array<{ email: string; celular: string }>,
    mensagem: string,
    assunto: string,
  ) => {
    setEnviando(true)
    setProgress(0)
    setEmailsEnviados(0)
    setTotalEmails(destinatarios.length)

    // Processamento um a um para respeitar o rate limit
    for (const [index, destinatario] of destinatarios.entries()) {
      try {
        await axios.post('/api/send', {
          email: destinatario.email,
          conteudo: mensagem,
          assunto,
          tipoMensagem: 'livre',
        })

        setEmailsEnviados((prev) => prev + 1)
        const novoProgresso = ((index + 1) / destinatarios.length) * 100
        setProgress(novoProgresso)

        // Aguarda 500ms entre cada envio (2 requisições por segundo)
        await delay(500)
      } catch (error) {
        console.error(`Erro ao enviar para ${destinatario.email}:`, error)
      }
    }
    setEnviando(false)
  }
  const enviarWhats = async (
    destinatarios: Array<{ email: string; celular: string }>,
    mensagem: string,
  ) => {
    setEnviando(true)
    setProgress(0)
    setEmailsEnviados(0)
    setTotalEmails(destinatarios.length)

    // Processamento um a um para respeitar o rate limit
    for (const [index, destinatario] of destinatarios.entries()) {
      try {
        await axios.post('/api/whatsapp/sendMessage', {
          chatId: formatWhatsAppNumber(destinatario.celular),
          contentType: 'string',
          content: mensagem,
        })

        setEmailsEnviados((prev) => prev + 1)
        const novoProgresso = ((index + 1) / destinatarios.length) * 100
        setProgress(novoProgresso)

        await delay(10)
      } catch (error) {
        console.error(`Erro ao enviar para ${destinatario.email}:`, error)
      }
    }
  }
  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    console.log('entrou')
    try {
      if (data.tipoMensagem === 'email') {
        // Enviar email em massa
        await enviarEmails(destinatarios, data.mensagem, data.assunto)

        toast({
          title: 'Sucesso',
          description: `Emails enviados para ${destinatarios.length} destinatários`,
        })
      } else {
        // Enviar email em massa
        await enviarWhats(destinatarios, data.mensagem)

        toast({
          title: 'Sucesso',
          description: `Mensagem emviada para ${destinatarios.length} destinatários`,
        })
      }

      toast({
        title: 'Sucesso',
        description: 'Mensagens enviadas com sucesso',
      })
      form.reset()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Erro ao enviar mensagens',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flexrow flex items-start justify-between gap-4 ">
        <Heading
          title="Mensagens"
          description="Envio de mensagens para grupos."
        />
      </div>
      <ScrollArea
        className={cn(
          'space-y-3 w-screen pr-4 md:pr-1  h-[calc(100vh-220px)]',
          open ? 'md:max-w-[calc(100%-16rem)] ' : 'md:max-w-[calc(100%-5rem)] ',
        )}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pr-2"
          >
            <FormField
              control={form.control}
              name="grupoDestino"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grupo de Destino</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      carregarDestinatarios(value)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o grupo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="atletas">Atletas</SelectItem>
                      <SelectItem value="seletiva">
                        Candidatos Seletiva
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipoMensagem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Mensagem</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem
                        value="whatsapp"
                        disabled={whatsappStatus !== 'session_connected'}
                      >
                        WhatsApp{' '}
                        {whatsappStatus === 'session_connected'
                          ? `(Conectado: ${numeroConectado} ${nomeConectado})`
                          : '(Desconectado)'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {whatsappStatus !== 'session_connected' && (
                    <p className="text-sm text-yellow-600 mt-1">
                      WhatsApp não está conectado. Acesse as configurações para
                      conectar.
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('tipoMensagem') === 'email' && (
              <FormField
                control={form.control}
                name="assunto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assunto</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o assunto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="mensagem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite sua mensagem"
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {enviando && (
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <div className="text-sm text-muted-foreground">
                  Enviando {emailsEnviados} de {totalEmails} emails (
                  {Math.round(progress)}%)
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={loading}>
                {enviando ? 'Enviando...' : 'Enviar Mensagens'}
              </Button>
              {destinatarios.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {destinatarios.length} destinatários selecionados
                </span>
              )}
            </div>
          </form>
        </Form>
      </ScrollArea>
    </>
  )
}