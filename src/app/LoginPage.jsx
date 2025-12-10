import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        if (!username) {
          setError("Please enter a username");
          return;
        }
        await signup(email, password, username);
        alert("Account created! You can log in now.");
        setIsSignUp(false);
        setEmail("");
        setPassword("");
        setUsername("");
      } else {
        await login(email, password);
        navigate("/home");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#111] text-white">
      <h1 className="text-4xl mb-6">{isSignUp ? "Sign Up" : "Login"}</h1>
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        {isSignUp && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 text-black"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 text-black"
          required
        />
        <button type="submit" className="button button-primary">
          {isSignUp ? "Sign Up" : "Log In"}
        </button>
      </form>
      <button
        className="mt-4 text-cyan-400 underline"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp
          ? "Already have an account? Log In"
          : "Don't have an account? Sign Up"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default LoginPage;
