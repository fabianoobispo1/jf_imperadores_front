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
  data_nascimento: v.optional(v.number()), // Timestamp
}

// Schema para todos
export const todoSchema = {
  text: v.string(),
  isCompleted: v.boolean(),
  created_at: v.number(), // Timestamp para data de criação
  updated_at: v.number(), // Timestamp para data de atualização
  userId: v.id('user'), // Referência à tabela 'user'
}

// Schema para telaLinks
export const telaLinksSchema = {
  nome: v.string(),
  bio: v.string(),
  linkImagem: v.string(),
  background: v.string(),
  created_at: v.number(), // Timestamp para data de criação
  updated_at: v.number(), // Timestamp para data de atualização
  userId: v.id('user'),
}

export const socialIconsSchema = {
  nome: v.string(),
  link: v.string(),
  icon: v.string(),
  created_at: v.number(), // Timestamp para data de criação
  updated_at: v.number(), // Timestamp para data de atualização
  telaLinksId: v.id('telaLinks'), // Referência à tabela 'telaLinks'
}

export const linksSchema = {
  nome: v.string(),
  link: v.string(),
  created_at: v.number(), // Timestamp para data de criação
  updated_at: v.number(), // Timestamp para data de atualização
  telaLinksId: v.id('telaLinks'), // Referência à tabela 'telaLinks'
}

export const seletivaSchema = {
  nome: v.string(),
  cpf: v.string(),
  data_nascimento: v.optional(v.number()),
  email: v.string(),
  img_link: v.string(),
}

// Definição do Schema completo
export default defineSchema({
  user: defineTable(userSchema)
    .index('by_email', ['email'])
    .index('by_username', ['nome']),
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
})
