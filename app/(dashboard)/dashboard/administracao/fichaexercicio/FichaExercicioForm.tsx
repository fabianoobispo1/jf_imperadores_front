import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FichaExercicio, fichaExercicioSchema } from './schemas/fichaExercicioSchema';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from '@/components/ui/select';

type Props = {
  onSubmit: (data: FichaExercicio, resetForm: () => void) => void;
  defaultValues?: Partial<FichaExercicio>;
  loading: boolean;
};

export function FichaExercicioForm({ onSubmit, defaultValues, loading }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch // Adiciona o watch para observar o valor do campo
  } = useForm<FichaExercicio>({
    resolver: zodResolver(fichaExercicioSchema),
    defaultValues: {
      fichaId: '',
      diaSemana: '',
      ...defaultValues
    }
  });

  // Observar o valor do campo diaSemana
  const selectedDiaSemana = watch('diaSemana');

  useEffect(() => {
    if (defaultValues) {
      reset({
        fichaId: defaultValues.fichaId || '',
        diaSemana: defaultValues.diaSemana || ''
      });
    }
  }, [defaultValues, reset]);

  const onSubmitHandler = (data: FichaExercicio) => {
    onSubmit(data, () => reset());
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      {/* Campo oculto para o id */}
      <input type="hidden" {...register('fichaId')} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="diaSemana">Dia da semana</Label>
          <Select
            onValueChange={(value) => setValue('diaSemana', value)} // Atualiza o valor dinamicamente
          >
            <SelectTrigger>
              <SelectValue placeholder={selectedDiaSemana || 'Selecione o dia'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Segunda">Segunda</SelectItem>
              <SelectItem value="Terça">Terça</SelectItem>
              <SelectItem value="Quarta">Quarta</SelectItem>
              <SelectItem value="Quinta">Quinta</SelectItem>
              <SelectItem value="Sexta">Sexta</SelectItem>
              <SelectItem value="Sábado">Sábado</SelectItem>
              <SelectItem value="Domingo">Domingo</SelectItem>
            </SelectContent>
          </Select>
          {errors.diaSemana && (
            <p className="text-red-500 text-sm">{errors.diaSemana.message}</p>
          )}
        </div>
      </div>

      <Button disabled={loading} className="w-32 border-none focus:border-none focus:ring-0" type="submit">
        Salvar
      </Button>
    </form>
  );
}
