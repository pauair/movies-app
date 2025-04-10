import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../services/supabase.js';
import { useRouter } from 'expo-router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Get the current session when the app loads
        const fetchSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setSession(session);
        };

        fetchSession();

        // Listen for changes in authentication
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setSession(session);
                if (event === 'SIGNED_IN' && session?.user) {
                    router.replace('/movies');
                } else if (event === 'SIGNED_OUT') {
                    router.replace('/login');
                }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [router]);

    return (
        <AuthContext.Provider value={{ session, setSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
