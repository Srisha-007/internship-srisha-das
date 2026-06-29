import { useEffect, useState } from "react";
import { getMoviesByGenre } from "../services/tmdb";

const genreCache = {};

export function useGenreMovies(selectedGenres) {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const cacheKey = selectedGenres.slice().sort().join(",");

    useEffect(() => {
        setMovies([]);
        setPage(1);
    }, [cacheKey]);

    useEffect(() => {
        if (selectedGenres.length === 0) {
            setMovies([]);
            return;
        }

        async function loadMovies() {
            try {
                setLoading(true);
                setError("");

                const pageCacheKey = `${cacheKey}-page-${page}`;

                let results;
                
                if (genreCache[pageCacheKey]) {
                    results = genreCache[pageCacheKey];
                } else {
                    const data = await getMoviesByGenre(
                        cacheKey, page
                    );
                    results = data.results;
                    genreCache[pageCacheKey] = results;
                }
                
                setMovies(prev => {
                    const combined = [
                        ...prev,
                        ...results
                    ];

                    return Array.from(
                        new Map(
                            combined.map(movie => [
                                movie.id,
                                movie
                            ])
                        ).values()
                    );
                });

            } catch (error) {
                setError(error.message || "Failed to load movies.");

            } finally {
                setLoading(false);
            }
        }
        loadMovies();
    }, [cacheKey, page, selectedGenres]);

    function loadMore() {
        if (!loading) {
            setPage(prev => prev + 1);
        }
    }
    return {
        movies, loading, error, loadMore
    };
}