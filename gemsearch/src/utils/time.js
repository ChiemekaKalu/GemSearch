// Placeholder for time utils
export const formatTime = (seconds) => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
};
