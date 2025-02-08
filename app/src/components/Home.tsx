import { useQuery } from 'react-query';
import { fetchCategories, fetchProducts } from '../api/api';
import { useState, useEffect } from 'react';
import { Product } from '../types/types';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, loadCart } from '../redux/cartSlice';
import { RootState } from '../redux/store';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

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

  // Get the total number of items in the cart from Redux store
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((acc, item) => acc + item.count, 0)
  );

  // Handle loading and error states
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading products</p>;
  }

  return (
    <div>
      {/* Cart Icon with Badge (now clickable) */}
      <Link to="/cart" style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
        <FaShoppingCart size={30} />
        {cartItemsCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '5px 10px',
              fontSize: '14px',
            }}
          >
            {cartItemsCount}
          </span>
        )}
      </Link>

      {/* Category Filter */}
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories?.data.map((category: string) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Product List */}
      <div>
        {filteredProducts?.map((product: Product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default Home;
