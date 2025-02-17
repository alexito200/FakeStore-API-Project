import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice"; // ✅ Import clearCart action
import { CartItem } from "../redux/cartSlice"; // ✅ Import CartItem type

const OrderDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve cart data from navigation state or use defaults
  const { cartItems = [], totalAmount = 0, totalPrice = 0 } = location.state || {};

  const handleExitOrder = () => {
    dispatch(clearCart()); // ✅ Clear Redux cart state
    sessionStorage.removeItem("cart"); // ✅ Remove cart from sessionStorage
    navigate("/home"); // ✅ Redirect to Home page
  };

  return (
    <div>
      <h2>Order Details</h2>
      <p>Total Items: {totalAmount}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      {cartItems.length === 0 ? (
        <p>No order details available.</p>
      ) : (
        <ul>
          {cartItems.map((item: CartItem) => ( // ✅ Use CartItem type
            <li key={item.id}>
              <img src={item.image} alt={item.name} width={50} />
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.count}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate("/home")}>Back to Home</button>
      <button onClick={handleExitOrder} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>
        Exit Order
      </button>
    </div>
  );
};

export default OrderDetails;
