import { v } from 'convex/values'

import { mutation, query } from './_generated/server'

export const addMultiplePresencas = mutation({
  args: {
    presencas: v.array(
      v.object({
        atleta_id: v.id('atletas'),
        data_treino: v.number(),
        presente: v.boolean(),
        observacao: v.optional(v.string()),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const results = []

    for (const presenca of args.presencas) {
      console.log(args.presencas)
      const existente = await ctx.db
        .query('presenca')
        .filter(
          (q) =>
            q.eq(q.field('atleta_id'), presenca.atleta_id) &&
            q.eq(q.field('data_treino'), presenca.data_treino),
        )
        .first()

      if (existente) {
        const updated = await ctx.db.patch(existente._id, {
          presente: presenca.presente,
        })
        results.push(updated)
      } else {
        const novo = await ctx.db.insert('presenca', {
          atleta_id: presenca.atleta_id,
          data_treino: presenca.data_treino,
          presente: presenca.presente,
          observacao: presenca.observacao || '',
          created_at: Date.now(),
        })
        results.push(novo)
      }
    }

    return results
  },
})

export const getPresencasByData = query({
  args: { data_treino: v.number() },
  handler: async (ctx, args) => {
    const presencas = await ctx.db
      .query('presenca')
      .filter((q) => q.eq(q.field('data_treino'), args.data_treino))
      .collect()
    return presencas
  },
})

export const addPresenca = mutation({
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

export const getUltimasPresencas = query({
  args: {},
  handler: async (ctx) => {
    // Busca as últimas 10 presenças ordenadas por data decrescente
    const presencas = await ctx.db.query('presenca').order('desc').take(10)

    // Pega os IDs únicos dos atletas
    const atletasIds = [...new Set(presencas.map((p) => p.atleta_id))]

    // Busca os dados dos atletas
    const atletas = await Promise.all(atletasIds.map((id) => ctx.db.get(id)))

    // Combina os dados de presença com os dados dos atletas
    return presencas.map((presenca) => ({
      ...presenca,
      atleta: atletas.find((a) => a?._id === presenca.atleta_id),
    }))
  },
})
