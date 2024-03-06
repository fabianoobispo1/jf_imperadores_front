export type Item = {
  name: string
  slug: string
  description?: string
}

export const demos: { key: number; name: string; items: Item[] }[] = [

  {
    key: 1,
    name: 'Transações',
    items: [
      {
        name: 'Cadastrar',
        slug: 'fa/transacao/registrar',
        description: 'Registrar nova transacao',
      },
    ],
  },

 /*  {
    key: 1,
    name: 'toDos',
    items: [
      {
        name: 'Listar ToDos',
        slug: 'todo/listar',
        description: 'Listar todos os todos ',
      },
    ],
  }, */
  /*   {
    key: 2,
    name: 'itens',
    items: [
      {
        name: 'Sub Iten 01',
        slug: 'paginateste02',
        description: 'Descricao',
      },
      {
        name: 'Sub Iten 02',
        slug: 'paginateste03',
        description: 'Descricao',
      },
    ],
  }, */
]
