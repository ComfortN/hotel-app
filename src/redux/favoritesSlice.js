import { createSlice } from '@reduxjs/toolkit';
import { addFavoriteToFirestore, getFavoritesFromFirestore, removeFavoriteFromFirestore } from '../firebase/favorites';
import { saveFavoritesToLocalStorage, getFavoritesFromLocalStorage, clearFavoritesFromLocalStorage } from '../utils/localStorage';

// Thunks for async operations
export const fetchFavorites = (userId) => async (dispatch) => {
    dispatch(setStatus('loading'));
    try {
        let favorites = [];
        if (userId) {
            favorites = await getFavoritesFromFirestore(userId);
        } else {
            favorites = getFavoritesFromLocalStorage();
        }
        dispatch(setFavorites(favorites));
        dispatch(setStatus('succeeded'));
    } catch (error) {
        dispatch(setError(error.toString()));
        dispatch(setStatus('failed'));
    }
};

// Sync favorites from local storage to Firestore after login
export const syncFavoritesToFirestore = (userId) => async (dispatch, getState) => {
    const localFavorites = getFavoritesFromLocalStorage();
    const firestoreFavorites = await getFavoritesFromFirestore(userId);

    const mergedFavorites = [...new Set([...firestoreFavorites, ...localFavorites])];

    await Promise.all(mergedFavorites.map((favorite) => addFavoriteToFirestore(userId, favorite)));
    dispatch(setFavorites(mergedFavorites));
};

const initialState = {
    favorites: [],
    status: 'idle',
    error: null,
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavorites(state, action) {
            state.favorites = action.payload;
            saveFavoritesToLocalStorage(state.favorites);
        },
        addFavorite(state, action) {
            state.favorites.push(action.payload);
            saveFavoritesToLocalStorage(state.favorites);
        },
        removeFavorite(state, action) {
            state.favorites = state.favorites.filter(favorite => favorite !== action.payload);
            saveFavoritesToLocalStorage(state.favorites);
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setFavorites, addFavorite, removeFavorite, setStatus, setError } = favoritesSlice.actions;

export default favoritesSlice.reducer;
