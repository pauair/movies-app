const API_KEY = 'e8522519a31b32ec64f297b8c6f0fb76';
const BASE_URL = 'https://api.themoviedb.org/3';

const headers = {
  accept: 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODUyMjUxOWEzMWIzMmVjNjRmMjk3YjhjNmYwZmI3NiIsIm5iZiI6MTcyMTcwMDAwOS43OTg5NzYsInN1YiI6IjY2OWYwZDZmZTdlODY2ODQyMjEwMzkyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MYAarDdn02Zh3laap6IBIF4CXWZRf9dbybD-CJs5-QM'
};

export const fetchAllMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week?language=en-US?api_key=${API_KEY}`, { headers });
    const data = await response.json();
    console.log('All Movies Response:', data);
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const searchMovieByName = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`, { headers });
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const searchMovieById = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`, { headers });
    const data = await response.json();
    console.log(response);
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const fetchWatchProviders = async (movieId) => {
    try {
      const response = await fetch(`${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`, { headers });
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching watch providers:', error);
      return {};
    }
  };