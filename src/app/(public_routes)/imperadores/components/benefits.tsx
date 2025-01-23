'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export const Benefits = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const benefitCards = [
    {
      title: 'Visibilidade Premium',
      items: [
        'Exposição em uniformes oficiais',
        'Presença em materiais promocionais',
        'Divulgação em eventos esportivos',
        'Alcance de público diversificado',
      ],
    },
    {
      title: 'Engajamento Comunitário',
      items: [
        'Associação com projeto social esportivo',
        'Participação em eventos comunitários',
        'Promoção da saúde e bem-estar',
        'Impacto social positivo',
      ],
    },
    {
      title: 'Marketing Digital',
      items: [
        'Presença nas redes sociais da equipe',
        'Conteúdo exclusivo personalizado',
        'Campanhas digitais integradas',
        'Alcance orgânico qualificado',
      ],
    },
  ]

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen bg-black/90 overflow-hidden py-20"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-imperial-gold/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-imperial-gold/5 to-transparent" />
      </div>

      <div className="absolute -left-10 top-1/4 w-40 h-[1px] bg-gradient-to-r from-transparent via-imperial-gold/30 to-transparent rotate-45" />
      <div className="absolute -right-10 top-3/4 w-40 h-[1px] bg-gradient-to-r from-transparent via-imperial-gold/30 to-transparent -rotate-45" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-imperial-gold mb-16"
        >
          Benefícios aos Patrocinadores
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {benefitCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-black/60 backdrop-blur-sm p-8 rounded-xl border border-imperial-gold/20 hover:border-imperial-gold/40 transition-all group"
            >
              <h3 className="text-2xl font-bold text-imperial-gold mb-6">
                {card.title}
              </h3>
              <ul className="space-y-4">
                {card.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 bg-imperial-gold rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
