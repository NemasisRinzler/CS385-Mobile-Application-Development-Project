import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/authService";

export default function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    const result = await login(username, password);

    if (result && result.token) {
      setMessage("Login Successful!");
      setUser(result.user.username);
      localStorage.setItem("user", result.user.username);
      navigate("/HomePage");
    } else {
      setMessage("Invalid username or password.");
    }

    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const result = await register(username, password);

    if (result && result.token) {
      setMessage("Registration Successful!");
      setUser(result.user.username);
      localStorage.setItem("user", result.user.username);
      navigate("/HomePage");
    } else {
      setMessage("Registration failed. Username may already exist.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "300px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>{isRegistering ? "Register" : "Login"}</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "6px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "6px" }}
        />
      </div>

      <button
        onClick={isRegistering ? handleRegister : handleLogin}
        disabled={loading}
        style={{ padding: "8px 14px", width: "100%", marginBottom: "10px" }}
      >
        {loading ? "Processing..." : (isRegistering ? "Register" : "Login")}
      </button>

      <button
        onClick={() => {
          setIsRegistering(!isRegistering);
          setMessage("");
        }}
        style={{ 
          padding: "8px 14px", 
          width: "100%", 
          background: "transparent",
          border: "1px solid #ccc",
          cursor: "pointer"
        }}
      >
        {isRegistering ? "Back to Login" : "Create Account"}
      </button>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}