import {useEffect, useState} from "react";
import { getPopularMovies } from "../services/tmdb";

export function useMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMovies() {
            try {
                const data = await getPopularMovies();
                setMovies(data.results);
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
    }, []);

    return {
        movies, loading, error
    };
}