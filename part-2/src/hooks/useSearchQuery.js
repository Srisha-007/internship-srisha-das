import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useDebounce } from "./useDebounce";

export function useSearchQuery() {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("q") || "";

    const [inputValue, setInputValue] = useState(query);

    const debouncedQuery = useDebounce(inputValue, 500);

    useEffect(() => {
        setInputValue(query);
    }, [query]);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSearchParams({});
            return;
        }

        setSearchParams({
            q: debouncedQuery,
        });
    }, [
        debouncedQuery,
        setSearchParams,
    ]);

    function clearSearch() {
        setInputValue("");
        setSearchParams({});
    }

    return {
        query, inputValue, setInputValue, clearSearch,
    };
}