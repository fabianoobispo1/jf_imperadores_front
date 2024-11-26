'use client'
import Link from 'next/link'

export default function HeaderMobile() {
  const itens = [
    { nome: 'Links', href: 'https://link1.com' },
    { nome: 'Shop', href: 'https://link2.com' },
    { nome: 'Aparncia', href: 'https://link3.com' },
    { nome: 'Analitcs', href: 'https://link4.com' },
    { nome: 'More', href: 'https://link5.com' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/95 backdrop-blur">
      <nav className="flex h-14  items-center justify-between px-8">
        {/* Garante espaçamento dinâmico entre os itens */}
        {itens.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            target="_blank"
            className="flex flex-col items-center text-sm font-medium text-muted-foreground"
          >
            {/* Ícone */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M16 8a6 6 0 0 1-4 10 6 6 0 0 1-4-10M20.41 16.59A5 5 0 0 1 16 20a5 5 0 0 1-4.24-2.41" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {/* Nome */}
            <span>{item.nome}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
