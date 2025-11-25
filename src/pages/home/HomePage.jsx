import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage({ user, setUser }) {

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        useNavigate("/LoginPage");
    };

    const onLogout = () => {
        handleLogout();
    };

    return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}> 
        <h1>Welcome, {user}! This is your homepage.</h1>
        <button onClick={onLogout} style={{ padding: "8px 14px", marginTop: "20px" }}>
            Logout
        </button>
    </div>
    );
}