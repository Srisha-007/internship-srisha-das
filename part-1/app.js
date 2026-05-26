const BASE_URL="https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const moviesGrid = document.getElementById("moviesGrid");
const spinner = document.getElementById("searchSpinner");
const searchInput = document.getElementById("searchInput");
const genreFilters = document.querySelector(".genre-filters");
const errorMessage = document.getElementById("errorMessage");
const searchStatus = document.getElementById("searchStatus");

// =====================================
//    Skeleton Loader for Movie Cards
// =====================================
function renderSkeletonCards() {
    moviesGrid.innerHTML = "";
    for (let i = 0; i < 8; i++) {
        const skeletonCard = document.createElement("div");
        skeletonCard.classList.add("skeleton-card");
        skeletonCard.innerHTML = `
            <div class="skeleton-poster shimmer"></div>
            <div class="skeleton-info">
                <div class="skeleton-title shimmer"></div>
                <div class="skeleton-meta shimmer"></div>
            </div>
        `;
        moviesGrid.appendChild(skeletonCard);
    }
}

// =====================================
// Fetch Popular Movies from TMDB API
// =====================================
async function fetchPopularMovies() {       
    try{
        renderSkeletonCards();
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
}
// =====================================
//      Fetch Genres from TMDB API
// =====================================
async function fetchGenres() {
    try{
        const response = await fetch(
            `${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch genres.");
        }
        const data = await response.json();
        renderGenres(data.genres);
    } catch (error){
        console.error("Genre fetch error:", error);
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
                No movies found for you search.
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
                    src="${
                        movie.poster_path 
                            ? IMAGE_BASE_URL + movie.poster_path 
                            : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWUlMjBiYW5uZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                    }"
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
//           Render Genres 
// ===================================
function renderGenres(genres) {
    genreFilters.innerHTML = ""
    // Create "All" button
    const allButton = document.createElement("button");
    allButton.classList.add("genre-btn", "active");
    allButton.textContent = "All";

    genreFilters.appendChild(allButton);
        
    // Loop through API genres array
    genres.forEach((genre) => {
        const genreButton = document.createElement("button");
        genreButton.classList.add("genre-btn");
        genreButton.textContent = genre.name;
        genreFilters.appendChild(genreButton);
    });
}
// ===================================
//           Set Hero Banner 
// ===================================
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
    errorMessage.textContent = "";
    if (query === "") {
        searchStatus.textContent = "";
        fetchPopularMovies();
        return;
    }

    try {
        spinner.style.display = "block";
        searchStatus.textContent = `Searching for "${query}"...`;
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
        renderMovies(data.results);
        searchStatus.textContent = `${data.results.length} result(s) found`;

    } catch (error) {
        console.error("Search error:", error);
        errorMessage.textContent = error.message || "An error occurred while searching. Please try again.";
        searchStatus.textContent = "";
    } finally {
        spinner.style.display = "none";
    }
}


// Initial fetch of popular movies when the page loads          
fetchPopularMovies();
fetchGenres();