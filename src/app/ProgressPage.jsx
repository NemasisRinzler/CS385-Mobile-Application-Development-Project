import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MissionCard from "../components/MissionCard";
import BadgeDisplay from "../components/BadgeDisplay";
import ProgressTree from "../components/ProgressTree";
import { missions } from "../stores/missions";
import { saveProgress, loadProgress } from "../stores/storage";

export default function ProgressPage({ user }) {  // ProgressPage component
  const [completed, setCompleted] = useState(() => {
    const saved = loadProgress();
    return saved ? saved.completed : [];
  });
  
  const [xp, setXp] = useState(() => {  // Lazy load initial XP
    const saved = loadProgress();
    return saved ? saved.xp : 0;
  });
  const navigate = useNavigate(); //navigate hook
  const isInitialMount = useRef(true);  // Ref to track initial mount

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/LoginPage");
    }
  }, [user, navigate]);

  const handleHome = () => {
    navigate("/HomePage");
  };

  // Load saved progress on mount
  useEffect(() => {
    console.log("Loading progress...");
    const saved = loadProgress();
    console.log("Loaded data:", saved);
    if (saved) {
      setCompleted(saved.completed);
      setXp(saved.xp);
      console.log("Set completed:", saved.completed, "Set XP:", saved.xp);
    }
    isInitialMount.current = false;
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    console.log("Save effect triggered. isInitialMount:", isInitialMount.current);
    if (isInitialMount.current) {
      console.log("Skipping save - initial mount");
      return;
    }
    console.log("Saving progress:", { completed, xp });
    saveProgress({ completed, xp });
  }, [completed, xp]);

  const handleComplete = (id) => {
    if (completed.includes(id)) return;
    const mission = missions.find((m) => m.id === id);
    console.log("Completing mission:", mission);
    setCompleted([...completed, id]);
    setXp(xp + mission.points);
  };

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto p-6 flex flex-col gap-4">
      <header className="text-center">
        <p className="text-gray-600 text-sm">Complete missions and earn XP!</p>
        <p className="mt-2 font-semibold text-green-600">XP: {xp}</p>
        <BadgeDisplay xp={xp} />
        <ProgressTree xp={xp} />

        <button onClick={handleHome} style={{ padding: "8px 14px", marginTop: "20px" }}>
          Home
        </button>
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
    </>
  );
}