import { v } from 'convex/values'

import { query, mutation } from './_generated/server'
import { telaLinksSchema } from './schema'

export const create = mutation({
  args: telaLinksSchema,
  handler: async ({ db }, args) => {
    const telaLinks = await db.insert('telaLinks', args)
    return telaLinks
  },
})

// this query will get the podcast by the authorId.
export const getTelaLinksByUser = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const telaLinks = await ctx.db
      .query('telaLinks')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .collect()

    return { telaLinks }
  },
})

// this query will get the podcast by the authorId.
export const getTelaLinksByName = query({
  args: {
    nome: v.string(),
  },
  handler: async (ctx, args) => {
    const telaLinks = await ctx.db
      .query('telaLinks')
      .filter((q) => q.eq(q.field('nome'), args.nome))
      .collect()

    return { telaLinks }
  },
})
