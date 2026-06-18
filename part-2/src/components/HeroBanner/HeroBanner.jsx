import styles from "./HeroBanner.module.css";
import { formatDate } from "../../utils/formatters";
import { Star, Info } from "lucide-react";

function HeroBanner({movie}) {
    if (!movie) return null;

    const backgroundImage = `
        linear-gradient(
            to right,
            var(--hero-overlay-start) 40%,
            var(--hero-overlay-end)
        ),
        url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
    `;

    return (
        <section
            className={styles.heroSection} id="trending"
            style={{
                backgroundImage
            }}
        >
            <div className={styles.heroOverlay}>
                <div className={styles.heroContent}>
                    <p className={styles.heroTag}>
                        TRENDING NOW
                    </p>

                    <h1 className={styles.heroTitle}>
                        {movie.title}
                    </h1>

                    <div className={styles.heroMeta}>
                        <span>{formatDate(movie.release_date)}</span>

                        <span className={styles.heroRating}>
                            <Star
                                size={16}
                                fill="currentColor"
                            />
                            {movie.vote_average.toFixed(1)}
                        </span>
                    </div>

                    <p className={styles.heroDescription}>
                        {movie.overview}
                    </p>

                    <button
                        type="button"
                        className={styles.heroButton}
                    >
                        <Info />
                        View Details
                    </button>
                </div>
            </div>
        </section>
    );
}

export default HeroBanner;