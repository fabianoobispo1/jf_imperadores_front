'use client'
import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import MenuLateral from '@/components/layout/MenuLateral'
import AdminPage from '@/components/layout/admin/AdminPage'

export default function Admin() {
  const [isMobile, setIsMobile] = useState(false)

  // Verifica a largura da janela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // Define true se a largura for menor que 768px
    }

    handleResize() // Executa na montagem
    window.addEventListener('resize', handleResize) // Adiciona listener

    return () => window.removeEventListener('resize', handleResize) // Remove listener na desmontagem
  }, [])

  return (
    <>
      {isMobile ? (
        <main className="fixed top-14 w-full h-full">
          <AdminPage />
          {/*  <ScrollArea className=" flex flex-col justify-end  p-4  bg-slate-500">
            <p>Admin</p>
            <Button onClick={() => signOut()}>Log out</Button>
          </ScrollArea> */}
        </main>
      ) : (
        <div className="flex h-screen">
          {/* Menu lateral */}
          <MenuLateral />

          {/* Conteúdo principal */}
          <div className="flex-1 ml-40 lg:ml-48 mr-72 lg:mr-96 xl:mr-[516px]">
            <ScrollArea className="h-full bg-slate-300 flex items-end">
              <div className="flex flex-col justify-end space-y-4 p-4 pt-6 md:p-8 bg-slate-500">
                <p>Admin</p>
                <Button onClick={() => signOut()}>Log out</Button>
              </div>
            </ScrollArea>
          </div>

          {/* Visualização */}
          <div className="fixed bottom-0 right-0 top-0 z-20 w-72 lg:w-96 xl:w-[516px] border-l bg-background/95 backdrop-blur">
            visualizacao
          </div>
        </div>
      )}
    </>
  )
}
