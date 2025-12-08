import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MissionCard from "../components/MissionCard";
import BadgeDisplay from "../components/BadgeDisplay";
import ProgressTree from "../components/ProgressTree";
import { missions } from "../stores/missions"; // We eventually need to set up missions as parts of a seperate "missions" table in the supabase Database
import { getProgress, saveProgress } from "../services/userService";

export default function MissionsPage({ user }) {
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
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-greenbrand-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading missions...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-greenbrand-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-greenbrand-200/20 rounded-full blur-3xl dark:bg-greenbrand-900/20"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl dark:bg-blue-900/20"></div>
        </div>

        <div className="relative py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3">🌍 Available Missions</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">Complete missions and earn XP to grow your tree!</p>
              <p className="mt-4 text-2xl font-bold text-greenbrand-600">Total XP: {xp}</p>
            </div>

            {/* Progress Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg">
                <BadgeDisplay xp={xp} />
              </div>
              <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg">
                <ProgressTree xp={xp} />
              </div>
            </div>

            {/* Missions Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                <span>✨</span> Missions
              </h2>
              <div className="space-y-4">
                {missions.map((mission) => (
                  <MissionCard
                    key={mission.id}
                    mission={mission}
                    completed={completed.includes(mission.id)}
                    onComplete={handleComplete}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}