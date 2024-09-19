import { z } from 'zod';

export const fichaExercicioSchema = z.object({
  id: z.string().optional(), // `id` pode ser opcional ao adicionar um novo usuario
  atleta_id: z.string().optional(),
  diaSemana: z.string().optional(),
  exercicio_id: z.string().optional(),
  repeticoes: z.string().optional(),
  carga: z.number().optional(),
});




export type FichaExercicio = z.infer<typeof fichaExercicioSchema>;
