import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface Product {
  productId: string
  productName: string
  linkText: string
  items: {
    itemId: string
    images: {
      imageUrl: string
    }[]
    sellers: {
      commertialOffer: {
        Price: number
      }
    }[]
  }[]
}

const VTEX_API_URL = import.meta.env.VITE_VTEX_API_URL

const ProductListAxios: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios
      .get<Product[]>(VTEX_API_URL)
      .then((res) => setProducts(res.data))
      .catch(() => setError('Error al cargar productos'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.slice(3, 6).map((product) => {
        const item = product.items[0]
        const image = item?.images[0]?.imageUrl
        const price = item?.sellers[0]?.commertialOffer?.Price

        return (
          <div
            key={product.productId}
            className="bg-white border rounded-xl shadow-sm p-4 flex flex-col items-center transition hover:shadow-md"
          >
            <div className="w-full h-[200px] flex items-center justify-center overflow-hidden">
              <img
                src={image}
                alt={product.productName}
                className="object-contain w-full max-h-full max-w-full"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-base font-medium line-clamp-2">{product.productName}</h3>
              <p className="text-green-600 font-semibold mt-1 text-sm">S/. {price?.toFixed(2)}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProductListAxios
