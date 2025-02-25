'use client'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Heading } from '@/components/ui/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DatePickerWithDropdown } from '@/components/calendar/with-dropdown'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/components/ui/sidebar'

import { ListaPresenca } from './lista-presenca'

export const Presenca: React.FC = () => {
  const { open } = useSidebar()
  const [dataSelecionada, setDataSelecionada] = useState<Date>(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
  })
  const methods = useForm()

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDataSelecionada(date)
    }
  }

  return (
    <>
      <div className="flexrow flex items-start justify-between gap-2 ">
        <Heading
          title="Controle de Presença"
          description="Gerencie a presença dos atletas nos treinos."
        />
      </div>
      <ScrollArea
        className={cn(
          'space-y-8 w-screen pr-8    h-[calc(100vh-220px)]',
          open ? 'md:max-w-[calc(100%-16rem)] ' : 'md:max-w-[calc(100%-5rem)] ',
        )}
      >
        <FormProvider {...methods}>
          <div className="p-4 border rounded-lg flex flex-col gap-2">
            <DatePickerWithDropdown
              label="Data do treino"
              date={dataSelecionada}
              setDate={handleDateChange}
            />

            <ListaPresenca data={dataSelecionada} />
          </div>
        </FormProvider>
      </ScrollArea>
    </>
  )
}
