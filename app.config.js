import * as dotenv from 'dotenv';
dotenv.config();

export default {
  expo: {
    extra: {
      tmdbApiKey: process.env.TMDB_API_KEY,
      tmdbApiUrl: process.env.TMDB_API_URL,

      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
};
