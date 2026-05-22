const BASE_URL="https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const moviesGrid = document.getElementById("moviesGrid");

// Fetch Popular Movies from TMDB API
async function fetchPopularMovies() {       
    try{
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${CONFIG.TMDB_API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.results);
    }
    catch (error){
        console.error("Error fetching movies:", error);
    }
}

// Initial fetch of popular movies when the page loads          
fetchPopularMovies();