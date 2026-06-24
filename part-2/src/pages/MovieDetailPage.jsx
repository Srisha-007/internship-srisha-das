import { useParams } from "react-router-dom";
import { Star, Clock, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { useMovieDetails } from "../hooks/useMovieDetails";
import { formatDate, formatCurrency } from "../utils/formatters";
import { useMovieRecommendations } from "../hooks/useMovieRecommendations";
import MovieCard from "../components/MovieCard/MovieCard";

import styles from "./MovieDetailPage.module.css";

function MovieDetailPage() {
    const { id } = useParams();
    const { movie, cast, loading, error} = useMovieDetails(id);
    const { movies: recommendations } = useMovieRecommendations(id);

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

                    <section className={styles.additionalInfo}>
                        <h3 className={styles.sectionHeading}>
                            Additional Information
                        </h3>
                    
                        {movie.tagline && (
                            <>
                                <h4 className={styles.taglineTitle}>
                                    Tagline
                                </h4>

                                <blockquote className={styles.tagline}>
                                    "{movie.tagline}"
                                </blockquote>
                            </>
                        )}

                        <div className={styles.infoGrid}>
                            <div>
                                <strong>Original Title</strong>
                                <p>{movie.original_title}</p>
                            </div>

                            <div>
                                <strong>Status</strong>
                                <p>{movie.status}</p>
                            </div>

                            <div>
                                <strong>Language</strong>
                                <p>{movie.original_language.toUpperCase()}</p>
                            </div>

                            <div>
                                <strong>Popularity</strong>
                                <p>{Math.round(movie.popularity)}</p>
                            </div>

                            <div>
                                <strong>Budget</strong>
                                <p>{formatCurrency(movie.budget)}</p>
                            </div>

                            <div>
                                <strong>Revenue</strong>
                                <p>{formatCurrency(movie.revenue)}</p>
                            </div>

                        </div>
                    </section>
                    
                    <section className={styles.recommendations}>
                        <h2>More Like This</h2>

                        <div className={styles.recommendationGrid}>
                            {recommendations.map(movie => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailPage;