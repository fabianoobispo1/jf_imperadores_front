import { v } from 'convex/values'

import { query, mutation } from './_generated/server'
import { seletivaSchema } from './schema'

export const create = mutation({
  args: seletivaSchema,
  handler: async ({ db }, args) => {
    const seletivaUser = await db.insert('seletiva', args)
    return seletivaUser
  },
})

export const getAll = query({
  handler: async ({ db }) => {
    const seletiva = await db.query('seletiva')
    return seletiva
  },
})

export const getByNome = query({
  args: {
    nome: v.string(),
  },
  handler: async ({ db }, { nome }) => {
    const seletiva = await db
      .query('seletiva')
      .withIndex('by_nome', (q) => q.eq('nome', nome))
      .unique()
    return seletiva
  },
})

export const getByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async ({ db }, { email }) => {
    const user = await db
      .query('seletiva')
      .withIndex('by_email', (q) => q.eq('email', email))
      .unique()
    return user
  },
})
