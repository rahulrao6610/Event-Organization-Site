
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav style={{ backgroundColor: "#2c3e50", padding: "1rem", color: "#fff" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "1rem" }}>
        Home
      </Link>
      <Link to="/create" style={{ color: "#fff", marginRight: "1rem" }}>
        Create Event
      </Link>
      <Link to="/admin" style={{ color: "#fff", marginRight: "1rem" }}>
        Admin
      </Link>
      {currentUser ? (
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "transparent",
            color: "#fff",
            border: "1px solid #fff",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      ) : (
        <Link to="/login" style={{ color: "#fff" }}>
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;