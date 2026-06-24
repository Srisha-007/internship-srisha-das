import { useEffect, useState } from "react";
import { getMoviesByPerson } from "../services/tmdb";

export function usePersonMovies(personId) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    useEffect(() => {
        if (!personId) {
            setMovies([]);
            return;
        }

        async function loadMovies() {
            try {
                setLoading(true);
                setError("");
                const data = await getMoviesByPerson(personId);

                const uniqueMovies = Array.from(
                    new Map(
                        data.cast.map(movie => [
                            movie.id,
                            movie
                        ])                    
                    ).values()
                );

                uniqueMovies.sort((a, b) => b.popularity - a.popularity);

                setMovies(uniqueMovies);
            }
            catch (error) {
                setError(error.message || "Failed to load actor movies.");
            }
            finally {
                setLoading(false);
            }
        }
        
        loadMovies();
    }, [personId]);

    return {
        movies, loading, error
    };
}