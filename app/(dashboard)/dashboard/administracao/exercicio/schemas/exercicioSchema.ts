import { z } from 'zod';

export const exercicioSchema = z.object({
  id: z.string().optional(), // `id` pode ser opcional ao adicionar um novo usuario
  nome: z.string().min(1, 'Campo obrigatorio.').optional(),
  descricao: z.string().min(1, 'Campo obrigatorio.').optional(),
  url_img: z.string().optional(),
  url_video: z.string().optional(),
});




export type Exercicio = z.infer<typeof exercicioSchema>;
