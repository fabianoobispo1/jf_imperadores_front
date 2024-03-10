import { z } from "zod";

export const RegisterUserSchema = z
  .object({
    name: z
      .string({
        required_error: "O nome é obrigatório",
      })
      .min(1, "O nome completo é obrigatório"),
    email: z
      .string({
        required_error: "Email é obrigatório",
      })
      .min(1, "Email é obrigatório")
      .email("Email é obrigatório"),
    photo: z.string().optional(),
    password: z
      .string({
        required_error: "Senha obrigatoria.",
      })
      .min(1, "Senha obrigatoria.")
      .min(8, "A senha deve ter mais de 8 caracteres")
      .max(32, "A senha deve ter menos de 32 caracteres"),
    passwordConfirm: z
      .string({
        required_error: "Confirme sua senha",
      })
      .min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "As senhas não coincidem",
  });

export const LoginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  password: z
    .string({
      required_error: "Senha obrigatoria.",
    })
    .min(1, "Senha obrigatoria.")
    .min(8, "A senha deve conter pelo menos 8 caracteres"),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
