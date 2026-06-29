import { useEffect, useState } from "react";
import { getMovieVideos } from "../services/tmdb";

export function useMovieTrailer(movieId) {
    const [trailerKey, setTrailerKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!movieId) {
            setTrailerKey("");
            return;
        } 

        async function loadTrailer() {
            try {
                setLoading(true);
                setError("");

                const data = await getMovieVideos(movieId);

                const trailer = data.results.find(
                    (video) =>
                        video.site === "YouTube" &&
                        video.type === "Trailer"
                );

                setTrailerKey(trailer?.key || "");
            }
            catch (error) {
                setError(error.message || "Failed to load trailer.");
            }
            finally {
                setLoading(false);
            }
        }

        loadTrailer();
    }, [movieId]);

    return {
        trailerKey, loading, error
    };
}