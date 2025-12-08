import { supabase } from '../config/supabase';

let missionsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getAllMissions(forceRefresh = false) {
  const now = Date.now();
  
  // Return cached missions if valid
  if (!forceRefresh && missionsCache && cacheTimestamp && (now - cacheTimestamp < CACHE_DURATION)) {
    return missionsCache;
  }

  try {
    const { data, error } = await supabase
      .from('missions')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    missionsCache = data || [];
    cacheTimestamp = now;
    
    return missionsCache;
  } catch (error) {
    console.error('Get missions error:', error);
    return missionsCache || []; // Return cached data if fetch fails
  }
}