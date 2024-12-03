'use client'
import * as z from 'zod'
import { useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

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

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome precisa ser preenchido.' }),
  imgUrl: z.string().optional(),
})

type ProductFormValues = z.infer<typeof formSchema>

export const TryoutForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<string | null>(null) // Estado para a imagem carregada
  const [isImageLoading, setIsImageLoading] = useState(false) // Para indicar o carregamento da imagem
  const imageRef = useRef<HTMLInputElement | null>(null) //

  const defaultValues = {
    name: '',
    imgUrl: '',
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true)
    console.log({ ...data, imgUrl: image }) // Inclui a URL da imagem no envio
    setLoading(false)
  }

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsImageLoading(true)
      const file = e.target.files[0]

      // Simula o upload da imagem (substitua com sua lógica de upload)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
        setIsImageLoading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => setImage(null) // Remove a imagem carregada

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
          <div className="mt-5 w-full">
            {!image ? (
              <div
                className="flex-center h-[142px] w-full cursor-pointer flex-col gap-3 rounded-xl border-[3.2px] border-dashed border-black-6 bg-black-1"
                onClick={() => imageRef?.current?.click()}
              >
                <Input
                  type="file"
                  className="hidden"
                  ref={imageRef}
                  onChange={uploadImage}
                />
                {!isImageLoading ? (
                  <></>
                ) : (
                  <div className="text-16 flex-center font-medium text-white-1">
                    Carregando...
                  </div>
                )}
                <div className="flex flex-col items-center gap-1">
                  <h2 className="text-12 font-bold text-orange-1">
                    Clique para enviar
                  </h2>
                </div>
              </div>
            ) : (
              <div className="relative w-full flex-center">
                <Image
                  src={image}
                  width={200}
                  height={200}
                  className="rounded-xl"
                  alt="thumbnail"
                />
                <button
                  className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-full shadow-lg"
                  onClick={removeImage}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Salvar
          </Button>
        </form>
      </Form>
    </>
  )
}
