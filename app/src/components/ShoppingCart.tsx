import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { removeItemFromCart, clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const ShoppingCart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  useEffect(() => {
    // Store cart data to sessionStorage on any cart update
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    sessionStorage.removeItem('cart');
    alert('Checkout successful!');
    navigate('/');  // Navigate back to the home page after checkout
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>Total Items: {totalAmount}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.title} width={50} />
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.count}</p>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleCheckout} disabled={cartItems.length === 0}>
        Checkout
      </button>
      <button onClick={() => navigate('/')}>Continue Shopping</button>
    </div>
  );
};

export default ShoppingCart;
