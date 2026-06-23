import { useParams } from "react-router-dom";
import { Star, Clock, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { useMovieDetails } from "../hooks/useMovieDetails";
import { formatDate } from "../utils/formatters";

import styles from "./MovieDetailPage.module.css";

function MovieDetailPage() {
    const { id } = useParams();
    const { movie, cast, loading, error} = useMovieDetails(id);

    if (loading) {
        return <p>Loading movie details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!movie) {
        return <p>Movie not found.</p>;
    }

    return (
        <div className={styles.page}>
            <Link to="/" className={styles.backButton}>
                <ArrowLeft size={18} />
                Back to Home
            </Link>

            <div
                className={styles.hero}
                style={{
                    backgroundImage: `
                        linear-gradient(
                            to top,
                            rgba(15,23,42,0.9),
                            rgba(15,23,42,0.3)
                        ),
                        url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
                    `
                }}
            />

            <div className={styles.body}>

                <div className={styles.posterWrapper}>
                    <img
                        className={styles.poster}
                        src={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "https://placehold.co/500x750"
                        }
                        alt={movie.title}
                    />
                </div>

                <div className={styles.info}>

                    <h1 className={styles.title}>
                        {movie.title}
                    </h1>

                    <div className={styles.metaRow}>

                        <span>
                            <Star size={18} />
                            {movie.vote_average.toFixed(1)}
                        </span>

                        <span>
                            <Clock size={18} />
                            {movie.runtime} min
                        </span>

                        <span>
                            <Calendar size={18} />
                            {formatDate(movie.release_date)}
                        </span>

                    </div>

                    <div className={styles.genres}>
                        {movie.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className={styles.genreBadge}
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className={styles.castSection}>
                        <h3 className={styles.castTitle}>
                            Top Cast
                        </h3>

                        <div className={styles.castList}>
                            {cast.map((actor) => (
                                <div
                                    key={actor.id}
                                    className={styles.castCard}
                                >
                                    <img
                                        className={styles.castImage}
                                        src={
                                            actor.profile_path
                                                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                                : "https://placehold.co/100x100"
                                        }
                                        alt={actor.name}
                                    />

                                    <div>
                                        <p className={styles.castName}>
                                            {actor.name}
                                        </p>

                                        <p className={styles.castCharacter}>
                                            {actor.character}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h3 className={styles.overviewTitle}>
                        Overview
                    </h3>

                    <p className={styles.overview}>
                        {movie.overview}
                    </p>

                </div>
            </div>
        </div>
    );
}

export default MovieDetailPage;