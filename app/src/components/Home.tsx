import { useQuery } from 'react-query';
import '../App.css'
import { fetchCategories, fetchProducts } from '../api/api';
import { useState, useEffect } from 'react';
import { Product } from '../types/types';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, loadCart } from '../redux/cartSlice';
import { RootState } from '../redux/store';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
      dispatch(loadCart(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addItemToCart({ ...product, count: 1 }));
  };

  const [selectedCategory, setSelectedCategory] = useState('');

  const getFilteredProducts = () => {
    if (selectedCategory) {
      return products?.data.filter((product: Product) => product.category === selectedCategory);
    }
    return products?.data;
  };

  const filteredProducts = getFilteredProducts();

  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((acc, item) => acc + item.count, 0)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading products</p>;
  }

  return (
    <div>
<Link to="/cart" className="cart-container">
  <FaShoppingCart className="cart-icon" />
  {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
</Link>


      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories?.data.map((category: string) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div>
        {filteredProducts?.map((product: Product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default Home;
