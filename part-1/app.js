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

const movieModal = document.getElementById("movieModal");
const modalCloseButton = document.getElementById("modalCloseButton");

const modalTitle = document.getElementById("modalTitle");
const modalPoster = document.getElementById("modalPoster");
const modalHeroBg = document.getElementById("modalHeroBg");
const modalRating = document.getElementById("modalRating");
const modalRuntime = document.getElementById("modalRuntime");
const modalReleaseDate = document.getElementById("modalReleaseDate");
const modalGenres = document.getElementById("modalGenres");
const modalOverview = document.getElementById("modalOverview");

let lastSearchQuery = "";
let searchController;

// =========================================================
//    Show Loading State with Spinner and Skeleton Cards
// =========================================================
function showLoadingState() {
    showSearchSpinner();
    renderSkeletonCards();
}
// =====================================
//          Hide Loading State 
// =====================================
function hideLoadingState() {
    hideSearchSpinner();
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
//          Show Search Spinner 
// =====================================
function showSearchSpinner(query) {
    spinner.style.display = "block";
}
// =====================================
//          Hide Search Spinner 
// =====================================
function hideSearchSpinner() {
    spinner.style.display = "none";
}
// ============================================================
//    Generic Fetch Function (from TMDB) with Error Handling
// ============================================================
async function fetchFromTMDB(endpoint, controller = null) {
    const separator = endpoint.includes("?") ? "&" : "?";
    const response = await fetch(
        `${BASE_URL}${endpoint}${separator}api_key=${TMDB_API_KEY}`,
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
// =====================================
// Fetch Popular Movies from TMDB API
// =====================================
async function fetchPopularMovies() {       
    try{
        renderSkeletonCards();
        const data = await fetchFromTMDB("/movie/popular");
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
        const data = await fetchFromTMDB("/genre/movie/list");
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
        movieCard.addEventListener("click", () => {
            openMovieModal(movie.id);
        });
        movieCard.addEventListener("keydown", (event) => {
           if (event.key ==="Enter" || event.key === " ") {
                event.preventDefault();
               openMovieModal(movie.id);
           }
       });

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
//          Open Movie Modal
// =====================================
async function openMovieModal(movieId) {
    try {
        document.body.style.overflow = "hidden";
        const movie = await fetchFromTMDB(`/movie/${movieId}`);

        populateMovieModal(movie);
        movieModal.showModal();

    } catch (error) {
        console.error("Modal fetch error:", error);
        errorMessage.textContent = "Failed to load movie details";
    }
}
// =====================================
//          Populate Movie Modal
// =====================================
function populateMovieModal(movie) {
    modalTitle.textContent = movie.title;
    modalPoster.src = movie.poster_path
           ?  `${IMAGE_BASE_URL}${movie.poster_path}`
           : "https://placehold.co/500x750/111827/9ca3af?text=Poster+Unavailable";
      
    modalPoster.alt = movie.title;

    modalHeroBg.style.backgroundImage = `
        linear-gradient(
            to top,
            rgba(15,23,42,0.9),
            rgba(15,23,42,0.3)
        ),
        url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
    `;
    modalRating.textContent = movie.vote_average.toFixed(1);
      
    modalRuntime.innerHTML = `
        <i data-lucide="clock"></i>
        ${movie.runtime || "--"} min
    `;
       
    modalReleaseDate.innerHTML = `
        <i data-lucide="calendar"></i>
        ${movie.release_date || "N/A"}
    `;

    modalOverview.textContent = movie.overview || "No overview availabile";

    modalGenres.innerHTML = "";
    movie.genres.forEach((genre) => {
        const genreBadge = document.createElement("span");
        genreBadge.classList.add("modal-genre-badge");
        genreBadge.textContent = genre.name;
        modalGenres.appendChild(genreBadge);
    });

    lucide.createIcons();
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

// Listen for input events on the search box
searchInput.addEventListener("input", debouncedSearch);

// Allow immediate search on Enter key press
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch(event); // Execute search immediately
    }
});
// Clear search and show popular movies when clear button is clicked
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
    const currentQuery = query.toLowerCase();
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
    if (searchController) {
        searchController.abort();
    }
    // Create new AbortController for the current search
    searchController = new AbortController();

    try {
        showSearchSpinner();
        // Show searching status
        searchStatus.textContent = `Searching for "${query}"...`;
        const data = await fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}`, 
            searchController
        );

        if (currentQuery !== searchInput.value.trim().toLowerCase()) {
            return;
        }
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
        hideSearchSpinner();
    }
}
// =====================================
//            Close Modal
// =====================================
function closeMovieModal() {
    movieModal.close();
    document.body.style.overflow = "auto";
}
// Close Button Interaction
modalCloseButton.addEventListener("click", closeMovieModal);

//ESC Key Interaction
movieModal.addEventListener("cancel", () => {
    document.body.style.overflow = "auto";
});
// Click Outside Modal Interaction
movieModal.addEventListener("click", (event) => {
    const dialogDimensions = movieModal.getBoundingClientRect();

    const clickedOutside = 
        event.clientX < dialogDimensions.left ||
        event.clientX > dialogDimensions.right ||
        event.clientY < dialogDimensions.top ||
        event.clientY > dialogDimensions.bottom;
    
    if(clickedOutside) {
        closeMovieModal();
    }
});

// Initial fetch of popular movies when the page loads          
fetchPopularMovies();
fetchGenres();
lucide.createIcons();