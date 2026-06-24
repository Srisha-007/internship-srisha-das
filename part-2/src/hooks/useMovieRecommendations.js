import { useEffect, useState } from "react";
import { getMovieRecommendations } from "../services/tmdb";

export function useMovieRecommendations(movieId) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadRecommendations() {
            try {
                setLoading(true);
                const data = await getMovieRecommendations(movieId);
                setMovies(data.results.slice(0, 10));
            } 
            finally {
                setLoading(false);
            }
        }

        if (movieId) {
            loadRecommendations();
        }
    }, [movieId]);

    return { movies, loading };
}