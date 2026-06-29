import { X } from "lucide-react";
import styles from "./TrailerModal.module.css";

function TrailerModal({ trailerKey, onClose }) {

    if (!trailerKey) return null;

    return (
        <div
            className={styles.overlay}
            onClick={onClose}
        >
            <div
                className={styles.modal}
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                >
                    <X size={22}/>
                </button>

                <iframe
                    className={styles.video}
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="Movie Trailer"
                    allowFullScreen
                />
            </div>
        </div>
    );
}

export default TrailerModal;