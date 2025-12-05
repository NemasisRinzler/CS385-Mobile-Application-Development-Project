import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./app/LoginPage";
import HomePage from "./app/HomePage";
import ProgressPage from "./app/ProgressPage";
import AccountPage from "./app/AccountPage";

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

          {/* Progress Page */}
          <Route path="/ProgressPage" element={
            user ? (
              <ProgressPage user={user} />
            ) : (
              <Navigate to="/LoginPage" />
            )
          } />

          {/* Account Page */}
          <Route path="/AccountPage" element={
            user ? (
              <AccountPage user={user} />
            ) : (
            <Navigate to="/LoginPage" />
            )
          } />

          {/* Protected Home Page */}
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
