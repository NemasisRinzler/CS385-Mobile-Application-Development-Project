const badges = [
  { name: "Gold", min: 101, emoji: "🏆", label: "Sustainability Champion" },
  { name: "Silver", min: 51, emoji: "🌿", label: "Green Guardian" },
  { name: "Bronze", min: 0, emoji: "🌱", label: "Beginner Eco Hero" },
];

export default function badgeDisplay({ xp }) {
  // find the highest badge that fits current XP
  const badge = badges.find((b) => xp >= b.min);

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow">
      <div className="text-4xl">{badge.emoji}</div>
      <div>
        <div className="text-sm text-gray-500">Badge</div>
        <div className="font-semibold">{badge.label}</div>
        <div className="text-xs text-gray-400">XP: {xp}</div>
      </div>
    </div>
  );
}
