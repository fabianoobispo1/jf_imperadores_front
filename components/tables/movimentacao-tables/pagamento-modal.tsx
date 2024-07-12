'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { LoadingButton } from '@/components/ui/loading-button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import { format, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: string) => void;
  loading: boolean;
  id: number;
}

export const PagamentoModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  id
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      console.log('Data selecionada:', date); // Debug
      const adjustedDate = startOfDay(date)
      setSelectedDate(format(adjustedDate, 'yyyy-MM-dd'));
    } else {
      setSelectedDate('');
    }
  };

  const handleConfirm = () => {
    if (!selectedDate) {
      toast({
        variant: 'destructive',
        title: 'A data é obrigatória!',
        description: 'Por favor, escolha uma data.'
      });

  
      return;
    }

    console.log('Data confirmada:', selectedDate);
    onConfirm(selectedDate);
  };

  return (
    <Modal
      title="Data de pagamento"
      description="Informe a data de pagamento/recebimento"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full pl-3 text-left font-normal',
                !selectedDate && 'text-muted-foreground'
              )}
            >
              {selectedDate ? (
                format(new Date(selectedDate), 'dd/MM/yyyy', {
                  locale: ptBR
                })
              ) : (
                <span>Escolha uma data</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-background border border-border  rounded-sm" align="start">
            <Calendar
              fromYear={1960}
              toYear={2024}
              captionLayout="dropdown-buttons"
              mode="single"
              selected={selectedDate ? new Date(selectedDate) : undefined}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <LoadingButton
          loading={loading}
          variant="default"
          onClick={handleConfirm}
        >
          Confirmar
        </LoadingButton>
      </div>
    </Modal>
  );
};
