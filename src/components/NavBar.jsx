// src/components/NavBar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { logout, getCurrentUser } from "../services/auth";

// Import your logo from assets
import Logo from "../assets/logo.png"; // make sure the path matches your project

export default function NavBar() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      navigate(`/search?query=${encodeURIComponent(trimmedTerm)}`);
      setSearchTerm("");
    }
  };

  const handleProfileClick = () => {
    if (user) navigate("/profile");
    else navigate("/auth");
  };

  return (
    <nav className="bg-[#0c0f1a] text-white px-10 py-4 flex items-center shadow-xl border-b border-gray-800 h-[90px]">
      {/* Logo */}
      <motion.div
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="flex items-center cursor-pointer flex-shrink-0"
      >
        <img src={Logo} alt="CineCritique Logo" className="h-12 w-auto mr-3" />
        <span className="text-2xl font-extrabold text-amber-400 tracking-wider hover:text-amber-300">
          CineCritique
        </span>
      </motion.div>

      {/* Search Bar */}
      <motion.form
        onSubmit={handleSearch}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="flex items-center bg-gray-800 rounded-full px-4 py-2 mx-6 flex-grow focus-within:ring-2 focus-within:ring-amber-400 transition"
      >
        <Search className="w-6 h-6 text-amber-400 mr-2" />
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent focus:outline-none text-lg text-white placeholder-gray-400 w-full"
        />
      </motion.form>

      {/* Right-side buttons */}
      <div className="flex items-center space-x-6 flex-shrink-0">
        <motion.button
          onClick={handleProfileClick}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="text-4xl text-amber-400 hover:text-amber-300 transition"
          title="Profile"
        >
          <FaUserCircle />
        </motion.button>

        {user ? (
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="bg-amber-400 text-gray-900 font-bold px-5 py-2 rounded-full hover:bg-amber-500 transition text-lg"
          >
            Logout
          </motion.button>
        ) : (
          <>
            <motion.div whileHover={{ scale: 1.05 }}>
              <button
                onClick={() => navigate("/auth?mode=login")}
                className="bg-amber-400 text-gray-900 font-bold px-5 py-2 rounded-full hover:bg-amber-500 transition text-lg"
              >
                Login
              </button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <button
                onClick={() => navigate("/auth?mode=signup")}
                className="border-2 border-amber-400 text-amber-400 font-bold px-5 py-2 rounded-full hover:bg-amber-400 hover:text-gray-900 transition text-lg"
              >
                Sign Up
              </button>
            </motion.div>
          </>
        )}
      </div>
    </nav>
  );
}
