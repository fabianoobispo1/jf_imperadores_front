import { z } from "zod";

export const RegisterUserSchema = z.object({
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

export const FaTransacoesSchema = z.object({
  titulo: z 
    .string({
      required_error: "Titulo é obrigatório"
    }).min(1,"Titulo é obrigatório"),    
  valor: z 
    .string({
      required_error: "Valor é obrigatório"
    }).min(1,"Valor é obrigatório"),
  tipo: z 
    .string({
      required_error: "Tipo é obrigatório"
    }).min(1,"Tipo é obrigatório"),
    vencimento: z 
    .string({
      required_error: "Data de vencimento é obrigatório"
    }).min(1,"Data de vencimento é obrigatório")
  
})

export const FaUsuarioSchema = z.object({
    nome: z
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
    data_nascimento: z.
      string({
        required_error: "Data de nascimento é obrigatório"
      }).min(1,"Data de nascimento é obrigatório")
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "As senhas não coincidem",
  });

export const FaUsuarioUpdateSchema = z.object({
    nome: z
      .string()
      .min(1, "O nome completo é obrigatório"),
    email: z
      .string({
        required_error: "Email é obrigatório",
      })
      .min(1, "Email é obrigatório")
      .email("Email é obrigatório"),
    password: z
      .string(),
    passwordConfirm: z
      .string(),
    data_nascimento: z.
      string({
        required_error: "Data de nascimento é obrigatório"
      }).min(1,"Data de nascimento é obrigatório")
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "As senhas não coincidem",
  });

  export const FaAtletaSchema = z.object({
    nome: z
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
    data_nascimento: z.
      string({
        required_error: "Data de nascimento é obrigatório"
      }).min(1,"Data de nascimento é obrigatório"),
    apelido: z.string(),
    data_inicio: z.string(),
    tipo: z.string({
      required_error: "Tipo é obrigatório"
    }).min(1,"Tipo é obrigatório"),
    posicao: z.string(),
    numero_camisa: z.string({
      required_error: "Numero camisa é obrigatório",
    }).min(1, "Numero camisa é obrigatório"),
    altura:z.string({
      required_error: "Altura é obrigatório",
    }).min(1, "Altura é obrigatório"),
    pesso:z.string({
      required_error: "Pesso é obrigatório",
    }).min(1, "Pesso é obrigatório"),
    rg: z.string(),
    cpf: z.string(),
    cep: z.string(),
    endereco: z.string({
      required_error: "Endereço é obrigatório",
    }).min(1, "Endereço é obrigatório"),
    numero_endereco:z.string({
      required_error: "Numero é obrigatório",
    }).min(1, "Numero é obrigatório"),
    complemento: z.string(),
    bairro: z.string(),
    cidade: z.string(),
    estado: z.string(),
    telefone:z.string(),


  })




export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
export type FaTransacoesInput = z.infer<typeof FaTransacoesSchema>;
export type FaUsuarioInput = z.infer<typeof FaUsuarioSchema>;
export type FaAtletaInput = z.infer<typeof FaAtletaSchema>;
export type FaUsuarioUpdate = z.infer<typeof FaUsuarioUpdateSchema>;