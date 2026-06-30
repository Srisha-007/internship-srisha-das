import { useState } from "react";
import { Star } from "lucide-react";

import { addMovieRating } from "../../services/tmdb";
import { useGuestSession } from "../../hooks/useGuestSession";

import styles from "./MovieRating.module.css";

function MovieRating({ movieId }) {
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const guestSessionId = useGuestSession();

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

            setMessage("Rating submitted successfully!");
        }
        catch (error) {
            setMessage(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <h3>Your Rating</h3>

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

            <button
                onClick={handleSubmit}
                disabled={loading}
                className={styles.submitButton}
            >
                {loading
                    ? "Submitting..."
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