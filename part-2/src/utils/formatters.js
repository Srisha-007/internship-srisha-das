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
//         Truncate Long Text
// ===================================
export function truncateText( text, maxLength = 180) {
    if (!text) {
        return "";
    }

    if (text.length <= maxLength) {
        return text;
    }

    return (text.slice(0, maxLength));
}