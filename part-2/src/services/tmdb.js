const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// ============================================================
//    Generic Fetch Function (from TMDB) with Error Handling
// ============================================================
async function getFromTMDB(endpoint, controller = null) {
    const separator = endpoint.includes("?") ? "&" : "?";
    const response = await fetch(
        `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`, 
        controller 
            ? { signal: controller.signal } 
            : {}
    );

    if (response.status === 429) {
        throw new Error("Too many requests. Please wait a moment and try again.");
    }
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
}

// ============================================
//      Fetch Popular Movies from TMDB API
// ============================================
export async function getPopularMovies() {
    return getFromTMDB("/movie/popular");
}

// ============================================
//      Fetch Trending Movies from TMDB API
// ============================================
export async function getTrendingMovies() {
    return getFromTMDB("/trending/movie/day");
}

// ============================================
//          Fetch Genres from TMDB API
// ============================================
export async function getGenres() {
    return getFromTMDB("/genre/movie/list");
}

// ============================================
//      Fetch Movie Details using movieId
// ============================================
export async function getMovieDetails(movieId) {
    return getFromTMDB(`/movie/${movieId}`);
}

// ============================================
//                Search Movies
// ============================================
export async function searchMovies(query, controller = null){
    return getFromTMDB(`/search/movie?query=${encodeURIComponent(query)}`, controller);
}
