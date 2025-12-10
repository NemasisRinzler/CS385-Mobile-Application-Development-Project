import React, { createContext, useContext, useState } from "react";

const MissionsContext = createContext();

export const MissionsProvider = ({ children }) => {
  const [missions, setMissions] = useState([
    { id: 1, title: "Plant a tree", points: 10, completed: false },
    { id: 2, title: "Recycle plastic", points: 20, completed: false },
    { id: 3, title: "Walk to work", points: 15, completed: false },
    { id: 4, title: "Use reusable bag", points: 5, completed: false },
    { id: 5, title: "Turn off lights", points: 8, completed: false },
    { id: 6, title: "Avoid single-use straws", points: 12, completed: false },
    { id: 7, title: "Compost food scraps", points: 18, completed: false },
    { id: 8, title: "Use public transport", points: 25, completed: false },
    { id: 9, title: "Buy eco-friendly products", points: 20, completed: false },
    { id: 10, title: "Participate in clean-up", points: 30, completed: false },
  ]);

  const completeMission = (id) => {
    setMissions((prev) =>
      prev.map((mission) =>
        mission.id === id ? { ...mission, completed: true } : mission
      )
    );
  };

  return (
    <MissionsContext.Provider value={{ missions, completeMission }}>
      {children}
    </MissionsContext.Provider>
  );
};

export const useMissions = () => useContext(MissionsContext);
