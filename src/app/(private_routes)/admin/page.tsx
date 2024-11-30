'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import MenuLateral from '@/components/layout/MenuLateral'
import AdminPage from '@/components/layout/admin/AdminPage'
import { Spinner } from '@/components/ui/spinner'

export default function Admin() {
  const [isMobile, setIsMobile] = useState(false)
  const { data: session } = useSession()

  // Verifica a largura da janela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // Define true se a largura for menor que 768px
    }

    handleResize() // Executa na montagem
    window.addEventListener('resize', handleResize) // Adiciona listener

    return () => window.removeEventListener('resize', handleResize) // Remove listener na desmontagem
  }, [])
  if (session) {
    return (
      <>
        {isMobile ? (
          <main className=" w-full h-[calc(100vh-54px-54px)] mt-14 mb-14 ">
            <AdminPage isMobile={isMobile} user={session.user} />
          </main>
        ) : (
          <div className="flex h-screen">
            {/* Menu lateral */}
            <MenuLateral />

            {/* Conteúdo principal */}
            <div className="flex-1 ml-40 lg:ml-48 mr-72 lg:mr-96 xl:mr-[516px]">
              <AdminPage isMobile={isMobile} user={session.user} />
            </div>

            {/* Visualização */}
            <div className="fixed bottom-0 right-0 top-0 z-21 w-72 lg:w-96 xl:w-[516px] border-l bg-background/95 backdrop-blur">
              visualizacao
            </div>
          </div>
        )}
      </>
    )
  } else {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    )
  }
}
