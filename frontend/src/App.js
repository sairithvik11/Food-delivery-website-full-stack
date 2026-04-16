import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Orders from "./pages/Orders";
import Register from "./pages/Register";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;