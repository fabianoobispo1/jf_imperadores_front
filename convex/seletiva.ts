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

export const getAllPaginated = query({
  args: {
    offset: v.number(),
    limit: v.number(),
  },
  handler: async ({ db }, { offset, limit }) => {
    // Obtemos todos os documentos e os manipulamos manualmente
    const allSeletivas = await db
      .query('seletiva') // Consulta a tabela 'seletiva'
      .order('desc') // Ordena em ordem decrescente
      .collect() // Retorna todos os resultados como uma lista

    // Retornamos somente o intervalo desejado
    return allSeletivas.slice(offset, offset + limit)
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

export const remove = mutation({
  args: {
    seletivaId: v.id('seletiva'), // ID do seletiva a ser removido
  },
  handler: async ({ db }, { seletivaId }) => {
    // Buscar o seletiva para garantir que ele existe antes de remover
    const seletiva = await db.get(seletivaId)
    if (!seletiva) {
      throw new Error('seletiva não encontrado')
    }

    // Remover o seletiva do banco de dados
    await db.delete(seletivaId)

    return { success: true, message: 'seletiva removido com sucesso' } // Resposta de confirmação
  },
})
