import { z } from 'zod';

export const usuarioSchema = z.object({
  id: z.string().optional(), // `id` pode ser opcional ao adicionar um novo usuario
  nome: z.string().min(1, 'Campo obrigatorio.').optional(),
  email: z.string().min(1, 'Campo obrigatorio.').optional(),
  data_nascimento: z.string().min(1, 'campo obrigatorio').optional(),
  administrador: z.boolean().optional(), // `administrador` por padrao e adicionado com false
  provider: z.string().optional(),
  img_url: z.string().optional(),
  created_at: z.string().date().optional(),
});




export type Usuario = z.infer<typeof usuarioSchema>;
