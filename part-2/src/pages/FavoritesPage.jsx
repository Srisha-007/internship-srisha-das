import { HeartCrack, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard/MovieCard";

import styles from "./FavoritesPage.module.css";

function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <div className={styles.page}>
            <Link
                to="/"
                className={styles.backButton}
            >
                <ArrowLeft size={18} />
                Back to Home
            </Link>
            
            <h1 className={styles.title}>
                My Favorites
            </h1>

            {favorites.length === 0 ? (
                <div className={styles.emptyState}>
                    <HeartCrack size={72} />

                    <h2>No favorites yet</h2>

                    <p>
                        Start adding movies by
                        clicking the heart icon.
                    </p>
                </div>

            ) : (

                <div className={styles.moviesGrid}>
                    {favorites.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>

            )}
        </div>
    );
}

export default FavoritesPage;