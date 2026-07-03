import { createContext, useEffect, useState } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../services/backend";
import { getMovieDetails } from "../services/tmdb";
import { useCurrentUser } from "../hooks/useCurrentUser";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = useCurrentUser();

    useEffect(() => {
        async function loadFavorites() {
            if (!currentUser) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const favoriteIds =
                    await getFavorites(currentUser.id);

                const movies =
                    await Promise.all(
                        favoriteIds.map((movieId) =>
                            getMovieDetails(movieId)
                        )
                    );

                setFavorites(movies);
            }
            catch (error) {
                setFavorites([]);
            }
            finally {
                setLoading(false);
            }
        }

        loadFavorites();
    }, [currentUser]);

    async function toggleFavorite(movie) {
        const exists =
            favorites.some(
                fav => fav.id === movie.id
            );

        try {
            if (exists) {
                await removeFavorite(
                    currentUser.id,
                    movie.id
                );

                setFavorites(prev =>
                    prev.filter(
                        fav => fav.id !== movie.id
                    )
                );

            } else {
                await addFavorite(
                    currentUser.id,
                    movie.id
                );

                setFavorites(prev => [
                    ...prev,
                    movie
                ]);

            }

        }
        catch (error) {
            return;
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