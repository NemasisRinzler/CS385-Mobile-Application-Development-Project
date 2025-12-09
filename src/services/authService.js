/* Notes for Chris:
Aight, idk what supabase is doing here. This is a new file I got off Claude Sonnet 4.5
This syntax is smelly, I know this page handles login, registration, logout by comparing inputs with
data from the "users" table on the Supabase database.

Go check out userService.js to see next notes
*/

import { supabase } from '../config/supabase';

export async function login(username, password) {
  try {
    /* "Supabase uses email, so we'll use username@ecoquest.app format" - Claude Sonnet 4.5
    For reference tho, I have turned off email verification on the supabase backend,
    this means we can get away with using usernames instead of emails for logins and
    registrations. Idk this code could probs be less specific to emails from the get go without
    tinkering with supabase settings but whatever. */
    const email = `${username}@ecoquest.app`;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('username')
      .eq('id', data.user.id)
      .single();

    // If no profile exists, create it
    if (profileError || !profile) {
      await supabase
        .from('users')
        .insert([{ id: data.user.id, username }]);
      
      // Also initialize progress if it doesn't exist
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('user_id')
        .eq('user_id', data.user.id)
        .single();
      
      if (!existingProgress) {
        await supabase
          .from('user_progress')
          .insert([{ user_id: data.user.id, xp: 0, completed: [] }]);
      }
    }

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