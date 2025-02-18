import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { removeItemFromCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../redux/cartSlice';
import { saveOrder } from './productService';
import '../App.css';
import { Order } from "../types/types";
import { AuthContext } from "../context/AuthContext";

const ShoppingCart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useContext(AuthContext) || {};
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const handleCheckout = async () => {
    const orderData: Order = {
      items: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        quantity: item.count,
      })),
      totalAmount,
      totalPrice: totalPrice.toFixed(2),
      createdAt: new Date(),
      status: 'pending',
    };

    if (user) {
      try {
        await saveOrder(orderData, user.uid);
        navigate('/order-details', {
        });
      } catch (error) {
        console.error('Error placing order:', error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <p>Total Items: {totalAmount}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <ul className="cart-items-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} width={50} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.count}</p>
              </div>
              <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <button className="checkout-button" onClick={handleCheckout} disabled={cartItems.length === 0}>
        Checkout
      </button>
      <button className="continue-shopping-button" onClick={() => navigate('/home')}>
        Continue Shopping
      </button>
    </div>
  );
};

export default ShoppingCart;
