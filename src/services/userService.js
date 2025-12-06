/*
Oh god this one is brutal man.
Anyways I guess this is for fetching and uploading users progress data (xp and completed missions)

Go check out storage.js to see next notes
*/

import { supabase } from '../config/supabase';

export async function getProgress() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('user_progress')
      .select('xp, completed')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;

    return {
      completed: data.completed || [],
      xp: data.xp || 0,
    };
  } catch (error) {
    console.error('Get progress error:', error);
    return null;
  }
}

export async function saveProgress(progressData) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        xp: progressData.xp,
        completed: progressData.completed,
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;

    return progressData;
  } catch (error) {
    console.error('Save progress error:', error);
    return null;
  }
}

export async function getUserProfile() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: profile } = await supabase
      .from('users')
      .select('username')
      .eq('id', user.id)
      .single();

    const { data: progress } = await supabase
      .from('user_progress')
      .select('xp')
      .eq('user_id', user.id)
      .single();

    const xp = progress?.xp || 0;
    const level = Math.floor(xp / 1000) + 1;

    return {
      username: profile?.username,
      xp,
      level,
    };
  } catch (error) {
    console.error('Get profile error:', error);
    return null;
  }
}