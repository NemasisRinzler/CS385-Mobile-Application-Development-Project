import { supabase } from '../config/supabase';

export async function getAllMissions() {
  try {
    const { data, error } = await supabase
      .from('missions')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Get missions error:', error);
    return [];
  }
}

export async function getMissionById(id) {
  try {
    const { data, error } = await supabase
      .from('missions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Get mission error:', error);
    return null;
  }
}