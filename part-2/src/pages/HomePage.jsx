import {useEffect, useState} from "react";
import { getPopularMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard/MovieCard";

function HomePage() {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        async function loadMovies() {
            try {
                const data = await getPopularMovies();
                setMovies(data.results);
            }
            catch (error) {
                console.error(error);
            }
        }
        loadMovies();
    }, []);

    return (
        <div>
            <h1>Popular Movies</h1>

            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}

export default HomePage;