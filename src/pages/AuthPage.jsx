import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function AuthPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple mock login for demo
    if (email && password) {
      const userData = { name, email };
      login(userData);
      navigate("/");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c0f1a]">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 rounded-xl w-[600px] h-[400px] space-y-4 text-white shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-center mb-4">Login / Signup</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-white text-black"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-white text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-white text-black"
        />
        <button
          type="submit"
          className=" text-2xl w-full bg-blue-500 py-3 rounded-md font-semibold hover:bg-blue-600 transition"
        >
          Login / Signup
        </button>
      </form>
    </div>
  );
}
