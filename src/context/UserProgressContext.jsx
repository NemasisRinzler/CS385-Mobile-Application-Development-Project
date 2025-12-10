import React, { createContext, useContext, useState } from "react";

const UserProgressContext = createContext();

export const UserProgressProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState([]);

  const addXP = (amount) => {
    setXp((prev) => prev + amount);
  };

  const completeMission = (missionId, points) => {
    if (!completed.includes(missionId)) {
      setCompleted((prev) => [...prev, missionId]);
      addXP(points);
    }
  };

  return (
    <UserProgressContext.Provider
      value={{ xp, completed, addXP, completeMission }}
    >
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => useContext(UserProgressContext);
