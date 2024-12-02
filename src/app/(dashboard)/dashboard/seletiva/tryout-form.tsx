/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Spinner } from '@/components/ui/spinner'

import type { Id } from '../../../../../convex/_generated/dataModel'
import { api } from '../../../../../convex/_generated/api'

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome precisa ser preenchido.' }),
})

type ProductFormValues = z.infer<typeof formSchema>

export const TryoutForm: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const imageRef = useRef<HTMLInputElement>(null)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [image, setImage] = useState('')
  const [imageStorageId, setImageStorageId] = useState<Id<'_storage'> | null>(
    null,
  )
  const getImageUrl = useMutation(api.telaLinks.getUrl)
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const { startUpload } = useUploadFiles(generateUploadUrl)

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
    console.log(data)

    setLoading(false)
  }

  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true)
    setImage('')

    try {
      const file = new File([blob], fileName, { type: 'image/png' })
      const uploaded = await startUpload([file])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const storageId = (uploaded[0].response as any).storageId

      setImageStorageId(storageId)
      console.log(imageStorageId)
      const imageUrl = await getImageUrl({ storageId })

      console.log(imageUrl)
      setImage(imageUrl!)
      setIsImageLoading(false)
      /* toast({
        title: 'Thumbnail generated successfully',
      }) */
    } catch (error) {
      console.log(error)
    }
  }

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    try {
      const files = e.target.files
      if (!files) return
      const file = files[0]
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]))

      handleImage(blob, file.name)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}

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
                    <div
                      className="flex-center mt-5 h-[142px] w-full cursor-pointer flex-col gap-3 rounded-xl border-[3.2px] border-dashed border-black-6 bg-black-1"
                      onClick={() => imageRef?.current?.click()}
                    >
                      <Input type="file" className="hidden" {...field} />
                      {!isImageLoading ? (
                        <Image
                          src="/icons/upload-image.svg"
                          width={40}
                          height={40}
                          alt="upload"
                        />
                      ) : (
                        <div className="text-16 flex-center font-medium text-white-1">
                          Uploading
                          <Spinner />
                        </div>
                      )}
                      <div className="flex flex-col items-center gap-1">
                        <h2 className="text-12 font-bold text-orange-1">
                          Click to upload
                        </h2>
                        <p className="text-12 font-normal text-gray-1">
                          SVG, PNG, JPG, or GIF (max. 1080x1080px)
                        </p>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          <Button disabled={loading} className="ml-auto" type="submit">
            Salvar
          </Button>
        </form>
      </Form>
    </>
  )
}

/* 
<div
className="flex-center mt-5 h-[142px] w-full cursor-pointer flex-col gap-3 rounded-xl border-[3.2px] border-dashed border-black-6 bg-black-1"
onClick={() => imageRef?.current?.click()}
>
<Input
  type="file"
  className="hidden"
  ref={imageRef}
  onChange={(e) => uploadImage(e)}
/>
{!isImageLoading ? (
  <Image
    src="/icons/upload-image.svg"
    width={40}
    height={40}
    alt="upload"
  />
) : (
  <div className="text-16 flex-center font-medium text-white-1">
    Uploading
    <Spinner />
  </div>
)}
<div className="flex flex-col items-center gap-1">
  <h2 className="text-12 font-bold text-orange-1">
    Click to upload
  </h2>
  <p className="text-12 font-normal text-gray-1">
    SVG, PNG, JPG, or GIF (max. 1080x1080px)
  </p>
</div>
</div>

{image && (
<div className="flex-center w-full">
  <Image
    src={image}
    width={200}
    height={200}
    className="mt-5"
    alt="thumbnail"
  />
</div>
)} */
