import { v } from 'convex/values'

import { mutation, query } from './_generated/server'
import { financasSchema } from './schema'

export const create = mutation({
  args: financasSchema,
  handler: async (ctx, args) => {
    return await ctx.db.insert('financas', {
      ...args,
      status: args.status as 'pendente' | 'confirmado',
      tipo: args.tipo as 'despesa' | 'receita',
      categoria: args.categoria as
        | 'equipamento'
        | 'mensalidade'
        | 'viagem'
        | 'patrocinio'
        | 'evento'
        | 'outros',
      created_at: Date.now(),
      updated_at: Date.now(),
    })
  },
})

export const remove = mutation({
  args: {
    financaId: v.id('financas'),
  },

  handler: async ({ db }, { financaId }) => {
    // Buscar o todo para garantir que ele existe antes de remover
    const financa = await db.get(financaId)
    if (!financa) {
      throw new Error('financa não encontrado')
    }

    // Remover o financa do banco de dados
    await db.delete(financaId)

    return { success: true, message: 'registro removido com sucesso' } // Resposta de confirmação
  },
})

export const getBalancoMensal = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const transacoes = await ctx.db
      .query('financas')
      .filter((q) =>
        q.and(
          q.eq(q.field('status'), 'confirmado'),
          q.eq(q.field('userId'), args.userId),
        ),
      )
      .collect()

    return {
      receitas: transacoes
        .filter((t) => t.tipo === 'receita')
        .reduce((acc, t) => acc + t.valor, 0),
      despesas: transacoes
        .filter((t) => t.tipo === 'despesa')
        .reduce((acc, t) => acc + t.valor, 0),
    }
  },
})

export const getTransacoes = query({
  args: {
    userId: v.string(),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query('financas')
      .filter((q) => q.eq(q.field('userId'), args.userId))

    if (args.startDate && args.endDate) {
      query = query.filter((q) =>
        q.and(
          q.gte(q.field('data'), args.startDate!),
          q.lte(q.field('data'), args.endDate!),
        ),
      )
    }

    return await query.order('desc').collect()
  },
})
