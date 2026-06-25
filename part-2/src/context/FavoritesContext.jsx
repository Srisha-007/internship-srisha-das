import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {

    const [favorites, setFavorites] = useLocalStorage(
        "favorites",
        []
    );

    function toggleFavorite(movie) {
        const exists = favorites.some(fav => fav.id === movie.id);

        if (exists) {
            setFavorites(prev =>
                prev.filter(fav => fav.id !== movie.id)
            );
        } 
        else {
            setFavorites(prev => [...prev, movie]);
        }
    }

    function isFavorite(movieId) {
        return favorites.some(movie => movie.id === movieId);
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                toggleFavorite,
                isFavorite
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}