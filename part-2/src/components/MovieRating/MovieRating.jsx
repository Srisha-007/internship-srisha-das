import { useState, useEffect } from "react";
import { Star } from "lucide-react";

import { saveRating, getRating } from "../../services/backend";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import styles from "./MovieRating.module.css";

function MovieRating({ movieId }) {
    const [ratings, setRatings] = useState({
        story: 5,
        acting: 5,
        direction: 5,
        visuals: 5,
        music: 5,
    });
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
                    setRatings({
                        story: existing.story,
                        acting: existing.acting,
                        direction: existing.direction,
                        visuals: existing.visuals,
                        music: existing.music,
                    });
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        loadRating();
    }, [movieId, currentUser]);

    async function handleSubmit() {
        if (!currentUser) return;

        try {
            setLoading(true);
            setMessage("");

            const saved = await saveRating({
                userId: currentUser.id,
                movieId,
                story: ratings.story,
                acting: ratings.acting,
                direction: ratings.direction,
                visuals: ratings.visuals,
                music: ratings.music
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

            {Object.entries(ratings).map(([category, value]) => (
                <div key={category} className={styles.category}>
                    <h4>
                        {category.charAt(0).toUpperCase() +
                            category.slice(1)}
                    </h4>

                    <div className={styles.stars}>
                        {[1,2,3,4,5,6,7,8,9,10].map((score) => (
                            <button
                                key={score}
                                className={styles.starButton}
                                onClick={() =>
                                    setRatings(prev => ({
                                        ...prev,
                                        [category]: score
                                    }))
                                }
                            >

                                <Star
                                    fill={
                                        value >= score
                                            ? "currentColor"
                                            : "none"
                                    }
                                />
                            </button>

                        ))}
                    </div>

                    <p>
                        {value}/10
                    </p>
                </div>
            ))}

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