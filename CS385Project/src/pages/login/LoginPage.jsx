import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { accountData } from "../../AccountData.js"; // Account Dummy data in Accounts.js

export default function LoginPage({ setUser }) {
  // java Main method equivilent
  const accounts = accountData; // Importing Dummy Data
  const navigate = useNavigate(); // Navigation hook from react-router-dom
  const [username, setUsername] = useState(""); // State for Username input
  const [password, setPassword] = useState(""); // State for Password input
  const [message, setMessage] = useState(""); // State for displaying messages

  const handleLogin = () => {
    // Absolute Fuckery Syntax that checks if username and password match any account in accounts array
    const found = accounts.find(
      (acc) => acc.username === username && acc.password === password
    );

    if (found) {
      setMessage("Login Succesful!");
      setUser(found.username); // Set the logged in user
      localStorage.setItem("user", found.username); // Store user in localStorage
      navigate("/HomePage"); // Redirect to Home page
    } else {
      setMessage("Invalid username or password.");
    }
  };

  return (
    // JSX Responsible for displaying things to screen
    <div
      style={{
        maxWidth: "300px",
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Login</h2>

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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "6px" }}
        />
      </div>

      <button onClick={handleLogin} style={{ padding: "8px 14px" }}>
        Login
      </button>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}
