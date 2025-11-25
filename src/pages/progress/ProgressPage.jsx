import { useState, useEffect } from "react";
import missionCard from ".pages/progress/missionCard";
import badgeDisplay from ".pages/progress/badgeDisplay";
import progressTree from ".pages/progress/progressTree";
import { missions } from ".store/missions";
import { saveProgress, loadProgress } from ".store/storage";

export default function ProgressPage() {
  const [completed, setCompleted] = useState([]);
  const [xp, setXp] = useState(0);

  // Load saved progress on mount
  useEffect(() => {
    const saved = loadProgress();
    if (saved) {
      setCompleted(saved.completed);
      setXp(saved.xp);
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    saveProgress({ completed, xp });
  }, [completed, xp]);

  const handleComplete = (id) => {
    if (completed.includes(id)) return; // already completed
    const mission = missions.find((m) => m.id === id);
    setCompleted([...completed, id]);
    setXp(xp + mission.points);
  };

  return (
    <div className="max-w-lg mx-auto p-6 flex flex-col gap-4">
      <header className="text-center">
        <h1 className="text-2xl font-bold text-green-700">🌱 EcoQuest Lite+</h1>
        <p className="text-gray-600 text-sm">Complete missions and earn XP!</p>
        <p className="mt-2 font-semibold text-green-600">XP: {xp}</p>
        <BadgeDisplay xp={xp} />
        <ProgressTree xp={xp} />
      </header>

      {missions.map((mission) => (
        <MissionCard
          key={mission.id}
          mission={mission}
          completed={completed.includes(mission.id)}
          onComplete={handleComplete}
        />
      ))}
    </div>
  );
}