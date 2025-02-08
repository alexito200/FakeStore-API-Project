import { useQuery } from 'react-query'
import { fetchCategories, fetchProducts } from '../api/api'
import { useState } from 'react'
import { Product } from '../types/types'

const Home = () => {

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  })
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  })

  const [selectedCategory, setSelectedCategory] = useState('')

  const getFilteredProducts = () => {
    if (selectedCategory) {
      return products?.data.filter((product: Product) => product.category === selectedCategory)
    }
    return products?.data
  }

  const filteredProducts = getFilteredProducts()

  return (
    <div>
      <select name="" id=""></select>
    </div>
  )
}

export default Home