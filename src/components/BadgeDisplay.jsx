/*
Thank you Chris for this magnificient little bugger
*/

const badges = [
  { name: "Gold", min: 101, emoji: "🏆", label: "Sustainability Champion" },
  { name: "Silver", min: 51, emoji: "🌿", label: "Green Guardian" },
  { name: "Bronze", min: 0, emoji: "🌱", label: "Beginner Eco Hero" },
];

export default function BadgeDisplay({ xp }) {
  // find the highest badge that fits current XP
  const badge = badges.find((b) => xp >= b.min);

  return (
    <div className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg shadow-md w-full sm:w-auto">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-greenbrand-500 to-greenbrand-700 flex items-center justify-center text-2xl text-white shadow">
        {badge.emoji}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-gray-500">Badge</div>
        <div className="text-sm font-semibold text-gray-900 truncate">{badge.label}</div>
      </div>
    </div>
  );
}
