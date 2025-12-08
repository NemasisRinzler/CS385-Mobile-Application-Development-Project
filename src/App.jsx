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
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./config/supabase";
import LoginPage from "./app/LoginPage";
import HomePage from "./app/HomePage";
import MissionsPage from "./app/MissionsPage";
import AccountPage from "./app/AccountPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing Supabase session on mount
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Get username from Supabase
        const { data: profile } = await supabase
          .from('users')
          .select('username')
          .eq('id', session.user.id)
          .single();
        
        const username = profile?.username || localStorage.getItem("user");
        setUser(username);
        localStorage.setItem("user", username);

        // Load user's XP from Supabase
        const { data: progress } = await supabase
          .from('user_progress')
          .select('xp')
          .eq('user_id', session.user.id)
          .single();
        
        if (progress) {
          setXp(progress.xp || 0);
        }
      } else {
        // Fallback to localStorage if no session
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(savedUser);
        }
      }
      
      setLoading(false);
    };

    initializeAuth();

    // Listen for auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('username')
          .eq('id', session.user.id)
          .single();
        
        const username = profile?.username;
        setUser(username);
        localStorage.setItem("user", username);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/LoginPage" />} />

          {/* Login Page */}
          <Route path="/LoginPage" element={<LoginPage setUser={setUser} />} />

          {/* Missions Page */}
          <Route path="/MissionsPage" element={
            user ? (
              <MissionsPage user={user} xp={xp} setXp={setXp} />
            ) : (
              <Navigate to="/LoginPage" />
            )
          } />

          {/* Account Page */}
          <Route path="/AccountPage" element={
            user ? (
              <AccountPage user={user} xp={xp} />
            ) : (
              <Navigate to="/LoginPage" />
            )
          } />

          {/* Protected Home Page */}
          <Route path="/HomePage" element={
            user ? (
              <HomePage user={user} setUser={setUser} xp={xp} />
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