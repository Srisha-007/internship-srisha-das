import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useSearchQuery() {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("q") || "";

    const [inputValue, setInputValue] = useState(query);

    useEffect(() => {
        setInputValue(query);
    }, [query]);

    return {
        query, inputValue, setInputValue, setSearchParams,
    };
}