import { createSlice } from "@reduxjs/toolkit"

const tripSlice = createSlice({
    name: "trips",
    initialState: [],
    reducers: {
        addTrip: (state, action) => {
            state.push({
                id: Date.now(),
                trip: action.payload.trip,
                date: new Date(action.payload.date).toISOString(),
                completed: action.payload.completed
            });
        },
        updateTrip: (state, action) => {
            return state.map((trip) =>
                trip.id === action.payload.id
                    ? { ...trip, ...action.payload }
                    : trip
            );
        },
        deleteTrip: (state, action) => {
            return state.filter(trip => trip.id !== action.payload.id);
        },
    },
});

export const { addTrip, updateTrip, deleteTrip } = tripSlice.actions;
export default tripSlice.reducer;