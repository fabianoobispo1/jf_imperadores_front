import { v } from 'convex/values'

import { mutation } from './_generated/server'
import { transacaoSchema } from './schema'

export const create = mutation({
  args: transacaoSchema,
  handler: async ({ db }, args) => {
    const transacao = await db.insert('transacao', args)
    return transacao
  },
})

export const remove = mutation({
  args: {
    transacaoId: v.id('transacao'), // ID do transacao a ser removido
  },
  handler: async ({ db }, { transacaoId }) => {
    // Buscar o transacao para garantir que ele existe antes de remover
    const transacao = await db.get(transacaoId)
    if (!transacao) {
      throw new Error('Todo não encontrado')
    }

    // Remover o transacao do banco de dados
    await db.delete(transacaoId)

    return { success: true, message: 'Todo removido com sucesso' } // Resposta de confirmação
  },
})
