import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { logout } from "../services/authService";

export default function HomePage({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    setUser(null);
    localStorage.removeItem("user");
    navigate("/LoginPage");
  };

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}>
        <h1>Welcome, {user}! This is your homepage.</h1>
      </div>
    </>
  );
}