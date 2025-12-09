/* Notes for Chris:

TO DO:
- The header component that should stick to the top of the screen when scrolling down, but for some reason it aint working
-> The header also needs have the logo button be an image, not just a button with an emoji on it
- We need a proper logo, maybe AI assisted if you want, just make sure its green and eco friendly looking and we need it in the following formats, .png, .svg, and .ico for favicons and website use
- The styling is kinda basic right now, we can improve it later with better CSS and maybe some animations if possible.

- Login system doesnt have email verification yet, we can add that later if we have time.
- App currently 
*/

import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginPage from "./app/LoginPage";
import HomePage from "./app/HomePage";
import MissionsPage from "./app/MissionsPage";
import AccountPage from "./app/AccountPage";

export default function App() {
  const { user, loading } = useAuth();  // We get the user and loading state from the AuthContext,

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/LoginPage" />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        
        <Route path="/MissionsPage" element={
          user ? <MissionsPage /> : <Navigate to="/LoginPage" />
        } />
        
        <Route path="/AccountPage" element={
          user ? <AccountPage /> : <Navigate to="/LoginPage" />
        } />
        
        <Route path="/HomePage" element={
          user ? <HomePage /> : <Navigate to="/LoginPage" />
        } />
        
        <Route path="*" element={<Navigate to="/LoginPage" />} />
      </Routes>
    </BrowserRouter>
  );
}