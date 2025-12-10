import React from "react";

const BADGES = [
  {
    id: "first_mission",
    title: "First Mission",
    description: "Complete your first mission",
    xpRequired: 0,
  },
  {
    id: "green_guru",
    title: "Green Guru",
    description: "Reach 100 XP",
    xpRequired: 100,
  },
  {
    id: "eco_master",
    title: "Eco Master",
    description: "Reach 500 XP",
    xpRequired: 500,
  },
];

const BadgeDisplay = ({ xp, completedMissions }) => {
  const earnedBadges = BADGES.filter(
    (b) =>
      xp >= b.xpRequired ||
      (b.id === "first_mission" && completedMissions.length > 0)
  ).map((b) => b.id);

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {BADGES.map((badge) => (
        <div
          key={badge.id}
          className={`badge p-4 border border-cyan-400 rounded-lg w-32 text-center ${
            earnedBadges.includes(badge.id)
              ? "bg-gray-800 text-cyan-400 shadow-lg"
              : ""
          }`}
        >
          <h4 className="font-bold">{badge.title}</h4>
          <p className="text-sm">{badge.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BadgeDisplay;
