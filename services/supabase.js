import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig.extra.supabaseUrl;
const supabaseKey = Constants.expoConfig.extra.supabaseKey;

export const supabase = createClient(supabaseUrl, supabaseKey);

// New user registration
export const signUp = async (display_name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { display_name },
        },
    });

    if (error) {
        console.error(error.message);
        return { success: false, message: error.message };
    }
    return { success: true, user: data.user };
};

// Sign in user
export const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error(error.message);
        return { success: false, message: error.message };
    }
    return { success: true, user: data.user };
};

// Sign out user
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};
