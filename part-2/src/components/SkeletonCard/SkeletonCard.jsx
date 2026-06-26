import styles from "./SkeletonCard.module.css";

function SkeletonCard() {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.skeletonPoster}></div>

            <div className={styles.skeletonInfo}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonMeta}></div>
            </div>
        </div>
    );
}

export default SkeletonCard;