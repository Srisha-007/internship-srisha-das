import {useEffect, useState} from "react";
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
                const data = await getPopularMovies(page);
                setMovies(prev => [
                    ...prev,
                    ...data.results
                ]);
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

    return {
        movies, loading, error, loadMore: () => setPage(prev => prev + 1)
    };
}