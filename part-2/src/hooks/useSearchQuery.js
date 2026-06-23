import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useDebounce } from "./useDebounce";

export function useSearchQuery() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [inputValue, setInputValue] = useState(query);
    const debouncedValue = useDebounce(inputValue, 500);

    useEffect(() => {
        if (debouncedValue.trim()) {
            setSearchParams({
                q: debouncedValue,
            });
        } else {
            setSearchParams({});
        }
    }, [
        debouncedValue, setSearchParams,
    ]);

    function clearSearch() {
        setInputValue("");
        setSearchParams({});
    }

    return {
        query, inputValue, setInputValue, clearSearch,
    };
}