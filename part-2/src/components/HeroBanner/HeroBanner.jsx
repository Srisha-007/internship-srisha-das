import styles from "./HeroBanner.module.css";
import { useState } from "react";
import { useMovieTrailer } from "../../hooks/useMovieTrailer";
import TrailerModal from "../TrailerModal/TrailerModal";
import { Link, useLocation } from "react-router-dom";
import { formatDate, truncateText } from "../../utils/formatters";
import { Star, Info, Play } from "lucide-react";

function HeroBanner({movie}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false);
    const location = useLocation();

    const { trailerKey, loading: trailerLoading } = useMovieTrailer(movie?.id);

    if (!movie) return null;

    const shortOverview = truncateText(movie.overview, 180);
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
            style={{ backgroundImage }}
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
                        {isExpanded 
                            ? movie.overview 
                            : shortOverview
                        }
                        {movie.overview.length > 180 && (
                            <>
                                {!isExpanded && "..."}
                                <button
                                    type="button"
                                    className={styles.seeMoreButton}
                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    {isExpanded ? "Show Less" : "Show More"}
                                </button>
                            </>
                        )}
                    </p>
                    
                    <div className={styles.heroActions}>
                        <button
                            aria-label="Watch Trailer"
                            className={styles.heroButton}
                            onClick={() => setShowTrailer(true)}
                            disabled={!trailerKey}
                        >
                            <Play />
                            {trailerKey
                                ? "Watch Trailer"
                                : "Trailer Unavailable"
                            }
                        </button>    
                    
                        {showTrailer && (
                            <TrailerModal
                                trailerKey={trailerKey}
                                loading={trailerLoading}
                                onClose={() => setShowTrailer(false)}
                            />
                        )}
                        
                        <Link 
                            to={`/movie/${movie.id}`}
                            state={{from: location}} 
                            className={styles.heroButton}
                        >
                            <Info />
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroBanner;