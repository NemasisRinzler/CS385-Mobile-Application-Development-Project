/* Notes for Chris:
Sup, welcome to the programe, ima try show you how all this works, take a look around theres a good few things that need work such as:

- The header component that should stick to the top of the screen when scrolling down, but for some reason it aint working
-> The header also needs have the logo button be an image, not just a button with an emoji on it
- The username@ecoquest.app format for logins and registrations is kinda restrictive, we should probs change the auth system to allow for just usernames.
- The missions data is currently hardcoded in the stores/missions.js file, we need to set up a missions table in the supabase database and load it from there
- The index.html file needs a proper favicon instead of the default one, i.e it needs our ecoquest logo to show up in the browser tab.
- The styling is kinda basic right now, we can improve it later with better CSS and maybe some animations if possible.

Anyways, All pages are connected to eachother via these routes defined in App.jsx
BrowserRouter, Routes, Route, and Navigate are what allow us to go between different pages/components in the app.
A route has to be defined inside of a <Routes> block, and each route has a "path" and an "element".
Path is the URL thatl show in the browser bar, the element is the component that gets rendered when we go to that path.

Go to the supabase.js file to see next notes
*/

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
