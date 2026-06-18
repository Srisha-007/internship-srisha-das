import styles from "./HeroBanner.module.css";

function HeroBanner() {
  return (
    <section className={styles.heroSection} id="trending">
      <div className={styles.heroOverlay}>
        <div className={styles.heroContent}>
          <p className={styles.heroTag}>TRENDING NOW</p>

          <h1 className={styles.heroTitle}>
            MOVIE NAME
          </h1>

          <p className={styles.heroMeta}>
            Release Year | Genre | Rating
          </p>

          <p className={styles.heroDescription}>
            A brief description of the movie goes here.
          </p>

          <button className={styles.heroButton}>
            View Details
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;