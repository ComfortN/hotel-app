import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import accommodationReducer from './accommodationSlice';
import favoritesSlice from './favoritesSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        accommodations: accommodationReducer,
        favorites: favoritesSlice,
    },
});

export default store;
