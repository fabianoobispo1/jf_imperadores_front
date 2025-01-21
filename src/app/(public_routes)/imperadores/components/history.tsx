'use client'

import { motion } from 'framer-motion'

export const History = () => {
  const historyItems = [
    {
      title: 'Fundação e Conquistas',
      content:
        'Formada pela fusão dos times Mamutes e Red Fox, a equipe rapidamente se destacou, conquistando o título da Conferência Sudeste e o terceiro lugar na Liga Nacional em seu primeiro ano.',
    },
    {
      title: 'Parcerias Estratégicas',
      content:
        'Em 2018, firmamos uma parceria com o Cruzeiro, que ampliou nossa visibilidade, embora tenha enfrentado desafios financeiros.',
    },
    {
      title: 'Retorno e Superação',
      content:
        'Após uma reformulação em 2019, conquistamos o título da Copa Ouro e, após a pausa forçada pela pandemia, retornamos com força, destacando-nos no Campeonato Mineiro e conquistando o título nacional da segunda divisão.',
    },
    {
      title: 'Recentes Conquistas',
      content:
        'Em 2024, trouxemos para Juiz de Fora o título mineiro, um feito histórico, mas a falta de recursos nos impediu de participar da disputa nacional.',
    },
  ]

  return (
    <div className="py-12">
      <motion.h2
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Nossa História
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-2">
        {historyItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-black/30 p-6 rounded-lg backdrop-blur-sm"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-imperial-gold mb-4">
              {item.title}
            </h3>
            <p className="text-gray-200">{item.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
