import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useUserProgress } from "../context/UserProgressContext.jsx";
import { supabase } from "../config/supabase.js";

import Level1 from "../assets/levels/level1.png";
import Level2 from "../assets/levels/level2.png";
import Level3 from "../assets/levels/level3.png";
import Level4 from "../assets/levels/level4.png";
import Level5 from "../assets/levels/level5.png";

import XPProgressBar from "../components/XPProgressBar.jsx";

const levels = [Level1, Level2, Level3, Level4, Level5];

const ProfilePage = () => {
  const { user } = useAuth();
  const { xp } = useUserProgress();
  const [username, setUsername] = useState("");

  // Fetch username from users table
  useEffect(() => {
    if (!user) return;

    const fetchUsername = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("username")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching username:", error);
      } else {
        setUsername(data.username);
      }
    };

    fetchUsername();
  }, [user]);

  // Calculate current level
  const currentLevel = Math.min(Math.floor(xp / 100), levels.length - 1);

  return (
    <div className="p-6 text-white min-h-screen bg-[#111]">
      <h1 className="text-3xl font-bold mb-4 text-cyan">Profile</h1>

      <div className="bg-[#1a1a1a] border border-cyan p-4 mb-6">
        <p>
          <strong>Username:</strong> {username || "Loading..."}
        </p>
      </div>

      <h2 className="text-xl mb-2 text-emerald-400 font-bold">XP Progress</h2>
      <XPProgressBar />

      <p className="text-cyan mt-2">XP: {xp}</p>

      <div className="levels-row mt-6">
        {levels.map((levelImg, index) => (
          <div className="level-container" key={index}>
            <div
              className={`level-icon ${
                index === currentLevel ? "current" : ""
              }`}
            >
              <img src={levelImg} alt={`Level ${index + 1}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
