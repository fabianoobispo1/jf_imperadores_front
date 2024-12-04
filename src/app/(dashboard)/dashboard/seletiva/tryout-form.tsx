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

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome precisa ser preenchido.' }),
})

type ProductFormValues = z.infer<typeof formSchema>

export const TryoutForm: React.FC = () => {
  const { onUpload, progresses, uploadedFiles, isUploading, setUploadedFiles } =
    useUploadFile('imageUploader', {
      defaultUploadedFiles: [],
    })

  const [loading, setLoading] = useState(false)

  const defaultValues = {
    name: '',
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true)
    console.log({ ...data, imgUrl: uploadedFiles[0].url }) // Inclui a URL da imagem no envio
    console.log(uploadedFiles)
    setLoading(false)
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <Button disabled={loading} className="ml-auto" type="submit">
            Salvar
          </Button>
        </form>
      </Form>
    </>
  )
}
