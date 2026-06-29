import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/tmdb";

export function useMovies() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMovies() {
            try {
                setLoading(true);
                setError("");
                const data = await getPopularMovies(page);
                setMovies(prev => {
                    const combinedMovies = [
                        ...prev,
                        ...data.results
                    ];
                    return Array.from(
                        new Map(
                            combinedMovies.map(movie => [
                                movie.id, movie
                            ])
                        ).values()
                    );
                });
            }
            catch (error) {
                console.error(error);
                setError(error.message || "Failed to load movies. Please try again later.");
            }
            finally {
                setLoading(false);
            }
        }
        loadMovies();
    }, [page]);
    
    function loadMore() {
        if (!loading) {
            setPage(prev => prev + 1);
        }
    }
    
    return {
        movies, loading, error, loadMore
    };
}