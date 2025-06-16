import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todos/todoSlice';
import tripReducer from './features/todos/tripSlice';
import authReducer from './features/todos/authSlice';

// Helper: Load from localStorage(read the appState)
const loadState = () => {
    try {
        const serializedState = localStorage.getItem("appState");
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        console.error("Failed to load state:", err);
        return undefined;
    }
};

// Helper: Save to localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("appState", serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
};

// Load persisted state
const persistedState = loadState();

const store = configureStore({
    reducer: {
        todo: todoReducer,
        trips: tripReducer,
        auth: authReducer,
    },
    preloadedState: persistedState,
});

// Subscribe to store changes and save
store.subscribe(() => {
    saveState(store.getState());
});

export default store;