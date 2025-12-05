import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MissionCard from "../components/MissionCard";
import BadgeDisplay from "../components/BadgeDisplay";
import ProgressTree from "../components/ProgressTree";
import { missions } from "../stores/missions";
import { getProgress, saveProgress } from "../services/userService";

export default function ProgressPage({ user }) {
  const [completed, setCompleted] = useState([]);
  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!user) {
      navigate("/LoginPage");
    }
  }, [user, navigate]);

  useEffect(() => {
    const loadData = async () => {
      const saved = await getProgress();
      if (saved) {
        setCompleted(saved.completed || []);
        setXp(saved.xp || 0);
      }
      setLoading(false);
      isInitialMount.current = false;
    };

    loadData();
  }, []);

  useEffect(() => {
    if (isInitialMount.current || loading) return;

    const saveData = async () => {
      await saveProgress({ completed, xp });
    };

    saveData();
  }, [completed, xp, loading]);

  const handleComplete = (id) => {
    if (completed.includes(id)) return;
    const mission = missions.find((m) => m.id === id);
    setCompleted([...completed, id]);
    setXp(xp + mission.points);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto p-6 flex flex-col gap-4">
        <header className="text-center">
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
    </>
  );
}