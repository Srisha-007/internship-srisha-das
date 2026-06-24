// ===================================
//     Format Movie Release Date
// ===================================
export function formatDate(dateString) {
    if (!dateString) {
        return "Unknown";
    }

    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    return new Date(dateString).toLocaleDateString(
        "en-US",
        options
    );
}
// ===================================
//          Format Currency
// ===================================
export function formatCurrency(amount) {
    if (!amount || amount === 0) {
        return "Not Available";
    }
    return new Intl.NumberFormat(
        "en-US", {
            style:"currency",
            currency:"USD",
            maximumFractionDigits:0,
        }
    ).format(amount);
}

// ===================================
//         Truncate Long Text
// ===================================
export function truncateText(text, maxLength = 180) {
    if (!text) {
        return "";
    }

    if (text.length <= maxLength) {
        return text;
    }

    return (text.slice(0, maxLength));
}
// ===================================
//  Fetch Section Title for movie grid
// ===================================
export function getSectionTitle(query, activeGenre, genres) {
    if (query) {
        return `Search Results for "${query}"`;
    }
    if (activeGenre) {
        const genre = genres.find(
            g => g.id === activeGenre
        );
        return genre
            ? `${genre.name} Movies`
            : "Movies";
    }
    return "Popular Movies";
}