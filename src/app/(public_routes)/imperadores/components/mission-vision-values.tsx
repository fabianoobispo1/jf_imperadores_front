'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, Eye, Heart } from 'lucide-react'

export const MissionVisionValues = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const cards = [
    {
      title: 'Missão',
      icon: <Target className="w-12 h-12" />,
      content:
        'Promover a formação de cidadãos e atletas por meio de uma estrutura profissional, que privilegie estratégias e ações que resultem em uma maior competitividade do clube, construindo diariamente um clube reconhecido e levando nome da cidade de Juiz de Fora em âmbito nacional.',
    },
    {
      title: 'Visão',
      icon: <Eye className="w-12 h-12" />,
      content:
        'Ser um clube referência, valorizando seus atletas e torcedores, reconhecido como formador de atletas, e principalmente transformando a vida das pessoas através do Esporte.',
    },
    {
      title: 'Valores',
      icon: <Heart className="w-12 h-12" />,
      content: [
        'Espirito vencedor e espirito de equipe',
        'Responsabilidade, transparência e ética',
        'Comprometimento e empenho',
      ],
    },
  ]

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-imperial-gold/5 via-black to-black overflow-hidden py-20"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-imperial-gold/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-imperial-gold/5 to-transparent" />
      </div>

      <div className="absolute -left-10 top-1/4 w-40 h-[1px] bg-gradient-to-r from-transparent via-imperial-gold/30 to-transparent rotate-45" />
      <div className="absolute -right-10 top-3/4 w-40 h-[1px] bg-gradient-to-r from-transparent via-imperial-gold/30 to-transparent -rotate-45" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-black/60 backdrop-blur-sm p-8 rounded-xl border border-imperial-gold/20 hover:border-imperial-gold/40 transition-all group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-imperial-gold mb-6 transform group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-imperial-gold mb-4">
                  {card.title}
                </h3>
                {Array.isArray(card.content) ? (
                  <ul className="space-y-2 text-gray-300">
                    {card.content.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-imperial-gold rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-300 leading-relaxed">
                    {card.content}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
