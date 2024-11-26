'use client'
import { useEffect, useState } from 'react'

import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'

export default function HeaderLayout() {
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

  return <>{isMobile ? <HeaderMobile /> : <HeaderDesktop />}</>
}
