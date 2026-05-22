const BASE_URL="https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const moviesGrid = document.getElementById("moviesGrid");
const spinner = document.getElementById("searchSpinner");
// =====================================
// Fetch Popular Movies from TMDB API
// =====================================
async function fetchPopularMovies() {       
    try{
        spinner.style.display = "block";
        const response = await fetch(
            `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        renderMovies(data.results);
        setHeroBanner(data.results[0]);
    }
    catch (error){
        console.error("Error fetching movies:", error);
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

    movies.forEach((movie) => {
        const movieCard = document.createElement("article");
        movieCard.classList.add("movie-card");
        moviesGrid.innerHTML = `
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
}
// =====================================
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
// Initial fetch of popular movies when the page loads          
fetchPopularMovies();