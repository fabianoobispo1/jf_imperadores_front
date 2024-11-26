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
export const getTelaLinksByNome = query({
  args: {
    nome: v.string(),
  },
  handler: async ({ db }, { nome }) => {
    const telaLinks = await db
      .query('telaLinks')
      .withIndex('by_nome', (q) => q.eq('nome', nome))
      .collect()

    return telaLinks
  },
})
