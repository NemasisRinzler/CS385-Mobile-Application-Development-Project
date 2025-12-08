import React from "react";

export default function MissionCard({ mission, completed, onComplete }) {
  // mission: { id, title, description, points }
  return (
    <article
      role="article"
      aria-labelledby={`mission-title-${mission.id}`}
      className={`relative overflow-hidden rounded-xl p-4 sm:p-5 transition-transform duration-300 transform bg-white dark:bg-gray-800
        hover:-translate-y-1 hover:shadow-2xl focus-within:shadow-2xl`}
    >
      {/* left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-greenbrand-500 to-greenbrand-700 rounded-tr-xl rounded-br-xl pointer-events-none" />

      <div className="relative flex items-center gap-4">
        {/* points circle */}
        <div className="flex-shrink-0">
          <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-lg
            ${completed ? 'bg-gradient-to-br from-greenbrand-700 to-greenbrand-500' : 'bg-gradient-to-br from-greenbrand-500 to-greenbrand-700'} shadow`}
          >
            {mission.points}
          </div>
        </div>

        {/* content */}
        <div className="min-w-0 flex-1">
          <h3 id={`mission-title-${mission.id}`} className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
            {mission.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
            {mission.description}
          </p>

          <div className="mt-3 flex items-center gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-90">
                <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {mission.points} XP
            </span>

            <span className="text-muted text-gray-400 dark:text-gray-400">• Estimated time: {mission.estimated || '5m'}</span>
          </div>
        </div>

        {/* controls */}
        <div className="flex flex-col items-end gap-3">
          {completed ? (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
                </svg>
                Completed
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-300">+{mission.points} XP</span>
            </div>
          ) : (
            <div className="flex flex-col items-end">
              <button
                onClick={() => onComplete && onComplete(mission.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-greenbrand-500 to-greenbrand-700 text-white text-sm font-semibold shadow-md hover:scale-[1.02] active:scale-100 transition-transform focus:outline-none focus:ring-2 focus:ring-greenbrand-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Complete
              </button>
              <span className="mt-1 text-xs text-gray-400">+{mission.points} XP</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}