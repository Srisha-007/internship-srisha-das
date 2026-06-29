import styles from "./MovieCard.module.css";
import { Star, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";

function MovieCard({movie}) {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";
    
    const location = useLocation();    
    const { toggleFavorite, isFavorite } = useFavorites();
    const favorite = isFavorite(movie.id);

    return (
        <Link 
            to={`/movie/${movie.id}`} 
            state={{
                from: location
            }}
            className={styles.cardLink}
        >
            <article className={styles.movieCard}>
                <div className={styles.posterContainer}>
                    <img
                        src={posterUrl}
                        alt={movie.title}
                        className={styles.poster}
                    />
                    <div className={styles.ratingBadge}>
                        <Star className={styles.starIcon} />
                        {movie.vote_average?.toFixed(1)}
                    </div>
                </div>
            
                <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>
                        {movie.title}
                    </h3>
                    <div className={styles.cardMetadata}>
                        <span>
                            {movie.release_date?.split("-")[0]}
                        </span>
                    </div>
                </div>
                <button
                    className={styles.favoriteButton}
                    aria-label="Favorites Button"
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        toggleFavorite(movie);
                    }}
                >
                    <Heart className={styles.heartIcon}
                        fill={favorite ? "currentColor" : "none"}
                    />
                </button>

            </article>
        </Link>
    );
}

export default MovieCard;