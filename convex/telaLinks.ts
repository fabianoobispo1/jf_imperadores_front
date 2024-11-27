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
export const getTelaLinksByUser = query({
  args: {
    userId: v.id('user'), // Define o argumento como ID da tabela 'user'
  },
  handler: async ({ db }, { userId }) => {
    const telaLinks = await db
      .query('telaLinks')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect()

    return telaLinks
  },
})
