import { useEffect, useState } from "react";
import { searchMovies } from "../services/tmdb";

export function useMovieSearch(query) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!query.trim()) {
            return;
        }

        async function loadResults() {
            try {
                setLoading(true);
                setError("");

                const data = await searchMovies(query);

                setMovies(data.results);
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        }

        loadResults();

    }, [query]);

  return {
    movies, loading, error
  };
}