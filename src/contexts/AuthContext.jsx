import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('username')
          .eq('id', session.user.id)
          .single();
        
        setUser({
          id: session.user.id,
          username: profile?.username,
        });

        const { data: progress } = await supabase
          .from('user_progress')
          .select('xp, completed')
          .eq('user_id', session.user.id)
          .single();
        
        if (progress) {
          setXp(progress.xp || 0);
        }
      }
      
      setLoading(false);
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('username')
          .eq('id', session.user.id)
          .single();
        
        setUser({
          id: session.user.id,
          username: profile?.username,
        });

        const { data: progress } = await supabase
          .from('user_progress')
          .select('xp')
          .eq('user_id', session.user.id)
          .single();
        
        if (progress) {
          setXp(progress.xp || 0);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setXp(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Real-time XP updates across tabs
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('user_progress_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_progress',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setXp(payload.new.xp);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const value = {
    user,
    setUser,
    xp,
    setXp,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}