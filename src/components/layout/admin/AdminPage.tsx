'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from 'convex/react'
import { Ellipsis } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Modal } from '@/components/Modal'

import { api } from '../../../../convex/_generated/api'

interface UserProps {
  id: string
  image: string
  nome: string
}

interface AdminPageProps {
  isMobile: boolean
  user: UserProps
}

const AdminPage = ({ isMobile, user }: AdminPageProps) => {
  const [buttonText, setButtonText] = useState('copie sua URL')
  const [exibeModal, setExibeModal] = useState(false)

  const handleOpenModalImagem = () => {
    setExibeModal(false) // Fecha o modal principal
    setExibeModalImagem(true) // Abre o modal de imagem
  }

  const [exibeModalImagem, setExibeModalImagem] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        'https://linktree.jfimperadores.com.br',
      )
      setButtonText('Copiado!')
      setTimeout(() => setButtonText('copie sua URL'), 2000) // Volta ao texto original após 2 segundos
    } catch (err) {
      console.error('Erro ao copiar para a área de transferência: ', err)
    }
  }

  const telaLinks = useQuery(api.telaLinks.getTelaLinksByUser, {
    userId: user.id,
  })

  /*  async function GetTelaLink(userId: string) {
    const test = useQuery(api.telaLinks.getTelaLinksByUser1, {
      userId,
    })
    console.log(test)
  } */

  return (
    <div className={cn(isMobile ? 'flex flex-col gap-4' : 'p-2 px-4 ')}>
      <div
        className={cn(
          isMobile
            ? '  h-28 flex flex-col justify-center gap-4 items-start p-2'
            : ' h-24 flex justify-between items-center rounded-3xl p-2',
          'bg-teal-200 ',
        )}
      >
        <p>
          <span>🔥 Esse é o link: </span>
          <Link
            className="underline"
            href="https://linktree.jfimperadores.com.br"
            target="_blank"
          >
            https://linktree.jfimperadores.com.br
          </Link>
        </p>
        <Button className="rounded-full" onClick={handleCopy}>
          {buttonText}
        </Button>
      </div>

      <div className={cn(isMobile ? 'flex items-center justify-center' : '')}>
        <div
          className={cn(
            isMobile
              ? ' flex items-center justify-between w-11/12  p-2 rounded-md '
              : '',
          )}
        >
          <div>
            <Button
              variant="ghost"
              onClick={() => {
                console.log('Botao trocar imagem')
              }}
              className="relative h-8 w-8 rounded-full"
            >
              <Avatar className="h-14 w-14">
                <AvatarImage
                  src={telaLinks?.telaLinks[0].linkImagem ?? ''}
                  alt={telaLinks?.telaLinks[0].nome ?? ''}
                />
                <AvatarFallback>
                  {telaLinks?.telaLinks[0].nome[0]}
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
          <div>
            <div>{telaLinks?.telaLinks[0].nome}</div>
            <div>{telaLinks?.telaLinks[0].bio}</div>
            <div>sociais</div>
          </div>

          <Button
            className=" h-8 w-8 rounded-full flex items-center justify-center"
            onClick={() => setExibeModal(true)}
          >
            <p>
              <Ellipsis className="h-4 w-4" />
            </p>
          </Button>
          <Modal
            exibeModal={exibeModal}
            onClose={() => setExibeModal(false)}
            title=""
            isMobile={isMobile}
          >
            <div className="flex flex-col gap-4">
              {' '}
              <Button
                className="w-full"
                onClick={handleOpenModalImagem}
                variant="secondary"
              >
                Editar Imagem
              </Button>
              <Button className="w-full" variant="secondary">
                Editar Nome e Bio
              </Button>
              <Button className="w-full" variant="secondary">
                Editar Icones Sociais
              </Button>
            </div>
          </Modal>

          <Modal
            exibeModal={exibeModalImagem}
            onClose={() => setExibeModalImagem(false)}
            title="Modal Imagem"
          >
            <p>Modal Imagem</p>
          </Modal>
        </div>
      </div>
    </div>
  )
}
export default AdminPage
