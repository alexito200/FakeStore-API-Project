import React from "react";
import { useUserOrders } from "./productService";
import { Order } from "../types/types";
import { useNavigate } from "react-router-dom";
import '../App.css';

const OrderHistory: React.FC = () => {
  const { orders, loading, user } = useUserOrders();
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (!user) {
    return (
      <div>
        <p>You must be logged in to view order history.</p>
        <button onClick={() => navigate("/")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul>
          {orders.map((order: Order) => (
            <li key={order.id}>
              <h4>Order ID: {order.id}</h4>
              <p>Total Price: ${order.totalPrice}</p>
              <p>Status: {order.status}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.name}>
                    {item.name} - ${item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate("/user-profile")}>Go to User Profile</button>
    </div>
  );
};

export default OrderHistory;
