import { Search, X } from "lucide-react";
import styles from "./SearchBar.module.css";

function SearchBar({value, onChange, onClear, loading}) {
    return (
        <section className={styles.discoverSection} id="search">
            <div className={styles.searchContainer}>

                <Search size={18} className={styles.searchIcon}/>

                <input
                    type="text"
                    placeholder="Search movies..."
                    value={value}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    className={styles.searchInput}
                />

                {value && (
                    <button
                        onClick={onClear}
                        className={styles.clearButton}
                    >
                        <X size={18} />
                    </button>
                )}

                {loading && (
                    <div className={styles.spinnerContainer}>
                        <div className={styles.spinner}></div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default SearchBar;