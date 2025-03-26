import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../services/supabase.js';
import { useRouter } from 'expo-router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes in authentication
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'SIGNED_IN') {
        router.replace('/movies'); // If the user is logged in, redirect to the movies page
      } else if (event === 'SIGNED_OUT') {
        router.replace('/login'); // If the user is logged out, redirect to the login page
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);