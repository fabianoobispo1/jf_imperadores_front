import { v } from 'convex/values'

import { mutation, query } from './_generated/server'

export const create = mutation({
  args: {
    atleta_id: v.id('atletas'),
    data_treino: v.number(),
    presente: v.boolean(),
    observacao: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const presenca = await ctx.db.insert('presenca', {
      ...args,
      created_at: Date.now(),
    })
    return presenca
  },
})

export const getByAtleta = query({
  args: {
    atleta_id: v.id('atletas'),
  },
  handler: async (ctx, { atleta_id }) => {
    const presencas = await ctx.db
      .query('presenca')
      .filter((q) => q.eq(q.field('atleta_id'), atleta_id))
      .collect()
    return presencas
  },
})

export const getByPeriodo = query({
  args: {
    data_inicio: v.number(),
    data_fim: v.number(),
  },
  handler: async (ctx, { data_inicio, data_fim }) => {
    const presencas = await ctx.db
      .query('presenca')
      .filter((q) =>
        q.and(
          q.gte(q.field('data_treino'), data_inicio),
          q.lte(q.field('data_treino'), data_fim),
        ),
      )
      .collect()
    return presencas
  },
})
