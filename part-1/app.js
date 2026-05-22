const BASE_URL="https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const moviesGrid = document.getElementById("moviesGrid");

// Fetch Popular Movies from TMDB API
async function fetchPopularMovies() {       
    try{
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`);
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
// Render movies in the grid
function renderMovies(movies) {
    moviesGrid.innerHTML = ""; // Clear existing movies
    if (movies.length==0){
        moviesGrid.innerHTML = `
        <p class="empty-state">No movies found.</p>`;
        return;
    }
    movies.forEach((movie) => {
        const movieCard = document.createElement("article");
        movieCard.classList.add("movie-card");
        movieCard.dataset.movieId = movie.id;
    });
}

// Hero Banner
function setHeroBanner(movie) {
    const heroTitle = document.getElementById("heroTitle");
    const heroMeta = document.getElementById("heroMeta");
    const heroDescription = document.getElementById("heroDescription");

    heroTitle.textContent = movie.title;
    heroMeta.textContent = `${new Date(movie.release_date).getFullYear()} | ${movie.genre_ids.join(", ")} | ${movie.vote_average}`;
    heroDescription.textContent = movie.overview;

    document.querySelector(".hero-section").style.backgroundImage = `
        linear-gradient(
            to right,
            rgba(15, 23, 42, 0.95) 40%,
            rgba(15, 23, 42, 0.6)
        ),
        url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
    `;
}

// Initial fetch of popular movies when the page loads          
fetchPopularMovies();