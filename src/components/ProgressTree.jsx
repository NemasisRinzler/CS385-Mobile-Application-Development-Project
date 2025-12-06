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
    <div className="p-4 bg-white rounded-lg shadow flex flex-col items-center gap-2">
      <div className="text-6xl">{emoji}</div>
      <div className="text-sm text-gray-600 text-center">{text}</div>
    </div>
  );
}
