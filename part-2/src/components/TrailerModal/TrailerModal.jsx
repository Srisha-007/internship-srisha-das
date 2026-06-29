import { useState, useEffect } from "react";
import { X } from "lucide-react";
import styles from "./TrailerModal.module.css";

function TrailerModal({ trailerKey, loading, onClose }) {
    const [iframeLoading, setIframeLoading] = useState(true);

    useEffect(() => {
        function handleEscape(event) {
            if (event.key === "Escape") {
                onClose();
            }
        }
        window.addEventListener("keydown", handleEscape);
        document.body.style.overview = "hidden";
        return () => {
            window.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "auto";
        };
    }, [onClose]);

    return (
        <div
            className={styles.overlay}
            onClick={onClose}
        >
            <div
                className={styles.modal}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                >
                    <X />
                </button>

                {/* TMDB API loading */}
                {loading && (
                    <div className={styles.spinnerContainer}>
                        <div className={styles.spinner}></div>
                        <p>Fetching trailer...</p>
                    </div>
                )}

                {/* No trailer found */}
                {!loading && !trailerKey && (
                    <div className={styles.messageContainer}>
                        <p>No trailer available.</p>
                    </div>
                )}

                {/* YouTube iframe loading */}
                {!loading && trailerKey && (
                    <>
                        {iframeLoading && (
                            <div className={styles.spinnerContainer}>
                                <div className={styles.spinner}></div>
                                <p>Loading trailer...</p>
                            </div>
                        )}

                        <iframe
                            className={styles.iframe}
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                            title="Movie Trailer"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            onLoad={() =>
                                setIframeLoading(false)
                            }
                            style={{
                                display: iframeLoading
                                    ? "none"
                                    : "block"
                            }}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default TrailerModal;