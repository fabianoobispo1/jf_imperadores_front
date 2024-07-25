import * as z from 'zod';

export const profileSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  lastname: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  email: z
    .string()
    .email({ message: 'Product Name must be at least 3 characters' }),
  contactno: z.coerce.number(),
  country: z.string().min(1, { message: 'Please select a category' }),
  city: z.string().min(1, { message: 'Please select a category' }),
  // jobs array is for the dynamic fields
  jobs: z.array(
    z.object({
      jobcountry: z.string().min(1, { message: 'Please select a category' }),
      jobcity: z.string().min(1, { message: 'Please select a category' }),
      jobtitle: z
        .string()
        .min(3, { message: 'Product Name must be at least 3 characters' }),
      employer: z
        .string()
        .min(3, { message: 'Product Name must be at least 3 characters' }),
      startdate: z
        .string()
        .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
          message: 'Start date should be in the format YYYY-MM-DD'
        }),
      enddate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'End date should be in the format YYYY-MM-DD'
      })
    })
  )
});

const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string()
});

export const perfilSchema = z.object({
  id: z.string(),
  administrador: z.boolean(),
  nome: z.string().min(3, { message: 'Nome requerido.' }),
  email: z.string().email({ message: 'Digite um email valido.' }),
  data_nascimento: z.date({
    required_error: 'campo requerido.'
  }),
  img_url: z
  .array(ImgSchema) 
  .max(1)
});



export type ProfileFormValues = z.infer<typeof profileSchema>;
export type PerfilFormValues = z.infer<typeof perfilSchema>;
