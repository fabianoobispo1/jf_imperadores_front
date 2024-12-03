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

import FileUpload from './file-upload'

const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string(),
})
export const IMG_MAX_LIMIT = 3

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome precisa ser preenchido.' }),

  imgUrl: z
    .array(ImgSchema)
    .max(IMG_MAX_LIMIT, { message: 'You can only add up to 3 images' })
    .min(1, { message: 'At least one image must be added.' }),
})

type ProductFormValues = z.infer<typeof formSchema>

export const TryoutForm: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const defaultValues = {
    name: '',
    imgUrl: [],
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true)
    console.log({ ...data, imgUrl: 'string do link' }) // Inclui a URL da imagem no envio

    console.log(data.imgUrl[0].key)
    console.log(data.imgUrl[0].fileKey)

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
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  <FileUpload
                    onChange={field.onChange}
                    value={field.value}
                    onRemove={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Upload de Imagem */}

          <Button disabled={loading} className="ml-auto" type="submit">
            Salvar
          </Button>
        </form>
      </Form>
    </>
  )
}
