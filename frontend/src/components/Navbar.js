import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const { cartQty } = useContext(CartContext);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="brand">🍽️ Thvik Aroma</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart" style={{ margin: "0 10px" }}>
          Cart {cartQty ? `(${cartQty})` : ""}
        </Link>
        <Link to="/orders">Orders</Link>
        <Link to="/admin">Admin</Link>

        {token ? (
          <button onClick={logout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={{ margin: "0 10px" }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}