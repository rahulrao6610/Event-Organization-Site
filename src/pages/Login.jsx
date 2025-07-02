import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin");
      }, 1500); // show success for 1.5 seconds before redirect
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Login Icon"
          />
        </div>
        <div className="login-right">
          <h2>Member Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Login successful! Redirecting...</p>}
          </form>
          <div className="login-links">
            <p>
  <Link to="/forgot-password">Forgot Username / Password?</Link>
</p>
<p>
  <Link to="/signup">Create your Account →</Link>
</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
