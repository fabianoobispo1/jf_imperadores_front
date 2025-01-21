import { Button } from '@/components/ui/button'

import { Section } from './section'

export const Contact = () => {
  return (
    <Section title="Faça Parte desta História">
      <div className="text-center">
        <p className="mb-4">
          Juntos, podemos construir uma parceria sólida e frutífera para o
          desenvolvimento do Futebol Americano em nossa região.
        </p>
        <p className="mb-6">
          📧 contato@jfimperadores.com.br
          <br />
          📱 (32) XXXX-XXXX
        </p>
        <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:scale-105 transition-transform">
          SEJA UM PATROCINADOR
        </Button>
      </div>
    </Section>
  )
}
