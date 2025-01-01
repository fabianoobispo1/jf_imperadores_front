'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

interface Product {
  id: string
  imageUrl: string
  nome: string
  preco: number
}

export const Produtos = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/stripe/listProducts')
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="space-y-6">
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-sm">
              <img
                src={product.imageUrl}
                alt={product.nome}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{product.nome}</h3>
              <p className="text-gray-600">
                R$ {(product.preco / 100).toFixed(2)}
              </p>
              <Button className="w-full mt-4">Selecionar</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
