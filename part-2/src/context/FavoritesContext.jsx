import { createContext, useEffect, useState } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../services/backend";
import { getMovieDetails } from "../services/tmdb";

export const FavoritesContext = createContext();

const USER_ID = 1;

export function FavoritesProvider({ children }) {

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFavorites() {
            try {
                const favoriteIds =
                    await getFavorites(USER_ID);

                const movies =
                    await Promise.all(
                        favoriteIds.map((movieId) =>
                            getMovieDetails(movieId)
                        )
                    );

                setFavorites(movies);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        }

        loadFavorites();
    }, []);

    async function toggleFavorite(movie) {
        const exists =
            favorites.some(
                fav => fav.id === movie.id
            );

        try {
            if (exists) {
                await removeFavorite(
                    USER_ID,
                    movie.id
                );

                setFavorites(prev =>
                    prev.filter(
                        fav => fav.id !== movie.id
                    )
                );

            } else {
                await addFavorite(
                    USER_ID,
                    movie.id
                );

                setFavorites(prev => [
                    ...prev,
                    movie
                ]);

            }

        }
        catch (error) {
            console.error(error);
        }
    }

    function isFavorite(movieId) {
        return favorites.some(
            movie => movie.id === movieId
        );
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                loading,
                toggleFavorite,
                isFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}