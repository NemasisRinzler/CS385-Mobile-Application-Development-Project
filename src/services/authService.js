import { supabase } from '../config/supabase';

export async function login(username, password) {
  try {
    // Supabase uses email, so we'll use username@ecoquest.app format
    const email = `${username}@ecoquest.app`;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Get user profile
    const { data: profile } = await supabase
      .from('users')
      .select('username')
      .eq('id', data.user.id)
      .single();

    return {
      token: data.session.access_token,
      user: {
        username: profile?.username || username,
        id: data.user.id,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

export async function register(username, password) {
  try {
    const email = `${username}@ecoquest.app`;

    // Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Create user profile
    await supabase
      .from('users')
      .insert([{ id: data.user.id, username }]);

    // Initialize user progress
    await supabase
      .from('user_progress')
      .insert([{ user_id: data.user.id, xp: 0, completed: [] }]);

    return {
      token: data.session.access_token,
      user: {
        username,
        id: data.user.id,
      },
    };
  } catch (error) {
    console.error('Register error:', error);
    return null;
  }
}

export async function logout() {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data: profile } = await supabase
      .from('users')
      .select('username')
      .eq('id', user.id)
      .single();

    return {
      username: profile?.username,
      id: user.id,
    };
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}