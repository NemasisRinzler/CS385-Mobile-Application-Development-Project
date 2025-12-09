import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import MissionCard from "../components/MissionCard";
import BadgeDisplay from "../components/BadgeDisplay";
import ProgressTree from "../components/ProgressTree";
import { getAllMissions } from "../services/missionService";
import { getProgress, saveProgress } from "../services/userService";

export default function MissionsPage() {
  const { user, xp, setXp } = useAuth();
  const [missions, setMissions] = useState([]);
  const [randomMissions, setRandomMissions] = useState([]);
  const [sortedMissions, setSortedMissions] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/LoginPage");
    }
  }, [user, navigate]);

  // Load missions and progress data
  useEffect(() => {
    const loadData = async () => {
      // Fetch missions from Supabase
      const missionsData = await getAllMissions();
      setMissions(missionsData);
      
      // Select 10 random missions
      const shuffled = [...missionsData].sort(() => Math.random() - 0.5);
      setRandomMissions(shuffled.slice(0, 10));
      
      // Initialize sorted missions
      setSortedMissions(missionsData);

      // Fetch user progress from Supabase
      const progressData = await getProgress();
      if (progressData) {
        setCompleted(progressData.completed || []);
      }

      setLoading(false);
      isInitialMount.current = false;
    };

    loadData();
  }, []);

  // Save progress whenever completed or xp changes
  useEffect(() => {
    if (isInitialMount.current || loading) return;

    const saveData = async () => {
      await saveProgress({ completed, xp });
    };

    saveData();
  }, [completed, xp, loading]);

  // Handle sorting
  useEffect(() => {
    if (!missions.length) return;
    
    let sorted = [...missions];
    
    switch (sortBy) {
      case 'xp-high':
        sorted.sort((a, b) => b.points - a.points);
        break;
      case 'xp-low':
        sorted.sort((a, b) => a.points - b.points);
        break;
      case 'a-z':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'z-a':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'category':
        sorted.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        // Keep original order
        break;
    }
    
    setSortedMissions(sorted);
  }, [sortBy, missions]);


  const handleComplete = async (id) => {
    if (completed.includes(id)) return;
    
    const mission = missions.find((m) => m.id === id);
    if (!mission) return;

    // Optimistic update - update UI immediately
    const newCompleted = [...completed, id];
    const newXp = xp + mission.points;
    setCompleted(newCompleted);
    setXp(newXp);

    // Save to backend using saveProgress (simpler approach)
    const result = await saveProgress({ completed: newCompleted, xp: newXp });
    
    if (!result) {
      // Rollback on error
      setCompleted(completed);
      setXp(xp);
      console.error('Failed to save progress');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-lg mx-auto p-6 text-center">
          <p>Loading missions...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto p-6 flex flex-col gap-4">
        <header className="text-center">
          <p className="text-gray-600 text-sm">Complete missions and earn XP!</p>
          <p className="mt-2 font-semibold text-green-600">XP: {xp}</p>
          &nbsp;
          <BadgeDisplay xp={xp} />
          &nbsp;
          <ProgressTree xp={xp} />
          &nbsp;
        </header>

        <p className="text-lg font-bold text-green-700">Available Missions:</p>
        &nbsp;

        {missions.length === 0 ? (
          <p className="text-center text-gray-500">No missions available yet.</p>
        ) : (
          missions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              completed={completed.includes(mission.id)}
              onComplete={handleComplete}
            />
          ))
        )}
      </div>
    </>
  );
}