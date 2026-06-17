import styles from "./MovieCard.module.css";

function MovieCard({movie}) {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";
        
    return (
        <article className={styles.movieCard}>
            <div className={styles.posterContainer}>
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className={styles.poster}
                />
                <div className={styles.ratingBadge}>
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
        </article>
    );
}

export default MovieCard;