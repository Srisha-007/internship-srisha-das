import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard/MovieCard";

 function HomePage() {
    const { movies, loading, error } = useMovies();

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