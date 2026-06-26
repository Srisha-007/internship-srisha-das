import styles from "./MovieDetailsSkeleton.module.css";

function MovieDetailsSkeleton() {
    return (
        <div className={styles.page}>
            <div className={`${styles.hero} ${styles.shimmer}`}></div>

            <div className={styles.body}>
                <div className={`${styles.poster} ${styles.shimmer}`}></div>

                <div className={styles.info}>
                    <div className={`${styles.title} ${styles.shimmer}`}></div>

                    <div className={styles.metaRow}>
                        <div className={`${styles.meta} ${styles.shimmer}`}></div>
                        <div className={`${styles.meta} ${styles.shimmer}`}></div>
                        <div className={`${styles.meta} ${styles.shimmer}`}></div>
                    </div>

                    <div className={styles.genreRow}>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className={`${styles.genre} ${styles.shimmer}`}
                            />
                        ))}
                    </div>

                    <div className={styles.overview}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className={`${styles.line} ${styles.shimmer}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailsSkeleton;