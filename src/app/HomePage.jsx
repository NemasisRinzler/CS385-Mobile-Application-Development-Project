import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function HomePage({ user, setUser }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const handleProgress = () => {
        navigate("/ProgressPage");
    };

    const handleAccount = () => {
        navigate("/AccountPage");
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