import React from "react";
import { useMissions } from "../context/MissionsContext.jsx";
import { useUserProgress } from "../context/UserProgressContext.jsx";

const MissionCard = ({ mission }) => {
  const { completeMission } = useMissions();
  const { addXP } = useUserProgress();

  const handleComplete = () => {
    if (!mission.completed) {
      completeMission(mission.id);
      addXP(mission.points);
    }
  };

  return (
    <div className="mission-card bg-gradient-to-r from-[#111] to-[#1a1a1a] border border-emerald-500 p-4 rounded-md shadow-md flex justify-between items-center transition-all hover:shadow-emerald-500/50 hover:scale-105">
      <div>
        <h3 className="text-lg font-bold text-white">{mission.title}</h3>
        <p className="text-emerald-400 font-semibold">{mission.points} XP</p>
      </div>
      <button
        onClick={handleComplete}
        className={`px-4 py-2 font-bold ${
          mission.completed
            ? "bg-gray-700 text-white border border-emerald-500"
            : "bg-emerald-500 text-black hover:bg-emerald-600"
        } transition-all rounded-sm`}
      >
        {mission.completed ? "Completed" : "Complete"}
      </button>
    </div>
  );
};

export default MissionCard;
