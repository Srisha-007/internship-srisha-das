import styles from "./Navbar.module.css";
import { Sun, Film, Moon } from "lucide-react";
import { useFavorites } from "../../hooks/useFavorites";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router-dom";

function Navbar() {
    const activeSection = "trending";
    const { favorites } = useFavorites();
    const { theme, toggleTheme } = useTheme();
    return (
        <header className={styles.mainHeader}>
            <div className={`container ${styles.navbar}`}>
                <a href="#" className={styles.logoContainer}>
                    <Film className={styles.logoIcon} />

                    <span>CineScope</span>
                </a>

                <nav className={styles.navLinks}>
                    <a href="#trending" 
                        className={`${styles.navLink} ${
                            activeSection === 'trending' 
                                ? styles.active 
                                : ""}
                        `}
                    >
                        Trending
                    </a>  

                    <a href="#search" 
                        className={`${styles.navLink} ${
                            activeSection === 'search' 
                                ? styles.active 
                                : ""}
                        `}
                    >
                        Search
                    </a>

                    <Link to="/favorites"
                        className={`${styles.navLink} ${
                            activeSection === 'search' 
                                ? styles.active 
                                : ""}
                        `}
                    >
                        Favorites ({favorites.length})
                    </Link>
                    
                    <button 
                            className={styles.themeButton}
                            aria-label="Toggle Theme"
                            onClick={toggleTheme}
                    >
                        {theme === "dark"
                            ? <Sun size={20} />
                            : <Moon size={20} />
                        }
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;