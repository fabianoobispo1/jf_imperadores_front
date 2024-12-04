'use client'
import * as z from 'zod'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Trash } from 'lucide-react'

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
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome precisa ser preenchido.' }),
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
    name: '',
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function removeFileFromUploadthing(fileKey: string) {
    const imageKey = fileKey.substring(fileKey.lastIndexOf('/') + 1)

    fetch('/api/uploadthing/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageKey }),
    })
      .then(async (res) => {
        if (res.ok) {
          toast({
            variant: 'default',
            description: 'Imagem removida.',
          })
          setUploadedFiles([])
          /*         const newImages = images?.filter((img) => img !== image)
          setImages(newImages) */
        } else {
          // Lida com status HTTP que não são 2xx
          const errorData = await res.json()
          toast({
            variant: 'destructive',
            description: errorData.message || 'Something went wrong',
          })
        }
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          description: 'Something went wrong',
        })
      })
      .finally(() => {
        /*    setImageDeleting(false) */
      })
  }

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
            <ScrollArea className="pb-4">
              <div className="flex w-max space-x-2.5">
                {uploadedFiles.map((file) => (
                  <div key={file.key} className="relative aspect-video w-80">
                    <Image
                      src={file.url}
                      alt={file.name}
                      fill
                      sizes="(min-width: 640px) 640px, 100vw"
                      loading="lazy"
                      className="rounded-md object-cover"
                    />
                    <button
                      onClick={() => removeFileFromUploadthing(file.key)} // Chama callback ao clicar
                      className="absolute top-2 right-2 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>
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
