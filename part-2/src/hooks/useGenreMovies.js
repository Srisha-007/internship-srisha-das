import { useEffect, useState } from "react";
import { getMoviesByGenre } from "../services/tmdb";

const genreCache = {};

export function useGenreMovies(selectedGenres) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (selectedGenres.length === 0) {
            setMovies([]);
            return;
        }
        const cacheKey = selectedGenres.slice().sort().join(",");

        if (genreCache[cacheKey]) {
            setError("");
            setLoading(false)
            setMovies(genreCache[cacheKey]);
            return;
        }

        async function loadMovies() {
            try {
                setLoading(true);
                setError("");

                const data = await getMoviesByGenre(cacheKey);
                genreCache[cacheKey] = data.results;
                setMovies(data.results);

            } catch (error) {
                setError(error.message || "Failed to load movies.");

            } finally {
                setLoading(false);
            }
        }

        loadMovies();
    }, [selectedGenres]);

    return {
        movies, loading, error,
    };
}