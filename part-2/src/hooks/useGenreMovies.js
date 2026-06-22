import { useEffect, useState } from "react";
import { getMoviesByGenre } from "../services/tmdb";

const genreCache = {};

export function useGenreMovies(genreId) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!genreId) {
            setMovies([]);
            return;
        }
        if (genreCache[genreId]) {
            setError("");
            setLoading(false)
            setMovies(genreCache[genreId]);
            return;
        }

        async function loadMovies() {
            try {
                setLoading(true);
                setError("");

                const data = await getMoviesByGenre(genreId);
                genreCache[genreId] = data.results;
                setMovies(data.results);

            } catch (error) {
                setError(error.message || "Failed to load movies.");

            } finally {
                setLoading(false);
            }
        }

        loadMovies();
    }, [genreId]);

    return {
        movies, loading, error,
    };
}