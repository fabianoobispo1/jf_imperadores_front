import ConfirmaPagamento from './confirmaPagamento'

export default async function Page({
  params,
}: {
  params: Promise<{ email: string }>
}) {
  const email = (await params).email

  return (
    <div className="relative h-screen flex-col items-center justify-center ">
      <ConfirmaPagamento email={email} />
    </div>
  )
}
