import { z } from 'zod';

export const fichaExercicioSchema = z.object({
  fichaId: z.string().optional(), // `id` pode ser opcional ao adicionar um novo usuario
  diaSemana: z.string().optional(),
  exercicioId: z.string().optional(),
  repeticoes: z.string().optional(),
  carga: z.number().optional(),
/*   atleta_id: z.string().optional(),
  exercicioId: z.string().optional(),
  repeticoes: z.string().optional(),
  carga: z.number().optional(),
  nomeExercicio: z.string().optional(), */
});
export type FichaExercicio = z.infer<typeof fichaExercicioSchema>;
