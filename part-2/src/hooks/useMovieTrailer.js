import { useState } from "react";
import { getMovieVideos } from "../services/tmdb";

export function useMovieTrailer(movieId) {
    const [trailerKey, setTrailerKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    async function fetchTrailer() {
        if (!movieId) return;    
        
        try {
            setLoading(true);
            setError("");
            setTrailerKey("");

            const data = await getMovieVideos(movieId);                
            const trailer = data.results.find(
                (video) =>
                    video.site === "YouTube" &&
                    video.type === "Trailer"
            );
            
            if (!trailer) {
                setError("No trailer available.");
                setTrailerKey("");
                return;
            }
            setTrailerKey(trailer.key);
        }
        catch (error) {
            setError(error.message || "Failed to load trailer.");
        }
        finally {                
            setLoading(false);
        }
    }
    return {
        trailerKey, loading, error, fetchTrailer
    };
}