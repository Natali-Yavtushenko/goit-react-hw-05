import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGY4ZWIxYWQ4MGQyNTdjZTUwMTU0M2YyMDQ0YzU0ZiIsIm5iZiI6MTczMTE0NjkzOS4wNTYsInN1YiI6IjY3MmYzNGJiYWJlOGEwZDk5NGEyMWMyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FLPuJoLaSNpaGMDNtuM3c78hv3dDd7MsSkOjaDG3I70";

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Fetch trending movies
export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    throw error;
  }
};

// Fetch movie details
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    throw error;
  }
};

// Fetch movie reviews
export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/reviews`,
      options
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error.message);
    throw error;
  }
};

export const fetchMovieCredits = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/credits`,
      options
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits:", error.message);
    throw error;
  }
};

// Search movies
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      headers: options.headers,
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error.message);
    throw error;
  }
};
