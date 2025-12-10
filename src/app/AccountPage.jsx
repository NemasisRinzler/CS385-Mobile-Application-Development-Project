import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const AccountPage = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const doLogout = async () => {
    await logout();
    nav("/");
  };

  return (
    <div className="min-h-screen pt-28 p-6 bg-[#0f1113] text-white">
      <h1 className="text-3xl mb-4">Account</h1>
      <div className="mb-4">Email: {user?.email}</div>
      <button className="bg-red-500 px-4 py-2" onClick={doLogout}>
        Logout
      </button>
    </div>
  );
};

export default AccountPage;
