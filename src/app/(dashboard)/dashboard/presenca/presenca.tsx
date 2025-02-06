'use client'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Heading } from '@/components/ui/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DatePickerWithDropdown } from '@/components/calendar/with-dropdown'

import { ListaPresenca } from './lista-presenca'

export const Presenca: React.FC = () => {
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date())
  const methods = useForm()

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDataSelecionada(date)
    }
  }

  return (
    <FormProvider {...methods}>
      <div className="flex items-start justify-between gap-4">
        <Heading
          title="Controle de Presença"
          description="Gerencie a presença dos atletas nos treinos"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg flex flex-col gap-2">
          <DatePickerWithDropdown
            label="Data do treino"
            date={dataSelecionada}
            setDate={handleDateChange}
          />
          <ScrollArea className="h-[600px] border rounded-lg p-4">
            <ListaPresenca data={dataSelecionada} />
          </ScrollArea>
        </div>
      </div>
    </FormProvider>
  )
}
