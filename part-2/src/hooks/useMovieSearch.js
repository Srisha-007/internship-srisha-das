import { useEffect, useState } from "react";
import { searchMovies } from "../services/tmdb";

export function useMovieSearch(query) {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setMovies([]);
        setPage(1);
    }, [query]);

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

                const data = await searchMovies(query, page, controller);

                setMovies(prev => {
                    const combined = [
                        ...prev,
                        ...data.results
                    ];
                    return Array.from(
                        new Map(
                            combined.map(movie => [
                                movie.id, movie
                            ])
                        ).values()
                    );
                });          
            }
            catch (error) {
                if (error.name === "AbortError") {
                    return;
                }
                setError(error.message || "An error occurred while searching for movies.");
            }
            finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadResults();
        return () => {
            controller.abort();
        };

    }, [query, page]);

    function loadMore() {
        if (!loading) {
            setPage(prev => prev + 1);
        }
    }
    return {
        movies, loading, error, loadMore
    };
}