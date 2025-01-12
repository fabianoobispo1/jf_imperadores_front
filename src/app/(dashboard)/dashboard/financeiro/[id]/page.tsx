import { Heading } from '@/components/ui/heading'

import { TransacaoForm } from '../components/transacao-form'

export default async function EditarTransacaoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return (
    <div>
      <Heading
        title="Editar Transação"
        description="Atualize os dados da transação financeira"
      />
      <div className="mt-8">
        <TransacaoForm id={id} />
      </div>
    </div>
  )
}
