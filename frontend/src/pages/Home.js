import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";

export default function Home() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get("http://localhost:5000/api/food")
      .then(res => setFoods(res.data));
  }, []);

const filtered = foods.filter(f =>
  (f.name || "").toLowerCase().includes(search.toLowerCase()) &&
  (category === "" || f.category === category)
);

  return (
    <div>
      <Navbar />

      <div className="hero">
        <h1>Order Food Online</h1>
        <input placeholder="Search..." onChange={e => setSearch(e.target.value)} />

        <div>
          <button onClick={()=>setCategory("")}>All</button>
          <button onClick={()=>setCategory("Veg")}>Veg</button>
          <button onClick={()=>setCategory("Non-Veg")}>Non-Veg</button>
          <button onClick={()=>setCategory("Drinks")}>Drinks</button>
        </div>
      </div>

      <div className="food-container">
        {filtered.map(food => (
          <div className="food-card" key={food._id}>
            <img src={food.image} alt="" />
            <div className="food-info">
              <h3>{food.name}</h3>
              <p>₹{food.price}</p>
              <p>⭐ {food.rating || 4.2}</p>
              <button className="btn" onClick={() => addToCart(food)}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}