import { useEffect, useState } from "react";
import { searchMovies } from "../services/tmdb";

export function useMovieSearch(query) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!query.trim()) {
            setMovies([]);
            setError("");
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        
        async function loadResults() {
            try {
                setLoading(true);
                setError("");

                const data = await searchMovies(query, controller);

                setMovies(data.results);
            }
            catch (error) {
                if (
                    error.name === "AbortError"
                ) {
                    return;
                }
                setError(error.message || "An error occurred while searching for movies.");

            }
            finally {
                if (
                    !controller.signal.aborted  
                ) {
                    setLoading(false);
                }
            }
        }

        loadResults();
        return () => {
            controller.abort();
        };

    }, [query]);

  return {
    movies, loading, error
  };
}