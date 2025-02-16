import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import ShoppingCart from './components/ShoppingCart';
import Login from './components/Login';
import Register from './components/Register';

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
export default App