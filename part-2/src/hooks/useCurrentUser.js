import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

export function useCurrentUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {

        async function loadUser() {
            const storedUser =
                localStorage.getItem("currentUser");

            if (storedUser) {
                setUser(JSON.parse(storedUser));
                return;
            }

            try {
                const response = await fetch(
                    `${BASE_URL}/users`
                );

                const users = await response.json();

                if (users.length > 0) {
                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify(users[0])
                    );

                    setUser(users[0]);
                }
            }

            catch (error) {
                console.error(error);
            }
        }

        loadUser();
    }, []);

    return user;
}