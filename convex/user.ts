import { v } from 'convex/values'

import { query, mutation } from './_generated/server'
import { userSchema } from './schema'

export const create = mutation({
  args: userSchema,
  handler: async ({ db }, args) => {
    const user = await db.insert('user', args)
    return user
  },
})

export const getByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async ({ db }, { email }) => {
    const user = await db
      .query('user')
      .withIndex('by_email', (q) => q.eq('email', email))
      .unique()
    return user
  },
})

export const getById = query({
  args: {
    userId: v.id('user'),
  },
  handler: async ({ db }, { userId }) => {
    const user = await db
      .query('user')
      .withIndex('by_id', (q) => q.eq('_id', userId))
      .unique()
    return user
  },
})

export const UpdateUser = mutation({
  args: {
    userId: v.id('user'),
    nome: v.optional(v.string()),
    email: v.optional(v.string()),
    provider: v.optional(v.string()),
    image: v.optional(v.string()),
    image_key: v.optional(v.string()),
    data_nascimento: v.optional(v.number()),
  },
  handler: async (
    { db },
    { userId, nome, email, provider, image, data_nascimento, image_key },
  ) => {
    // Buscar o usuario atual
    const usuario = await db.get(userId)
    if (!usuario) {
      throw new Error('Usuario não encontrado')
    }

    // altera os valores
    const updateUser = await db.patch(userId, {
      nome,
      email,
      provider,
      image,
      data_nascimento,
      image_key,
    })

    return updateUser
  },
})
