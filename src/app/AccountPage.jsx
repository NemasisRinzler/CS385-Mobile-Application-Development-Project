import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BadgeDisplay from "../components/BadgeDisplay";
import { getUserProfile } from "../services/userService";

export default function AccountPage({ user }) {
  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/LoginPage");
      return;
    }

    const loadProfile = async () => {
      const profile = await getUserProfile();
      if (profile) {
        setXp(profile.xp || 0);
      }
      setLoading(false);
    };

    loadProfile();
  }, [user, navigate]);

  const level = Math.floor(xp / 1000) + 1;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto p-6 flex flex-col gap-4">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-green-700">👤 Account Details</h1>
        </header>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-gray-600">Username</span>
            <span className="font-semibold">{user}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-gray-600">Level</span>
            <span className="font-semibold text-green-600">Level {level}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-gray-600">Total XP</span>
            <span className="font-semibold text-green-600">{xp} XP</span>
          </div>

          <div className="border-b pb-3">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress to Level {level + 1}</span>
              <span>{xp % 50} / 50 XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${((xp % 50) / 50) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="pt-2">
            <BadgeDisplay xp={xp} />
          </div>
        </div>
      </div>
    </>
  );
}