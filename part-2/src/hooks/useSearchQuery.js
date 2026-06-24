import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useDebounce } from "./useDebounce";

export function useSearchQuery() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const personId = searchParams.get("person") || "";
    const personName = searchParams.get("personName") || "";
    const [inputValue, setInputValue] = useState(query);
    const debouncedValue = useDebounce(inputValue, 500);

    useEffect(() => {
        if (debouncedValue.trim()) {
            setSearchParams((prev) => {
                const params = new URLSearchParams(prev);

                params.set("q", debouncedValue);
                params.delete("person");

                return params;
            });
        }
        else if (query) {
            setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.delete("q");

                return params;
            });
        }
    }, [
        debouncedValue, query, setSearchParams
    ]);

    function clearSearch() {
        setInputValue("");

        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);

            params.delete("q");
            params.delete("person");

            return params;
        });
    }

    return {
        query, personId, personName, inputValue, setInputValue, clearSearch,
    };
}