'use client'

interface ResetPasswordFormProps {
  email: string
}

export default function ConfirmaPagamento({ email }: ResetPasswordFormProps) {
  const emailPagamento = decodeURIComponent(email)

  return (
    <div className="flex items-center justify-center h-full w-full">
      {emailPagamento}
    </div>
  )
}
