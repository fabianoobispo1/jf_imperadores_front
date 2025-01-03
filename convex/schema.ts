import { v } from 'convex/values'
import { defineSchema, defineTable } from 'convex/server'

// Schema para usuários
export const userSchema = {
  nome: v.string(),
  email: v.string(),
  provider: v.string(),
  role: v.union(v.literal('admin'), v.literal('user')),
  image: v.optional(v.string()),
  image_key: v.optional(v.string()),
  password: v.string(),
  data_nascimento: v.optional(v.number()),
  cpf: v.optional(v.string()),
}

export const recuperaSenhaSchema = {
  email: v.string(),
  created_at: v.number(),
  valid_at: v.number(),
}

// Schema para todos
export const todoSchema = {
  text: v.string(),
  isCompleted: v.boolean(),
  created_at: v.number(),
  updated_at: v.number(),
  userId: v.id('user'),
}

// Schema para telaLinks
export const telaLinksSchema = {
  nome: v.string(),
  bio: v.string(),
  linkImagem: v.string(),
  background: v.string(),
  created_at: v.number(),
  updated_at: v.number(),
  userId: v.id('user'),
}

export const socialIconsSchema = {
  nome: v.string(),
  link: v.string(),
  icon: v.string(),
  created_at: v.number(),
  updated_at: v.number(),
  telaLinksId: v.id('telaLinks'), // Referência à tabela 'telaLinks'
}

export const linksSchema = {
  nome: v.string(),
  link: v.string(),
  created_at: v.number(),
  updated_at: v.number(),
  telaLinksId: v.id('telaLinks'),
}

export const seletivaSchema = {
  numerio_seletiva: v.number(),
  nome: v.string(),
  cpf: v.string(),
  data_nascimento: v.optional(v.number()),
  email: v.string(),
  altura: v.number(),
  peso: v.number(),
  celular: v.string(),
  tem_experiencia: v.boolean(),
  equipe_anterior: v.string(),
  setor: v.number(),
  posicao: v.string(),
  equipamento: v.number(),
  img_link: v.string(),
}

export const atletasSchema = {
  status: v.number(),
  nome: v.string(),
  cpf: v.string(),
  data_nascimento: v.optional(v.number()),
  data_registro: v.optional(v.number()),
  email: v.string(),
  altura: v.optional(v.number()),
  peso: v.optional(v.number()),
  celular: v.string(),
  setor: v.number(),
  posicao: v.string(),
  rua: v.string(),
  bairro: v.string(),
  cidade: v.string(),
  cep: v.string(),
  uf: v.string(),
  complemento: v.string(),
  genero: v.string(),
  rg: v.string(),
  emisor: v.string(),
  uf_emisor: v.string(),
  img_link: v.string(),
}

export const transacaoSchema = {
  tipo: v.union(v.literal('despesa'), v.literal('receita')),
  descricao: v.string(),
  valor: v.number(),
  data: v.number(),
}

export const mensalidadeSchema = {
  tipo: v.union(v.literal('avulsa'), v.literal('recorrente')),
  email: v.string(),
  customer: v.string(),
  id_payment_stripe: v.string(),
  valor: v.number(),
  data_pagamento: v.number(),
  data_cancelamento: v.number(),
  cancelado: v.boolean(),
}

// Definição do Schema completo
export default defineSchema({
  user: defineTable(userSchema)
    .index('by_email', ['email'])
    .index('by_username', ['nome']),
  recuperaSenha: defineTable(recuperaSenhaSchema).index('by_email', ['email']),

  todo: defineTable(todoSchema).index('by_user', ['userId']), // Índice para buscar todos de um usuário
  telaLinks: defineTable(telaLinksSchema)
    .index('by_nome', ['nome'])
    .index('by_user', ['userId'])
    .searchIndex('search_by_user', { searchField: 'userId' }),
  socialIcons: defineTable(socialIconsSchema).index('by_telaLinks', [
    'telaLinksId',
  ]),
  links: defineTable(linksSchema).index('by_telaLinks', ['telaLinksId']),
  seletiva: defineTable(seletivaSchema)
    .index('by_nome', ['nome'])
    .index('by_email', ['email']),
  atletas: defineTable(atletasSchema)
    .index('by_nome', ['nome'])
    .index('by_email', ['email'])
    .index('by_cpf', ['cpf'])
    .index('by_status', ['status']),
  transacao: defineTable(transacaoSchema).index('by_data', ['data']),
  mensalidade: defineTable(mensalidadeSchema)
    .index('by_data_pagamento', ['data_pagamento'])
    .index('by_email', ['email']),
})
