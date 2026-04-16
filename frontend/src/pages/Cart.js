import { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";

export default function Cart() {
  const { cart, cartQty, addToCart, removeFromCart, clearCart, total } = useContext(CartContext);
  const [orderMessage, setOrderMessage] = useState("");

  const handleBuy = async () => {
    if (!cart.length) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login before placing an order.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/order",
        {
          items: cart,
          total,
          address: ""
        },
        {
          headers: { authorization: token }
        }
      );

      const purchasedQty = cartQty;
      clearCart();
      setOrderMessage(`Order placed! You bought ${purchasedQty} item${purchasedQty === 1 ? "" : "s"}.`);
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="cart-page">
      <Navbar />

      <div className="cart-header">
        <div>
          <h2>Your Cart</h2>
          <p className="cart-subtitle">Fast checkout for your tasty order.</p>
        </div>
        <span className="cart-badge">{cartQty} item{cartQty === 1 ? "" : "s"}</span>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart-card">
          Your cart is empty. Browse the menu on Home and add delicious items.
        </div>
      ) : (
        <div className="cart-grid">
          {cart.map((item, index) => (
            <div key={item._id ?? index} className="cart-card">
              {item.image && <img src={item.image} alt={item.name} className="cart-image" />}
              <div className="cart-item-info">
                <div>
                  <h3>{item.name}</h3>
                  <p className="cart-price">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => removeFromCart(index)}>-</button>
                  <span>{item.qty}</span>
                  <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <div>
          <p>Cart total</p>
          <h3>₹{total.toFixed(2)}</h3>
        </div>
        <button className="btn buy-btn" onClick={handleBuy} disabled={!cart.length}>
          {cart.length ? "Buy now" : "Add items first"}
        </button>
      </div>

      {orderMessage && <div className="order-message">{orderMessage}</div>}
    </div>
  );
}