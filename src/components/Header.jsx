/*
My proudest creation, the header just displays the homepage , logout, progress, and account buttons.
Its supposed to have a sticky effect when scrolling down the page. Like, the header stays at the top 
of the screen when you scroll down. But that feature is broken for some reason, we need to fix that later.
Anyways, we can just import this to any page we want a header on every page and itl work.
*/

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      {/* Logo section - always at the top: Logo is currently a button with a green emoji on it, not ideal */}
      <div className="bg-green-700 text-white py-4 px-4">
        <button 
          onClick={() => navigate("/HomePage")}
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center text-3xl shadow-lg">
            🌱
          </div>
          <span className="text-8xl font-bold">EcoQuest</span>
        </button>
      </div>

      {/* Placeholder to prevent content jump when nav becomes fixed */}
      {isSticky && <div className="h-[52px]"></div>}

      {/* Navigation header - becomes sticky when scrolling */}
      <header 
        className={`bg-green-700 text-white shadow-md transition-all w-full ${
          isSticky ? "fixed top-0 left-0 right-0 z-50" : "relative"
        }`}
      >
        <nav className="px-4 py-3 flex gap-2">
          <button
            onClick={() => navigate("/HomePage")}
            className="px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/MissionsPage")}
            className="px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Missions
          </button>
          <button
            onClick={() => navigate("/AccountPage")}
            className="px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Account
          </button>
          <button
            onClick={() => navigate("/LoginPage")}
            className="px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Logout
          </button>
        </nav>
      </header>
    </>
  );
}
