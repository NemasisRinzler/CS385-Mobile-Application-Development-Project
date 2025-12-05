import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BadgeDisplay from "../components/BadgeDisplay";
import { loadProgress } from "../stores/storage";

export default function AccountPage({ user }) {
    const [xp, setXp] = useState(0);
    const navigate = useNavigate();

    // Redirect to login if user is not authenticated
    useEffect(() => {
        if (!user) {
            navigate("/LoginPage");
        }
    }, [user, navigate]);

    useEffect(() => {
        const saved = loadProgress();
        if (saved) {
            setXp(saved.xp);
        }
    }, []);

    const level = Math.floor(xp / 1000) + 1; // Level increments every 1000 XP

    const handleHome = () => {
        navigate("/HomePage");
    };

    return (
    <>
      <Header />
      <div className="max-w-lg mx-auto p-6 flex flex-col gap-4">
      <header className="text-center">
        <h1 className="text-2xl font-bold text-green-700">👤 Account Hub: {user}</h1>
      </header>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        {/* Username */}
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-gray-600">Username: </span>
          <span className="font-semibold">{user}</span>
        </div>

        {/* Level */}
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-gray-600">Level: </span>
          <span className="font-semibold text-green-600">{level}</span>
        </div>

        {/* XP */}
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-gray-600">Total XP: </span>
          <span className="font-semibold text-green-600">{xp}</span>
        </div>

        {/* Progress to next level */}
        <div className="border-b pb-3">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress to Next Level: {level + 1}</span>
            <span>{xp % 50} / 50 XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all"
              style={{ width: `${((xp % 50) / 50) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Badge Display */}
        <div className="pt-2">
          <BadgeDisplay xp={xp} />
        </div>
      </div>

      <button 
        onClick={handleHome} 
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Back to Home
      </button>
      </div>
    </>
  );
}