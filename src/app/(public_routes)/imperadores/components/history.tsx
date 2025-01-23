'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export const HistorySection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  })

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
    <motion.section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-black via-imperial-gold/10 to-black py-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-imperial-gold mb-16"
        >
          Nossa História
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {historyItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-black/60 backdrop-blur-sm p-8 rounded-xl border border-imperial-gold/20"
            >
              <h3 className="text-2xl font-bold text-imperial-gold mb-4">
                {item.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{item.content}</p>
              <div className="h-1 w-20 bg-imperial-gold/50 mt-4" />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.2 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>
    </motion.section>
  )
}
