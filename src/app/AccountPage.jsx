/*
Okay this one I actually understand pretty well, here im gonna demonstrate how supabase and the header and all this jazz works.
Then secondly, we load the user's profile information such as their XP and display it.
*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // We import useNavigate to allow navigation between pages
import Header from "../components/Header"; // We import bigman header component
import BadgeDisplay from "../components/BadgeDisplay"; // We import CHAD badge display component

export default function AccountPage({ user, xp }) { // We pass in user and xp props from App.jsx
  const navigate = useNavigate();

  useEffect(() => { // We ask if the user is logged in,
    if (!user) { // if not,
      navigate("/LoginPage"); // Redirect to login page
    }
  }, [user, navigate]);

  const level = Math.floor(xp / 1000) + 1; // FYI This takes user XP and converts it to a level locally, this means that "levels" so to speak, are not stored in the Database but are calculated on the fly based on XP.

  return (
    <>
      <Header /> {/*HAHAHA MY HEADER */}
      <div className="max-w-lg mx-auto p-6 flex flex-col gap-4">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-green-700">👤 Account Details</h1>
        </header>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-gray-600">Username </span>
            <span className="font-semibold">{user}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-gray-600">Level </span>
            <span className="font-semibold text-green-600">{level}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-gray-600">Total XP: </span>
            <span className="font-semibold text-green-600">{xp}</span>
          </div>

          <div className="border-b pb-3">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress to Level: {level + 1}</span>
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
            <BadgeDisplay xp={xp} /> {/* Absolute beast BadgeDisplay component */}
          </div>
        </div>
      </div>
    </>
  );
}