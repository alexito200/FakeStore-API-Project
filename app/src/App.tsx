import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import ShoppingCart from './components/ShoppingCart';

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
export default App