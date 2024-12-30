import { v } from 'convex/values'

import { query, mutation } from './_generated/server'
import { atletasSchema } from './schema'

export const create = mutation({
  args: atletasSchema,
  handler: async ({ db }, args) => {
    const atletasUser = await db.insert('atletas', args)
    return atletasUser
  },
})

export const getAllPaginated = query({
  args: {
    offset: v.number(),
    limit: v.number(),
  },
  handler: async ({ db }, { offset, limit }) => {
    // Obtemos todos os documentos e os manipulamos manualmente
    const allatletass = await db
      .query('atletas') // Consulta a tabela 'atletas'
      .order('desc') // Ordena em ordem decrescente
      .collect() // Retorna todos os resultados como uma lista

    // Retornamos somente o intervalo desejado
    return allatletass.slice(offset, offset + limit)
  },
})

export const getByNome = query({
  args: {
    nome: v.string(),
  },
  handler: async ({ db }, { nome }) => {
    const atletas = await db
      .query('atletas')
      .withIndex('by_nome', (q) => q.eq('nome', nome))
      .unique()
    return atletas
  },
})

export const getByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async ({ db }, { email }) => {
    const user = await db
      .query('atletas')
      .withIndex('by_email', (q) => q.eq('email', email))
      .unique()
    return user
  },
})

export const remove = mutation({
  args: {
    atletasId: v.id('atletas'), // ID do atletas a ser removido
  },
  handler: async ({ db }, { atletasId }) => {
    // Buscar o atletas para garantir que ele existe antes de remover
    const atletas = await db.get(atletasId)
    if (!atletas) {
      throw new Error('atletas não encontrado')
    }

    // Remover o atletas do banco de dados
    await db.delete(atletasId)

    return { success: true, message: 'atletas removido com sucesso' } // Resposta de confirmação
  },
})

export const getCount = query({
  handler: async (ctx) => {
    const count = await ctx.db.query('atletas').collect()
    return count.length
  },
})
