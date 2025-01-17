import { useMutation } from 'convex/react'

import { api } from '@/convex/_generated/api'

import { Button } from './ui/button'

export const FileUpload = ({
  onUploadComplete,
}: {
  onUploadComplete: (storageId: string) => void
}) => {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const uploadUrl = await generateUploadUrl()
    const result = await fetch(uploadUrl, {
      method: 'POST',
      headers: { 'Content-Type': file.type },
      body: file,
    })

    const { storageId } = await result.json()
    onUploadComplete(storageId)
  }

  return (
    <Button variant="outline" asChild>
      <label>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
        />
        Adicionar Foto
      </label>
    </Button>
  )
}
