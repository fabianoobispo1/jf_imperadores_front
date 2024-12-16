/* 'use client'
import { useState } from 'react'
import { useConvex } from 'convex/react'
interface Transaction {
  type: 'expense' | 'income'
  description: string
  amount: number
  date: Date
  month: number // Add month field
}
export default function FinancesPage() {
  const [transaction, setTransaction] = useState<Transaction>({
    type: 'expense',
    description: '',
    amount: 0,
    date: new Date(),
    month: new Date().getMonth() + 1, // Set initial month
  })
  const { mutate } = useConvex()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await mutate('finances.createTransaction', {
      type: transaction.type,
      description: transaction.description,
      amount: transaction.amount,
      date: transaction.date,
      month: transaction.month,
    })
    setTransaction({
      type: 'expense',
      description: '',
      amount: 0,
      date: new Date(),
      month: new Date().getMonth() + 1,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="type">Tipo:</label>
        <select
          id="type"
          value={transaction.type}
          onChange={(e) =>
            setTransaction({ ...transaction, type: e.target.value as any })
          }
        >
          <option value="expense">Despesa</option>
          <option value="income">Receita</option>
        </select>
      </div>
      <div>
        <label htmlFor="description">Descrição:</label>
        <input
          type="text"
          id="description"
          value={transaction.description}
          onChange={(e) =>
            setTransaction({ ...transaction, description: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="amount">Valor:</label>
        <input
          type="number"
          id="amount"
          value={transaction.amount}
          onChange={(e) =>
            setTransaction({
              ...transaction,
              amount: parseFloat(e.target.value),
            })
          }
        />
      </div>
      <div>
        <label htmlFor="date">Data:</label>
        <input
          type="date"
          id="date"
          value={transaction.date.toISOString().slice(0, 10)}
          onChange={(e) =>
            setTransaction({ ...transaction, date: new Date(e.target.value) })
          }
        />
      </div>

      <div>
        <label htmlFor="month">Mês:</label>
        <select
          id="month"
          value={transaction.month}
          onChange={(e) =>
            setTransaction({ ...transaction, month: parseInt(e.target.value) })
          }
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Registrar Transação</button>
    </form>
  )
}
 */
import { ScrollArea } from '@/components/ui/scroll-area'
import BreadCrumb from '@/components/breadcrumb'

import { FinancasForm } from './financas-form'

const breadcrumbItems = [{ title: 'Finanças', link: '/dashboard/financas' }]
export default function page() {
  return (
    <ScrollArea className="h-full w-full">
      <div className="w-full space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <FinancasForm />
      </div>
    </ScrollArea>
  )
}
