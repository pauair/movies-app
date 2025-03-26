import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig.extra.tmdbApiKey;
const BASE_URL = Constants.expoConfig.extra.tmdbApiUrl;

const headers = {
    accept: 'application/json',
    Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODUyMjUxOWEzMWIzMmVjNjRmMjk3YjhjNmYwZmI3NiIsIm5iZiI6MTcyMTcwMDAwOS43OTg5NzYsInN1YiI6IjY2OWYwZDZmZTdlODY2ODQyMjEwMzkyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MYAarDdn02Zh3laap6IBIF4CXWZRf9dbybD-CJs5-QM',
};

export const fetchAllMovies = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/now_playing?language=en-US&api_key=${API_KEY}`,
            { headers }
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        console.log('API_KEY:', API_KEY);
        console.log('BASE_URL:', BASE_URL); 
        return [];
    }
};

export const searchMovieByName = async (query) => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/multi?query=${query}&api_key=${API_KEY}`,
            { headers }
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error searching movie:', error);
        return [];
    }
};

export const searchMovieById = async (movieId) => {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
            { headers }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching movie:', error);
        return [];
    }
};

export const fetchWatchProviders = async (movieId) => {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`,
            { headers }
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching watch providers:', error);
        return {};
    }
};

export const fetchMovieRecommendations = async (movieId) => {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`,
            { headers }
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return {};
    }
};
