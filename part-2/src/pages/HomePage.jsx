import {useEffect, useState} from "react";
import { getPopularMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard/MovieCard";

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMovies() {
            try {
                const data = await getPopularMovies();
                setMovies(data.results);
            }
            catch (error) {
                console.error(error);
                setError(error.message || "Failed to load movies. Please try again later.");
            }
            finally {
                setLoading(false);
            }
        }
        loadMovies();
    }, []);

    return (
        <div>
            <h1>Popular Movies</h1>

            {loading && <p>Loading movies...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            {!loading && !error && 
                movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))
            }
        </div>
    );
}

export default HomePage;