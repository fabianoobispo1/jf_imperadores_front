import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FichaExercicio,
  fichaExercicioSchema
} from './schemas/fichaExercicioSchema';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { Exercicio } from '../exercicio/schemas/exercicioSchema';
import { Input } from '@/components/ui/input';

type Props = {
  onSubmit: (data: FichaExercicio, resetForm: () => void) => void;
  defaultValues?: Partial<FichaExercicio>;
  loading: boolean;
  exercicios: { id: string; nome: string }[];
};

export function FichaExercicioForm({
  onSubmit,
  defaultValues,
  loading,
  exercicios
}: Props) {
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
      exercicioId: '',
      repeticoes: '',
      carga: 0,
      ...defaultValues
    }
  });

  // Observar o valor do campo diaSemana
  let selectedDiaSemana = watch('diaSemana');
  let selectedExercicioId = watch('exercicioId');

  useEffect(() => {
    if (defaultValues) {
      reset({
        fichaId: defaultValues.fichaId || '',
        diaSemana: defaultValues.diaSemana || '',
        exercicioId: defaultValues.exercicioId || '',
        repeticoes: defaultValues.repeticoes || '',
        carga: defaultValues.carga || 0
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
              <SelectValue
                placeholder={selectedDiaSemana || 'Selecione o dia'}
              />
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
            <p className="text-sm text-red-500">{errors.diaSemana.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="exercicioId">Exercício</Label>
          <Select onValueChange={(value) => setValue('exercicioId', value)}>
            <SelectTrigger>
              <SelectValue
                placeholder={selectedExercicioId || 'Selecione o Exercício'}
              />
            </SelectTrigger>
            <SelectContent>
              {exercicios.map((exercicio) => (
                <SelectItem key={exercicio.id} value={exercicio.id}>
                  {exercicio.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.exercicioId && (
            <p className="text-sm text-red-500">{errors.exercicioId.message}</p>
          )}
        </div>

        <div>
          {/* <Label htmlFor="repeticoes">Reepetições</Label> */}
          <Input
            id="repeticoes"
            type="repeticoes"
            placeholder="Reepetições"
            {...register('repeticoes')}
            color={errors.repeticoes ? 'failure' : undefined}
          />
        </div>

        <div>
       {/*    <Label htmlFor="carga">Carga</Label> */}
          <Input
            id="carga"
            type="number"
            placeholder="carga"
            {...register('carga', {
              valueAsNumber: true, // Esta opção faz com que o React Hook Form converta o valor para número
            })}
            color={errors.carga ? 'failure' : undefined}
          />
            {errors.carga && (
            <p className="text-sm text-red-500">{errors.carga.message}</p>
          )}
        </div>
      
      </div>

      <Button
        disabled={loading}
        className="w-32 border-none focus:border-none focus:ring-0"
        type="submit"
      >
        Salvar
      </Button>

    </form>
  );
}
