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