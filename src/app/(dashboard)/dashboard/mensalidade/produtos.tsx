'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { fetchQuery } from 'convex/nextjs'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/components/ui/sidebar'

import { api } from '../../../../../convex/_generated/api'

interface Product {
  id: string
  imageUrl: string
  nome: string
  preco: number
  default_price: string
}

export const Produtos = () => {
  const { open } = useSidebar()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])

  const { toast } = useToast()
  const [isAtleta, setIsAtleta] = useState(false)
  const [hasPaidThisMonth, setHasPaidThisMonth] = useState(false)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/stripe/listProducts', {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY_SECRET,
        },
      })
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const checkAtleta = async () => {
      setLoading(true)
      if (session?.user?.email) {
        const atleta = await fetchQuery(api.atletas.getByEmail, {
          email: session.user.email,
        })

        if (!atleta) {
          toast({
            title: 'Acesso Negado',
            description:
              'Você precisa ser um atleta cadastrado para acessar esta área',
            variant: 'destructive',
          })
          setIsAtleta(false)
          setLoading(false)
          return
        }

        // Check if user has paid this month
        const currentDate = new Date()
        const firstDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1,
        )
        const lastDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
        )

        const mensalidade = await fetchQuery(
          api.mensalidade.getByEmailAndDateRange,
          {
            email: session.user.email,
            startDate: firstDayOfMonth.getTime(),
            endDate: lastDayOfMonth.getTime(),
          },
        )

        setHasPaidThisMonth(!!mensalidade)
        setIsAtleta(true)
        fetchProducts()
        setLoading(false)
      }
    }

    checkAtleta()
  }, [session, toast])

  const handleSelectProduct = async (
    productId: string,
    default_price: string,
    nome: string,
  ) => {
    try {
      setLoading(true)
      const mode = nome.toLowerCase().includes('avulsa')
        ? 'payment'
        : 'subscription'

      const response = await axios.post(
        '/api/stripe/checkout',
        {
          productId,
          default_price,
          userEmail: session?.user?.email,
          mode,
        },
        {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY_SECRET,
          },
        },
      )

      // Redirect to Stripe checkout
      window.location.href = response.data.url
    } catch (error) {
      console.log(error)
      toast({
        title: 'Erro',
        description: 'Não foi possível processar o pagamento',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollArea
      className={cn(
        'space-y-8 w-screen pr-8 md:pr-1  h-[calc(100vh-220px)]',
        open ? 'md:max-w-[calc(100%-16rem)] ' : 'md:max-w-[calc(100%-5rem)] ',
      )}
    >
      <div className="space-y-6">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {isAtleta ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-lg p-4 shadow-sm"
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.nome || 'Produto'}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <h3 className="text-lg font-semibold mt-2">
                      {product.nome}
                    </h3>
                    <p className="text-gray-600">
                      R$ {(product.preco / 100).toFixed(2)}
                    </p>
                    <Button
                      className="w-full mt-4"
                      onClick={() =>
                        handleSelectProduct(
                          product.id,
                          product.default_price,
                          product.nome,
                        )
                      }
                    >
                      {hasPaidThisMonth &&
                      !product.nome.toLowerCase().includes('avulsa')
                        ? 'Mensalidade já paga'
                        : 'Selecionar'}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p>
                  você não esta cadastrado como atleta ou Seu email de cadastro
                  não e o mesmo da lista de atletas.{' '}
                </p>
                <p> verifique com um administrador sua situação.</p>
              </div>
            )}
          </>
        )}
      </div>
    </ScrollArea>
  )
}
