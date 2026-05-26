const BASE_URL="https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const sectionTitle = document.getElementById("sectionTitle");
const moviesGrid = document.getElementById("moviesGrid");
const clearSearchButton = document.getElementById("clearSearchButton");
const spinner = document.getElementById("searchSpinner");
const searchInput = document.getElementById("searchInput");
const genreFilters = document.querySelector(".genre-filters");
const errorMessage = document.getElementById("errorMessage");
const searchStatus = document.getElementById("searchStatus");

let lastSearchQuery = "";
let seachController;

// =========================================================
//    Show Loading State with Spinner and Skeleton Cards
// =========================================================
function showLoadingState() {
    spinner.style.display = "block";
    renderSkeletonCards();
}
// =====================================
//          Hide Loading State 
// =====================================
function hideLoadingState() {
    spinner.style.display = "none";
}

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
            <div class="empty-state">
                <i data-lucide="film"></i>
                <h3>No Movies Found</h3>
                <p> We couldn't find any movies matching your search.</p>
                <p>Try searching for another title.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    movies.forEach((movie) => {
        const movieCard = document.createElement("article");
        movieCard.classList.add("movie-card");
        movieCard.setAttribute("tabindex", "0");
        movieCard.innerHTML = `
            <div class="card-poster-container">
                <img
                    class="card-poster"
                    src="${
                        movie.poster_path 
                            ? IMAGE_BASE_URL + movie.poster_path 
                            : "https://placehold.co/500x750/111827/9ca3af?text=Poster+Unavailable"
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
clearSearchButton.addEventListener("click", () => {
    searchInput.value = "";
    clearSearchButton.style.display = "none";
    
    lastSearchQuery = "";
    
    errorMessage.textContent = "";
    searchStatus.textContent = "";
    
    sectionTitle.textContent = "Popular Movies";
    fetchPopularMovies();
    searchInput.focus();
});

async function handleSearch(event) {
    const query = event.target.value.trim();
    clearSearchButton.style.display = query ? "flex" : "none";

    // Prevent duplicate searches for the same query
    if (query === lastSearchQuery) {
        return;
    }
    lastSearchQuery = query;

    //Clear previous error messages
    errorMessage.textContent = "";
    // If search box is empty, show popular movies again
    if (query === "") {
        sectionTitle.textContent = "Popular Movies";
        searchStatus.textContent = "";
        fetchPopularMovies();
        return;
    }
    // Cancel previous request if it's still pending
    if (seachController) {
        seachController.abort();
    }
    // Create new AbortController for the current search
    seachController = new AbortController();

    try {
        spinner.style.display = "block";
        // Show searching status
        searchStatus.textContent = `Searching for "${query}"...`;
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`,{
                signal: seachController.signal
            }
        );
        // Handle rate limiting (HTTP 429)
        if (response.status === 429) {
            throw new Error("Too many requests. Please wait a moment and try again.");
        }
        // Handle other HTTP errors   
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        renderMovies(data.results);
        sectionTitle.textContent = `Search Results for "${query}"`;
        searchStatus.textContent = `${data.results.length} result(s) found`;

    } catch (error) {
        // Ignore aborted requests
        if (error.name === "AbortError") {
            return;
        }
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
lucide.createIcons();