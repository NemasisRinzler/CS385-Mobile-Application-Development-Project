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
      {/* Top logo block (only shown at top) */}
      <div className="eco-header text-greenbrand-700 py-3 px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/HomePage')}
            className="flex items-center gap-3 hover:opacity-90 transition"
            aria-label="Go to Home"
          >
            <div className="w-10 h-10 bg-greenbrand-500 rounded-md flex items-center justify-center text-xl text-white shadow">
              🌱
            </div>
            <span className="text-2xl font-bold text-greenbrand-700">EcoQuest</span>
          </button>
        </div>
      </div>

      {/* Placeholder to prevent content jump when nav becomes fixed */}
      {isSticky && <div className="h-14"></div>}

      {/* Navigation header - becomes sticky when scrolling */}
      <header
        className={`bg-white eco-header shadow-sm transition-all w-full ${isSticky ? 'fixed top-0 left-0 right-0 z-50' : 'relative'}`}
      >
        <nav className="px-4 py-2 flex items-center gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/HomePage')}
                className="px-3 py-1 rounded hover:bg-greenbrand-50 transition text-sm"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/MissionsPage')}
                className="px-3 py-1 rounded hover:bg-greenbrand-50 transition text-sm"
              >
                Progress
              </button>
              <button
                onClick={() => navigate('/AccountPage')}
                className="px-3 py-1 rounded hover:bg-greenbrand-50 transition text-sm"
              >
                Account
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={() => navigate('/LoginPage')}
              className="px-3 py-1 rounded bg-greenbrand-500 text-white hover:bg-greenbrand-700 transition text-sm"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
