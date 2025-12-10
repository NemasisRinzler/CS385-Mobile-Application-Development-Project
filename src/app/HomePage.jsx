import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#121212] text-white">
      <h1 className="text-4xl mb-8 text-cyan-400">Home</h1>

      <div className="flex flex-row gap-x-6">
        <button
          className="button button-primary px-4 py-2 text-sm"
          onClick={() => navigate("/missions")}
        >
          Missions
        </button>
        <button
          className="button button-primary px-4 py-2 text-sm"
          onClick={() => navigate("/account")}
        >
          Account
        </button>
        <button
          className="button button-secondary px-4 py-2 text-sm"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
      </div>
    </div>
  );
};

export default HomePage;
