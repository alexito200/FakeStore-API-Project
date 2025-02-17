import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import ShoppingCart from './components/ShoppingCart';
import Login from './components/Login';
import Register from './components/Register';
import AddPage from './components/AddPage';
import UpdateProduct from './components/UpdateProduct';
import OrderDetails from './components/OrderDetails';

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
        <Route path="/add-product" element={<AddPage />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/order-details" element={<OrderDetails />} />
      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
export default App