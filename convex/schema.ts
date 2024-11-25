import { v } from 'convex/values'
import { defineSchema, defineTable } from 'convex/server'

export const userSchema = {
  nome: v.string(),
  email: v.string(),
  provider: v.string(),
  role: v.union(v.literal('admin'), v.literal('user')),
  image: v.optional(v.string()),
  password: v.string(),
  data_nascimento: v.optional(v.number()), // Armazena a data como timestamp
}

export default defineSchema({
  user: defineTable(userSchema)
    .index('by_email', ['email'])
    .index('by_username', ['nome']),
})
