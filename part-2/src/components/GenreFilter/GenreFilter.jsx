import styles from "./GenreFilter.module.css";

function GenreFilter({ genres, selectedGenres, onGenreToggle }) {
    return (
        <section className={styles.genreSection}>

            <button
                className={
                    selectedGenres.length === 0
                        ? `${styles.genreButton} ${styles.active}`
                        : styles.genreButton
                }
                onClick={() => onGenreToggle(null)}
            >
                All
            </button>

            {genres.map((genre) => (
                <button
                    key={genre.id}
                    className={
                        selectedGenres.includes(genre.id)
                            ? `${styles.genreButton} ${styles.active}`
                            : styles.genreButton
                    }
                    onClick={() =>
                        onGenreToggle(genre.id)
                    }>
                    {genre.name}
                </button>
            ))}
        </section>
    );
}

export default GenreFilter;