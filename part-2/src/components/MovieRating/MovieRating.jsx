import { useState, useEffect } from "react";
import { Star } from "lucide-react";

import { saveRating, getRating } from "../../services/backend";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import styles from "./MovieRating.module.css";

function MovieRating({ movieId }) {
    const [rating, setRating] = useState(0);
    const currentUser = useCurrentUser();
    const [savedRating, setSavedRating] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function loadRating() {
            if (!currentUser) return;

            try {
                const existing = await getRating(currentUser.id, movieId);

                if (existing) {
                    setSavedRating(existing);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        loadRating();
    }, [movieId, currentUser]);

    async function handleSubmit() {
        if (!rating) return;

        try {
            setLoading(true);
            setMessage("");

            const saved = await saveRating({
                userId: currentUser.id,
                movieId,
                story: rating,
                acting: rating,
                direction: rating,
                visuals: rating,
                music: rating
            });

            setSavedRating(saved);
            setMessage("Rating saved successfully!");
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
                    ⭐ Your Overall Rating: {savedRating.overall}/10
                </p>
            )}

            <button
                onClick={handleSubmit}
                disabled={loading || !currentUser}
                className={styles.submitButton}
            >
                {loading
                    ? "Submitting..."
                    : !currentUser
                        ? "Loading User..."
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