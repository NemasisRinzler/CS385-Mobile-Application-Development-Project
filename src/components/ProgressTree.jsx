export default function ProgressTree({ xp }) {
  let stage = "seedling";

  if (xp >= 101) stage = "tree";
  else if (xp >= 51) stage = "sapling";

  const emoji = { seedling: "🌱", sapling: "🌿", tree: "🌳" }[stage];
  const text = {
    seedling: "Keep going — your tree is sprouting!",
    sapling: "Nice! Your tree is growing!",
    tree: "Amazing! Your tree is flourishing!",
  }[stage];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center gap-3 w-full sm:w-56">
      <div className="text-6xl">{emoji}</div>
      <div className="text-sm text-gray-600 text-center">{text}</div>
      <div className="w-full mt-1 progress-track">
        <div className="progress-fill" style={{ width: `${Math.min(100, (xp % 50) / 50 * 100)}%` }} />
      </div>
    </div>
  );
}
