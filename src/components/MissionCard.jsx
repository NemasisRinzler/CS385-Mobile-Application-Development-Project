export default function MissionCard({ mission, completed, onComplete }) {
  return (
    <div className="p-4 rounded-lg shadow bg-white flex justify-between items-center">
      <div>
        <div className="font-medium">{mission.title}</div>
        <div className="text-xs text-gray-500">
          {mission.category} • {mission.points} XP
        </div>
      </div>
      <div>
        {completed ? (
          <button
            className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm"
            disabled
          >
            ✓ Completed
          </button>
        ) : (
          <button
            onClick={() => onComplete(mission.id)}
            className="px-3 py-1 rounded-full bg-green-600 text-white text-sm hover:bg-green-700"
          >
            Complete
          </button>
        )}
      </div>
      &nbsp;
    </div>
  );
}
