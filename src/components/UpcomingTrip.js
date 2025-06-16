//to show the Upcoming trip the ones that are in the future and sort the trips by dates
export function getUpcomingTrip(trips) {
    const upcomingTrips = trips.filter(
        (trip) => new Date(trip.date) > new Date()
    );

    const sorted = upcomingTrips.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    return sorted[0] || null;
}