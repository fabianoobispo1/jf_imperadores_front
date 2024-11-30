'use client'

import Image from 'next/image'
import { useQuery } from 'convex/react'

import { ScrollArea } from '../ui/scroll-area'
import { api } from '../../../convex/_generated/api'
import { Spinner } from '../ui/spinner'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import type { Id } from '../../../convex/_generated/dataModel'

interface Props {
  nomeTela: string
}

export default function LinkTree({ nomeTela }: Props) {
  const telaLinks1 = useQuery(api.telaLinks.getTelaLinksByName, {
    nome: nomeTela,
  })
  const sociaisIcones = useQuery(api.socialIcons.getsocialIconsByTelaLinks, {
    telaLinksId: telaLinks1?.telaLinks[0]._id ?? ('' as Id<'telaLinks'>),
  })
  const links = useQuery(api.links.getlinksByTelaLinks, {
    telaLinksId: telaLinks1?.telaLinks[0]._id ?? ('' as Id<'telaLinks'>),
  })
  if (telaLinks1 === undefined) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    )
  }
  if (telaLinks1.telaLinks.length === 0) {
    return <div>Pagina nao encontrada</div>
  } else {
    console.log(sociaisIcones)
    console.log(links)
    return (
      <ScrollArea className="h-screen bg-gray-100 flex flex-col items-start justify-center p-4">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={telaLinks1?.telaLinks[0].linkImagem ?? ''}
              alt={telaLinks1?.telaLinks[0].nome ?? ''}
            />
            <AvatarFallback>
              <Image
                src="/carousel-1.svg" // Substitua pelo caminho real do avatar
                alt="Profile"
                width={96}
                height={96}
              />
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold mt-4 text-blue-800">
            {telaLinks1.telaLinks[0].nome}
          </h1>
          <p className="text-gray-600 text-center">
            {telaLinks1.telaLinks[0].bio}
          </p>
        </div>

        {/* Ícone do Instagram */}
        <div className="mt-4 flex flex-col items-center">
          <a
            href="https://instagram.com/fabianoobispo" // Substitua pelo link real
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-2xl hover:text-blue-700"
          >
            📷
          </a>
        </div>

        {/* Links */}
        <div className="mt-6 w-full  flex flex-col items-center">
          <a
            href="#"
            className="w-full block bg-white text-center text-gray-700 py-3 rounded-lg shadow-md hover:bg-gray-100 mb-4 md:w-7/12"
          >
            site de ajuda
          </a>
        </div>

        {/* Rodapé */}
        <div className="mt-6 text-center">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Join fabianoobispo on Linktree
          </button>
        </div>
      </ScrollArea>
    )
  }
}
