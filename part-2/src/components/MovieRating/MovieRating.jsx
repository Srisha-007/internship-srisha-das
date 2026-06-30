import { useState, useEffect } from "react";
import { Star } from "lucide-react";

import { addMovieRating } from "../../services/tmdb";
import { useGuestSession } from "../../hooks/useGuestSession";
import { useRatings } from "../../context/RatingsContext";
import styles from "./MovieRating.module.css";

function MovieRating({ movieId }) {
    const [rating, setRating] = useState(0);
    const { rateMovie, getRating } = useRatings();
    const savedRating = getRating(movieId);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const guestSessionId = useGuestSession();
    console.log("Guest Session:", guestSessionId);

    useEffect(() => {
        if (savedRating) {
            setRating(savedRating);
        }
    }, [savedRating]);

    async function handleSubmit() {
        if (!rating) return;

        try {
            setLoading(true);
            setMessage("");

            await addMovieRating(
                movieId,
                rating,
                guestSessionId
            );
            
            rateMovie(movieId, rating);
            setMessage("Rating saved successfully!");
        }
        catch (error) {
            console.error(error);
            setMessage(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <h3>
                {savedRating
                    ? "Update Your Rating"
                    : "Rate this Movie"
                }
            </h3>

            <div className={styles.stars}>
                {[1,2,3,4,5,6,7,8,9,10].map((value) => (
                    <button
                        key={value}
                        className={styles.starButton}
                        onClick={() => setRating(value)}
                    >
                        <Star
                            fill={
                                rating >= value
                                    ? "currentColor"
                                    : "none"
                            }
                        />
                    </button>
                ))}
            </div>

            <p>
                Selected: {rating}/10
            </p>
            
            {savedRating && (
                <p className={styles.savedRating}>
                    ⭐ Your Rating: {savedRating}/10
                </p>
            )}

            <button
                onClick={handleSubmit}
                disabled={loading || !guestSessionId}
                className={styles.submitButton}
            >
                {loading
                    ? "Submitting..."
                    : !guestSessionId
                        ? "Preparing Session..."
                        : "Submit Rating"}
            </button>

            {message && (
                <p className={styles.message}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default MovieRating;