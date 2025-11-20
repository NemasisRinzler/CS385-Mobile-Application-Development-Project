import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";

export default function App() {
  // java Main method equivilent - back end of display logic

  const [user, setUser] = useState(() => {  // loads saved user from localStorage if available
    return localStorage.getItem("user");
  });

  return (
    // Front end of display logic
    <>
      <BrowserRouter>
        <Routes>

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/LoginPage" />} />

          {/* Login Page */}
          <Route path="/LoginPage" element={<LoginPage setUser={setUser} />} />

          {/* Proteceted Home Page */}
          <Route path="/HomePage" element={
            user ? (
              <HomePage user={user} setUser={setUser} />
            ) : (
              <Navigate to="/LoginPage" />
            )
          } />

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/LoginPage" />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}
