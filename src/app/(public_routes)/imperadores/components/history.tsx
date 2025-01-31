'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

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
        'Completaremos agora em Fevereiro de 2025 8 anos de fundação, de onde o JF Imperadores surgiu da fusão entre JF Mamutes e Juiz de Fora Red Fox, que eram equipes que praticavam a modalidade NoPads (Sem Capacete e Ombreira), a união proporcionou a possibilidade de jogar a modalidade FullPads (Com todos os equipamentos).',
    },
    {
      title: 'Nosso Nome',
      content:
        '“Imperadores” vem em homenagem ao Brasil Imperial que está marcado na história e na cultura do nosso país e cidade, onde a família real se instalou no Museu Mariano Pocópio e o Morro do Imperador onde em 1861, Dom Pedro II o escalou para apreciar a vista da cidade.',
    },

    {
      title: 'Nosos atletas',
      content:
        'São + de 200 atletas formados nas Modalidades Tackle (Fullpads), Flag Football 5v5 Masculino e Flag Football 5v5 Feminino, um ponto relevante é de que a equipe serviu como ascensão social para diversos individuos, muitos saíram das drogas, do alcool, da depressão, muitos jovens se formaramadultos vestindo nosso manto.',
    },
    {
      title: 'Recentes Conquistas',
      content:
        'Em 2024, trouxemos para Juiz de Fora o Gerais Bowl, um feito histórico, mas a falta de recursos nos impediu de participar da disputa nacional.',
    },
  ]
  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-black/90">
        <Image
          src="/images/994B1369.jpg"
          alt="História JF Imperadores"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
          loading="eager"
          className="object-cover opacity-20"
        />
        {/*    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" /> */}
      </div>

      {/* Golden Details */}
      {/*       <div className="absolute inset-0">
        <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-imperial-gold/10 to-transparent" />
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-imperial-gold/10 to-transparent" />
      </div> */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
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
              className="bg-black/60 backdrop-blur-sm p-8 rounded-xl border border-imperial-gold/20 hover:border-imperial-gold/40 transition-all"
            >
              <h3 className="text-2xl font-bold text-imperial-gold mb-4">
                {item.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{item.content}</p>
              <div className="h-1 w-20 bg-imperial-gold/50 mt-4" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
