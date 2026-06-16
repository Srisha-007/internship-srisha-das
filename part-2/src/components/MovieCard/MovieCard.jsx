import styles from "./MovieCard.module.css";

function MovieCard({movie}) {
    return (
        <article className={styles.card}>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />

            <div className={styles.content}>
                <h3>{movie.title}</h3>
                <p>
                    {movie.release_date?.split("-")[0]}
                </p>
                <p>
                    {movie.vote_average?.toFixed(1)}
                </p>
            </div>
        </article>
    );
}

export default MovieCard;