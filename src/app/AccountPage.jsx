/*
Okay this one I actually understand pretty well, here im gonna demonstrate how supabase and the header and all this jazz works.
Then secondly, we load the user's profile information such as their XP and display it.
*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // We import useNavigate to allow navigation between pages
import Header from "../components/Header"; // We import bigman header component
import BadgeDisplay from "../components/BadgeDisplay"; // We import CHAD badge display component
import { getUserProfile } from "../services/userService"; // BOW <--- This is where we get the user's profile data from the database

export default function AccountPage({ user }) { // We pass in the user prop to identify the logged in user
  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { // We ask if the user is logged in,
    if (!user) { // if not,
      navigate("/LoginPage"); // Redirect to login page
      return;
    }

    const loadProfile = async () => { // Next we load the user's profile information such as their XP and display it, IDK how tho.
      const profile = await getUserProfile();
      if (profile) {
        setXp(profile.xp || 0);
      }
      setLoading(false);
    };

    loadProfile();
  }, [user, navigate]);

  const level = Math.floor(xp / 1000) + 1; // FYI This takes user XP and converts it to a level locally, this means that "levels" so to speak, are not stored in the Database but are calculated on the fly based on XP.

  if (loading) { // If we are still loading the profile data, display loading message
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-greenbrand-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading account...</p>
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
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-greenbrand-500 to-greenbrand-700 text-white shadow-lg mb-6">
                <span className="text-4xl">👤</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100">Account Details</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">View your progress and achievements</p>
            </div>

            {/* Main content card */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-2xl p-8 sm:p-12 border border-white/20 dark:border-gray-700/50">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 pb-12 border-b border-gray-200/50 dark:border-gray-700/50">
                {/* Username */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Username</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user}</p>
                </div>

                {/* Level */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Level</p>
                  <p className="text-2xl font-bold text-greenbrand-600">Level {level}</p>
                </div>

                {/* Total XP */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total XP</p>
                  <p className="text-2xl font-bold text-blue-600">{xp}</p>
                </div>
              </div>

              {/* Progress Section */}
              <div className="mb-12 pb-12 border-b border-gray-200/50 dark:border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Progress to Level {level + 1}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{xp % 50} / 50 XP</span>
                    <span>{Math.round(((xp % 50) / 50) * 100)}%</span>
                  </div>
                  <div className="progress-track h-3">
                    <div className="progress-fill h-3" style={{ width: `${((xp % 50) / 50) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* Badge Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Current Badge</h3>
                <BadgeDisplay xp={xp} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}