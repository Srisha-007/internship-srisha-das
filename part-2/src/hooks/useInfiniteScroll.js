import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback) {
    const observerRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    callback();
                }
            },
            {
                threshold: 1
            }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [callback]);

    return observerRef;
}