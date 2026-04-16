import { createContext, useState, useMemo } from "react";
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const exist = cart.find(i => i._id === item._id);

    if (exist) {
      setCart(cart.map(i =>
        i._id === item._id ? { ...i, qty: i.qty + 1 } : i
      ));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    if (!newCart[index]) return;
    if (newCart[index].qty > 1) newCart[index].qty--;
    else newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => setCart([]);

  const total = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.qty, 0), [cart]);
  const cartQty = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);

  return (
    <CartContext.Provider value={{ cart, cartQty, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}