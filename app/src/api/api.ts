import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://fakestoreapi.com'
})

export const fetchProducts = () => apiClient.get('/products')
export const fetchCategories = () => apiClient.get('/products/categories')
export const fetchCategoriesProducts = (category: string) => apiClient.get(`/products/category/${category}`)