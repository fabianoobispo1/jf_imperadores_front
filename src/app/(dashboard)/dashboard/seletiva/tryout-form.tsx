'use client'
import * as z from 'zod'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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

const formSchema = z.object({
  nome: z.string().min(3, { message: 'Nome precisa ser preenchido.' }),
  data_nascimento: z.date({
    required_error: 'A data de nascimento precisa ser preenchida.',
  }),
  email: z.string().email({ message: 'Digite um email valido.' }),
  cpf: z.string().min(3, { message: 'CPF precisa ser preenchido.' }),
})

type ProductFormValues = z.infer<typeof formSchema>

export const TryoutForm: React.FC = () => {
  const { onUpload, progresses, uploadedFiles, isUploading, setUploadedFiles } =
    useUploadFile('imageUploader', {
      defaultUploadedFiles: [],
    })

  const [loading, setLoading] = useState(false)

  const defaultValues = {
    nome: '',
    data_nascimento: new Date(),
    email: '',
    cpf: '',
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true)
    let imgUrl = ''

    if (uploadedFiles[0].url) {
      imgUrl = uploadedFiles[0].url
    }
    console.log({ ...data, imgUrl })

    console.log(new Date(data.data_nascimento))

    const date = new Date(data.data_nascimento)
    const timestamp = date.getTime()
    console.log(timestamp)

    setLoading(false)
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
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

          <div className="gap-8 md:grid md:grid-cols-3">
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
                  <FormLabel>Cpf</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Cpf" {...field} />
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
                  date={field.value}
                  setDate={field.onChange}
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
