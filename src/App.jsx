/* Notes for Chris:
Sup, welcome to the programe, ima try show you how all this works, take a look around theres a good few things that need work such as:

- The header component that should stick to the top of the screen when scrolling down, but for some reason it aint working
-> The header also needs have the logo button be an image, not just a button with an emoji on it
- The username@ecoquest.app format for logins and registrations is kinda restrictive, we should probs change the auth system to allow for just usernames.
- The missions data is currently hardcoded in the stores/missions.js file, we need to set up a missions table in the supabase database and load it from there
- We need a proper logo, maybe AI assisted if you want, just make sure its green and eco friendly looking and we need it in the following formats, .png, .svg, and .ico for favicons and website use
- The styling is kinda basic right now, we can improve it later with better CSS and maybe some animations if possible.

Anyways, All pages are connected to eachother via these routes defined in App.jsx
BrowserRouter, Routes, Route, and Navigate are what allow us to go between different pages/components in the app.
A route has to be defined inside of a <Routes> block, and each route has a "path" and an "element".
Path is the URL thatl show in the browser bar, the element is the component that gets rendered when we go to that path.

Go to the supabase.js file to see next notes
*/

import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginPage from "./app/LoginPage";
import HomePage from "./app/HomePage";
import MissionsPage from "./app/MissionsPage";
import AccountPage from "./app/AccountPage";

export default function App() {
  const { user, loading } = useAuth();

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