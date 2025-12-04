import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage({ user, setUser }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const handleProgress = () => {
        navigate("/ProgressPage");
    }

    return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}> 
        <h1>Welcome, {user}! This is your homepage.</h1>

        <button onClick={handleLogout} style={{ padding: "8px 14px", marginTop: "20px" }}>
            Logout
        </button>

        <button onClick={handleProgress} style={{ padding: "8px 14px", marginTop: "20px" }}>
            Progress
        </button>
    </div>
    );
}