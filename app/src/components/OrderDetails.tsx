import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { CartItem } from "../redux/cartSlice";
import "../App.css";

const OrderDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orderData } = location.state || {};

  if (!orderData) {
    return <div>No order details available.</div>;
  }

  const { items, totalAmount, totalPrice } = orderData;

  const handleExitOrder = () => {
    dispatch(clearCart());
    sessionStorage.removeItem("cart");
    navigate("/home");
  };

  return (
    <div className="order-details">
      <h2>Order Confirmation</h2>
      <div className="order-summary">
        <p><strong>Total Items:</strong> {totalAmount}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
      </div>

      {items.length === 0 ? (
        <p>No order details available.</p>
      ) : (
        <ul className="cart-items-list">
          {items.map((item: CartItem) => (
            <li key={item.name} className="cart-item">
              <img src={item.imageUrl} alt={item.name} width={80} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p><strong>Price:</strong> ${item.price}</p>
                <p><strong>Quantity:</strong> {item.count}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="action-buttons">
        <button className="back-button" onClick={() => navigate("/home")}>Back to Shop</button>
        <button
          className="exit-order-button"
          onClick={handleExitOrder}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Exit Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
