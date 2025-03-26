import { createClient } from "@supabase/supabase-js";
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig.extra.supabaseUrl;
const supabaseKey = Constants.expoConfig.extra.supabaseKey;

export const supabase = createClient(supabaseUrl, supabaseKey);

// New user registration
export const signUp = async (name, email, password) => {
    const { user, error } = await supabase.auth.signUp({
      name,
      email,
      password,
    });
  
    if (error) throw error;
    return user;
  };
  
// Sign in user
  export const signIn = async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) throw error;
    return user;
  };
  
// Sign out user
  export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };
