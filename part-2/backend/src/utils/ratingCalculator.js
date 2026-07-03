export function calculateOverallRating({ story, acting, direction, visuals, music }) {
    const weightedScore =
        story * 0.30 +
        acting * 0.25 +
        direction * 0.20 +
        visuals * 0.15 +
        music * 0.10;

    return Number(weightedScore.toFixed(1));
}

export function roundForTMDB(score) {
    return Math.round(score * 2) / 2;
}