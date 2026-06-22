import { useEffect, useState } from "react";
import { getGenres } from "../services/tmdb";

export function useGenres() {

    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadGenres() {
            try {
                setLoading(true);
                const data = await getGenres();
                setGenres(data.genres);

            } catch (error) {
                setError(
                    error.message ||
                    "Failed to load genres."
                );

            } finally {
                setLoading(false);
            }
        }

        loadGenres();
    }, []);

    return {
        genres, loading, error,
    };
}