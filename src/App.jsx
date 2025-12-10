import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { MissionsProvider } from "./context/MissionsContext.jsx";
import { UserProgressProvider } from "./context/UserProgressContext.jsx";

import NavigationBar from "./components/NavigationBar.jsx";
import HomePage from "./app/HomePage.jsx";
import ProfilePage from "./app/ProfilePage.jsx";
import MissionsPage from "./app/MissionsPage.jsx";
import LoginPage from "./app/LoginPage.jsx";

function App() {
  return (
    <AuthProvider>
      <UserProgressProvider>
        <MissionsProvider>
          <Router>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/missions" element={<MissionsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Router>
        </MissionsProvider>
      </UserProgressProvider>
    </AuthProvider>
  );
}

export default App;
