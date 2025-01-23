import { motion } from 'framer-motion'

export const HeroSection = () => {
  // Micro-interações nos botões

  const CTAButton = () => {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-imperial-gold px-8 py-4 rounded-full"
      >
        Seja um Investidor
      </motion.button>
    )
  }
  return (
    <section className="relative h-screen">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/videos/team-highlight.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-6xl font-bold mb-8">JF Imperadores</h1>
        <p className="text-2xl mb-12">Faça parte desse time</p>
        <CTAButton />
      </div>
    </section>
  )
}
