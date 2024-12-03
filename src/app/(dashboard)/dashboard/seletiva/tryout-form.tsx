'use client'
import * as z from 'zod'
import { useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useUploadFiles } from '@xixixao/uploadstuff/react'
import { useMutation } from 'convex/react'

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

import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome precisa ser preenchido.' }),
  imgUrl: z.string().optional(),
})

type ProductFormValues = z.infer<typeof formSchema>

export const TryoutForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [storageId, setStorageId] = useState('')

  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const { startUpload } = useUploadFiles(generateUploadUrl)
  const getImageUrl = useMutation(api.files.getUrl)
  const removeImageFIle = useMutation(api.files.removeFile)
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
    console.log({ ...data, imgUrl: imageUrl }) // Inclui a URL da imagem no envio
    setLoading(false)
  }

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsImageLoading(true)
      const file = e.target.files[0]

      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]))

      // handleImage(blob, file.name)
      const file1 = new File([blob], file.name, { type: 'image/png' })
      const uploaded = await startUpload([file1])
      setStorageId('')
      //      const storageId = { storageId: uploaded[0].response as Id<'_storage'> }.storageId
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const storageId = (uploaded[0].response as any).storageId
      setStorageId(storageId)

      setImageUrl(await getImageUrl({ storageId }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
        setIsImageLoading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    removeImageFIle({ storageId: storageId as Id<'_storage'> })
    setImageUrl('')
    //  removeImageFIle(storageId as Id<'_storage'>)
    setImage(null)
  } // Remove a imagem carregada

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
                className=" h-[142px] w-full cursor-pointer flex  justify-center items-center flex-col gap-3 rounded-xl border-[3.2px] border-dashed border-black-6 "
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
                <div className="w-full flex flex-col justify-center items-center gap-1">
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
