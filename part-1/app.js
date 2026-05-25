const BASE_URL="https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const moviesGrid = document.getElementById("moviesGrid");
const spinner = document.getElementById("searchSpinner");
const searchInput = document.getElementById("searchInput");
const errorMessage = document.getElementById("errorMessage");

// =====================================
// Fetch Popular Movies from TMDB API
// =====================================
async function fetchPopularMovies() {       
    try{
        spinner.style.display = "block";
        const response = await fetch(
            `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
        );
        if (response.status === 429) {
            throw new Error("Too many requests. Please wait a moment and try again.");
        }   
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        errorMessage.textContent = "";
        renderMovies(data.results);
        setHeroBanner(data.results[0]);
    }
    catch (error){
        console.error("Error fetching movies:", error);
        errorMessage.textContent = error.message;
    }
    finally{
        spinner.style.display = "none";
    }
}

// =====================================
//           Render Movies
// =====================================
function renderMovies(movies) {
    moviesGrid.innerHTML = "";

    if(movies.length === 0){
        moviesGrid.innerHTML = `
            <p class="empty-state">
                No movies found.
            </p>
        `;
        return;
    }
    movies.forEach((movie) => {
        const movieCard = document.createElement("article");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <div class="card-poster-container">
                <img
                    class="card-poster"
                    src="${IMAGE_BASE_URL + movie.poster_path}"
                    alt="${movie.title}"
                >

                <div class="card-rating-badge">
                    ${movie.vote_average.toFixed(1)}
                </div>
            </div>

            <div class="card-info">
                <h3 class="card-title">
                    ${movie.title}
                </h3>

                <div class="card-metadata">
                    <span>
                        ${movie.release_date?.split("-")[0] || "N/A"}
                    </span>
                    <span>
                        Popular
                    </span>
                </div>
            </div>
            `;
            moviesGrid.appendChild(movieCard);
    });
    lucide.createIcons();
}
// ===================================
//           Set Hero Banner 
// =====================================
function setHeroBanner(movie) {
    const heroTitle = document.getElementById("heroTitle");
    const heroMeta = document.getElementById("heroMeta");
    const heroDescription = document.getElementById("heroDescription");

    heroTitle.textContent = movie.title;

    heroMeta.textContent =
        `${movie.release_date} • ${movie.vote_average.toFixed(1)}`;

    heroDescription.textContent = movie.overview;

    document.querySelector(".hero-section").style.backgroundImage = `

        linear-gradient(
            to right,
            rgba(15,23,42,0.95) 40%,
            rgba(15,23,42,0.6)
        ),
        url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
    `;
}
// =====================================
//    Search Input Debounce Function
// =====================================
function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
// =====================================
//           Search Movies
// =====================================
const debouncedSearch = debounce(handleSearch, 500);
searchInput.addEventListener("input", debouncedSearch);

async function handleSearch(event) {
    const query = event.target.value.trim();

    if (query === "") {
        fetchPopularMovies();
        return;
    }

    try {
        spinner.style.display = "block";
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
        );
        if (response.status === 429) {
            throw new Error("Too many requests. Please wait a moment and try again.");
        }   
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        errorMessage.textContent = "";
        renderMovies(data.results);

    } catch (error) {
        console.error("Search error:", error);
        errorMessage.textContent = error.message || "An error occurred while searching. Please try again.";
    } finally {
        spinner.style.display = "none";
    }
}
// Initial fetch of popular movies when the page loads          
fetchPopularMovies();