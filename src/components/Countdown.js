//to get the countdown of the date from the current dates

export function getCountdown(date) {
    const today = new Date();
    const tripDate = new Date(date);
    const timeDiff = tripDate - today;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    if (dayDiff === 0) {
        return "It's today!";
    } else if (dayDiff > 0) {
        return `${dayDiff} more days`;
    } else {
        return "Trip has passed!";
    }
}