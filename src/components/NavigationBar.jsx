import React from "react";
import { NavLink } from "react-router-dom";

const EcoQuestLogo = new URL("../assets/ecoquest-logo.png", import.meta.url)
  .href;

const NavigationBar = () => {
  const linkClasses = ({ isActive }) =>
    `px-4 py-2 font-semibold ${
      isActive
        ? "bg-emerald-500 text-black"
        : "text-white hover:bg-emerald-600 hover:text-black"
    }`;

  return (
    <nav className="flex items-center justify-between p-4 shadow-md fixed top-0 w-full z-50 bg-gradient-to-b from-[#0f0f1a] via-[#005f73] to-[#00c896]">
      {/* Left: Logo + Home */}
      <div className="flex items-center gap-4">
        <img src={EcoQuestLogo} alt="EcoQuest Logo" className="h-10 w-10" />
        <NavLink to="/home" className={linkClasses}>
          Home
        </NavLink>
      </div>

      {/* Right: Other links */}
      <div className="flex gap-4">
        <NavLink to="/missions" className={linkClasses}>
          Missions
        </NavLink>
        <NavLink to="/profile" className={linkClasses}>
          Profile
        </NavLink>
        <NavLink to="/account" className={linkClasses}>
          Account
        </NavLink>
      </div>
    </nav>
  );
};

export default NavigationBar;
