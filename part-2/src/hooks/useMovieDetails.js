import { useEffect, useState } from "react";
import { getMovieDetails, getMovieCredits } from "../services/tmdb";

export function useMovieDetails(movieId) {
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMovie() {
            try {
                setLoading(true);
                setError("");

                const [movieData, creditsData] =
                    await Promise.all([
                        getMovieDetails(movieId),
                        getMovieCredits(movieId),
                    ]);

                setMovie(movieData);
                setCast(creditsData.cast.slice(0, 6));
            } 
            catch (error) {
                setError(error.message || "Failed to load movie details.");
            } 
            finally {
                setLoading(false);
            }
        }

        if (movieId) {
            loadMovie();
        }
    }, [movieId]);

    return {
        movie,
        cast,
        loading,
        error,
    };
}