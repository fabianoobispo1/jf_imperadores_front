import { Section } from './section'

const plans = [
  {
    title: 'Plano Imperial 👑',
    price: '40.000',
    features: [
      'Logo principal no uniforme (30x20cm)',
      '4 placas de campo premium',
      '3 posts exclusivos semanais',
      'Ativações VIP em todos os jogos',
    ],
  },
  {
    title: 'Plano Ouro ⚔️',
    price: '25.000',
    features: [
      'Logo na manga do uniforme (15x15cm)',
      '2 placas de campo',
      '2 posts exclusivos semanais',
      'Ativações VIP em 4 jogos',
    ],
  },
  {
    title: 'Plano Prata 🛡️',
    price: '12.000',
    features: [
      'Logo na parte traseira (10x10cm)',
      '1 placa de campo',
      '1 post exclusivo semanal',
      'Ativações VIP em 2 jogos',
    ],
  },
]

export const Plans = () => {
  return (
    <Section title="Planos de Investimento">
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="rounded-lg bg-gradient-to-r from-[#1a2a6c] to-imperial-gold p-6 border-2 border-yellow-400"
          >
            <h3 className="text-xl font-bold text-yellow-400">{plan.title}</h3>
            <p className="my-4">Investimento: R$ {plan.price}/ano</p>
            <ul className="list-disc pl-6 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
