import ResetPasswordForm from './reset-password-form'

export default async function Page({
  params,
}: {
  params: Promise<{ resetSenha: string }>
}) {
  const resetSenha = (await params).resetSenha

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <ResetPasswordForm resetSenha={resetSenha} />
    </div>
  )
}
