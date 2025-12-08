import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { logout } from "../services/authService";

export default function HomePage({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    setUser(null);
    localStorage.removeItem("user");
    navigate("/LoginPage");
  };

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-50 via-white to-greenbrand-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-greenbrand-200/20 rounded-full blur-3xl dark:bg-greenbrand-900/20"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl dark:bg-blue-900/20"></div>
        </div>

        <div className="relative px-4 py-20 sm:py-32 flex items-center justify-center">
          <div className="max-w-2xl text-center">
            {/* Welcome card */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-2xl p-8 sm:p-12 border border-white/20 dark:border-gray-700/50">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-greenbrand-500 to-greenbrand-700 text-white shadow-lg mb-6">
                <span className="text-4xl">🌱</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Welcome, <span className="bg-gradient-to-r from-greenbrand-600 to-blue-600 bg-clip-text text-transparent">{user}</span>!
              </h1>

              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                Complete eco-friendly missions, grow your tree, and make a difference. Every action counts!
              </p>

              {/* Quick action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/MissionsPage')}
                  className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-greenbrand-500 to-greenbrand-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <span>🎯</span> View Missions
                </button>

                <button
                  onClick={() => navigate('/AccountPage')}
                  className="flex-1 py-3 px-6 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold border-2 border-gray-200 dark:border-gray-600 hover:border-greenbrand-500 hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>👤</span> Account
                </button>
              </div>

              {/* Stats preview */}
              <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Quick stats</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-greenbrand-50 dark:bg-greenbrand-900/20">
                    <p className="text-2xl font-bold text-greenbrand-600">0</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Missions</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <p className="text-2xl font-bold text-blue-600">0</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">XP</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                    <p className="text-2xl font-bold text-purple-600">🌱</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Level</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}