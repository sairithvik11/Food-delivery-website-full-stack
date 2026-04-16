import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.get("http://localhost:5000/api/order", {
      headers: { authorization: token }
    }).then(res => setOrders(res.data));
  }, []);

  const cancel = async(id)=>{
    const token = localStorage.getItem("token");
    if (!token) return;

    await axios.delete(`http://localhost:5000/api/order/${id}`, {
      headers: { authorization: token }
    });
    window.location.reload();
  }

  return (
    <div>
      <Navbar />
      <h2>Orders</h2>

      {orders.length === 0 ? (
        <div>No orders found. Place an order from the cart.</div>
      ) : (
        orders.map(o => (
          <div key={o._id} className="order-card">
            <h3>Order #{o._id}</h3>
            <p>Status: {o.status}</p>
            <p>Total: ₹{o.total}</p>
            {o.address && <p>Address: {o.address}</p>}
            <div>
              <strong>Items:</strong>
              <ul>
                {o.items?.map((item, index) => (
                  <li key={index}>
                    {item.name || item.title || "Item"} x{item.qty ?? 1} - ₹{typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={()=>cancel(o._id)}>Cancel</button>
          </div>
        ))
      )}
    </div>
  );
}