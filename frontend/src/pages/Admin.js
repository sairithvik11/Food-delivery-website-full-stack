import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const addFood = async () => {
    await axios.post("http://localhost:5000/api/food", {
      name,
      price,
      image
    });

    alert("Food Added");
  };

  return (
    <div>
      <Navbar />
      <h2>Admin Panel</h2>

      <input placeholder="Food Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <input placeholder="Image URL" onChange={e => setImage(e.target.value)} />

      <button className="btn" onClick={addFood}>
        Add Food
      </button>
    </div>
  );
}