import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

export function useCurrentUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {

        async function loadUser() {
            const storedUser =
                localStorage.getItem("currentUser");
            
            console.log("Stored user:", storedUser);

            if (storedUser) {
                setUser(JSON.parse(storedUser));
                return;
            }

            try {
                const response = await fetch(
                    `${BASE_URL}/users`
                );

                if (!response.ok) {
                    console.error("Failed to fetch users:", response.status);
                    return;
                }

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