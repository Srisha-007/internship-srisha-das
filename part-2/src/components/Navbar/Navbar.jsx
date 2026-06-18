import styles from "./Navbar.module.css";
import { Sun, Film } from "lucide-react";

function Navbar() {
    const activeSection = "trending";
    
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

                    <button type="button"
                            className={styles.themeToggle}
                            aria-label="Toggle Theme"
                    >
                        <Sun /> 
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;