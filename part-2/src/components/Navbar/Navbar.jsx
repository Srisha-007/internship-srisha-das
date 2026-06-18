import styles from "./Navbar.module.css";
import { Sun } from "lucide-react";

function Navbar() {
    const activeSection = "trending";
    
    return (
        <header className={styles.mainHeader}>
            <div className={`container ${styles.navbar}`}>
                <a href="#" className={styles.logoContainer}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.logoIcon}
                    >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M7 3v18" />
                        <path d="M17 3v18" />
                        <path d="M3 7h4" />
                        <path d="M17 7h4" />
                        <path d="M3 12h18" />
                        <path d="M3 17h4" />
                        <path d="M17 17h4" />
                    </svg>

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