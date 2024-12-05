'use client'
import * as z from 'zod'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { fetchMutation, fetchQuery } from 'convex/nextjs'

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
import { useUploadFile } from '@/hooks/use-upload-file'
import { FileUploader1 } from '@/components/file-uploader1'
import { UploadedFilesCard1 } from '@/components/uploaded-files-card1'
import { DatePickerWithDropdown } from '@/components/calendar/with-dropdown'
import { formatCPF } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

import { api } from '../../../../../convex/_generated/api'

const formSchema = z.object({
  nome: z.string().min(3, { message: 'Nome precisa ser preenchido.' }),
  data_nascimento: z.preprocess(
    (val) => (val === null ? undefined : val), // Transforma null em undefined
    z.date({
      required_error: 'A data de nascimento precisa ser preenchida.',
    }),
  ),
  email: z.string().email({ message: 'Digite um email valido.' }),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF inválido.',
  }),
})

type ProductFormValues = z.infer<typeof formSchema>

export const TryoutForm: React.FC = () => {
  const { onUpload, progresses, uploadedFiles, isUploading, setUploadedFiles } =
    useUploadFile('imageUploader', {
      defaultUploadedFiles: [],
    })
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)

  const defaultValues = {
    nome: '',
    data_nascimento: undefined,
    email: '',
    cpf: '',
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true)
    // vrfica e ja exsite registro
    const existCandidatoByemail = await fetchQuery(api.seletiva.getByEmail, {
      email: data.email,
    })
    if (existCandidatoByemail) {
      toast({
        title: 'Erro',
        variant: 'destructive',
        description: 'Email já cadastrado.',
      })
      setLoading(false)
      return
    }

    const cpfSemMascara = data.cpf.replace(/\D/g, '')

    let imgUrl = ''
    if (uploadedFiles[0]?.url) {
      imgUrl = uploadedFiles[0].url
    }
    const timestamp = data.data_nascimento
      ? new Date(data.data_nascimento).getTime()
      : 0

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
        description: 'Canditado não cadastrado.',
      })
      setLoading(false)
      return
    }

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
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="w-full md:w-[280px]">
            {/* Upload de Imagem */}
            {uploadedFiles.length > 0 ? (
              <UploadedFilesCard1
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
              />
            ) : (
              <FileUploader1
                maxFileCount={1}
                maxSize={4 * 1024 * 1024}
                progresses={progresses}
                onUpload={onUpload}
                disabled={isUploading}
              />
            )}
          </div>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
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
                    <Input disabled={loading} placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="000.000.000-00"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(formatCPF(e.target.value))
                      }
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
    </>
  )
}
