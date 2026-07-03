import { useEffect, useState } from "react";
import { createGuestSession } from "../services/tmdb";

export function useGuestSession() {
    const [guestSessionId, setGuestSessionId] = useState("");

    useEffect(() => {
        async function initSession() {
            const storedSession =
                localStorage.getItem("guestSessionId");

            if (storedSession) {
                setGuestSessionId(storedSession);
                return;
            }

            try {
                const data = await createGuestSession();

                localStorage.setItem(
                    "guestSessionId",
                    data.guest_session_id
                );

                setGuestSessionId(
                    data.guest_session_id
                );
            }
            catch (error) {
                return;
            }
        }

        initSession();
    }, []);

    return guestSessionId;
}