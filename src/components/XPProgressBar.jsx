import React from "react";
import { useUserProgress } from "../context/UserProgressContext.jsx";

const XPProgressBar = () => {
  const { xp } = useUserProgress();

  // Calculate level and progress
  const level = Math.floor(xp / 100);
  const progress = xp % 100;

  return (
    <div className="w-full max-w-md mt-4">
      <div className="relative w-full h-6 bg-gray-800 rounded-md border border-emerald-500 overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-white text-sm font-semibold">
        <span>Level {level}</span>
        <span>{progress}/100 XP</span>
      </div>
    </div>
  );
};

export default XPProgressBar;
