import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/tmdb";

export function useTrendingMovie() {
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadTrendingMovie() {
            try {
                const data = await getTrendingMovies();

                const movie = data.results.find(
                    (movie) => movie.backdrop_path && movie.overview
                );
                // Fall to first movie if none match
                setFeaturedMovie(movie || data.results[0]);
            }
            catch (error) {
                setError(
                    error.message || "Failed to load trending movie."
                );
            }
            finally {
                setLoading(false);
            }
        }
        loadTrendingMovie();
    }, []);

    return {
        featuredMovie, loading, error
    };
}