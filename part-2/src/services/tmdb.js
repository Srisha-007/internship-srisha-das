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
export async function getPopularMovies(page = 1) {
    return getFromTMDB(`/movie/popular?page=${page}`);
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
//             Fetch Movies by Genres 
// ============================================
export async function getMoviesByGenre(genreIds, page = 1) {
    const genreQuery = Array.isArray(genreIds)
        ? genreIds.join(",")
        : genreIds;
    return getFromTMDB(`/discover/movie?with_genres=${genreQuery}&page=${page}`);
}

// ============================================
//      Fetch Movie Details using movieId
// ============================================
export async function getMovieDetails(movieId) {
    return getFromTMDB(`/movie/${movieId}`);
}

// ============================================
//      Fetch Movie Credits using movieId
// ============================================
export async function getMovieCredits(movieId) {
    return getFromTMDB(`/movie/${movieId}/credits`);
}

// ============================================
//                Search Movies
// ============================================
export async function searchMovies(query, page = 1, controller = null){
    return getFromTMDB(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`, controller);
}

// ============================================
//      Get Similar Movie Recommendations
// ============================================
export async function getMovieRecommendations(movieId) {
    return getFromTMDB(`/movie/${movieId}/recommendations`);
}

// ============================================
//            Get Movies By Person
// ============================================
export async function getMoviesByPerson(personId) {
    return getFromTMDB(`/person/${personId}/movie_credits`);
}

// ============================================
//               Get Movie Videos
// ============================================
export async function getMovieVideos(movieId) {
    return getFromTMDB(`/movie/${movieId}/videos`);
}

// ============================================
//            Create a Guest Session
// ============================================
export async function createGuestSession() {
    return getFromTMDB("/authentication/guest_session/new");
}

// ============================================
//              Add Movie Ratings
// ============================================
export async function addMovieRating(movieId, rating, guestSessionId) {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}/rating?guest_session_id=${guestSessionId}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                value: rating
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to submit rating.");
    }

    return response.json();
}