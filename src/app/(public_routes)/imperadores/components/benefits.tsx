import { Section } from './section'

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

export const Benefits = () => {
  return (
    <Section title="Benefícios aos Patrocinadores">
      <div className="grid gap-6 md:grid-cols-3">
        {benefitCards.map((card, index) => (
          <div
            key={index}
            className="rounded-lg bg-gradient-to-r from-[#1a2a6c] to-imperial-gold p-6 border-2 border-yellow-400"
          >
            <h3 className="mb-4 text-xl font-bold">{card.title}</h3>
            <ul className="list-disc pl-6 space-y-2">
              {card.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
