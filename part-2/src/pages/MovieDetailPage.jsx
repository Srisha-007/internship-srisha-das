import { useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Star, Clock, Calendar, ArrowLeft, Heart, Play } from "lucide-react";

import MovieDetailsSkeleton from "../components/MovieDetailsSkeleton/MovieDetailsSkeleton";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useFavorites } from "../hooks/useFavorites";
import { formatDate, formatCurrency } from "../utils/formatters";
import { useMovieRecommendations } from "../hooks/useMovieRecommendations";
import MovieCard from "../components/MovieCard/MovieCard";
import TrailerModal from "../components/TrailerModal/TrailerModal";
import { useMovieTrailer } from "../hooks/useMovieTrailer";

import styles from "./MovieDetailPage.module.css";

function MovieDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { movie, cast, loading, error} = useMovieDetails(id);
    const { movies: recommendations, loading: recommendationsLoading, error: recommendationsError } = useMovieRecommendations(id);
    const location = useLocation();
    const [showTrailer, setShowTrailer] = useState(false);
    const { trailerKey } = useMovieTrailer(movie?.id);
    const { toggleFavorite, isFavorite } = useFavorites();
    const favorite = movie
        ? isFavorite(movie.id)
        : false;
    
    if (loading) {
        return <MovieDetailsSkeleton />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!movie) {
        return <p>Movie not found.</p>;
    }

    return (
        <div className={styles.page}>
            <Link 
                aria-label="Back button"
                to={location.state?.from ||"/"}
                className={styles.backButton}
            >
                <ArrowLeft size={18} />
                Back
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
                        url(${
                            movie.backdrop_path
                                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                                : "https://via.placeholder.com/1200x750?text=No+Image"
                            })
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
                    <div className={styles.titleRow}>
                        <h1 className={styles.title}>
                            {movie.title}
                        </h1>
                    
                        <div classname={styles.actionButtons}>
                            <button
                                className={styles.favoriteButton}
                                onClick={() => toggleFavorite(movie)}
                                aria-label="Toggle Favorite"
                            >
                                <Heart
                                    size={20}
                                    fill={favorite ? "currentColor" : "none"}
                                />
                                {favorite
                                    ? "Remove from Favorites"
                                : "Add to Favorites"
                                }
                            </button>

                            <button
                                className={styles.trailerButton}
                                onClick={() => setShowTrailer(true)}
                                disabled={!trailerKey}
                            >
                                <Play size={20}/>
                                {trailerKey
                                    ? "Watch Trailer"
                                    : "Trailer Unavailable"
                                }
                            </button>
                        </div>

                    {showTrailer && trailerKey && (
                        <TrailerModal
                            trailerKey={trailerKey}
                            onClose={() => setShowTrailer(false)}
                        />
                    )}
                    </div>
                   
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
                                <button
                                    key={actor.id}
                                    className={styles.castCard}
                                    onClick={() => 
                                        navigate(`/?person=${actor.id}&personName=${encodeURIComponent(actor.name)}#movies`)
                                    }
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
                                </button>
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
                    
                    {recommendations.length > 0 && (
                        <section className={styles.recommendations}>
                            <h2>More Like This</h2>
                            
                            {recommendationsLoading && (
                                <p>Loading recommendations...</p>
                            )}

                            {recommendationsError && (
                                <p>{recommendationsError}</p>
                            )}

                            {!recommendationsLoading && recommendations.length > 0 && (
                                <div className={styles.recommendationGrid}>
                                    {recommendations.map((movie) => (
                                        <MovieCard key={movie.id} movie={movie}/>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieDetailPage;