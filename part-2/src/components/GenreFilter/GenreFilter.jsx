import styles from "./GenreFilter.module.css";

function GenreFilter({ genres, activeGenre, onGenreSelect }) {
    return (
        <section className={styles.genreSection}>

            <button
                className={
                    activeGenre === null
                        ? `${styles.genreButton} ${styles.active}`
                        : styles.genreButton
                }
                onClick={() => onGenreSelect(null)}
            >
                All
            </button>

            {genres.map((genre) => (
                <button
                    key={genre.id}
                    className={
                        activeGenre === genre.id
                            ? `${styles.genreButton} ${styles.active}`
                            : styles.genreButton
                    }
                    onClick={() =>
                        onGenreSelect(genre.id)
                    }>
                    {genre.name}
                </button>
            ))}
        </section>
    );
}

export default GenreFilter;