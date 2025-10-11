import React, { useState } from "react";

const AuthForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, email, password, avatar: null };
    localStorage.setItem("currentUser", JSON.stringify(user));
    if (onLogin) onLogin(user);
  };

  return (
    // Form container only, no outer min-h-screen wrapper
    <div className="relative bg-gradient-to-br from-blue-600 to-purple-900 p-12 rounded-2xl shadow-3xl w-full max-w-lg mx-auto">
      <h2 className="text-5xl font-bold text-white text-center mb-10">Login / Signup</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-4 text-lg rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-4 text-lg rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 text-lg rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition shadow-md"
        >
          Login / Signup
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
