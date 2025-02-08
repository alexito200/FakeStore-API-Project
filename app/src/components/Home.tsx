import { useQuery } from 'react-query'
import { fetchCategories, fetchProducts } from '../api/api'
import { useState } from 'react'
import { Product } from '../types/types'
import ProductCard from './ProductCard'

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
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        { categories?.data.map((category:string) => (
          <option key={category} value={category}>{category}</option>
        )) }
      </select>

      <div>
        {filteredProducts?.map((product: Product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>

    </div>
  )
}

export default Home