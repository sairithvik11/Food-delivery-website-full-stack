import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      alert("Login successful");

    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-box">
        <h2>Login</h2>
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button className="btn" onClick={login}>Login</button>
      </div>
    </div>
  );
}