import React from "react";
import { useMissions } from "../context/MissionsContext.jsx";
import MissionCard from "../components/MissionCard.jsx";

const MissionsPage = () => {
  const { missions } = useMissions();

  return (
    <div className="p-6 min-h-screen bg-[#111]">
      <h1 className="text-3xl font-bold text-cyan mb-6">Missions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {missions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>
    </div>
  );
};

export default MissionsPage;
